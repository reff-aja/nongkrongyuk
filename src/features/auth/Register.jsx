import React, { useState } from 'react';

export default function Register({ onSwitchMode }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika simulasi Register berhasil
    if (fullName && email && password) {
      alert('Akun berhasil dibuat! Silakan masuk.');
      onSwitchMode(); // Pindahkan otomatis ke halaman login setelah daftar
    } else {
      alert('Harap isi semua kolom!');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-fade-in">
        <div className="auth-header">
          <h2>Nongkrongyuk</h2>
          <p>Daftar akun baru kamu</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Masukkan nama lengkap" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

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
            Daftar Akun 📝
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Sudah punya akun?{' '}
            <span onClick={onSwitchMode} className="auth-toggle-link">
              Masuk di sini
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}