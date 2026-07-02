import React, { useState } from 'react';
// 👇 Tambahkan fungsi updateDoc dan deleteDoc dari Firestore
import { doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function Admin({ isDarkMode, setIsDarkMode, onNavigate, currentUser, cafeData = [] }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 🚀 STATE BARU: Menandai apakah sedang dalam mode EDIT atau TAMBAH BARU
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCafeId, setEditingCafeId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    shortInfo: '',
    city: '',
    address: '',
    mapsLink: '',
    description: ''
  });

  // 🚀 FUNGSI MEMBUKA MODAL UNTUK TAMBAH BARU
  const openAddModal = () => {
    setIsEditMode(false);
    setEditingCafeId(null);
    setFormData({ 
      name: '', image: '', shortInfo: '', city: '', address: '', mapsLink: '', description: '' 
    });
    setIsModalOpen(true);
  };

  // 🚀 FUNGSI MEMBUKA MODAL UNTUK EDIT DATA LAMA
  const openEditModal = (cafe) => {
    setIsEditMode(true);
    setEditingCafeId(cafe.id); // Menyimpan ID cafe yang mau diedit
    setFormData({
      name: cafe.name || '',
      image: cafe.image || '',
      shortInfo: cafe.shortInfo || cafe.info || '', // Adaptif baca shortInfo atau info lama
      city: cafe.city || '',
      address: cafe.address || '',
      mapsLink: cafe.mapsLink || '',
      description: cafe.description || ''
    });
    setIsModalOpen(true);
  };

  // 🚀 FUNGSI SUBMIT FORM (BISA UNTUK TAMBAH MAUPUN EDIT)
  const handleSaveCafe = async (e) => {
    e.preventDefault(); 

    if (isEditMode && editingCafeId) {
      // 📝 LOGIKA JURUS EDIT DATA
      try {
        // Cari ID dokumen di Firebase (kita cari berdasarkan kecocokan ID angka cafe tersebut)
        // Catatan: Karena dokumen disimpan dengan ID waktu string, kita cari tahu lewat pencarian, 
        // atau jika ID dokumennya sama dengan ID angka, kita tembak langsung.
        const cafeIdStr = editingCafeId.toString();
        const cafeDocRef = doc(db, 'cafes', cafeIdStr);

        await updateDoc(cafeDocRef, {
          name: formData.name,
          image: formData.image,
          shortInfo: formData.shortInfo,
          city: formData.city,
          address: formData.address,
          mapsLink: formData.mapsLink,
          description: formData.description
        });

        alert('📝 Mantap! Perubahan data cafe berhasil diperbarui ke Firebase!');
        setIsModalOpen(false);
      } catch (error) {
        // Jika dokumen lama menggunakan ID kustom acak dari Firebase, kita timpa atau fallback pakai setDoc
        try {
          const cafeIdStr = editingCafeId.toString();
          await setDoc(doc(db, 'cafes', cafeIdStr), {
            id: editingCafeId,
            name: formData.name,
            image: formData.image,
            shortInfo: formData.shortInfo,
            city: formData.city,
            address: formData.address,
            mapsLink: formData.mapsLink,
            description: formData.description,
            reviews: []
          }, { merge: true });
          alert('📝 Perubahan data cafe berhasil diperbarui (Merged)!');
          setIsModalOpen(false);
        } catch (err) {
          alert('❌ Gagal mengedit cafe: ' + err.message);
        }
      }
    } else {
      // ➕ LOGIKA TAMBAH BARU (KODE LAMA LU YANG SUDAH JALAN)
      const cafeIdStr = Date.now().toString();
      const newCafe = {
        id: Date.now(), 
        name: formData.name,
        image: formData.image,
        shortInfo: formData.shortInfo,
        city: formData.city,
        address: formData.address,
        mapsLink: formData.mapsLink,
        description: formData.description,
        reviews: [] 
      };

      try {
        await setDoc(doc(db, 'cafes', cafeIdStr), newCafe);
        setIsModalOpen(false);
        alert('🎉 SENSASIONAL! Cafe baru resmi tersimpan di Database Firebase!');
      } catch (error) {
        alert('❌ Waduh gagal menyimpan: ' + error.message);
      }
    }
  };

  // 🚀 FUNGSI JURUS HAPUS DATA CAFE DARI FIREBASE
  const handleDeleteCafe = async (cafeId) => {
    const konfirmasi = window.confirm("🚨 Peringatan, Bro! Lu beneran mau menghapus cafe ini dari peradaban?");
    if (!konfirmasi) return;

    try {
      // Tembak langsung hapus dokumen berdasarkan ID string-nya
      await deleteDoc(doc(db, 'cafes', cafeId.toString()));
      alert('🗑️ Bye! Cafe berhasil dihapus dari database selamanya!');
    } catch (error) {
      alert('❌ Gagal menghapus cafe: ' + error.message);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', position: 'relative' }}>
      
      {/* 📋 SIDEBAR ADMIN */}
      <aside style={{ width: '250px', borderRight: '1px solid rgba(0,0,0,0.1)', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '30px', color: '#667eea' }}>Admin Panel</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button onClick={() => setActiveTab('dashboard')} style={{ padding: '12px', textAlign: 'left', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s', backgroundColor: activeTab === 'dashboard' ? '#667eea' : 'transparent', color: activeTab === 'dashboard' ? 'white' : 'var(--text-main)' }}>
            📊 Dashboard
          </button>
          <button onClick={() => setActiveTab('kelolaCafe')} style={{ padding: '12px', textAlign: 'left', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s', backgroundColor: activeTab === 'kelolaCafe' ? '#667eea' : 'transparent', color: activeTab === 'kelolaCafe' ? 'white' : 'var(--text-main)' }}>
            ☕ Kelola Cafe
          </button>
          <button onClick={() => setActiveTab('kelolaUser')} style={{ padding: '12px', textAlign: 'left', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s', backgroundColor: activeTab === 'kelolaUser' ? '#667eea' : 'transparent', color: activeTab === 'kelolaUser' ? 'white' : 'var(--text-main)' }}>
            👥 Kelola User
          </button>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <button onClick={() => onNavigate('beranda')} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#ff4d4f', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
            Kembali ke App
          </button>
        </div>
      </aside>

      {/* 🖥️ KONTEN UTAMA */}
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>
            {activeTab === 'dashboard' && 'Selamat Datang, Komandan!'}
            {activeTab === 'kelolaCafe' && 'Manajemen Data Cafe'}
            {activeTab === 'kelolaUser' && 'Manajemen Pengguna'}
          </h1>
          <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* --- TAB DASHBOARD --- */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div style={{ padding: '20px', borderRadius: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
              <h3 style={{ margin: 0, color: '#667eea' }}>Total Cafe</h3>
              <h1 style={{ margin: '10px 0', fontSize: '36px' }}>{cafeData.length}</h1>
            </div>
            <div style={{ padding: '20px', borderRadius: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
              <h3 style={{ margin: 0, color: '#28a745' }}>Total User</h3>
              <h1 style={{ margin: '10px 0', fontSize: '36px' }}>1</h1>
            </div>
            <div style={{ padding: '20px', borderRadius: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
              <h3 style={{ margin: 0, color: '#ffc107' }}>Review</h3>
              <h1 style={{ margin: '10px 0', fontSize: '36px' }}>
                {cafeData.reduce((total, cafe) => total + (cafe.reviews?.length || 0), 0)}
              </h1>
            </div>
          </div>
        )}

        {/* --- TAB KELOLA CAFE --- */}
        {activeTab === 'kelolaCafe' && (
          <div>
            {/* Menggunakan pemicu openAddModal */}
            <button onClick={openAddModal} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px' }}>
              + Tambah Cafe Baru
            </button>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ccc' }}>
                  <th style={{ padding: '12px' }}>Nama Cafe</th>
                  <th style={{ padding: '12px' }}>Kota</th>
                  <th style={{ padding: '12px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {cafeData.map((cafe) => (
                  <tr key={cafe.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    <td style={{ padding: '12px' }}>{cafe.name}</td>
                    <td style={{ padding: '12px' }}>{cafe.city || 'Bogor'}</td>
                    <td style={{ padding: '12px', gap: '10px', display: 'flex' }}>
                      {/* 🚀 TOMBOL EDIT AKURAT */}
                      <button 
                        onClick={() => openEditModal(cafe)}
                        style={{ padding: '6px 12px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer', color: 'black', fontWeight: 'bold' }}
                      >
                        Edit
                      </button>
                      {/* 🚀 TOMBOL HAPUS FIREBASE */}
                      <button 
                        onClick={() => handleDeleteCafe(cafe.id)}
                        style={{ padding: '6px 12px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'kelolaUser' && (
          <div style={{ padding: '20px', border: '1px dashed #ccc', borderRadius: '10px', textAlign: 'center' }}>
            <p>Fitur manajemen user akan dikembangkan selanjutnya.</p>
          </div>
        )}
      </main>

      {/* 🚀 MODAL / POP-UP FORM TAMBAH & EDIT CAFE */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ width: '500px' }}> 
            {/* Judul modal dinamis mengikuti mode */}
            <h2 className="admin-modal-title">
              {isEditMode ? '📝 Edit Data Cafe' : '📝 Form Cafe Baru'}
            </h2>
            
            <form onSubmit={handleSaveCafe} className="admin-modal-form" style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '10px' }}>
              
              <input className="admin-modal-input" type="text" placeholder="Nama Cafe (Misal: Kopi Kenangan)" required
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
              
              <input className="admin-modal-input" type="url" placeholder="Link URL Foto Cafe" required
                value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} 
              />
              
              <input className="admin-modal-input" type="text" placeholder="Info Singkat (Misal: ⭐️ 4.5 | 💰 Rp 20k - 50k)" required
                value={formData.shortInfo} onChange={(e) => setFormData({...formData, shortInfo: e.target.value})} 
              />
              
              <input className="admin-modal-input" type="text" placeholder="Kota (Misal: Jakarta)" required
                value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} 
              />
              
              <input className="admin-modal-input" type="text" placeholder="Alamat Lengkap" required
                value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} 
              />
              
              <input className="admin-modal-input" type="url" placeholder="Link Google Maps" required
                value={formData.mapsLink} onChange={(e) => setFormData({...formData, mapsLink: e.target.value})} 
              />
              
              <textarea className="admin-modal-input" placeholder="Deskripsi Lengkap Cafe..." required rows="3"
                style={{ fontFamily: 'inherit', resize: 'none' }} 
                value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} 
              />
              
              <div className="admin-modal-actions">
                <button type="submit" className="admin-btn-save">
                  {isEditMode ? 'Perbarui Data' : 'Simpan Data'}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="admin-btn-cancel">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}