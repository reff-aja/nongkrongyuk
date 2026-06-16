import React, { useState, useEffect } from 'react';
import './App.css';
import Beranda from './beranda';
import DetailCafe from './detail';
import Simpan from './simpan';
import Profil from './profil';
import Peta from './peta';

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
  },
  {
    id: 3,
    name: "Titik Kumpul 🌿",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80",
    info: "⭐️ 4.9 | 🚗 5.0 km | 💰 Rp 25k - 60k",
    address: "Jl. Sukabumi Raya No.88, Bogor",
    mapsLink: "https://maps.google.com",
    description: "Konsep semi-outdoor dengan pepohonan hijau di sekelilingnya. Vibes alamnya dapet banget.",
    reviews: [{ user: "Bagas", rating: 5, comment: "Cocok buat healing akhir pekan." }]
  },
  {
    id: 4,
    name: "Ruang Seduh 📖",
    image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=600&q=80",
    info: "⭐️ 4.6 | 🚗 2.1 km | 💰 Rp 18k - 40k",
    address: "Jl. Baru No.10, Bogor Barat",
    mapsLink: "https://maps.google.com",
    description: "Cafe bertema perpustakaan mini yang sangat hening. Menyediakan banyak buku bacaan seru.",
    reviews: [{ user: "Dina", rating: 4, comment: "Nugas di sini auto kelar tanpa gangguan." }]
  }
];

// KOMPONEN SIDEBAR KHUSUS DESKTOP
const Sidebar = ({ currentPage, onNavigate }) => {
  return (
    <aside className="sidebar-desktop">
      <div className="sidebar-brand">
        <h2>Nongkrongyuk</h2>
      </div>
      <nav className="sidebar-menu">
        <div 
          className={`sidebar-item ${currentPage === 'beranda' ? 'active' : ''}`} 
          onClick={() => onNavigate('beranda')}
        >
          <span className="sidebar-icon">🏠</span>
          <span>Beranda</span>
        </div>
        <div 
          className={`sidebar-item ${currentPage === 'peta' ? 'active' : ''}`} 
          onClick={() => onNavigate('peta')}
        >
          <span className="sidebar-icon">🗺️</span>
          <span>Peta Lokasi</span>
        </div>
        <div 
          className={`sidebar-item ${currentPage === 'simpan' ? 'active' : ''}`} 
          onClick={() => onNavigate('simpan')}
        >
          <span className="sidebar-icon">🔖</span>
          <span>Disimpan</span>
        </div>
        <div 
          className={`sidebar-item ${currentPage === 'profil' ? 'active' : ''}`} 
          onClick={() => onNavigate('profil')}
        >
          <span className="sidebar-icon">👤</span>
          <span>Profil Saya</span>
        </div>
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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const showToast = (message) => {
    setIsToastHiding(false);
    setToastMessage(message);
    setTimeout(() => {
      setIsToastHiding(true);
      setTimeout(() => {
        setToastMessage(null);
      }, 300);
    }, 2500); 
  };

  const handleToggleSave = (id, e) => {
    e.stopPropagation(); 
    setSavedCafes((prev) => {
      if (prev.includes(id)) {
        showToast("Dibuang dari senarai Simpan 🗑️");
        return prev.filter(cafeId => cafeId !== id); 
      } else {
        showToast("Berjaya disimpan! ❤️");
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

  const activeCafe = CAFE_DATA.find(cafe => cafe.id === selectedCafeId);

  return (
    <div className="app-container">
      {toastMessage && (
        <div className={`toast-container ${isToastHiding ? 'hiding' : ''}`}>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* STRUKTUR TATA LETAK UTAMA */}
      <div className="main-layout">
        {/* Sidebar dipasang di sini, CSS yang akan mengatur persembunyiannya di HP */}
        <Sidebar currentPage={currentPage} onNavigate={navigateTo} />

        {/* Konten Halaman Aktif */}
        <div className="page-content-wrapper">
          {currentPage === 'beranda' && (
            <Beranda 
              isDarkMode={isDarkMode} 
              setIsDarkMode={setIsDarkMode} 
              cafeData={CAFE_DATA}
              savedCafes={savedCafes}
              onCafeClick={handleNavigateToDetail}
              onToggleSave={handleToggleSave}
              onNavigate={navigateTo}
            />
          )}
          
          {currentPage === 'detail' && (
            <DetailCafe 
              cafe={activeCafe} 
              onBack={() => navigateTo('beranda')} 
            />
          )}

          {currentPage === 'simpan' && (
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
            <Peta 
              isDarkMode={isDarkMode} 
              setIsDarkMode={setIsDarkMode} 
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'profil' && (
            <Profil 
              isDarkMode={isDarkMode} 
              setIsDarkMode={setIsDarkMode} 
              onNavigate={navigateTo}
              savedCount={savedCafes.length} 
            />
          )}
        </div>
      </div>
    </div>
  );
}