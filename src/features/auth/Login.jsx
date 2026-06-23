// src/features/auth/Login.jsx
import React, { useState } from 'react';
// 👇 1. Import fungsi Login dari Firebase library
import { signInWithEmailAndPassword } from 'firebase/auth';
// 👇 2. Import jembatan 'auth' yang ada di folder config
import { auth } from '../../config/firebase'; 

export default function Login({ onLoginSuccess, onSwitchMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Untuk efek loading saat tombol diklik

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi dasar
    if (!email || !password) {
      alert('Harap isi semua kolom!');
      return;
    }

    setLoading(true); // Aktifkan loading

    try {
      // 🚀 3. Kirim data login ke Firebase
      await signInWithEmailAndPassword(auth, email, password);
      
      // 🎉 4. Jika sukses, jalankan fungsi sukses login bawaan App.jsx
      onLoginSuccess(); 
    } catch (error) {
      // 🛑 5. Tangkap error jika login gagal
      console.error(error.code);
      
      // Terjemahkan error Firebase ke bahasa santai
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        alert('Email atau password salah, bro! Cek lagi deh.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Format email kamu salah, coba dicek lagi.');
      } else {
        alert('Waduh, gagal masuk: ' + error.message);
      }
    } finally {
      setLoading(false); // Matikan loading
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-fade-in">
        <div className="auth-header">
          <h2>Nongkrongyuk ✨</h2>
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
              disabled={loading}
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
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="btn-auth-submit" disabled={loading}>
            {loading ? 'Memverifikasi... ⏳' : 'Masuk Sekarang 🚪'}
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