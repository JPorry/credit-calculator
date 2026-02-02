import React, { useState } from 'react';
import './InputGroup.css';

export default function InputGroup({ label, value, onChange, prefix = '$', suffix = '', min, max, step = 1, type = 'number', description }) {
  const [showInfo, setShowInfo] = useState(false);

  const handleSliderChange = (e) => {
    onChange(parseFloat(e.target.value));
  };
  
  const handleInputChange = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      onChange(val);
    } else {
        onChange(0);
    }
  };

  const toggleInfo = () => {
      setShowInfo(!showInfo);
  };

  return (
    <div className="input-group">
      <div className="label-row" onClick={description ? toggleInfo : undefined} style={{cursor: description ? 'pointer' : 'default'}}>
        <label className="label-text">
            {label}
            {description && (
                <span className="info-icon">i</span>
            )}
        </label>
        <div className="value-display">
            {prefix}{value.toLocaleString()}{suffix}
        </div>
      </div>
      
      {showInfo && description && (
          <div className="info-popup">
              <div className="info-content">
                  <p>{description}</p>
                  <button className="close-btn" onClick={toggleInfo}>Got it</button>
              </div>
          </div>
      )}

      <div className="input-row">
        <input 
            type="range" 
            min={min} 
            max={max} 
            step={step} 
            value={value} 
            onChange={handleSliderChange}
            className="slider"
        />
        <input
            type="number"
            value={value}
            onChange={handleInputChange}
            className="number-input"
        />
      </div>
    </div>
  );
}
