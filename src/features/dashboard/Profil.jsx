// src/features/dashboard/Profil.jsx
import React, { useState } from 'react';
import { updateProfile, updateEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default function Profil({ isDarkMode, setIsDarkMode, onNavigate, savedCount, reviewCount, onLogout }) {
  const currentUser = auth.currentUser;

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentUser?.photoURL || '');
  const [loading, setLoading] = useState(false);

  // 🔑 MASUKKAN API KEY IMGBB KAMU DI SINI:
  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalPhotoUrl = currentUser?.photoURL || '';

      if (photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          finalPhotoUrl = data.data.url;
        } else {
          throw new Error('Gagal upload gambar ke ImgBB');
        }
      }

      await updateProfile(currentUser, {
        displayName: fullName,
        photoURL: finalPhotoUrl
      });

      if (email !== currentUser?.email) {
        await updateEmail(currentUser, email);
      }

      alert('Profil kamu berhasil diperbarui! 🎉');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/requires-recent-login') {
        alert('Demi keamanan, kamu harus Logout dan Login ulang dulu sebelum mengganti Email ya bro! 🙏');
      } else {
        alert('Gagal memperbarui profil: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page anonymity animate-fade-in" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ marginBottom: '30px' }}>
        <h2>{isEditing ? 'Edit Profil Saya 📝' : 'Profil Saya'}</h2>
      </header>

      <main style={{ textAlign: 'center' }}>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>

            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <img
                src={previewUrl || "https://placehold.co/120"}
                alt="Preview Avatar"
                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #0084ff' }}
              />
              <div style={{ marginTop: '10px' }}>
                <label htmlFor="file-upload" style={{ padding: '6px 12px', backgroundColor: '#e0e0e0', color: '#333', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
                  📸 Pilih Foto Baru
                </label>
                <input id="file-upload" type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} disabled={loading} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontWeight: 'bold' }}>Nama Lengkap</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} required disabled={loading} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontWeight: 'bold' }}>Alamat Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} required disabled={loading} />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" style={{ flex: 1, padding: '12px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', fontWeight: 'bold' }} disabled={loading}>
                {loading ? 'Menyimpan... ⏳' : 'Simpan Perubahan ✅'}
              </button>
              <button type="button" onClick={() => { setIsEditing(false); setPreviewUrl(currentUser?.photoURL || ''); }} style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#9e9e9e', color: 'white', border: 'none', fontWeight: 'bold' }} disabled={loading}>
                Batal
              </button>
            </div>
          </form>

        ) : (
          <>
            <img
              src={currentUser?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
              alt="Avatar"
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #0084ff' }}
            />

            <h2 style={{ marginTop: '15px' }}>{currentUser?.displayName || 'User Kece'}</h2>
            <p style={{ opacity: 0.7, marginTop: '-5px' }}>{currentUser?.email}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', margin: '30px 0' }}>
              <div style={{ padding: '15px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                {/* 🚀 REVISI: Tambahkan || 0 biar pasti nampil 0 kalau datanya kosong */}
                <h3 style={{ margin: 0, fontSize: '24px', color: '#FF5252' }}>{savedCount || 0}</h3>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.8 }}>Disimpan 🔖</p>
              </div>
              <div style={{ padding: '15px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                {/* 🚀 REVISI: Tambahkan || 0 biar pasti nampil 0 kalau datanya kosong */}
                <h3 style={{ margin: 0, fontSize: '24px', color: '#0084ff' }}>{reviewCount || 0}</h3>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.8 }}>Ulasan Ditulis 💬</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setIsEditing(true)} style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#0084ff', color: 'white', border: 'none', fontWeight: 'bold' }}>
                ✏️ Edit Profil Saya
              </button>
              <button
                onClick={() => onNavigate('admin')}
                className="btn-admin-vip"
              >
                👨‍💻 Masuk Dashboard Admin
              </button>
              <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #ccc', fontWeight: 'bold', backgroundColor: 'transparent', color: 'var(--text-main)' }}>
                Mode {isDarkMode ? '☀️ Terang' : '🌙 Gelap'}
              </button>
              <button onClick={onLogout} style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#FF5252', color: 'white', border: 'none', fontWeight: 'bold' }}>
                Keluar Akun 🚪
              </button>
            </div>
          </>
        )}
      </main>

      <nav className="bottom-bar">
        <div className="nav-item" onClick={() => onNavigate('beranda')}><span className="nav-icon">🏠</span><span>Beranda</span></div>
        <div className="nav-item" onClick={() => onNavigate('peta')}><span className="nav-icon">🗺️</span><span>Peta</span></div>
        <div className="nav-item" onClick={() => onNavigate('simpan')}><span className="nav-icon">🔖</span><span>Simpan</span></div>
        <div className="nav-item" onClick={() => onNavigate('profil')} style={{ color: 'var(--text-main)' }}><span className="nav-icon">👤</span><span>Profil</span></div>
      </nav>
    </div>
  );
}