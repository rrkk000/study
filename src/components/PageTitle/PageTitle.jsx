import React from 'react';
import './PageTitle.css';

export default function PageTitle({ title }) {
  return (
    <div className="page-title">
      <h1 className="page-title__heading">{title}</h1>
    </div>
  );
}