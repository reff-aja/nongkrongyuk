import React from 'react';

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
        <p className="card-info">{cafe.info}</p>
      </div>
    </div>
  );
};

export default function Simpan({ isDarkMode, setIsDarkMode, cafeData, savedCafes, onCafeClick, onToggleSave, onNavigate }) {
  
  // Tapis hanya data kafe yang ada dalam senarai savedCafes
  const savedCafeData = cafeData.filter(cafe => savedCafes.includes(cafe.id));

  return (
    <div className="animate-fade-in">
      <header>
        <div className="header-content">
          <div className="header-top">
            <div className="header-brand">
              <h1 className="title">Disimpan 🔖</h1>
              <span className="location">Koleksi Tempat Favoritmu</span>
            </div>
            <div className="header-actions">
              <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? '🌙' : '☀️'}
              </button>
              <button className="profile-menu">🧑‍💻</button>
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
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '60px 20px', opacity: 0.8 }}>
            <span style={{ fontSize: '3rem' }}>📭</span>
            <h3 style={{ marginTop: '15px' }}>Belum ada yang disimpan</h3>
            <p>Klik ikon love 🤍 di Beranda untuk menyimpan tempat nongkrong favoritmu.</p>
          </div>
        )}
      </main>

      {/* BOTTOM BAR */}
      <nav className="bottom-bar">
        <div className="nav-item" onClick={() => onNavigate('beranda')}>
          <span className="nav-icon">🏠</span>
          <span>Beranda</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">🗺️</span>
          <span>Peta</span>
        </div>
        <div className="nav-item" onClick={() => onNavigate('simpan')} style={{ color: 'var(--text-main)' }}>
          <span className="nav-icon">🔖</span>
          <span>Simpan</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">👤</span>
          <span>Profil</span>
        </div>
      </nav>
    </div>
  );
}