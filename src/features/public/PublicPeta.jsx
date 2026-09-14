import React from 'react';
import CafeMap from '../../component/CafeMap';

export default function PublicPeta({ isDarkMode, setIsDarkMode, onNavigate, cafeData }) {
  return (
    <div className="map-page animate-fade-in">
      <header>
        <div className="header-content">
          <div className="header-top">
            <div className="header-brand">
              <h1 className="title">Peta Lokasi Cafe 🗺️</h1>
              <span className="location">Lihat persebaran cafe hits Bogor</span>
            </div>
            <div className="header-actions">
              <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? '🌙' : '☀️'}
              </button>
              
              {/* BELUM LOGIN: Tampilkan tombol Masuk */}
              <button className="btn-login-header" onClick={() => onNavigate('auth')}>
                Masuk 🚪
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* AREA GOOGLE MAPS */}
      <main className="map-container">
        <CafeMap cafeData={cafeData} />
      </main>
    </div>
  );
}