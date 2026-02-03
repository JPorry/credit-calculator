import React, { useState, useRef, useEffect } from 'react';
import './InputGroup.css';

export default function InputGroup({ label, value, onChange, prefix = '$', suffix = '', min, max, step = 1, type = 'number', description }) {
  const [showInfo, setShowInfo] = useState(false);
  // Internal state for the input string to handle formatting (e.g. "1,000")
  const [displayValue, setDisplayValue] = useState('');
  const inputRef = useRef(null);

  // Formatting helpers
  const formatNumber = (num) => {
    if (num === null || num === undefined || isNaN(num)) return '';
    // Convert to string and split by decimal to handle integer part commas
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  const removeCommas = (str) => {
    return str.replace(/,/g, '');
  };

  // Sync internal state with prop value when prop changes externally
  // We compare the numeric values to avoid overriding user typing state e.g. "10."
  useEffect(() => {
    const numericInternal = parseFloat(removeCommas(displayValue));
    // If the prop value is different from our current internal numeric value, update internal
    // This happens on initial load or if parent changes it (e.g. calculation reset)
    if (value !== numericInternal) {
      if (value === 0 && (!displayValue || displayValue === '0')) {
          setDisplayValue(''); // Keep clean for empty start
      } else {
        setDisplayValue(formatNumber(value));
      }
    }
  }, [value]); // Only depend on value

  const handleInputChange = (e) => {
    const rawVal = e.target.value;
    
    // Allow digits, commas, and one decimal point
    if (!/^[0-9,]*\.?[0-9]*$/.test(rawVal)) {
        return;
    }

    const cleanVal = removeCommas(rawVal);
    
    // Update internal display state appropriately
    // We want to format the integer part, but leave trailing dots/zeros alone so user can type
    const parts = cleanVal.split('.');
    const formattedInt = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    let newDisplayVal = formattedInt;
    if (parts.length > 1) {
        newDisplayVal += '.' + parts[1];
    } else if (rawVal.endsWith('.')) {
        newDisplayVal += '.';
    }

    setDisplayValue(newDisplayVal);

    // Pass numeric value to parent
    if (cleanVal === '' || cleanVal === '.') {
        onChange(0);
    } else {
        const numVal = parseFloat(cleanVal);
        if (!isNaN(numVal)) {
            onChange(numVal);
        }
    }
  };
  
  const handleBlur = () => {
      // On blur, enforce strict formatting of the current numeric value
      if (value !== 0 || displayValue !== '') {
          setDisplayValue(formatNumber(value));
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
            type="text" 
            inputMode="decimal" 
            value={displayValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className="big-input"
            placeholder="0"
            autoComplete="off"
        />
        {suffix && <span className="suffix">{suffix}</span>}
      </div>
    </div>
  );
}
