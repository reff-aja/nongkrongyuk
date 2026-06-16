import React, { useState, useEffect } from 'react';
import './App.css';
import Beranda from './beranda';
import DetailCafe from './detail';
import Simpan from './simpan';
import Profil from './profil';
import Peta from './peta'

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

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('beranda'); 
  const [selectedCafeId, setSelectedCafeId] = useState(null);
  const [savedCafes, setSavedCafes] = useState([]);
  
  // STATE BAHARU: Untuk mengawal Toast Notification
  const [toastMessage, setToastMessage] = useState(null);
  const [isToastHiding, setIsToastHiding] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Fungsi Pembantu: Paparkan Toast
  const showToast = (message) => {
    setIsToastHiding(false); // Pastikan animasi masuk
    setToastMessage(message);
    
    // Sembunyikan secara automatik selepas 2.5 saat
    setTimeout(() => {
      setIsToastHiding(true); // Mulakan animasi keluar
      setTimeout(() => {
        setToastMessage(null); // Padam sepenuhnya dari skrin selepas animasi tamat
      }, 300); // 300ms sesuai dengan masa animasi di CSS
    }, 2500); 
  };

  const handleToggleSave = (id, e) => {
    e.stopPropagation(); 
    setSavedCafes((prev) => {
      if (prev.includes(id)) {
        showToast("Dibuang dari halaman simpan"); // Tunjuk Toast bila buang
        return prev.filter(cafeId => cafeId !== id); 
      } else {
        showToast("Berhasil disimpan!"); // Tunjuk Toast bila tambah
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
      {/* Komponen Toast Papar Di Sini */}
      {toastMessage && (
        <div className={`toast-container ${isToastHiding ? 'hiding' : ''}`}>
          <span>{toastMessage}</span>
        </div>
      )}

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

      {/* --- TAMBAHKAN BLOK PROFIL INI --- */}
      {currentPage === 'profil' && (
        <Profil 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          onNavigate={navigateTo}
          savedCount={savedCafes.length} 
        />
      )}
    </div>
  );
}