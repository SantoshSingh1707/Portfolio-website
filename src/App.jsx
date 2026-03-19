import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { 
  User, GraduationCap, FolderDot, 
  Wrench, Mail, X, Minus, Square, 
  Search, Power, LayoutGrid, Download,
  Settings, Image, RefreshCw, FileText
} from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './App.css';

// Pre-defined Wallpapers
const wallpapers = [
  'radial-gradient(circle at 15% 50%, rgba(0, 102, 204, 0.4), transparent 25%), radial-gradient(circle at 85% 30%, rgba(0, 204, 255, 0.4), transparent 25%), radial-gradient(circle at 50% 80%, rgba(102, 0, 204, 0.4), transparent 25%), linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
  'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
  'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
  'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)'
];

const Window = ({ title, id, children, onClose, isOpen, isMinimized, onMinimize, zIndex, onFocus, icon: IconComponent, noPadding }) => {
  const nodeRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  if (!isOpen) return null;
  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".window-header" 
      bounds="parent"
      onMouseDown={() => onFocus(id)}
      disabled={isFullscreen}
    >
      <div 
        ref={nodeRef}
        className={`window open ${isFullscreen ? 'fullscreen' : ''}`} 
        style={isMinimized ? { display: 'none' } : (!isFullscreen ? { zIndex, top: `${10 + (zIndex - 10) * 2}%`, left: `${15 + (zIndex - 10) * 2}%` } : { zIndex })}
      >
        <div className="window-header" onDoubleClick={() => setIsFullscreen(!isFullscreen)}>
          <span className="window-title">
            {IconComponent && <IconComponent size={16} color="#0078d7" />}
            {title}
          </span>
          <div className="window-controls" onMouseDown={e => e.stopPropagation()}>
            <div className="control-btn" onClick={() => onMinimize(id)} title="Minimize"><Minus size={14} /></div>
            <div className="control-btn" onClick={() => setIsFullscreen(!isFullscreen)} title="Maximize"><Square size={12} /></div>
            <div className="control-btn close" onClick={() => onClose(id)} title="Close">
              <X size={16} />
            </div>
          </div>
        </div>
        <div className="window-content" style={noPadding ? { padding: 0 } : {}} onMouseDown={(e) => { e.stopPropagation(); onFocus(id); }}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

const Icon = ({ name, icon: IconComponent, onClick }) => (
  <div className="desktop-icon" onClick={onClick}>
    <div className="icon-placeholder">
      <IconComponent size={42} strokeWidth={1.5} />
    </div>
    <span>{name}</span>
  </div>
);

const Taskbar = ({ openWindows, activeWindow, onTaskbarClick, onToggleStart, isStartOpen }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="taskbar">
      <div className="taskbar-center">
        <div className={`start-btn ${isStartOpen ? 'active' : ''}`} onClick={onToggleStart} title="Start">
          <LayoutGrid size={24} color={isStartOpen ? '#0078d7' : '#00a2ed'} fill={isStartOpen ? '#0078d7' : 'none'} />
        </div>
        {Object.keys(openWindows).map(id => (
          openWindows[id].isOpen && (
            <div 
              key={id} 
              className={`taskbar-item ${activeWindow === id && !openWindows[id].isMinimized ? 'active' : ''}`}
              onClick={() => onTaskbarClick(id)}
              title={openWindows[id].title}
            >
              {React.createElement(openWindows[id].icon, { size: 22, color: 'white', strokeWidth: 1.5 })}
            </div>
          )
        ))}
      </div>
      
      <div className="taskbar-right">
        <div className="taskbar-time">
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span style={{ fontSize: '10px', opacity: 0.8 }}>{time.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

const ContextMenu = ({ x, y, onClose, onRefresh, onSettings }) => {
  return (
    <div className="context-menu" style={{ top: y, left: x }}>
      <div className="context-menu-item" onClick={() => { onRefresh(); onClose(); }}>
        <RefreshCw size={14} /> Refresh
      </div>
      <div style={{ height: '1px', background: 'rgba(0,0,0,0.1)', margin: '4px 0' }}></div>
      <div className="context-menu-item" onClick={() => { onSettings(); onClose(); }}>
        <Settings size={14} /> Personalize
      </div>
    </div>
  );
};

function App() {
  const [booting, setBooting] = useState(true);
  const [wallpaper, setWallpaper] = useState(wallpapers[0]);
  
  const [windows, setWindows] = useState({
    about: { title: 'About Me', isOpen: false, isMinimized: false, zIndex: 10, icon: User },
    education: { title: 'Education', isOpen: false, isMinimized: false, zIndex: 10, icon: GraduationCap },
    projects: { title: 'Projects', isOpen: false, isMinimized: false, zIndex: 10, icon: FolderDot },
    skills: { title: 'Skills', isOpen: false, isMinimized: false, zIndex: 10, icon: Wrench },
    contact: { title: 'Contact', isOpen: false, isMinimized: false, zIndex: 10, icon: Mail },
    settings: { title: 'Settings', isOpen: false, isMinimized: false, zIndex: 10, icon: Settings },
    notepad: { title: 'Notepad', isOpen: false, isMinimized: false, zIndex: 10, icon: FileText }
  });
  
  const [activeWindow, setActiveWindow] = useState(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [githubProjects, setGithubProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0 });

  useEffect(() => {
    // Fetch GitHub Projects
    fetch('https://api.github.com/users/SantoshSingh1707/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setGithubProjects(data);
        setLoadingProjects(false);
      })
      .catch(err => {
        console.error("Failed fetching github", err);
        setLoadingProjects(false);
      });

    setTimeout(() => {
      setBooting(false);
      toggleWindow('about'); 
    }, 2000);
  }, []);

  const toggleWindow = (id) => {
    const isOpening = !windows[id].isOpen;
    setIsStartOpen(false);
    
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: isOpening, isMinimized: false, zIndex: isOpening ? maxZIndex + 1 : prev[id].zIndex }
    }));
    
    if (isOpening) {
      setActiveWindow(id);
      setMaxZIndex(prev => prev + 1);
    } else if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const focusWindow = (id) => {
    if (activeWindow === id && !windows[id].isMinimized) return;
    setIsStartOpen(false);
    setActiveWindow(id);
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: false, zIndex: newZIndex }
    }));
  };

  const minimizeWindow = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const handleTaskbarClick = (id) => {
    if (windows[id].isMinimized) {
      focusWindow(id);
    } else if (activeWindow === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const openAppFromStart = (id) => {
    if (!windows[id].isOpen || windows[id].isMinimized) toggleWindow(id);
    else focusWindow(id);
    setIsStartOpen(false);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ isOpen: true, x: e.pageX, y: e.pageY });
    setIsStartOpen(false);
  };

  const handleClick = () => {
    if (contextMenu.isOpen) setContextMenu({ ...contextMenu, isOpen: false });
    if (isStartOpen) setIsStartOpen(false);
  };

  if (booting) {
    return (
      <div className="boot-screen">
        <div className="windows-logo-boot">
          <div></div><div></div>
          <div></div><div></div>
        </div>
        <div className="win-spinner"><span></span></div>
      </div>
    );
  }

  return (
    <>
      <SpeedInsights />
      <div className="desktop-bg" style={{ background: wallpaper }}></div>
      <div className="desktop" onClick={handleClick} onContextMenu={handleContextMenu}>
        
        {/* Desktop Icons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px' }}>
          <Icon name="About Me" icon={User} onClick={() => toggleWindow('about')} />
          <Icon name="Education" icon={GraduationCap} onClick={() => toggleWindow('education')} />
          <Icon name="Projects" icon={FolderDot} onClick={() => toggleWindow('projects')} />
          <Icon name="Skills" icon={Wrench} onClick={() => toggleWindow('skills')} />
          <Icon name="Contact" icon={Mail} onClick={() => toggleWindow('contact')} />
          <Icon name="Notepad" icon={FileText} onClick={() => toggleWindow('notepad')} />
          <Icon name="Settings" icon={Settings} onClick={() => toggleWindow('settings')} />
        </div>

        {/* Windows */}
        <Window title="About Me" id="about" isOpen={windows.about.isOpen} isMinimized={windows.about.isMinimized} zIndex={windows.about.zIndex} onClose={toggleWindow} onMinimize={minimizeWindow} onFocus={focusWindow} icon={User}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #0078d7, #00a2ed)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '36px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(0, 120, 215, 0.4)' }}>
              SS
            </div>
            <div>
              <h2 style={{ color: '#0078d7', fontSize: '28px', marginBottom: '4px' }}>Santosh Singh</h2>
              <p style={{ fontSize: '15px', color: '#555', fontWeight: '500' }}>Software Engineering Student | AI Enthusiast</p>
            </div>
          </div>
          <p style={{ fontSize: '15px', lineHeight: '1.7', marginBottom: '25px', color: '#333' }}>
            I am a passionate computer science student at Dehradun Institute of Technology. 
            Driven by the potential of AI and machine learning, I love exploring cutting-edge 
            technologies, building impactful applications, and solving complex real-world problems.
          </p>
        </Window>

        <Window title="Education" id="education" isOpen={windows.education.isOpen} isMinimized={windows.education.isMinimized} zIndex={windows.education.zIndex} onClose={toggleWindow} onMinimize={minimizeWindow} onFocus={focusWindow} icon={GraduationCap}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div>
                <h3 style={{ color: '#0078d7', fontSize: '22px', marginBottom: '5px' }}>Dehradun Institute of Technology</h3>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>Bachelor of Engineering in Computer Science</p>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>Minor: Animation</p>
              </div>
              <div style={{ background: '#f0f4f8', padding: '6px 14px', borderRadius: '20px', fontWeight: '600', color: '#0078d7', fontSize: '13px' }}>
                Expected May 2027
              </div>
            </div>
            <h4 style={{ marginTop: '25px', marginBottom: '15px', color: '#222' }}>Relevant Coursework</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Data Structures', 'Algorithms', 'Operating Systems', 'Software Engineering', 'Artificial Intelligence', 'Data Analysis'].map(course => <span key={course} className="skill-tag">{course}</span>)}
            </div>
          </div>
        </Window>

        <Window title="Projects (GitHub)" id="projects" isOpen={windows.projects.isOpen} isMinimized={windows.projects.isMinimized} zIndex={windows.projects.zIndex} onClose={toggleWindow} onMinimize={minimizeWindow} onFocus={focusWindow} icon={FolderDot}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {loadingProjects ? (
               <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '40px', color: '#666' }}>
                  <div className="spinner" style={{ borderColor: 'rgba(0,120,215,0.2)', borderLeftColor: '#0078d7', margin: '0 auto 15px auto', width: '30px', height: '30px', borderWidth: '3px' }}></div>
                  <p>Fetching repositories from GitHub...</p>
               </div>
            ) : githubProjects.map(repo => (
              <div key={repo.id} className="project-card" style={{ background: 'white', padding: '20px', borderRadius: '10px', borderTop: '4px solid #0078d7', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '17px', color: '#222', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={repo.name}>
                  {repo.name}
                </h3>
                <p style={{ color: '#555', fontSize: '13px', marginBottom: '15px', height: '40px', overflow: 'hidden' }}>
                  {repo.description || "No description provided for this repository."}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '11px', background: '#f0f4f8', color: '#444', padding: '4px 8px', borderRadius: '4px', fontWeight: '600' }}>
                    {repo.language || 'Code'}
                  </span>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="resume-btn" style={{ background: '#24292e', padding: '6px 12px', fontSize: '12px', gap: '6px' }}>
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Window>

        <Window title="Skills" id="skills" isOpen={windows.skills.isOpen} isMinimized={windows.skills.isMinimized} zIndex={windows.skills.zIndex} onClose={toggleWindow} onMinimize={minimizeWindow} onFocus={focusWindow} icon={Wrench}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
             <section style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
                <h4 style={{ color: '#107c10', marginBottom: '15px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LayoutGrid size={18} /> Languages
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Java', 'Python', 'JavaScript'].map(s => <span key={s} className="skill-tag" style={{ color: '#107c10', borderColor: 'rgba(16, 124, 16, 0.2)', backgroundColor: '#f3fbf3' }}>{s}</span>)}
                </div>
              </section>
              <section style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
                <h4 style={{ color: '#0078d7', marginBottom: '15px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Wrench size={18} /> AI & ML
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV'].map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
              </section>
          </div>
        </Window>

        <Window title="Contact" id="contact" isOpen={windows.contact.isOpen} isMinimized={windows.contact.isMinimized} zIndex={windows.contact.zIndex} onClose={toggleWindow} onMinimize={minimizeWindow} onFocus={focusWindow} icon={Mail}>
          <div style={{ textAlign: 'center', padding: '10px' }}>
             <h2 style={{ fontSize: '24px', color: '#222', marginBottom: '10px' }}>Let's Connect!</h2>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '350px', margin: '20px auto' }}>
                <a href="mailto:santosh102969@gmail.com" className="contact-card" style={{ display: 'flex', padding: 15, background: 'white', borderRadius: 8, textDecoration: 'none', color: '#333', border: '1px solid #eee' }}>
                  <Mail size={20} color="#ea4335" style={{ marginRight: 15 }} /> santosh102969@gmail.com
                </a>
                <a href="https://github.com/SantoshSingh1707" target="_blank" rel="noreferrer" className="contact-card" style={{ display: 'flex', padding: 15, background: 'white', borderRadius: 8, textDecoration: 'none', color: '#333', border: '1px solid #eee' }}>
                  <FolderDot size={20} color="#333" style={{ marginRight: 15 }} /> SantoshSingh1707
                </a>
             </div>
             <a href="/Resume.pdf" download className="resume-btn" style={{ background: '#00cc6a', marginTop: 20 }}>
                <Download size={18} /> Download Full Resume
             </a>
          </div>
        </Window>

        <Window title="Settings" id="settings" isOpen={windows.settings.isOpen} isMinimized={windows.settings.isMinimized} zIndex={windows.settings.zIndex} onClose={toggleWindow} onMinimize={minimizeWindow} onFocus={focusWindow} icon={Settings}>
          <h2 style={{ fontSize: '20px', color: '#333', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image size={24} color="#0078d7" /> Personalization
          </h2>
          <p style={{ marginBottom: '15px', color: '#555' }}>Choose your background:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
            {wallpapers.map((bg, index) => (
              <div 
                key={index} 
                onClick={() => setWallpaper(bg)}
                style={{ 
                  height: '80px', 
                  background: bg, 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  border: wallpaper === bg ? '3px solid #0078d7' : '1px solid #ddd',
                  boxShadow: wallpaper === bg ? '0 0 10px rgba(0,120,215,0.4)' : 'none'
                }} 
              />
            ))}
          </div>
        </Window>

        <Window title="Notepad" id="notepad" isOpen={windows.notepad.isOpen} isMinimized={windows.notepad.isMinimized} zIndex={windows.notepad.zIndex} onClose={toggleWindow} onMinimize={minimizeWindow} onFocus={focusWindow} icon={FileText} noPadding>
          <div className="notepad" style={{ height: '100%', width: '100%', padding: '15px', background: 'white' }}>
            <textarea 
              defaultValue={"Welcome to my OS Portfolio!\n\nYou can use this notepad to jot down some temporary thoughts while you explore."} 
              spellCheck="false"
            />
          </div>
        </Window>

        {contextMenu.isOpen && (
          <ContextMenu 
            x={contextMenu.x} 
            y={contextMenu.y} 
            onClose={() => setContextMenu({ ...contextMenu, isOpen: false })} 
            onRefresh={() => window.location.reload()}
            onSettings={() => { if (!windows.settings.isOpen) toggleWindow('settings'); else focusWindow('settings'); }}
          />
        )}

        {isStartOpen && (
          <div className="start-menu" onClick={(e) => e.stopPropagation()}>
            <div className="search-bar">
              <Search size={18} color="#666" />
              <input type="text" placeholder="Type here to search" />
            </div>
            <div>
              <h4 style={{ fontSize: '14px', marginBottom: '15px', color: '#333' }}>Pinned Apps</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', textAlign: 'center' }}>
                {Object.keys(windows).map(id => (
                  <div 
                    key={id} 
                    onClick={() => openAppFromStart(id)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      {React.createElement(windows[id].icon, { size: 24, color: '#0078d7' })}
                    </div>
                    <span style={{ fontSize: '12px', color: '#333' }}>{windows[id].title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderTop: '1px solid #ddd' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0078d7', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>S</div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>Santosh Singh</span>
              </div>
              <Power size={20} color="#666" style={{ cursor: 'pointer' }} onClick={() => alert('Shutting down...')} />
            </div>
          </div>
        )}

        <Taskbar 
          openWindows={windows} 
          activeWindow={activeWindow} 
          onTaskbarClick={handleTaskbarClick}
          onToggleStart={(e) => { e.stopPropagation(); setIsStartOpen(!isStartOpen); setContextMenu({ ...contextMenu, isOpen: false }); }}
          isStartOpen={isStartOpen}
        />
      </div>
    </>
  );
}

export default App;
