"""
Smart Traffic Management AI Engine
Handles traffic optimization, prediction, and analytics using machine learning
"""

import numpy as np
import random
import datetime
from typing import Dict, List, Any
import json

class TrafficAI:
    """AI Engine for traffic management and optimization"""
    
    def __init__(self):
        """Initialize the AI engine"""
        self.model_version = "1.0.0"
        self.optimization_history = []
        self.performance_metrics = {
            'total_optimizations': 0,
            'average_efficiency_gain': 0,
            'emergency_responses': 0,
            'last_training': datetime.datetime.now().isoformat()
        }
    
    def optimize_traffic_flow(self, traffic_data: Dict) -> Dict:
        """
        Optimize traffic flow across all intersections
        Uses machine learning algorithms to determine optimal signal timing
        """
        try:
            optimized_data = traffic_data.copy()
            
            # Simulate AI optimization
            for intersection_id, intersection in optimized_data['intersections'].items():
                # AI-based optimization logic
                current_count = intersection['traffic_count']
                current_efficiency = intersection['efficiency']
                
                # Simulate optimization based on traffic patterns
                if current_count > 50:
                    # High traffic - optimize for throughput
                    new_efficiency = min(98, current_efficiency + random.randint(2, 5))
                    optimized_phase = self._calculate_optimal_phase(current_count, 'high_traffic')
                elif current_count < 30:
                    # Low traffic - optimize for energy efficiency
                    new_efficiency = min(95, current_efficiency + random.randint(1, 3))
                    optimized_phase = self._calculate_optimal_phase(current_count, 'low_traffic')
                else:
                    # Medium traffic - balanced optimization
                    new_efficiency = min(96, current_efficiency + random.randint(1, 4))
                    optimized_phase = self._calculate_optimal_phase(current_count, 'medium_traffic')
                
                # Update intersection data
                intersection['efficiency'] = new_efficiency
                intersection['current_phase'] = optimized_phase
                intersection['last_updated'] = datetime.datetime.now().isoformat()
                intersection['ai_optimized'] = True
            
            # Update system stats
            efficiencies = [int['efficiency'] for int in optimized_data['intersections'].values()]
            optimized_data['system_stats']['average_efficiency'] = round(sum(efficiencies) / len(efficiencies))
            optimized_data['system_stats']['last_optimization'] = datetime.datetime.now().isoformat()
            
            # Update performance metrics
            self.performance_metrics['total_optimizations'] += 1
            
            # Store optimization in history
            self.optimization_history.append({
                'timestamp': datetime.datetime.now().isoformat(),
                'type': 'system_wide',
                'efficiency_gain': random.randint(2, 8),
                'intersections_affected': len(optimized_data['intersections'])
            })
            
            return optimized_data
            
        except Exception as e:
            print(f"Error in traffic optimization: {str(e)}")
            return traffic_data
    
    def optimize_intersection(self, intersection_data: Dict) -> Dict:
        """
        Optimize a single intersection
        """
        try:
            optimized_intersection = intersection_data.copy()
            
            current_count = intersection_data['traffic_count']
            current_efficiency = intersection_data['efficiency']
            
            # AI optimization for single intersection
            efficiency_gain = random.randint(3, 7)
            new_efficiency = min(98, current_efficiency + efficiency_gain)
            
            # Calculate optimal timing
            optimal_timing = self._calculate_optimal_timing(current_count)
            
            optimized_intersection.update({
                'efficiency': new_efficiency,
                'current_phase': self._calculate_optimal_phase(current_count, 'targeted'),
                'optimal_timing': optimal_timing,
                'last_updated': datetime.datetime.now().isoformat(),
                'ai_optimized': True
            })
            
            return optimized_intersection
            
        except Exception as e:
            print(f"Error in intersection optimization: {str(e)}")
            return intersection_data
    
    def generate_analytics(self, traffic_data: Dict) -> Dict:
        """
        Generate comprehensive traffic analytics and insights
        """
        try:
            analytics = {
                'overview': {
                    'total_intersections': len(traffic_data['intersections']),
                    'average_efficiency': traffic_data['system_stats']['average_efficiency'],
                    'total_vehicles_today': random.randint(8000, 15000),
                    'congestion_reduction': f"{random.randint(25, 45)}%",
                    'energy_savings': f"{random.randint(15, 30)}%"
                },
                'performance_metrics': {
                    'response_time': f"{random.randint(50, 150)}ms",
                    'uptime': "99.9%",
                    'optimization_frequency': f"{random.randint(15, 30)} per hour",
                    'accuracy_rate': f"{random.randint(94, 99)}%"
                },
                'traffic_patterns': {
                    'peak_hours': ['7:00-9:00', '17:00-19:00'],
                    'busiest_intersection': self._get_busiest_intersection(traffic_data),
                    'flow_direction': 'North-South dominant',
                    'seasonal_trends': 'Increasing 15% from last month'
                },
                'predictions': {
                    'next_hour_congestion': random.choice(['Low', 'Medium', 'High']),
                    'peak_traffic_forecast': f"{random.randint(60, 90)} minutes",
                    'optimal_departure_time': f"{random.randint(7, 9)}:{random.randint(10, 50):02d} AM",
                    'weather_impact': 'Light rain expected - 20% slower traffic'
                },
                'ai_insights': {
                    'efficiency_improvements': f"+{random.randint(5, 12)}% this week",
                    'ml_model_accuracy': f"{random.randint(93, 98)}%",
                    'learning_progress': 'Model updated 2 hours ago',
                    'anomaly_detection': f"{random.randint(0, 3)} incidents detected today"
                },
                'environmental_impact': {
                    'co2_reduction': f"{random.randint(200, 500)}kg today",
                    'fuel_savings': f"{random.randint(150, 300)} gallons",
                    'idle_time_reduction': f"{random.randint(20, 40)}%",
                    'noise_pollution': f"-{random.randint(5, 15)}dB average"
                },
                'recommendations': [
                    "Increase green light duration at Main St & 1st Ave during evening rush",
                    "Consider pedestrian priority signals at Broadway & 2nd St",
                    "Optimize emergency vehicle preemption at Central Blvd",
                    "Schedule maintenance for intersection sensors during low traffic periods"
                ]
            }
            
            # Historical data simulation
            analytics['historical_data'] = self._generate_historical_data()
            
            return analytics
            
        except Exception as e:
            print(f"Error generating analytics: {str(e)}")
            return {'error': 'Failed to generate analytics'}
    
    def handle_emergency(self, traffic_data: Dict, emergency_type: str, location: str) -> Dict:
        """
        Handle emergency vehicle routing and traffic preemption
        """
        try:
            emergency_response = {
                'emergency_id': f"EMG_{random.randint(1000, 9999)}",
                'type': emergency_type,
                'location': location,
                'timestamp': datetime.datetime.now().isoformat(),
                'response_time': f"{random.randint(30, 120)} seconds",
                'affected_intersections': [],
                'route_optimization': {}
            }
            
            # Simulate emergency route calculation
            affected_intersections = list(traffic_data['intersections'].keys())[:random.randint(2, 4)]
            
            for intersection_id in affected_intersections:
                intersection = traffic_data['intersections'][intersection_id]
                
                # Set emergency preemption
                intersection['emergency_mode'] = True
                intersection['current_phase'] = 'emergency_preemption'
                intersection['last_updated'] = datetime.datetime.now().isoformat()
                
                emergency_response['affected_intersections'].append({
                    'id': intersection_id,
                    'name': intersection['name'],
                    'action': 'preemption_activated',
                    'estimated_delay': f"{random.randint(2, 8)} seconds"
                })
            
            # Calculate optimal emergency route
            emergency_response['route_optimization'] = {
                'optimal_path': f"Route via {random.choice(['Main St', 'Broadway', 'Central Blvd'])}",
                'estimated_time': f"{random.randint(3, 8)} minutes",
                'traffic_clearance': 'Initiated',
                'signal_preemption': 'Active'
            }
            
            # Update performance metrics
            self.performance_metrics['emergency_responses'] += 1
            
            return emergency_response
            
        except Exception as e:
            print(f"Error handling emergency: {str(e)}")
            return {'error': 'Failed to handle emergency'}
    
    def predict_traffic_patterns(self, historical_data: List[Dict]) -> Dict:
        """
        Predict future traffic patterns using machine learning
        """
        try:
            # Simulate ML prediction
            predictions = {
                'next_hour': {
                    'volume': random.randint(80, 120),
                    'congestion_level': random.choice(['Low', 'Medium', 'High']),
                    'confidence': f"{random.randint(85, 96)}%"
                },
                'next_day': {
                    'peak_times': ['7:30-9:00', '17:30-19:00'],
                    'volume_forecast': random.randint(1200, 1800),
                    'weather_impact': random.choice(['None', 'Light', 'Moderate'])
                },
                'weekly_trends': {
                    'busiest_day': random.choice(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
                    'average_daily_volume': random.randint(1000, 1500),
                    'growth_rate': f"+{random.randint(2, 8)}%"
                }
            }
            
            return predictions
            
        except Exception as e:
            print(f"Error in traffic prediction: {str(e)}")
            return {'error': 'Failed to predict traffic patterns'}
    
    def _calculate_optimal_phase(self, traffic_count: int, optimization_type: str) -> str:
        """Calculate optimal traffic light phase based on traffic count and type"""
        phases = [
            'north_south_green',
            'east_west_green',
            'north_south_yellow',
            'east_west_yellow',
            'all_red'
        ]
        
        if optimization_type == 'high_traffic':
            return random.choice(['north_south_green', 'east_west_green'])
        elif optimization_type == 'low_traffic':
            return random.choice(phases)
        else:
            return random.choice(['north_south_green', 'east_west_green'])
    
    def _calculate_optimal_timing(self, traffic_count: int) -> Dict:
        """Calculate optimal signal timing"""
        base_timing = 30  # Base green light duration in seconds
        
        if traffic_count > 50:
            green_duration = base_timing + random.randint(10, 20)
        elif traffic_count < 30:
            green_duration = base_timing - random.randint(5, 10)
        else:
            green_duration = base_timing + random.randint(-5, 10)
        
        return {
            'green_duration': max(20, green_duration),
            'yellow_duration': 4,
            'red_duration': 2,
            'cycle_length': max(26, green_duration + 6)
        }
    
    def _get_busiest_intersection(self, traffic_data: Dict) -> str:
        """Identify the busiest intersection"""
        max_count = 0
        busiest = "Main St & 1st Ave"
        
        for intersection in traffic_data['intersections'].values():
            if intersection['traffic_count'] > max_count:
                max_count = intersection['traffic_count']
                busiest = intersection['name']
        
        return busiest
    
    def _generate_historical_data(self) -> List[Dict]:
        """Generate simulated historical traffic data"""
        historical = []
        
        for i in range(24):  # 24 hours of data
            hour_data = {
                'hour': f"{i:02d}:00",
                'total_vehicles': random.randint(50, 200),
                'average_speed': round(random.uniform(20, 50), 1),
                'efficiency': random.randint(80, 98),
                'incidents': random.randint(0, 2)
            }
            historical.append(hour_data)
        
        return historical
    
    def get_model_info(self) -> Dict:
        """Get AI model information and performance metrics"""
        return {
            'model_version': self.model_version,
            'performance_metrics': self.performance_metrics,
            'capabilities': [
                'Real-time traffic optimization',
                'Predictive analytics',
                'Emergency vehicle preemption',
                'Congestion prediction',
                'Environmental impact analysis',
                'Anomaly detection'
            ],
            'last_updated': datetime.datetime.now().isoformat()
        }