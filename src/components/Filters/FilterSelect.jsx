import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import './Filters.css';

export default function FilterSelect({ label, options, value, onChange }) {
  return (
    <div className="filter-select">
      <label>{label}</label>
      <div className="select-wrapper">
        <select value={value} onChange={onChange}>
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        <IoIosArrowDown className="select-arrow" />
      </div>
    </div>
  );
}