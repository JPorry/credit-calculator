import React, { useState, useRef } from 'react';
import './InputGroup.css';

export default function InputGroup({ label, value, onChange, prefix = '$', suffix = '', min, max, step = 1, type = 'number', description }) {
  const [showInfo, setShowInfo] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    // specific handling to avoid NaN on empty input
    const textVal = e.target.value;
    if (textVal === '') {
        // Handle empty string as needed, maybe pass 0 or keep internal state? 
        // For now, let's pass 0 to keep the calculator working, 
        // essentially treating empty as 0.
        // A better approach for "controlled" inputs is often to separate the display value from the number value,
        // but for this MVP, treating empty as 0 is safest for the math formulas.
        onChange(0);
        return;
    }
    
    const val = parseFloat(textVal);
    if (!isNaN(val)) {
      onChange(val);
    }
  };
  
  const handleFocus = (e) => {
      e.target.select();
  };
  
  const handleContainerClick = () => {
    if (inputRef.current) {
        inputRef.current.focus();
    }
  };

  const toggleInfo = (e) => {
      e.stopPropagation(); // Prevent focusing input when clicking info
      setShowInfo(!showInfo);
  };

  return (
    <div className="input-group" onClick={handleContainerClick}>
        <div className="input-header">
            <label className="label-text">
                {label}
            </label>
            {description && (
                <div className="info-icon" onClick={toggleInfo}>i</div>
            )}
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
        {prefix && <span className="prefix">{prefix}</span>}
        <input
            ref={inputRef}
            type="number"
            inputMode="decimal" 
            pattern="[0-9]*"
            value={value === 0 ? '' : value} /* Display empty if 0 for easier typing? Or stick to value. Let's stick to value but select on focus */
            onChange={handleInputChange}
            onFocus={handleFocus}
            className="big-input"
            placeholder="0"
        />
        {suffix && <span className="suffix">{suffix}</span>}
      </div>
    </div>
  );
}
