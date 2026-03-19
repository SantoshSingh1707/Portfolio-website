import React from 'react';

const SettingsApp = ({ currentWallpaper, setWallpaper, wallpapers, accentColor, setAccentColor }) => {
  return (
    <div className="settings-app">
      <div className="settings-sidebar">
        <ul>
          <li className="active">Personalization</li>
          <li>System</li>
          <li>About</li>
        </ul>
      </div>
      <div className="settings-content">
        <h2>Personalization</h2>
        
        <div className="settings-section">
          <h3>Background</h3>
          <div className="wallpaper-grid">
            {wallpapers.map((wp, idx) => (
              <div 
                key={idx} 
                className={`wallpaper-thumb ${currentWallpaper === wp ? 'active' : ''}`}
                style={{ background: wp, backgroundSize: 'cover', backgroundPosition: 'center' }}
                onClick={() => setWallpaper(wp)}
              ></div>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <h3>Accent Color</h3>
          <div className="accent-grid">
            {['#00a2ed', '#107c10', '#d83b01', '#e81123', '#8e44ad', '#f39c12', '#1abc9c'].map(color => (
              <div 
                key={color}
                className={`accent-circle ${accentColor === color ? 'active' : ''}`}
                style={{ background: color }}
                onClick={() => setAccentColor(color)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
