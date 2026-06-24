import React from 'react';

export default function Toast({ message, isHiding }) {
  if (!message) return null;

  return (
    <div className={`toast-container ${isHiding ? 'hiding' : ''}`}>
      <span>{message}</span>
    </div>
  );
}