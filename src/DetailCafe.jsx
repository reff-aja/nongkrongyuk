import React from 'react';

export default function DetailCafe({ cafe, onBack }) {
  if (!cafe) return <div className="container">Data cafe tidak ditemukan.</div>;

  return (
    <div className="animate-fade-in detail-page">
      {/* NAVBAR ATAS HALAMAN DETAIL */}
      <div className="detail-header">
        <div className="detail-header-content">
          <button className="btn-back" onClick={onBack}>⬅️ Kembali</button>
          <span className="detail-nav-title">Detail Cafe</span>
        </div>
      </div>

      <div className="detail-container">
        {/* FOTO UTAMA BESAR */}
        <div className="detail-image-container">
          <img src={cafe.image} alt={cafe.name} className="detail-main-image" />
        </div>

        {/* INFORMASI UTAMA CAFE */}
        <div className="detail-content-wrapper">
          <h1 className="detail-title">{cafe.name}</h1>
          <p className="detail-address">{cafe.address}</p>
          <p className="detail-info-strip">{cafe.info}</p>

          {/* TOMBOL AKSI MAPS TERPISAH */}
          <div className="detail-actions-row">
            <a href={cafe.mapsLink} target="_blank" rel="noopener noreferrer" className="btn-action-map">
              🗺️ Petunjuk Arah (Google Maps)
            </a>
          </div>

          {/* DESKRIPSI TENTANG CAFE */}
          <div className="detail-section">
            <h3 className="section-title">Tentang Cafe</h3>
            <p className="detail-description">{cafe.description}</p>
          </div>

          {/* AREA REVIEW / ULASAN PENGUNJUNG */}
          <div className="detail-section">
            <h3 className="section-title">Ulasan Pengunjung ⭐</h3>
            <div className="reviews-list">
              {cafe.reviews && cafe.reviews.length > 0 ? (
                cafe.reviews.map((rev, index) => (
                  <div key={index} className="review-item">
                    <div className="review-user-row">
                      <span className="review-user-name">🧑 {rev.user}</span>
                      <span className="review-user-rating">{"⭐".repeat(rev.rating)}</span>
                    </div>
                    <p className="review-comment">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <p style={{ opacity: 0.7, fontStyle: 'italic' }}>Belum ada ulasan untuk tempat ini.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}