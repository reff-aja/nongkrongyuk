import React, { useState } from 'react';

const CafeCard = ({ cafe, onClick, isSaved, onToggleSave }) => {
  return (
    <div className="cafe-card" onClick={() => onClick(cafe.id)} style={{ cursor: 'pointer' }}>
      <div className="card-image-container">
        <img src={cafe.image} alt={cafe.name} className="card-image" />
        <button 
          className="btn-love" 
          onClick={(e) => onToggleSave(cafe.id, e)}
        >
          {isSaved ? '❤️' : '🤍'}
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

// Tidak perlu lagi menerima props 'isLoggedIn'
export default function Beranda({ isDarkMode, setIsDarkMode, cafeData, savedCafes, onCafeClick, onToggleSave, onNavigate, currentUser, selectedCity, setSelectedCity }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCafes = cafeData.filter((cafe) => {
    return cafe.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="animate-fade-in">
      <header>
        <div className="header-content">
          <div className="header-top">
            <div className="header-brand">
              <h1 className="title">Enaknya nongkrong dimana nih?</h1>
            </div>
            <div className="header-actions">
              <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? '🌙' : '☀️'}
              </button>
              
              {/* PASTI SUDAH LOGIN: Langsung tampilkan foto profil */}
              <button className="profile-menu" onClick={() => onNavigate('profil')}>
                <img 
                  src={currentUser?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                  alt="Avatar" 
                  className="avatar-header" // ganti sesuai nama class di css berandamu
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} // opsional biar rapi bulat berbentuk avatar
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
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px 20px', opacity: 0.8 }}>
            <h3>Yah, cafenya belum ketemu 🥲</h3>
          </div>
        )}
      </main>

      {/* BOTTOM BAR VIP: Tampilkan semua menu tanpa syarat */}
      <nav className="bottom-bar">
        <div className="nav-item" onClick={() => onNavigate('beranda')} style={{ color: 'var(--text-main)' }}>
          <span className="nav-icon">🏠</span><span>Beranda</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate('peta')}>
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