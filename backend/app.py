from flask import Flask, request, jsonify, session
from flask_cors import CORS
import json
import datetime
import os
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from ai_engine.traffic_ai import TrafficAI
import random
import time

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'smart-traffic-management-secret-key-2025'
app.config['SESSION_TYPE'] = 'filesystem'

# Enable CORS for React frontend
CORS(app, supports_credentials=True, origins=['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005', 'http://localhost:3006', 'http://localhost:3007'])

# Initialize AI Engine
traffic_ai = TrafficAI()

# In-memory storage (in production, use a real database)
users_db = {}
traffic_data = {
    'intersections': {
        'intersection_1': {
            'id': 'intersection_1',
            'name': 'Main St & 1st Ave',
            'status': 'active',
            'current_phase': 'north_south_green',
            'traffic_count': 45,
            'efficiency': 92,
            'last_updated': datetime.datetime.now().isoformat()
        },
        'intersection_2': {
            'id': 'intersection_2',
            'name': 'Broadway & 2nd St',
            'status': 'active',
            'current_phase': 'east_west_green',
            'traffic_count': 38,
            'efficiency': 88,
            'last_updated': datetime.datetime.now().isoformat()
        },
        'intersection_3': {
            'id': 'intersection_3',
            'name': 'Park Ave & 3rd St',
            'status': 'active',
            'current_phase': 'north_south_green',
            'traffic_count': 52,
            'efficiency': 95,
            'last_updated': datetime.datetime.now().isoformat()
        },
        'intersection_4': {
            'id': 'intersection_4',
            'name': 'Central Blvd & 4th Ave',
            'status': 'active',
            'current_phase': 'east_west_green',
            'traffic_count': 41,
            'efficiency': 89,
            'last_updated': datetime.datetime.now().isoformat()
        }
    },
    'system_stats': {
        'total_intersections': 4,
        'active_intersections': 4,
        'average_efficiency': 91,
        'total_vehicles_processed': 1247,
        'congestion_level': 'low',
        'last_optimization': datetime.datetime.now().isoformat()
    }
}

locations_db = [
    {
        'id': '1',
        'name': 'Downtown Central',
        'address': 'Main St & 1st Ave',
        'type': 'major_intersection',
        'status': 'active',
        'coordinates': {'lat': 40.7128, 'lng': -74.0060},
        'traffic_lights': 4,
        'created_at': datetime.datetime.now().isoformat()
    },
    {
        'id': '2',
        'name': 'Business District',
        'address': 'Broadway & 2nd St',
        'type': 'commercial_zone',
        'status': 'active',
        'coordinates': {'lat': 40.7589, 'lng': -73.9851},
        'traffic_lights': 3,
        'created_at': datetime.datetime.now().isoformat()
    }
]

# Helper Functions
def get_current_user():
    """Get current authenticated user"""
    user_id = session.get('user_id')
    return users_db.get(user_id) if user_id else None

def generate_traffic_metrics():
    """Generate realistic traffic metrics"""
    return {
        'timestamp': datetime.datetime.now().isoformat(),
        'total_vehicles': random.randint(800, 1500),
        'average_speed': round(random.uniform(25, 45), 1),
        'congestion_level': random.choice(['low', 'moderate', 'high']),
        'efficiency_score': random.randint(85, 98),
        'incidents': random.randint(0, 3),
        'emergency_vehicles': random.randint(0, 2)
    }

