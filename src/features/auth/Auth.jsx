import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function Auth({ onLoginSuccess }) {
  // isLogin = true artinya tampilkan Login, false tampilkan Register
  const [isLogin, setIsLogin] = useState(true);

  // Fungsi untuk bolak-balik antara Login dan Register
  const handleSwitchMode = () => {
    setIsLogin(!isLogin);
  };

  return isLogin ? (
    <Login 
      onLoginSuccess={onLoginSuccess} 
      onSwitchMode={handleSwitchMode} 
    />
  ) : (
    <Register 
      onSwitchMode={handleSwitchMode} 
    />
  );
}