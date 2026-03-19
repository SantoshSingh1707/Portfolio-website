import React, { useState, useEffect } from 'react';
import { 
  User, GraduationCap, FolderDot, 
  Wrench, Mail, Settings, FileText,
  LayoutGrid, Download, Terminal, Linkedin, Twitter, Instagram, Music, Globe, HardDrive
} from 'lucide-react';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import DesktopIcon from './components/DesktopIcon';
import ContextMenu from './components/ContextMenu';
import TerminalApp from './components/TerminalApp';
import LoginScreen from './components/LoginScreen';
import SettingsApp from './components/SettingsApp';
import DesktopWidgets from './components/DesktopWidgets';
import MusicPlayer from './components/MusicPlayer';
import BrowserApp from './components/BrowserApp';
import FileExplorer from './components/FileExplorer';
import DesktopAtmosphere from './components/DesktopAtmosphere';
import TaskManager from './components/TaskManager';
import BsodScreen from './components/BsodScreen';
import './App.css';

// Pre-defined Wallpapers
const wallpapers = [
  'radial-gradient(circle at 15% 50%, rgba(0, 102, 204, 0.4), transparent 25%), radial-gradient(circle at 85% 30%, rgba(0, 204, 255, 0.4), transparent 25%), radial-gradient(circle at 50% 80%, rgba(102, 0, 204, 0.4), transparent 25%), linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
  'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
  'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
  'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  'url("https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1920&auto=format&fit=crop")'
];

