// src/components/Toast.jsx
import React from 'react';

export default function Toast({ message, isHiding }) {
  // Kalau tidak ada pesan, jangan tampilkan apa-apa (null)
  if (!message) return null;

  return (
    <div className={`toast-container ${isHiding ? 'hiding' : ''}`}>
      <span>{message}</span>
    </div>
  );
}