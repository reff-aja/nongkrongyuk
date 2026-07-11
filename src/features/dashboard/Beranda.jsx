import React, { useState } from 'react';
// 🚀 IMPORT IKON SOLID DARI REACT-ICONS
import { FaHeart, FaSun, FaMoon } from 'react-icons/fa';

const CafeCard = ({ cafe, onClick, isSaved, onToggleSave }) => {
  return (
    <div className="cafe-card" onClick={() => onClick(cafe.id)} style={{ cursor: 'pointer' }}>
      <div className="card-image-container">
        <img src={cafe.image} alt={cafe.name} className="card-image" />
        <button 
          className="btn-love" 
          onClick={(e) => onToggleSave(cafe.id, e)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <FaHeart style={{ color: isSaved ? '#FF5252' : '#ccc', transition: '0.3s', fontSize: '18px' }} />
        </button>
      </div>
      <div className="card-content">
        <h3 className="card-title">{cafe.name}</h3>
        <p className="card-info">
          {cafe.shortInfo || cafe.info || "⭐️ 0.0 | No Info"}
        </p>
      </div>
    </div>
  );
};

export default function Beranda({ isDarkMode, setIsDarkMode, cafeData, savedCafes, onCafeClick, onToggleSave, onNavigate, currentUser }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCafes = cafeData.filter((cafe) => {
    return cafe.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '30px' }}>
      <header>
        <div className="header-content">
          <div className="header-top">
            <div className="header-brand">
              <h1 className="title" onClick={() => onNavigate('beranda')} style={{ cursor: 'pointer' }}>
                Temukan Cafe
              </h1>
              <span className="subtitle">Pilihan cafe terbaik untuk tempat nongkrongmu</span>
            </div>
            
            {/* 🚀 REVISI: HEADER ACTIONS DENGAN TOMBOL TEMA PINTAR & AVATAR */}
            <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px' }}
              >
                {isDarkMode ? (
                  <FaSun style={{ color: '#ffb900', transition: '0.3s' }} />
                ) : (
                  <FaMoon style={{ color: '#667eea', transition: '0.3s' }} />
                )}
              </button>
              
              <button className="profile-menu" onClick={() => onNavigate('profil')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                <img 
                  src={currentUser?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                  alt="Avatar" 
                  className="avatar-header" 
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #0084ff' }} 
                />
              </button>
            </div>
          </div>
          
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Cari nama cafe..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="container">
        {filteredCafes.length > 0 ? (
          filteredCafes.map((cafe) => (
            <CafeCard 
              key={cafe.id} 
              cafe={cafe} 
              onClick={onCafeClick} 
              isSaved={savedCafes.includes(cafe.id)}
              onToggleSave={onToggleSave}
            />
          ))
        ) : (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px 20px', opacity: 0.7 }}>
            <p>Cafe yang kamu cari tidak ditemukan... ☕</p>
          </div>
        )}
      </main>
    </div>
  );
}