function App() {
  const [booting, setBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState([]);
  const [isLocked, setIsLocked] = useState(true);
  const [wallpaper, setWallpaper] = useState(wallpapers[0]);
  const [notepadText, setNotepadText] = useState("Welcome to my OS Portfolio!\n\nYou can use this notepad to jot down some temporary thoughts while you explore.");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [accentColor, setAccentColor] = useState('#00a2ed');
  const [isBsod, setIsBsod] = useState(false);
  const [windows, setWindows] = useState({});
  const [activeWindow, setActiveWindow] = useState(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0 });

  const runBootSequence = (isReboot = false) => {
    setBooting(true);
    setBootLogs([]);
    const logs = isReboot ? [
      "REBOOTING SYSTEM...",
      "CLEARING CACHED MEMORY...",
      "RELOADING KERNEL...",
      "SYSTEM RESTORED. OK.",
      "STARTING GUI..."
    ] : [
      "SEARCHING FOR BOOT DEVICE...",
      "DEVICE FOUND: SSD-0: SANTOSH-PORTFOLIO-OS",
      "LOADING SYSTEM KERNEL...",
      "VERIFYING CHECKSUMS... OK",
      "INITIALIZING CORE DRIVERS...",
      "NETWORK STACK... ONLINE",
      "GUI SUBSYSTEM... LOADING",
      "STARTING PORTFOLIO OS v2.0.4..."
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setBootLogs(prev => [...prev, logs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 800);
      }
    }, 400);
    return () => clearInterval(interval);
  };

  const handleRestart = () => {
    setIsBsod(false);
    setWindows({});
    setIsLocked(true);
    runBootSequence(true);
  };

  useEffect(() => {
    return runBootSequence();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const playSfx = (type) => {
    const sounds = {
      click: 'https://www.soundjay.com/buttons/button-16.mp3',
      error: 'https://www.soundjay.com/buttons/beep-10.mp3',
      login: 'https://www.soundjay.com/buttons/button-29.mp3',
      startup: 'https://www.soundjay.com/buttons/button-09.mp3'
    };
    if (sounds[type]) {
      const audio = new Audio(sounds[type]);
      audio.volume = 0.2;
      audio.play().catch(() => {}); // ignore autoplay blocks
    }
  };


  
  const [desktopIcons, setDesktopIcons] = useState([
    { id: 'about', name: 'About Me', icon: User, position: { x: 20, y: 20 } },
    { id: 'education', name: 'Education', icon: GraduationCap, position: { x: 20, y: 120 } },
    { id: 'projects', name: 'Projects', icon: FolderDot, position: { x: 20, y: 220 } },
    { id: 'skills', name: 'Skills', icon: Wrench, position: { x: 20, y: 320 } },
    { id: 'contact', name: 'Contact', icon: Mail, position: { x: 20, y: 420 } },
    { id: 'notepad', name: 'Notepad', icon: FileText, position: { x: 120, y: 20 } },
    { id: 'settings', name: 'Settings', icon: Settings, position: { x: 120, y: 120 } },
    { id: 'terminal', name: 'Terminal', icon: Terminal, position: { x: 120, y: 220 } },
    { id: 'music', name: 'Music', icon: Music, position: { x: 120, y: 320 } },
    { id: 'browser', name: 'Browser', icon: Globe, position: { x: 120, y: 420 } },
    { id: 'explorer', name: 'File Explorer', icon: HardDrive, position: { x: 220, y: 20 } },
  ]);

  const updateIconPosition = (id, newPos) => {
    setDesktopIcons(prev => prev.map(icon => 
      icon.id === id ? { ...icon, position: newPos } : icon
    ));
  };


  


  const appConfigs = {
    about: { title: 'About Me', icon: User },
    education: { title: 'Education', icon: GraduationCap },
    projects: { title: 'Projects', icon: FolderDot },
    skills: { title: 'Skills', icon: Wrench },
    contact: { title: 'Contact', icon: Mail },
    settings: { title: 'Settings', icon: Settings },
    notepad: { title: 'Notepad', icon: FileText },
    terminal: { title: 'Terminal', icon: Terminal },
    music: { title: 'Music Player', icon: Music },
    browser: { title: 'Web Browser', icon: Globe },
    explorer: { title: 'File Explorer', icon: HardDrive },
    taskmanager: { title: 'Task Manager', icon: LayoutGrid }
  };

  const openApp = (type) => {
    playSfx('click');
    setIsStartOpen(false);
    
    // For some apps (like Settings), maybe keep only one instance?
    // But for now, let's allow multi for everything.
    const instanceId = `${type}-${Date.now()}`;
    const z = bringToFront(instanceId);
    
    setWindows(prev => ({
      ...prev,
      [instanceId]: {
        ...appConfigs[type],
        type,
        isOpen: true,
        isMinimized: false,
        isFullscreen: false,
        snap: 'none',
        zIndex: z
      }
    }));
    setActiveWindow(instanceId);
  };

  const closeWindow = (instanceId) => {
    playSfx('click');
    setWindows(prev => {
      const newWindows = { ...prev };
      delete newWindows[instanceId];
      return newWindows;
    });
    if (activeWindow === instanceId) setActiveWindow(null);
  };

  const bringToFront = (id) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    return newZIndex;
  };

  const toggleWindowMinimize = (instanceId) => {
    playSfx('click');
    const isMinimized = !windows[instanceId].isMinimized;
    
    if (!isMinimized) {
      const z = bringToFront(instanceId);
      setWindows(prev => ({
        ...prev,
        [instanceId]: { ...prev[instanceId], isMinimized: false, zIndex: z }
      }));
      setActiveWindow(instanceId);
    } else {
      setWindows(prev => ({
        ...prev,
        [instanceId]: { ...prev[instanceId], isMinimized: true }
      }));
      if (activeWindow === instanceId) setActiveWindow(null);
    }
  };

  const focusWindow = (instanceId) => {
    if (windows[instanceId].isMinimized) {
      toggleWindowMinimize(instanceId);
      return;
    }
    if (activeWindow === instanceId) return;
    setIsStartOpen(false);
    setActiveWindow(instanceId);
    const z = bringToFront(instanceId);
    setWindows(prev => ({
      ...prev,
      [instanceId]: { ...prev[instanceId], zIndex: z }
    }));
  };

  const minimizeWindow = (instanceId) => {
    setWindows(prev => ({
      ...prev,
      [instanceId]: { ...prev[instanceId], isMinimized: true }
    }));
    if (activeWindow === instanceId) setActiveWindow(null);
  };

  const toggleFullscreen = (instanceId) => {
    setWindows(prev => ({
      ...prev,
      [instanceId]: { ...prev[instanceId], isFullscreen: !prev[instanceId].isFullscreen, snap: 'none' }
    }));
    focusWindow(instanceId);
  };

  const setWindowSnap = (instanceId, snap) => {
    setWindows(prev => ({
      ...prev,
      [instanceId]: { ...prev[instanceId], snap, isFullscreen: false }
    }));
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

  const handleSortIcons = () => {
    playSfx('click');
    setDesktopIcons(prev => [...prev].sort((a, b) => a.name.localeCompare(b.name)));
  };

  if (booting) {
    return (
      <div className="bios-screen">
        <div className="bios-header">
          <div className="bios-logo">AMI</div>
          <div className="bios-info">
            <p>American Megatrends (C) 2026</p>
            <p>Santosh Portfolio OS Release 2.0.4</p>
          </div>
        </div>
        <div className="bios-logs">
          {bootLogs.map((log, i) => (
            <div key={i} className="bios-log-line">{'>'} {log}</div>
          ))}
          <div className="bios-cursor"></div>
        </div>
      </div>
    );
  }

  if (isLocked) {
    return (
      <>
        <div 
          className="desktop-bg" 
          style={{ background: wallpaper, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px)', transform: 'scale(1.1)' }}
        ></div>
        <LoginScreen onLogin={() => { setIsLocked(false); openApp('about'); }} playSfx={playSfx} />
      </>
    );
  }

  const getWindowProps = (instanceId) => ({
    id: instanceId,
    title: windows[instanceId].title,
    icon: windows[instanceId].icon,
    isOpen: windows[instanceId].isOpen,
    isMinimized: windows[instanceId].isMinimized,
    isFullscreen: windows[instanceId].isFullscreen,
    snap: windows[instanceId].snap,
    zIndex: windows[instanceId].zIndex,
    onClose: () => closeWindow(instanceId),
    onMinimize: () => minimizeWindow(instanceId),
    onFocus: () => focusWindow(instanceId),
    onToggleFullscreen: () => toggleFullscreen(instanceId),
    onSnap: (snap) => setWindowSnap(instanceId, snap)
  });

  return (
    <div style={{ '--accent-color': accentColor }}>
      <div 
        className="desktop-bg" 
        style={{ background: wallpaper, backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>
      <div className="desktop" onClick={handleClick} onContextMenu={handleContextMenu}>
        <DesktopAtmosphere />
        <div className="desktop-icons-container">
          {desktopIcons.map((icon) => (
            <DesktopIcon 
              key={icon.id}
              id={icon.id}
              name={icon.name}
              icon={icon.icon}
              position={icon.position}
              disabled={isMobile}
              onDragStop={(newPos) => updateIconPosition(icon.id, newPos)}
              onDoubleClick={() => openApp(icon.id)}
            />
          ))}
        </div>

        <DesktopWidgets />

        {Object.entries(windows).map(([instanceId, win]) => (
          <Window key={instanceId} {...getWindowProps(instanceId)}>
            {win.type === 'about' && (
              <div className="about-content">
                <div className="about-header">
                  <div className="avatar-circle">SS</div>
                  <div>
                    <h2 className="title-text">Aithani Santosh Singh</h2>
                    <p className="subtitle-text">Software Engineering Student | AI Enthusiast</p>
                  </div>
                </div>
                <div className="body-text">
                  <p style={{ marginBottom: '15px' }}>
                    I am a passionate computer science student at Dehradun Institute of Technology. 
                    Driven by the potential of AI and machine learning, I explore cutting-edge 
                    technologies, build impactful applications, and solve complex problems.
                  </p>
                  <p>
                    I regularly work on open-source projects including <strong>Machine Learning</strong>, 
                    <strong> Anime Character sites</strong>, and practicing <strong>Data Structures & Algorithms in C/Java</strong>. 
                    Check out my GitHub <code>SantoshSingh1707</code> to follow my journey!
                  </p>
                </div>
              </div>
            )}
            {win.type === 'education' && (
              <div className="glass-card">
                <div className="flex-between">
                  <div>
                    <h3 className="card-title">Dehradun Institute of Technology</h3>
                    <p className="card-subtitle">Bachelor of Engineering in Computer Science</p>
                    <p className="card-detail">Minor: Animation</p>
                  </div>
                  <div className="badge">Expected May 2027</div>
                </div>
                <h4 className="section-title">Relevant Coursework</h4>
                <div className="flex-wrap">
                  {['Data Structures', 'Algorithms', 'Operating Systems', 'Software Engineering', 'Artificial Intelligence', 'Data Analysis'].map(course => (
                    <span key={course} className="skill-tag">{course}</span>
                  ))}
                </div>
              </div>
            )}
            {win.type === 'projects' && (
              <div className="grid-2" style={{ padding: '10px' }}>
                <div className="glass-card accent-left" style={{ padding: '20px' }}>
                  <h3 className="card-title-dark" style={{ fontSize: '20px' }}>AI Study Tool</h3>
                  <p className="card-subtitle-accent" style={{ margin: '4px 0 10px 0' }}>RAG Quiz Platform</p>
                  <ul className="project-list" style={{ marginBottom: '15px', paddingLeft: '15px', fontSize: '14px' }}>
                    <li>Built with LangChain, Mistral AI, & ChromaDB.</li>
                    <li>Generates quizzes from PDFs/DOCX using GenAI.</li>
                  </ul>
                  <a href="https://github.com/SantoshSingh1707/AI-Study-Tool" target="_blank" rel="noreferrer" className="resume-btn warning-bg" style={{ padding: '8px 16px', fontSize: '13px' }}>
                    Source Code
                  </a>
                </div>
                {/* ... other projects ... */}
                <div className="glass-card" style={{ padding: '20px', borderLeft: '6px solid #00a2ed' }}>
                  <h3 className="card-title-dark" style={{ fontSize: '20px' }}>Kidney Disease Classifier</h3>
                  <p className="card-subtitle-accent" style={{ margin: '4px 0 10px 0', color: '#00a2ed' }}>End-to-End ML Pipeline</p>
                  <ul className="project-list" style={{ marginBottom: '15px', paddingLeft: '15px', fontSize: '14px' }}>
                    <li>DVC, MLflow tracking, & CI/CD integration.</li>
                    <li>Production-grade classification system.</li>
                  </ul>
                </div>
              </div>
            )}
            {win.type === 'skills' && (
              <div className="grid-2">
                <section className="glass-card">
                  <h4 className="skill-section-title success-text">
                    <LayoutGrid size={18} /> Languages
                  </h4>
                  <div className="flex-wrap">
                    {['Java', 'Python', 'JavaScript'].map(s => <span key={s} className="skill-tag success-tag">{s}</span>)}
                  </div>
                </section>
                <section className="glass-card">
                  <h4 className="skill-section-title primary-text">
                    <Wrench size={18} /> AI & ML
                  </h4>
                  <div className="flex-wrap">
                    {['TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV'].map(s => <span key={s} className="skill-tag">{s}</span>)}
                  </div>
                </section>
              </div>
            )}
            {win.type === 'contact' && (
              <div className="center-content">
                <h2 className="title-text-dark">Let's Connect!</h2>
                <div className="contact-card-container">
                  <a href="mailto:santosh102969@gmail.com" className="contact-card">
                    <Mail size={20} color="#ea4335" /> santosh102969@gmail.com
                  </a>
                  <a href="https://github.com/SantoshSingh1707" target="_blank" rel="noreferrer" className="contact-card">
                    <FolderDot size={20} color="#333" /> GitHub
                  </a>
                </div>
              </div>
            )}
            {win.type === 'settings' && (
              <SettingsApp 
                currentWallpaper={wallpaper} 
                setWallpaper={setWallpaper} 
                wallpapers={wallpapers} 
                accentColor={accentColor}
                setAccentColor={setAccentColor}
              />
            )}
            {win.type === 'notepad' && (
              <div className="notepad-container">
                <textarea 
                  value={notepadText}
                  onChange={(e) => setNotepadText(e.target.value)}
                  className="notepad-textarea"
                />
              </div>
            )}
            {win.type === 'terminal' && <TerminalApp />}
            {win.type === 'music' && <MusicPlayer />}
            {win.type === 'browser' && <BrowserApp />}
            {win.type === 'explorer' && <FileExplorer />}
            {win.type === 'taskmanager' && (
              <TaskManager 
                windows={windows} 
                onClose={closeWindow} 
                onFocus={focusWindow} 
                onBsod={() => setIsBsod(true)} 
              />
            )}
          </Window>
        ))}

        {/* Start Menu, Context Menu, Taskbar */}
        {contextMenu.isOpen && (
          <ContextMenu 
            x={contextMenu.x} y={contextMenu.y} 
            onClose={() => setContextMenu({ ...contextMenu, isOpen: false })} 
            onRefresh={() => window.location.reload()}
            onSort={handleSortIcons}
            onSettings={() => openApp('settings')}
          />
        )}

        {isStartOpen && (
          <StartMenu windows={windows} onOpenApp={openApp} focusWindow={focusWindow} />
        )}

        <Taskbar 
          openWindows={windows} 
          activeWindow={activeWindow} 
          onFocus={focusWindow}
          onOpenApp={openApp}
          onToggleStart={(e) => { e.stopPropagation(); setIsStartOpen(!isStartOpen); setContextMenu({ ...contextMenu, isOpen: false }); }}
          isStartOpen={isStartOpen}
        />
        
        {isBsod && <BsodScreen onRestart={handleRestart} />}
      </div>
    </div>
  );
}

export default App;
