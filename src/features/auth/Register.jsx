// src/features/auth/Register.jsx
import React, { useState } from 'react';
// 👇 1. Import fungsi Autentikasi dari Firebase library
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// 👇 2. Import jembatan 'auth' yang sudah kita buat di folder config
import { auth } from '../../config/firebase'; 

export default function Register({ onSwitchMode }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Untuk efek loading saat mendaftar

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi dasar
    if (!fullName || !email || !password) {
      alert('Harap isi semua kolom!');
      return;
    }

    setLoading(true); // Aktifkan loading

    try {
      // 🚀 3. Daftarkan email dan password ke Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 📝 4. Simpan Nama Lengkap ke dalam Profil Firebase user tersebut
      await updateProfile(userCredential.user, {
        displayName: fullName
      });

      alert('Akun berhasil dibuat! Silakan masuk 🎉');
      onSwitchMode(); // Pindahkan otomatis ke halaman login setelah sukses
    } catch (error) {
      // 🛑 5. Tangkap error jika pendaftaran gagal
      console.error(error.code);
      
      // Terjemahkan error Firebase ke bahasa yang mudah dipahami user
      if (error.code === 'auth/email-already-in-use') {
        alert('Email ini sudah terdaftar, bro! Silakan pakai email lain atau langsung login.');
      } else if (error.code === 'auth/weak-password') {
        alert('Password terlalu lemah! Minimal 6 karakter ya.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Format email salah! Cek lagi penulisan emailmu.');
      } else {
        alert('Waduh, terjadi kesalahan: ' + error.message);
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
              disabled={loading}
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
            {loading ? 'Sedang Mendaftar... ⏳' : 'Daftar Akun 📝'}
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