# Authentication Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    """User registration endpoint"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['firstName', 'lastName', 'email', 'password', 'organization', 'role']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if user already exists
        if any(user['email'] == data['email'] for user in users_db.values()):
            return jsonify({'error': 'User already exists with this email'}), 409
        
        # Create new user
        user_id = str(uuid.uuid4())
        user = {
            'id': user_id,
            'firstName': data['firstName'],
            'lastName': data['lastName'],
            'email': data['email'],
            'password': generate_password_hash(data['password']),
            'phone': data.get('phone', ''),
            'organization': data['organization'],
            'role': data['role'],
            'created_at': datetime.datetime.now().isoformat(),
            'last_login': None
        }
        
        users_db[user_id] = user
        
        # Create session
        session['user_id'] = user_id
        session['email'] = data['email']
        
        # Return user info (without password)
        user_response = {k: v for k, v in user.items() if k != 'password'}
        return jsonify({
            'message': 'User registered successfully',
            'user': user_response
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Find user by email
        user = None
        for u in users_db.values():
            if u['email'] == email:
                user = u
                break
        
        if not user or not check_password_hash(user['password'], password):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Update last login
        user['last_login'] = datetime.datetime.now().isoformat()
        
        # Create session
        session['user_id'] = user['id']
        session['email'] = user['email']
        
        # Return user info (without password)
        user_response = {k: v for k, v in user.items() if k != 'password'}
        return jsonify({
            'message': 'Login successful',
            'user': user_response
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    """User logout endpoint"""
    session.clear()
    return jsonify({'message': 'Logout successful'}), 200

@app.route('/api/auth/me', methods=['GET'])
def get_current_user_info():
    """Get current user information"""
    user = get_current_user()
    if not user:
        return jsonify({'error': 'Not authenticated'}), 401
    
    user_response = {k: v for k, v in user.items() if k != 'password'}
    return jsonify({'user': user_response}), 200

# Traffic Management Routes
@app.route('/api/traffic/status', methods=['GET'])
def get_traffic_status():
    """Get current traffic system status"""
    try:
        # Update traffic data with AI optimization
        optimized_data = traffic_ai.optimize_traffic_flow(traffic_data)
        
        return jsonify({
            'status': 'success',
            'data': optimized_data,
            'timestamp': datetime.datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/traffic/optimize', methods=['POST'])
def optimize_traffic():
    """Trigger traffic optimization"""
    try:
        data = request.get_json()
        intersection_id = data.get('intersection_id')
        
        if intersection_id and intersection_id in traffic_data['intersections']:
            # Optimize specific intersection
            result = traffic_ai.optimize_intersection(traffic_data['intersections'][intersection_id])
            traffic_data['intersections'][intersection_id].update(result)
        else:
            # Optimize entire system
            traffic_data.update(traffic_ai.optimize_traffic_flow(traffic_data))
        
        return jsonify({
            'status': 'success',
            'message': 'Traffic optimization completed',
            'data': traffic_data
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/traffic/analytics', methods=['GET'])
def get_traffic_analytics():
    """Get traffic analytics and metrics"""
    try:
        # Generate analytics data
        analytics = traffic_ai.generate_analytics(traffic_data)
        
        # Add real-time metrics
        analytics['real_time_metrics'] = generate_traffic_metrics()
        
        return jsonify({
            'status': 'success',
            'data': analytics,
            'timestamp': datetime.datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/traffic/emergency', methods=['POST'])
def handle_emergency():
    """Handle emergency vehicle routing"""
    try:
        data = request.get_json()
        emergency_type = data.get('type', 'general')
        location = data.get('location')
        
        result = traffic_ai.handle_emergency(traffic_data, emergency_type, location)
        
        return jsonify({
            'status': 'success',
            'message': 'Emergency protocol activated',
            'data': result
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Location Management Routes
@app.route('/api/locations', methods=['GET'])
def get_locations():
    """Get all locations"""
    return jsonify({
        'status': 'success',
        'data': locations_db
    }), 200

@app.route('/api/locations', methods=['POST'])
def create_location():
    """Create a new location"""
    try:
        user = get_current_user()
        if not user:
            return jsonify({'error': 'Authentication required'}), 401
        
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'address', 'type']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Create new location
        location = {
            'id': str(len(locations_db) + 1),
            'name': data['name'],
            'address': data['address'],
            'type': data['type'],
            'status': data.get('status', 'active'),
            'coordinates': data.get('coordinates', {'lat': 0, 'lng': 0}),
            'traffic_lights': data.get('traffic_lights', 1),
            'created_at': datetime.datetime.now().isoformat(),
            'created_by': user['id']
        }
        
        locations_db.append(location)
        
        return jsonify({
            'status': 'success',
            'message': 'Location created successfully',
            'data': location
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/locations/<location_id>', methods=['PUT'])
def update_location(location_id):
    """Update a location"""
    try:
        user = get_current_user()
        if not user:
            return jsonify({'error': 'Authentication required'}), 401
        
        data = request.get_json()
        
        # Find location
        location = next((loc for loc in locations_db if loc['id'] == location_id), None)
        if not location:
            return jsonify({'error': 'Location not found'}), 404
        
        # Update location
        for key, value in data.items():
            if key in ['name', 'address', 'type', 'status', 'coordinates', 'traffic_lights']:
                location[key] = value
        
        location['updated_at'] = datetime.datetime.now().isoformat()
        location['updated_by'] = user['id']
        
        return jsonify({
            'status': 'success',
            'message': 'Location updated successfully',
            'data': location
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/locations/<location_id>', methods=['DELETE'])
def delete_location(location_id):
    """Delete a location"""
    try:
        user = get_current_user()
        if not user:
            return jsonify({'error': 'Authentication required'}), 401
        
        # Find and remove location
        global locations_db
        locations_db = [loc for loc in locations_db if loc['id'] != location_id]
        
        return jsonify({
            'status': 'success',
            'message': 'Location deleted successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# System Health Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.datetime.now().isoformat(),
        'version': '1.0.0',
        'services': {
            'api': 'running',
            'ai_engine': 'running',
            'database': 'connected'
        }
    }), 200

@app.route('/', methods=['GET'])
def root():
    """Root endpoint"""
    return jsonify({
        'message': 'Smart Traffic Management System API',
        'version': '1.0.0',
        'status': 'running',
        'endpoints': {
            'auth': '/api/auth/',
            'traffic': '/api/traffic/',
            'locations': '/api/locations/',
            'health': '/api/health'
        }
    }), 200

# Error Handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("🚦 Starting Smart Traffic Management System Backend...")
    print("📊 AI Engine: Loaded")
    print("🔐 Authentication: Enabled")
    print("🌐 CORS: Configured for React frontend")
    print("🚀 Server starting on http://localhost:5001")
    
    app.run(
        host='0.0.0.0',
        port=5001,
        debug=True,
        threaded=True
    )