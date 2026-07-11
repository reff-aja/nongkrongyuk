// src/features/dashboard/Profil.jsx
import React, { useState } from 'react';
import { updateProfile, updateEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Profil({ isDarkMode, setIsDarkMode, onNavigate, savedCount, reviewCount, onLogout, userRole }) {
  const currentUser = auth.currentUser;

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentUser?.photoURL || '');
  const [loading, setLoading] = useState(false);

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
    <div className="profile-page anonymity animate-fade-in">

      <header className="profile-header">
        <h2>{isEditing ? 'Edit Profil Saya' : 'Profil Saya'}</h2>
      </header>

      <main className="profile-main">
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="profile-form">
            <div className="avatar-preview-container">
              <img src={previewUrl || "https://placehold.co/120"} alt="Preview Avatar" className="profile-avatar" />
              <div className="upload-btn-wrapper">
                <label htmlFor="file-upload" className="btn-upload-photo">📸 Pilih Foto Baru</label>
                <input id="file-upload" type="file" accept="image/*" onChange={handlePhotoChange} disabled={loading} />
              </div>
            </div>

            <div className="form-group">
              <label>Nama Lengkap</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required disabled={loading} />
            </div>

            <div className="form-group">
              <label>Alamat Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save-profile" disabled={loading}>
                {loading ? 'Menyimpan... ⏳' : 'Simpan Perubahan ✅'}
              </button>
              <button type="button" onClick={() => { setIsEditing(false); setPreviewUrl(currentUser?.photoURL || ''); }} className="btn-cancel-profile" disabled={loading}>
                Batal
              </button>
            </div>
          </form>
        ) : (
          <>
            <img src={currentUser?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} alt="Avatar" className="profile-avatar" />
            <h2 className="user-display-name">{currentUser?.displayName || 'User Kece'}</h2>
            <p className="user-email">{currentUser?.email}</p>

            <div className="profile-stats-grid">
              <div className="stat-card stat-saved">
                <h3>{savedCount || 0}</h3>
                <p>Disimpan</p>
              </div>
              <div className="stat-card stat-reviews">
                <h3>{reviewCount || 0}</h3>
                <p>Ulasan Ditulis</p>
              </div>
            </div>

            <div className="profile-menu-actions">
              <button onClick={() => setIsEditing(true)} className="btn-menu-edit">✏️ Edit Profil Saya</button>

              {userRole === 'admin' && (
                <button onClick={() => onNavigate('admin')} className="btn-menu-admin">👨‍💻 Masuk Dashboard Admin</button>
              )}

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="btn-menu-theme"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                {isDarkMode ? (
                  <>
                    <FaSun style={{ color: '#ffb900' }} /> <span>Mode Terang</span>
                  </>
                ) : (
                  <>
                    <FaMoon style={{ color: '#888' }} /> <span>Mode Gelap</span>
                  </>
                )}
              </button>
              <button onClick={onLogout} className="btn-menu-logout">Keluar Akun 🚪</button>
            </div>
          </>
        )}
      </main>

      {/* 🚀 BERSIH TOTAL: Navigasi bawah dipindah ke App.jsx pusat */}

    </div>
  );
}