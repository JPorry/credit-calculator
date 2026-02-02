import React from 'react';
import './InputGroup.css';

export default function InputGroup({ label, value, onChange, prefix = '$', suffix = '', min, max, step = 1, type = 'number' }) {
  
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

  return (
    <div className="input-group">
      <div className="label-row">
        <label>{label}</label>
        <div className="value-display">
            {prefix}{value.toLocaleString()}{suffix}
        </div>
      </div>
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
        {/* Hidden or small input for precise editing could go here, but focusing on mobile slider first 
            Actually, let's allow direct entry too.
        */}
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
