import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';

const LoginScreen = ({ onLogin, playSfx }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    if (playSfx) playSfx('login');
    setIsLoggingIn(true);
    setTimeout(() => {
      onLogin();
    }, 1200); // Simulate login delay with a nice transition
  };

  return (
    <div className="login-screen">
      <div className="login-panel">
        <div className="login-panel-top">
          <div>
            <p className="login-kicker">Portfolio OS</p>
            <h1 className="login-name">Aithani Santosh Singh</h1>
            <p className="login-role">Software engineering student building AI-first products.</p>
          </div>
          <div className="login-clock-block">
            <span className="login-time">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="login-date">{time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="login-profile-row">
          <div className="avatar-lg">
            <User size={64} strokeWidth={1.5} color="#fff" />
          </div>
          <div className="login-profile-copy">
            <span className="login-chip">Secure Session</span>
            <p>Sign in to explore projects, tools, and the interactive desktop experience.</p>
          </div>
        </div>

        {isLoggingIn ? (
          <div className="login-spinner-container">
            <div className="spinner small"></div>
            <span>Loading your workspace...</span>
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
