// src/features/dashboard/About.jsx
import React from 'react';
import { FaInfoCircle, FaHeart, FaCode, FaArrowLeft } from 'react-icons/fa';

export default function About({ isDarkMode, setIsDarkMode, onNavigate }) {
  return (
    <div className="profile-page anonymity animate-fade-in" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      
      <header className="profile-header" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <button 
          onClick={() => onNavigate('beranda')} 
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '20px', 
            cursor: 'pointer', 
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <FaArrowLeft /> Kembali
        </button>
        <h2>Tentang Aplikasi Nongkrongyuk</h2>
      </header>

      <main className="profile-main" style={{ textAlign: 'left', padding: '20px' }}>
        
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <FaInfoCircle style={{ color: '#FF5252' }} /> Apa itu Nongkrongyuk?
          </h3>
          <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
            <strong>Nongkrongyuk</strong> adalah platform direktori kafe dan tempat nongkrong pilihan yang dirancang untuk membantu kamu menemukan tempat ngopi, ngerjain tugas, atau bersantai bersama teman dengan mudah, cepat, andal, dan interaktif.
          </p>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <FaCode style={{ color: '#4CAF50' }} /> Developer & Pembuat
          </h3>
          <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
            Aplikasi keren ini dirancang, dikembangkan, dan dibangun secara mandiri oleh:
          </p>
          <div style={{ 
            background: 'var(--bg-card, rgba(255,255,255,0.05))', 
            padding: '15px 20px', 
            borderRadius: '12px', 
            marginTop: '10px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', color: 'var(--text-main)' }}>Refaldi (Lead Developer)</h4>
            <p style={{ margin: '0', fontSize: '14px', color: 'var(--text-muted)' }}>Pencipta & Pengembang Tunggal Nongkrongyuk 🚀</p>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <FaHeart style={{ color: '#E91E63' }} /> Teknologi yang Digunakan
          </h3>
          <ul style={{ lineHeight: '1.8', color: 'var(--text-muted)', paddingLeft: '20px' }}>
            <li>React.js & Vite (Frontend Framework)</li>
            <li>Firebase Authentication & Cloud Firestore (Database & Auth)</li>
            <li>Leaflet / React-Leaflet (Peta Interaktif)</li>
            <li>ImgBB API (Penyimpanan Gambar Profil)</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Dibuat dengan penuh semangat dan dedikasi. © 2026 Nongkrongyuk. All rights reserved.
          </p>
        </div>

      </main>

    </div>
  );
}