import React from 'react';
import '../../styles/TrafficLight.css';

const TrafficLight = ({ direction, activeLight, size = 'medium', animated = false }) => {
  return (
    <div className={`traffic-light ${size} ${animated ? 'animated' : ''}`}>
      <div className="traffic-light-container">
        <div className={`traffic-light-bulb red ${activeLight === 'red' ? 'active' : ''}`} />
        <div className={`traffic-light-bulb yellow ${activeLight === 'yellow' ? 'active' : ''}`} />
        <div className={`traffic-light-bulb green ${activeLight === 'green' ? 'active' : ''}`} />
      </div>
      {direction && (
        <div className="traffic-light-label">
          {direction}
        </div>
      )}
    </div>
  );
};

export default TrafficLight;