import React, { useState } from 'react';

export default function Login({ onLoginSuccess, onSwitchMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika simulasi Login berhasil
    if (email && password) {
      onLoginSuccess();
    } else {
      alert('Harap isi semua kolom!');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-fade-in">
        <div className="auth-header">
          <h2>Nongkrongyuk</h2>
          <p>Masuk untuk cari cafe asikmu</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="contoh@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-auth-submit">
            Masuk Sekarang 🚪
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Belum punya akun?{' '}
            <span onClick={onSwitchMode} className="auth-toggle-link">
              Daftar di sini
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}