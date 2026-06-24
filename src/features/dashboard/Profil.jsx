// src/features/dashboard/Profil.jsx
import React from 'react';
import { auth } from '../../config/firebase';

export default function Profil({ isDarkMode, setIsDarkMode, onNavigate, savedCount, reviewCount, onLogout }) {
  const currentUser = auth.currentUser; // Mengambil data user aktif

  return (
    <div className="profile-page anonymity animate-fade-in" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ marginBottom: '30px' }}>
        <h2>Profil Saya 👤</h2>
      </header>

      <main style={{ textAlign: 'center' }}>
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
          alt="Avatar" 
          style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #0084ff' }}
        />
        
        {/* Menampilkan Nama Asli yang didaftarkan ke Firebase */}
        <h2 style={{ marginTop: '15px' }}>{currentUser?.displayName || 'User Kece'}</h2>
        <p style={{ opacity: 0.7, marginTop: '-5px' }}>{currentUser?.email}</p>

        {/* 📊 KARTU STATISTIK REAL-TIME */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', margin: '30px 0' }}>
          <div style={{ padding: '15px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <h3 style={{ margin: 0, fontSize: '24px', color: '#FF5252' }}>{savedCount}</h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.8 }}>Disimpan 🔖</p>
          </div>
          <div style={{ padding: '15px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
            {/* 🌟 Angka Ulasan Real-time */}
            <h3 style={{ margin: 0, fontSize: '24px', color: '#0084ff' }}>{reviewCount}</h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.8 }}>Ulasan Ditulis 💬</p>
          </div>
        </div>

        {/* PENGATURAN TEMA & LOGOUT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #ccc', fontWeight: 'bold' }}
          >
            Mode {isDarkMode ? '☀️ Terang' : '🌙 Gelap'}
          </button>
          <button 
            onClick={onLogout} 
            style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#FF5252', color: 'white', border: 'none', fontWeight: 'bold' }}
          >
            Keluar Akun 🚪
          </button>
        </div>
      </main>

      {/* BOTTOM BAR DASHBOARD VIP */}
      <nav className="bottom-bar">
        <div className="nav-item" onClick={() => onNavigate('beranda')}>
          <span className="nav-icon">🏠</span><span>Beranda</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate('peta')}>
          <span className="nav-icon">🗺️</span><span>Peta</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate('simpan')}>
          <span className="nav-icon">🔖</span><span>Simpan</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate('profil')} style={{ color: 'var(--text-main)' }}>
          <span className="nav-icon">👤</span><span>Profil</span>
        </div>
      </nav>
    </div>
  );
}