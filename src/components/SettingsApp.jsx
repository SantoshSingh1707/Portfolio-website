import React from 'react';
import { MonitorSmartphone, Palette, Sparkles } from 'lucide-react';

const accentPresets = ['#00a2ed', '#107c10', '#d83b01', '#e81123', '#8e44ad', '#f39c12', '#1abc9c'];

const getWallpaperStyle = (wallpaper, extra = {}) => {
  if (wallpaper.startsWith('url(')) {
    return {
      ...extra,
      backgroundImage: wallpaper,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

  return {
    ...extra,
    background: wallpaper,
  };
};

const SettingsApp = ({ currentWallpaper, setWallpaper, wallpapers, accentColor, setAccentColor }) => {
  return (
    <div className="settings-app">
      <div className="settings-sidebar">
        <div className="settings-sidebar-card">
          <span className="settings-sidebar-chip">System</span>
          <h3>Santosh Portfolio OS</h3>
          <p>Personalize the desktop and tune the mood of the workspace.</p>
        </div>
        <ul>
          <li className="active">Personalization</li>
          <li>System</li>
          <li>About</li>
        </ul>
      </div>
      <div className="settings-content">
        <div className="settings-hero">
          <div>
            <span className="settings-overline">Customization</span>
            <h2>Personalization</h2>
            <p>Refresh wallpapers, adjust accent colors, and preview your desktop style in real time.</p>
          </div>
          <div className="settings-preview-card" style={getWallpaperStyle(currentWallpaper, { '--settings-accent': accentColor })}>
            <div className="settings-preview-overlay">
              <div className="settings-preview-window">
                <div className="settings-preview-toolbar">
                  <MonitorSmartphone size={16} />
                  <span>Desktop Preview</span>
                </div>
                <div className="settings-preview-chip">
                  <Palette size={14} />
                  <span>Accent ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-grid-layout">
          <div className="settings-section">
            <div className="settings-section-header">
              <div>
                <h3>Background</h3>
                <p>Choose the atmosphere that drives the desktop.</p>
              </div>
              <span className="settings-badge">{wallpapers.length} presets</span>
            </div>
            <div className="wallpaper-grid">
              {wallpapers.map((wallpaper, index) => (
                <button
                  key={index}
                  type="button"
                  className={`wallpaper-thumb ${currentWallpaper === wallpaper ? 'active' : ''}`}
                  style={getWallpaperStyle(wallpaper)}
                  onClick={() => setWallpaper(wallpaper)}
                >
                  <span>Style {index + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <div className="settings-section-header">
              <div>
                <h3>Accent Color</h3>
                <p>Fine-tune active highlights and interface glow.</p>
              </div>
              <span className="settings-badge accent">Live accent</span>
            </div>
            <div className="accent-grid">
              {accentPresets.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`accent-circle ${accentColor === color ? 'active' : ''}`}
                  style={{ background: color }}
                  onClick={() => setAccentColor(color)}
                  aria-label={`Switch accent color to ${color}`}
                ></button>
              ))}
            </div>

            <div className="settings-notes">
              <div className="settings-note-card">
                <Sparkles size={16} />
                <div>
                  <strong>Instant refresh</strong>
                  <span>Changes apply across the shell right away.</span>
                </div>
              </div>
              <div className="settings-note-card">
                <Palette size={16} />
                <div>
                  <strong>Visual system</strong>
                  <span>Accent color now influences highlights, pills, and window cues.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
