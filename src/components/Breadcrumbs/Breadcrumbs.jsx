import React from 'react';
import './Breadcrumbs.css';

export default function Breadcrumbs({ path = [], current = '' }) {
  return (
    <div className="breadcrumbs">
      <nav className="breadcrumbs__nav">
        {path.map((item, index) => (
          <span key={index}>
            <span className="breadcrumbs__item">{item}</span>
            <span className="breadcrumbs__separator">/</span>
          </span>
        ))}
        <span className="breadcrumbs__current">{current}</span>
      </nav>
    </div>
  );
}