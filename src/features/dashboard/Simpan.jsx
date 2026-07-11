import React from 'react';
// 🚀 IMPORT IKON SOLID DARI REACT-ICONS
import { FaHeart, FaFolderOpen, FaSun, FaMoon } from 'react-icons/fa';

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
          <FaHeart style={{ color: '#FF5252', fontSize: '18px' }} />
        </button>
      </div>
      <div className="card-content">
        <h3 className="card-title">{cafe.name}</h3>
        <p className="card-info">{cafe.info || cafe.shortInfo || "⭐️ 0.0 | No Info"}</p>
      </div>
    </div>
  );
};

export default function Simpan({ isDarkMode, setIsDarkMode, cafeData, savedCafes, onCafeClick, onToggleSave, onNavigate, currentUser }) {
  
  // Tapis hanya data kafe yang ada dalam senarai savedCafes
  const savedCafeData = cafeData.filter(cafe => savedCafes.includes(cafe.id));

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '30px' }}>
      <header>
        <div className="header-content">
          <div className="header-top">
            <div className="header-brand">
              <h1 className="title" onClick={() => onNavigate('beranda')} style={{ cursor: 'pointer' }}>
                Cafe Disimpan
              </h1>
              <span className="subtitle">Daftar tempat nongkrong terfavoritmu</span>
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
        </div>
      </header>

      <main className="container">
        {savedCafeData.length > 0 ? (
          savedCafeData.map((cafe) => (
            <CafeCard 
              key={cafe.id} 
              cafe={cafe} 
              onClick={onCafeClick} 
              isSaved={true}
              onToggleSave={onToggleSave}
            />
          ))
        ) : (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '60px 20px', opacity: 0.6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <FaFolderOpen style={{ fontSize: '4rem', color: '#888' }} />
            <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Belum ada cafe yang kamu simpan, nih bro.</p>
          </div>
        )}
      </main>
    </div>
  );
}