import React, { useState } from 'react';
// Import fungsi mutasi Firestore
import { doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function Admin({ isDarkMode, setIsDarkMode, onNavigate, currentUser, cafeData = [] }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State penanda mode EDIT atau TAMBAH BARU
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

  // Fungsi membuka modal untuk TAMBAH BARU
  const openAddModal = () => {
    setIsEditMode(false);
    setEditingCafeId(null);
    setFormData({ 
      name: '', image: '', shortInfo: '', city: '', address: '', mapsLink: '', description: '' 
    });
    setIsModalOpen(true);
  };

  // Fungsi membuka modal untuk EDIT DATA
  const openEditModal = (cafe) => {
    setIsEditMode(true);
    setEditingCafeId(cafe.id);
    setFormData({
      name: cafe.name || '',
      image: cafe.image || '',
      shortInfo: cafe.shortInfo || cafe.info || '',
      city: cafe.city || '',
      address: cafe.address || '',
      mapsLink: cafe.mapsLink || '',
      description: cafe.description || ''
    });
    setIsModalOpen(true);
  };

  // Fungsi submit form (Tambah / Edit)
  const handleSaveCafe = async (e) => {
    e.preventDefault(); 

    if (isEditMode && editingCafeId) {
      try {
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

  // Fungsi hapus data cafe
  const handleDeleteCafe = async (cafeId) => {
    const konfirmasi = window.confirm("🚨 Peringatan, Bro! Lu beneran mau menghapus cafe ini dari peradaban?");
    if (!konfirmasi) return;

    try {
      await deleteDoc(doc(db, 'cafes', cafeId.toString()));
      alert('🗑️ Bye! Cafe berhasil dihapus dari database selamanya!');
    } catch (error) {
      alert('❌ Gagal menghapus cafe: ' + error.message);
    }
  };

  return (
    // 🚀 SEKARANG STRUKTUR MURNI PAKAI CLASSNAME CSS LUAR
    <div className="admin-panel-layout">
      
      {/* 📋 SIDEBAR ADMIN */}
      <aside className="admin-sidebar">
        <h2 className="admin-sidebar-title">Admin Panel</h2>
        
        <nav className="admin-sidebar-nav">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`admin-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            📊 Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('kelolaCafe')} 
            className={`admin-nav-btn ${activeTab === 'kelolaCafe' ? 'active' : ''}`}
          >
            ☕ Kelola Cafe
          </button>
          <button 
            onClick={() => setActiveTab('kelolaUser')} 
            className={`admin-nav-btn ${activeTab === 'kelolaUser' ? 'active' : ''}`}
          >
            👥 Kelola User
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button onClick={() => onNavigate('beranda')} className="admin-btn-back">
            Kembali ke App
          </button>
        </div>
      </aside>

      {/* 🖥️ KONTEN UTAMA */}
      <main className="admin-main-content">
        <div className="admin-main-header">
          <h1>
            {activeTab === 'dashboard' && 'Selamat Datang, Komandan!'}
            {activeTab === 'kelolaCafe' && 'Manajemen Data Cafe'}
            {activeTab === 'kelolaUser' && 'Manajemen Pengguna'}
          </h1>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="admin-theme-toggle">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* --- TAB DASHBOARD --- */}
        {activeTab === 'dashboard' && (
          <div className="admin-dashboard-grid">
            <div className="admin-stat-card card-total-cafe">
              <h3>Total Cafe</h3>
              <h1>{cafeData.length}</h1>
            </div>
            <div className="admin-stat-card card-total-user">
              <h3>Total User</h3>
              <h1>1</h1>
            </div>
            <div className="admin-stat-card card-total-reviews">
              <h3>Review</h3>
              <h1>
                {cafeData.reduce((total, cafe) => total + (cafe.reviews?.length || 0), 0)}
              </h1>
            </div>
          </div>
        )}

        {/* --- TAB KELOLA CAFE --- */}
        {activeTab === 'kelolaCafe' && (
          <div className="admin-kelola-cafe-section">
            <button onClick={openAddModal} className="admin-btn-trigger-add">
              + Tambah Cafe Baru
            </button>
            
            {/* Wrapper pembantu scrollbar otomatis di HP */}
            <div className="admin-table-responsive-wrapper">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Nama Cafe</th>
                    <th>Kota</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {cafeData.map((cafe) => (
                    <tr key={cafe.id}>
                      <td className="cell-name">{cafe.name}</td>
                      <td className="cell-city">{cafe.city || 'Bogor'}</td>
                      <td className="cell-actions">
                        <button onClick={() => openEditModal(cafe)} className="admin-btn-action-edit">Edit</button>
                        <button onClick={() => handleDeleteCafe(cafe.id)} className="admin-btn-action-delete">Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'kelolaUser' && (
          <div className="admin-empty-state">
            <p>Fitur manajemen user akan dikembangkan selanjutnya.</p>
          </div>
        )}
      </main>

      {/* 🚀 MODAL / POP-UP FORM TAMBAH & EDIT CAFE */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card"> 
            <h2 className="admin-modal-title">
              {isEditMode ? 'Edit Data Cafe' : 'Form Cafe Baru'}
            </h2>
            
            <form onSubmit={handleSaveCafe} className="admin-modal-form">
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
              
              <textarea className="admin-modal-input field-textarea" placeholder="Deskripsi Lengkap Cafe..." required rows="3"
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