import React from 'react';

export default function Peta({ isDarkMode, setIsDarkMode, onNavigate, currentUser }) {
  
  return (
    <div className="map-page anonymity animate-fade-in">
      
      {/* 📋 TOP BAR / HEADER */}
      <header style={{ padding: '10px 20px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <div className="header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="header-brand">
            <h1 className="title" style={{ margin: 0, fontSize: '24px' }}>Peta Lokasi 🗺️</h1>
            <span className="location" style={{ opacity: 0.7, fontSize: '14px' }}>
              Jelajahi Cafe Terdekat
            </span>
          </div>
          
          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <img 
              src={currentUser?.photoURL || "https://placehold.co/150"} 
              alt="Avatar" 
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #0084ff', cursor: 'pointer' }}
              onClick={() => onNavigate('profil')}
            />
          </div>
        </div>
      </header>

      {/* 🗺️ AREA PETA GOOGLE MAPS (PALING AMAN) */}
      <main className="map-container" style={{ height: 'calc(100vh - 140px)', width: '100%', position: 'relative' }}>
        <iframe 
          // Link embed Google Maps ini akan otomatis menampilkan area Bogor
          src="https://maps.google.com/maps?q=Bogor&t=&z=13&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        ></iframe>
      </main>

      {/* 🧭 BOTTOM BAR MENU */}
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