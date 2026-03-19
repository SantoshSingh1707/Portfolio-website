import React, { useState } from 'react';
import { User } from 'lucide-react';

const LoginScreen = ({ onLogin, playSfx }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    if (playSfx) playSfx('login');
    setIsLoggingIn(true);
    setTimeout(() => {
      onLogin();
    }, 1200); // Simulate login delay with a nice transition
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="avatar-lg">
          <User size={64} strokeWidth={1.5} color="#fff" />
        </div>
        <h1 className="login-name">Aithani Santosh Singh</h1>
        
        {isLoggingIn ? (
          <div className="login-spinner-container">
            <div className="spinner small"></div>
            <span>Welcome...</span>
          </div>
        ) : (
          <button className="login-btn" onClick={handleLogin}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
