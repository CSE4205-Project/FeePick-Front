import React, { useState } from 'react';
import './CheckBox.css';

function CheckBox({ label, defaultChecked = true, onChange }) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <label className={`checkbox ${isChecked ? 'checked' : ''}`}>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      <span className="checkmark"></span>
      {label}
    </label>
  );
}

export default CheckBox;




