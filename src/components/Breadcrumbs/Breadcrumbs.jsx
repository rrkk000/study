import React from 'react';
import './Breadcrumbs.css';

export default function Breadcrumbs({ path = [], current = '' }) {
  return (
    <div className="breadcrumbs">
      <nav>
        {path.map((item, index) => (
          <span key={index}>
            <span className="breadcrumb-item">{item}</span>
            <span className="breadcrumb-separator"> / </span>
          </span>
        ))}
        <span className="breadcrumb-current">{current}</span>
      </nav>
    </div>
  );
}