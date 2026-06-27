import React, { useState, useEffect } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';

// Import Komponen & Data
import LandingPage from './features/public/LandingPage';
import PublicPeta from './features/public/PublicPeta';
import Beranda from './features/dashboard/Beranda';
import Peta from './features/dashboard/Peta';
import Simpan from './features/dashboard/Simpan';
import Profil from './features/dashboard/Profil';
import Auth from './features/auth/Auth';
import DetailCafe from './DetailCafe';
import { CAFE_DATA } from './data/Datacafe';
import Toast from './component/Toast';

// 👇 Import Firebase Auth, Firestore, dan Jembatan Firebase kita
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc, deleteDoc, collection } from 'firebase/firestore'; 
import { auth, db } from './config/firebase'; 

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
  const [isAuthReady, setIsAuthReady] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // 🚀 1. MANTRA FIREBASE AUTH: Menjaga sesi login & menangkap data User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setSavedCafes([]); // Reset data saat logout
        setReviewCount(0); // Reset ulasan saat logout
      }
      setIsAuthReady(true); 
    });

    return () => unsubscribe();
  }, []);

  // 🗄️ 2. MANTRA FIRESTORE: Sync Real-time Bookmark & Jumlah Ulasan
  useEffect(() => {
    if (!currentUser) return; // Kalau belum login, jangan jalankan

    // A. Listener untuk Bookmark (Love)
    const bookmarksRef = collection(db, 'users', currentUser.uid, 'bookmarks');
    const unsubscribeBookmarks = onSnapshot(bookmarksRef, (snapshot) => {
      const listIds = snapshot.docs.map(doc => parseInt(doc.id)); 
      setSavedCafes(listIds);
    }, (error) => {
      console.error("Gagal memuat bookmarks:", error);
    });

    // B. Listener untuk Jumlah Ulasan di Profil
    const userDocRef = doc(db, 'users', currentUser.uid);
    const unsubscribeUserDoc = onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists()) {
        setReviewCount(snapshot.data().reviewCount || 0); // Ambil angka real-time
      } else {
        setReviewCount(0);
      }
    }, (error) => {
      console.error("Gagal memuat data profil user:", error);
    });

    // Bersihkan listener kalau user pindah halaman/logout
    return () => {
      unsubscribeBookmarks();
      unsubscribeUserDoc();
    };
  }, [currentUser]);

  const showToast = (message) => {
    setIsToastHiding(false);
    setToastMessage(message);
    setTimeout(() => {
      setIsToastHiding(true);
      setTimeout(() => { setToastMessage(null); }, 300);
    }, 2500); 
  };

  // ❤️ 3. UPDATE LOGIKA TOMBOL LOVE: Kirim & Hapus Data langsung ke Cloud Server
  const handleToggleSave = async (id, e) => {
    e.stopPropagation(); 
    if (!currentUser) return;

    const docRef = doc(db, 'users', currentUser.uid, 'bookmarks', id.toString());

    if (savedCafes.includes(id)) {
      try {
        await deleteDoc(docRef);
        showToast("Dibuang dari daftar Simpan 🗑️");
      } catch (error) {
        showToast("Gagal menghapus bookmark: " + error.message);
      }
    } else {
      try {
        await setDoc(docRef, { 
          savedAt: new Date().toISOString(),
          cafeId: id
        });
        showToast("Berhasil disimpan! ❤️");
      } catch (error) {
        showToast("Gagal menyimpan bookmark: " + error.message);
      }
    }
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleNavigateToDetail = (id) => {
    setSelectedCafeId(id);
    navigateTo('detail');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      setIsLoggedIn(false);
      navigateTo('beranda');
      showToast("Kamu telah keluar akun 👋");
    } catch (error) {
      showToast("Gagal keluar akun: " + error.message);
    }
  };

  const activeCafe = CAFE_DATA.find(cafe => cafe.id === selectedCafeId);

  if (!isAuthReady) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}>
        <h2>Memuat data... ⏳</h2>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Toast message={toastMessage} isHiding={isToastHiding} />

      <div className="main-layout">
        <Sidebar currentPage={currentPage} onNavigate={navigateTo} isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <div className="page-content-wrapper">
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
                currentUser={currentUser}
              />
            ) : (
              <LandingPage 
                isDarkMode={isDarkMode} 
                setIsDarkMode={setIsDarkMode} 
                cafeData={CAFE_DATA}
                onNavigate={navigateTo}
                showToast={showToast} 
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
              currentUser={currentUser}
            />
          )}

          {currentPage === 'peta' && (
            isLoggedIn ? (
              <Peta isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onNavigate={navigateTo} currentUser={currentUser} />
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
              reviewCount={reviewCount} // 👈 4. Angka ulasannya udah nggak nol lagi!
              onLogout={handleLogout}
            />
          )}

          {currentPage === 'auth' && (
            <Auth onLoginSuccess={() => { navigateTo('beranda'); showToast("Selamat datang kembali! 🎉"); }} />
          )}
        </div>
      </div>
    </div>
  );
}