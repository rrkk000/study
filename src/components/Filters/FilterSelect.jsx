import React from 'react';
import './Filters.css';

export default function FilterSelect({ label, options, value, onChange }) {
  return (
    <div className="filter-select">
      <label className="filter-select__label">{label}</label>
      <select
        className="filter-select__select"
        value={value}
        onChange={onChange}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}