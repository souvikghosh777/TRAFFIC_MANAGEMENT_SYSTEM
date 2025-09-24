from flask import Flask, jsonify
from flask_cors import CORS

# Create Flask app
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['http://localhost:3000'])

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Traffic Management System Backend is running',
        'version': '1.0.0'
    })

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({'message': 'Backend connection successful!'})

if __name__ == '__main__':
    print("🚦 Starting Simple Traffic Management Backend on port 5001...")
    app.run(debug=True, host='127.0.0.1', port=5001)