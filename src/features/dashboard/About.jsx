// src/features/dashboard/About.jsx
import React from 'react';
import { FaInfoCircle, FaHeart, FaCode, FaArrowLeft } from 'react-icons/fa';

export default function About({ isDarkMode, setIsDarkMode, onNavigate }) {
  return (
    <div className="animate-fade-in" style={{ 
      padding: '24px 16px', 
      maxWidth: '800px', 
      margin: '0 auto', 
      width: '100%', 
      boxSizing: 'border-box',
      color: 'var(--text-main)' 
    }}>
      
      {/* Header Halaman */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
        <button 
          onClick={() => onNavigate('beranda')} 
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '16px', 
            cursor: 'pointer', 
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '8px 12px',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-card, rgba(255,255,255,0.05))'
          }}
        >
          <FaArrowLeft /> Kembali
        </button>
        <h2 style={{ fontSize: '20px', margin: 0 }}>Tentang Aplikasi</h2>
      </div>

      {/* Konten Utama */}
      <div style={{ 
        background: 'var(--bg-card, rgba(255,255,255,0.03))', 
        padding: '24px', 
        borderRadius: '16px', 
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '18px' }}>
            <FaInfoCircle style={{ color: '#FF5252' }} /> Apa itu Nongkrongyuk?
          </h3>
          <p style={{ lineHeight: '1.6', color: 'var(--text-muted)', fontSize: '15px', margin: 0 }}>
            <strong>Nongkrongyuk</strong> adalah platform direktori kafe dan tempat nongkrong pilihan yang dirancang untuk membantu kamu menemukan tempat ngopi, ngerjain tugas, atau bersantai bersama teman dengan mudah, cepat, andal, dan interaktif.
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '18px' }}>
            <FaCode style={{ color: '#4CAF50' }} /> Developer & Pembuat
          </h3>
          <p style={{ lineHeight: '1.6', color: 'var(--text-muted)', fontSize: '15px', margin: '0 0 10px 0' }}>
            Aplikasi keren ini dirancang, dikembangkan, dan dibangun secara mandiri oleh:
          </p>
          <div style={{ 
            background: 'var(--bg-main)', 
            padding: '16px 20px', 
            borderRadius: '12px', 
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '17px', color: 'var(--text-main)' }}>Refaldi Ramadhan (Lead Developer)</h4>
            <p style={{ margin: '0', fontSize: '13px', color: 'var(--text-muted)' }}>Pencipta & Pengembang Tunggal Nongkrongyuk 🚀</p>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '18px' }}>
            <FaHeart style={{ color: '#E91E63' }} /> Teknologi yang Digunakan
          </h3>
          <ul style={{ lineHeight: '1.8', color: 'var(--text-muted)', paddingLeft: '20px', fontSize: '15px', margin: 0 }}>
            <li>React.js & Vite (Frontend Framework)</li>
            <li>Firebase Authentication & Cloud Firestore (Database & Auth)</li>
            <li>Leaflet / React-Leaflet (Peta Interaktif)</li>
            <li>ImgBB API (Penyimpanan Gambar Profil)</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '20px' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            Dibuat dengan penuh semangat dan dedikasi. © 2026 Nongkrongyuk. All rights reserved.
          </p>
        </div>

      </div>

    </div>
  );
}