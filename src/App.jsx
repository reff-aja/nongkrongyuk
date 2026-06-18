import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './features/public/LandingPage'; // Import baru
import Beranda from './features/dashboard/Beranda';   // Jalur baru setelah dipindah
import Peta from './features/dashboard/Peta';         // Jalur baru setelah dipindah
import Simpan from './features/dashboard/Simpan';
import Profil from './features/dashboard/Profil';
import Auth from './features/auth/Auth';
import DetailCafe from './DetailCafe';
import PublicPeta from './features/public/PublicPeta';

const CAFE_DATA = [
  {
    id: 1,
    name: "Ngopi-yuk ☕",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
    info: "⭐️ 4.8 | 🚗 1.5 km | 💰 Rp 20k - 50k",
    address: "Jl. Raya Ciomas No.123, Bogor",
    mapsLink: "https://maps.google.com",
    description: "Tempat nongkrong super cozy dengan interior kayu yang hangat. Wi-Fi sangat stabil, banyak colokan di setiap meja.",
    reviews: [{ user: "Rian", rating: 5, comment: "Kopi susunya mantap!" }]
  },
  {
    id: 2,
    name: "Sudut Senja 🌅",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
    info: "⭐️ 4.5 | 🚗 3.2 km | 💰 Rp 15k - 35k",
    address: "Jl. Pajajaran Indah No.45, Bogor",
    mapsLink: "https://maps.google.com",
    description: "Cafe estetik dengan pemandangan langit sore yang indah. Pilihan playlist lagunya selalu asik.",
    reviews: [{ user: "Fajar", rating: 5, comment: "View senjanya dapet banget!" }]
  }
];

const Sidebar = ({ currentPage, onNavigate, isLoggedIn, onLogout }) => {
  return (
    <aside className="sidebar-desktop">
      <div className="sidebar-brand">
        <h2>Nongkrongyuk</h2>
      </div>
      <nav className="sidebar-menu">
        <div className={`sidebar-item ${currentPage === 'beranda' ? 'active' : ''}`} onClick={() => onNavigate('beranda')}>
          <span className="sidebar-icon">🏠</span><span>Beranda</span>
        </div>

        {/* MENU PETA, SIMPAN, PROFIL HANYA MUNCUL JIKA USER LOGGED IN */}
        {isLoggedIn && (
          <>
            <div className={`sidebar-item ${currentPage === 'peta' ? 'active' : ''}`} onClick={() => onNavigate('peta')}>
              <span className="sidebar-icon">🗺️</span><span>Peta Lokasi</span>
            </div>
            <div className={`sidebar-item ${currentPage === 'simpan' ? 'active' : ''}`} onClick={() => onNavigate('simpan')}>
              <span className="sidebar-icon">🔖</span><span>Disimpan</span>
            </div>
            <div className={`sidebar-item ${currentPage === 'profil' ? 'active' : ''}`} onClick={() => onNavigate('profil')}>
              <span className="sidebar-icon">👤</span><span>Profil Saya</span>
            </div>
            <div className="sidebar-item logout-item-sidebar" onClick={onLogout} style={{ marginTop: 'auto', color: '#FF5252' }}>
              <span className="sidebar-icon">🚪</span><span>Keluar Akun</span>
            </div>
          </>
        )}

        {!isLoggedIn && (
          <div className="sidebar-item login-btn-sidebar" onClick={() => onNavigate('auth')} style={{ marginTop: 'auto' }}>
            <span className="sidebar-icon">🔑</span><span>Masuk / Daftar</span>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('beranda'); 
  const [selectedCafeId, setSelectedCafeId] = useState(null);
  const [savedCafes, setSavedCafes] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [isToastHiding, setIsToastHiding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const showToast = (message) => {
    setIsToastHiding(false);
    setToastMessage(message);
    setTimeout(() => {
      setIsToastHiding(true);
      setTimeout(() => { setToastMessage(null); }, 300);
    }, 2500); 
  };

  const handleToggleSave = (id, e) => {
    e.stopPropagation(); 
    setSavedCafes((prev) => {
      if (prev.includes(id)) {
        showToast("Dibuang dari daftar Simpan 🗑️");
        return prev.filter(cafeId => cafeId !== id); 
      } else {
        showToast("Berhasil disimpan!");
        return [...prev, id]; 
      }
    });
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleNavigateToDetail = (id) => {
    setSelectedCafeId(id);
    navigateTo('detail');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigateTo('beranda');
    showToast("Kamu telah keluar akun");
  };

  const activeCafe = CAFE_DATA.find(cafe => cafe.id === selectedCafeId);

  return (
    <div className="app-container">
      {toastMessage && (
        <div className={`toast-container ${isToastHiding ? 'hiding' : ''}`}>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="main-layout">
        <Sidebar currentPage={currentPage} onNavigate={navigateTo} isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <div className="page-content-wrapper">
          {/* LOGIKA KONDISIONAL: LOGGED IN VS PUBLIC GUEST */}
          {currentPage === 'beranda' && (
            isLoggedIn ? (
              <Beranda 
                isDarkMode={isDarkMode} 
                setIsDarkMode={setIsDarkMode} 
                cafeData={CAFE_DATA}
                savedCafes={savedCafes}
                onCafeClick={handleNavigateToDetail}
                onToggleSave={handleToggleSave}
                onNavigate={navigateTo}
                isLoggedIn={isLoggedIn}
              />
            ) : (
              <LandingPage 
                isDarkMode={isDarkMode} 
                setIsDarkMode={setIsDarkMode} 
                cafeData={CAFE_DATA}
                onNavigate={navigateTo}
                showToast={showToast} // Oper fungsi toast ke LandingPage
              />
            )
          )}
          
          {currentPage === 'detail' && isLoggedIn && (
            <DetailCafe cafe={activeCafe} onBack={() => navigateTo('beranda')} />
          )}

          {currentPage === 'simpan' && isLoggedIn && (
            <Simpan 
              isDarkMode={isDarkMode} 
              setIsDarkMode={setIsDarkMode} 
              cafeData={CAFE_DATA}
              savedCafes={savedCafes}
              onCafeClick={handleNavigateToDetail}
              onToggleSave={handleToggleSave}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'peta' && (
            isLoggedIn ? (
              <Peta isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onNavigate={navigateTo} />
            ) : (
              <PublicPeta isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onNavigate={navigateTo} />
            )
          )}

          {currentPage === 'profil' && isLoggedIn && (
            <Profil 
              isDarkMode={isDarkMode} 
              setIsDarkMode={setIsDarkMode} 
              onNavigate={navigateTo}
              savedCount={savedCafes.length} 
              onLogout={handleLogout}
            />
          )}

          {currentPage === 'auth' && (
            <Auth onLoginSuccess={() => { setIsLoggedIn(true); navigateTo('beranda'); showToast("Selamat datang kembali! 🎉"); }} />
          )}
        </div>
      </div>
    </div>
  );
}