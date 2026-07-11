import React from 'react';
// 🚀 IMPORT IKON SOLID DARI REACT-ICONS
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Peta({ isDarkMode, setIsDarkMode, onNavigate, currentUser }) {
  
  return (
    <div className="map-page anonymity animate-fade-in">
      
      {/* 📋 TOP BAR / HEADER */}
      <header style={{ padding: '10px 20px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <div className="header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="header-brand">
            <h1 className="title" style={{ margin: 0, fontSize: '24px' }}>Peta Lokasi</h1>
            <span className="location" style={{ opacity: 0.7, fontSize: '14px' }}>
              Jelajahi Cafe Terdekat
            </span>
          </div>
          
          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* 🚀 TOMBOL TEMA MENGGUNAKAN IKON FaSun / FaMoon */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isDarkMode ? (
                <FaSun style={{ color: '#ffb900' }} />
              ) : (
                <FaMoon style={{ color: '#667eea' }} />
              )}
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

      {/* 🗺️ AREA PETA GOOGLE MAPS */}
      <main className="map-container" style={{ height: 'calc(100vh - 140px)', width: '100%', position: 'relative' }}>
        <iframe 
          src="https://maps.google.com/maps?q=Bogor&t=&z=13&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Bogor"
        ></iframe>
      </main>

      {/* 🚀 BERSIH: Bottom bar lama di file ini sudah dihapus total! */}
    </div>
  );
}