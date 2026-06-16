import React from 'react';

export default function Profil({ isDarkMode, setIsDarkMode, onNavigate, savedCount }) {
  return (
    <div className="animate-fade-in profile-page">
      {/* Header Profil dengan posisi relative agar tombol back bisa menempel di pojok kiri atas */}
      <div className="profile-header-large" style={{ position: 'relative' }}>
        
        {/* Tombol Kembali ke Beranda (Penyelamat user laptop/desktop) */}
        <button 
          className="btn-back" 
          onClick={() => onNavigate('beranda')}
          style={{ position: 'absolute', top: '20px', left: '20px' }}
        >
          ⬅️ Beranda
        </button>

        {/* Bingkai Foto Profil Bulat Besar */}
        <div className="avatar-large">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" 
            alt="Foto Profil Besar" 
            className="profile-img-large" 
          />
        </div>
        
        {/* Nama dan info user yang sempat hilang */}
        <h2 className="profile-name">Si Paling WFC</h2>
        <p className="profile-email">nongkrong.teruss@gmail.com</p>
      </div>

      <div className="profile-content">
        {/* Statistik Dummy */}
        <div className="profile-stats">
          <div className="stat-box" onClick={() => onNavigate('simpan')}>
            <h3>{savedCount}</h3>
            <p>Disimpan</p>
          </div>
          <div className="stat-box">
            <h3>12</h3>
            <p>Ulasan</p>
          </div>
          <div className="stat-box">
            <h3>Level 3</h3>
            <p>Member</p>
          </div>
        </div>

        {/* Menu Pengaturan */}
        <div className="settings-container">
          <h3 className="settings-title">Pengaturan Aplikasi</h3>
          
          <div className="setting-item" onClick={() => setIsDarkMode(!isDarkMode)}>
            <div className="setting-info">
              <span className="setting-icon">{isDarkMode ? '🌙' : '☀️'}</span>
              <span>Tema Gelap (Dark Mode)</span>
            </div>
            <span className="setting-status">{isDarkMode ? 'Aktif' : 'Mati'}</span>
          </div>

          <div className="setting-item" onClick={() => alert('Fitur Edit Profil segera hadir!')}>
            <div className="setting-info">
              <span className="setting-icon">✏️</span>
              <span>Edit Profil</span>
            </div>
            <span className="setting-arrow">➡️</span>
          </div>

          <div className="setting-item" onClick={() => alert('Fitur Bantuan segera hadir!')}>
            <div className="setting-info">
              <span className="setting-icon">❓</span>
              <span>Pusat Bantuan</span>
            </div>
            <span className="setting-arrow">➡️</span>
          </div>

          <div className="setting-item logout-item" onClick={() => alert('Kamu berhasil Logout (Boongan) 👋')}>
            <div className="setting-info">
              <span className="setting-icon">🚪</span>
              <span>Keluar Akun</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}