import React from 'react';

export default function Peta({ isDarkMode, setIsDarkMode, onNavigate }) {
  return (
    <div className="map-page animate-fade-in">
      <header>
        <div className="header-content">
          <div className="header-top">
            <div className="header-brand">
              <h1 className="title">Peta Lokasi Cafe 🗺️</h1>
              <span className="location">Cari spot terdekat dari posisimu</span>
            </div>
            <div className="header-actions">
              <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? '🌙' : '☀️'}
              </button>
              
              {/* PASTI SUDAH LOGIN: Langsung tampilkan foto profil bulat */}
              <button className="profile-menu" onClick={() => onNavigate('profil')}>
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                  alt="Foto Profil" 
                  className="profile-img" 
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* AREA GOOGLE MAPS */}
      <main className="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15852.923893815043!2d106.7441584!3d-6.6182143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5950d890d7b%3A0x401576d14ebd120!2sCiomas%2C%20Bogor%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Peta Ciomas"
        ></iframe>
      </main>

      {/* BOTTOM BAR DASHBOARD VIP (Selalu Tampil 4 Menu) */}
      <nav className="bottom-bar">
        <div className="nav-item" onClick={() => onNavigate('beranda')}>
          <span className="nav-icon">🏠</span><span>Beranda</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate('peta')} style={{ color: 'var(--text-main)' }}>
          <span className="nav-icon">🗺️</span><span>Peta</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate('simpan')}>
          <span className="nav-icon">🔖</span><span>Simpan</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate('profil')}>
          <span className="nav-icon">👤</span><span>Profil</span>
        </div>
      </nav>
    </div>
  );
}