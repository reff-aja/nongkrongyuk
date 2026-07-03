import React, { useState } from 'react';

const CafeCard = ({ cafe, onCardClick, onLoveClick }) => {
  return (
    <div className="cafe-card" onClick={onCardClick} style={{ cursor: 'pointer' }}>
      <div className="card-image-container">
        <img src={cafe.image} alt={cafe.name} className="card-image" />
        <button className="btn-love" onClick={onLoveClick}>
          🤍
        </button>
      </div>
      <div className="card-content">
        <h3 className="card-title">{cafe.name}</h3>
        <p className="card-info">{cafe.info}</p>
      </div>
    </div>
  );
};

export default function LandingPage({ isDarkMode, setIsDarkMode, cafeData, onNavigate, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCafes = cafeData.filter((cafe) => {
    return cafe.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // REVISI 1: Saat klik tombol love, muncul notif suruh login
  const handleLoveClick = (e) => {
    e.stopPropagation(); // Mencegah kartu ikut keklik
    showToast("mau save? login dulu yuk");
  };

  // REVISI 2: Saat klik kartu cafe (untuk lihat detail/map), muncul notif suruh login
  const handleCardClick = () => {
    showToast("mau liat cafenya? login dulu yuk");
  };

  return (
    <div className="animate-fade-in">
      <header>
        <div className="header-content">
          <div className="header-top">
            <div className="header-brand">
              <h1 className="title">Mau nongkrong di mana hari ini?</h1>
            </div>
            <div className="header-actions">
              <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? '🌙' : '☀️'}
              </button>
              <button className="btn-login-header" onClick={() => onNavigate('auth')}>
                Masuk 🚪
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
              onCardClick={handleCardClick} 
              onLoveClick={handleLoveClick}
            />
          ))
        ) : (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px 20px', opacity: 0.8 }}>
            <h3>Yah, cafenya belum ketemu 🥲</h3>
          </div>
        )}
      </main>
    </div>
  );
}