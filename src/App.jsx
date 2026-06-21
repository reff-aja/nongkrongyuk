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
import { CAFE_DATA } from './data/Datacafe';
import Toast from './component/Toast';

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
        <Toast message={toastMessage} isHiding={isToastHiding} />
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