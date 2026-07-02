// src/DetailCafe.jsx
import React, { useState, useEffect } from 'react';
// 👇 Import Firestore untuk urusan ulasan
import { collection, addDoc, onSnapshot, query, orderBy, doc, setDoc, increment } from 'firebase/firestore';
import { db, auth } from './config/firebase';

export default function DetailCafe({ cafe, onBack }) {
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const currentUser = auth.currentUser; // Ambil data user yang sedang login

  // 🔄 Ambil ulasan secara real-time dari Firestore berdasarkan ID Cafe
  useEffect(() => {
    if (!cafe?.id) return;

    // Alamat database: cafes/ID_CAFE/reviews
    const reviewsRef = collection(db, 'cafes', cafe.id.toString(), 'reviews');
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(data);
    }, (error) => {
      console.error("Gagal mengambil ulasan:", error);
    });

    return () => unsubscribe();
  }, [cafe.id]);

  // 🚀 Kirim ulasan baru ke Firestore Google
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    setLoading(true);
    try {
      const reviewsRef = collection(db, 'cafes', cafe.id.toString(), 'reviews');
      
      await addDoc(reviewsRef, {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonim',
        rating: parseInt(rating),
        comment: newComment,
        createdAt: new Date().toISOString()
      });

      const userDocRef = doc(db, 'users', currentUser.uid);
      await setDoc(userDocRef, {
        reviewCount: increment(1)
      }, { merge: true });

      setNewComment('');
      setRating(5);
      alert('Ulasan kamu berhasil dikirim! ⭐️');
    } catch (error) {
      alert('Gagal mengirim ulasan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!cafe) return <div style={{ padding: '20px', textAlign: 'center' }}>Cafe tidak ditemukan 🥲</div>;

  return (
    <div className="detail-page animate-fade-in" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={onBack} className="btn-back" style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer' }}>
        ⬅️ Kembali
      </button>

      <div className="detail-header">
        <img src={cafe.image} alt={cafe.name} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }} />
        <h1 style={{ marginTop: '15px' }}>{cafe.name}</h1>
        <p style={{ opacity: 0.8 }}>{cafe.address}</p>
        <p>
          {cafe.shortInfo || cafe.info || "⭐️ 0.0 | No Info"}
        </p>
      </div>

      <div className="detail-body" style={{ marginTop: '20px' }}>
        <h3>Tentang Cafe</h3>
        <p>{cafe.description}</p>
        <a href={cafe.mapsLink} target="_blank" rel="noreferrer" className="btn-maps" style={{ display: 'inline-block', marginTop: '10px', color: '#0084ff' }}>
          🗺️ Lihat di Google Maps
        </a>
      </div>

      <hr style={{ margin: '30px 0', opacity: 0.2 }} />

      {/* 📝 FORM TULIS ULASAN */}
      <div className="review-section">
        <h3>Tulis Ulasan Kamu ☕</h3>
        <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label>Rating:</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ padding: '5px', borderRadius: '6px' }}>
              <option value="5">⭐⭐⭐⭐⭐ (5)</option>
              <option value="4">⭐⭐⭐⭐ (4)</option>
              <option value="3">⭐⭐⭐ (3)</option>
              <option value="2">⭐⭐ (2)</option>
              <option value="1">⭐ (1)</option>
            </select>
          </div>
          <textarea
            placeholder="Bagikan pengalamanmu nongkrong di sini..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="3"
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical', width: '100%' }}
            required
            disabled={loading}
          />
          <button type="submit" className="btn-submit-review" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }} disabled={loading}>
            {loading ? 'Mengirim... ⏳' : 'Kirim Ulasan 🚀'}
          </button>
        </form>

        {/* 💬 DAFTAR ULASAN DARI FIRESTORE */}
        <div className="reviews-list" style={{ marginTop: '30px' }}>
          <h3>Ulasan Pengunjung ({reviews.length})</h3>
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div key={rev.id} style={{ padding: '15px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', marginTop: '10px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <strong>{rev.userName}</strong>
                  <span style={{ color: '#FFD700' }}>{'⭐'.repeat(rev.rating)}</span>
                </div>
                <p style={{ margin: 0, opacity: 0.9 }}>{rev.comment}</p>
                <small style={{ opacity: 0.5, fontSize: '11px' }}>
                  {new Date(rev.createdAt).toLocaleDateString('id-ID')}
                </small>
              </div>
            ))
          ) : (
            <p style={{ opacity: 0.6, marginTop: '10px' }}>Belum ada ulasan di cafe ini. Jadi yang pertama mengulas! 😉</p>
          )}
        </div>
      </div>
    </div>
  );
}