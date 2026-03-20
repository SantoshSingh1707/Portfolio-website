import React, { useState, useEffect } from 'react';
import { 
  User, GraduationCap, FolderDot, 
  Wrench, Mail, Settings, FileText,
  LayoutGrid, Download, Terminal, Music, Globe, HardDrive,
  BookOpenText, FlaskConical, BarChart3, Database, Activity, Milestone, Trophy, Bot, Compass
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
import SystemModal from './components/SystemModal';
import SystemToastStack from './components/SystemToastStack';
import ResumeApp from './components/ResumeApp';
import ProjectsApp from './components/ProjectsApp';
import ResearchLabApp from './components/ResearchLabApp';
import LiveDemoApp from './components/LiveDemoApp';
import ExperimentTrackerApp from './components/ExperimentTrackerApp';
import DatasetExplorerApp from './components/DatasetExplorerApp';
import ModelMonitorApp from './components/ModelMonitorApp';
import TimelineApp from './components/TimelineApp';
import AchievementsApp from './components/AchievementsApp';
import AIAssistantApp from './components/AIAssistantApp';
import RecruiterTourApp from './components/RecruiterTourApp';
import TourGuide from './components/TourGuide';
import { recruiterTourSteps } from './data/portfolioSuiteData';
import './App.css';

// Pre-defined Wallpapers
const wallpapers = [
  'radial-gradient(circle at 12% 18%, rgba(102, 210, 255, 0.28), transparent 24%), radial-gradient(circle at 82% 16%, rgba(0, 132, 255, 0.22), transparent 22%), radial-gradient(circle at 52% 82%, rgba(255, 191, 102, 0.18), transparent 26%), linear-gradient(135deg, #07111f 0%, #123454 48%, #214a5f 100%)',
  'linear-gradient(135deg, #ffd2a8 0%, #fef1dd 48%, #d1e8ff 100%)',
  'linear-gradient(160deg, #d9e7f6 0%, #f7fbff 45%, #cdd9ec 100%)',
  'linear-gradient(120deg, #a7d8ff 0%, #e5f6ff 54%, #d1f2e7 100%)',
  'linear-gradient(135deg, #184e77 0%, #1e6091 35%, #76c893 100%)',
  'url("https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1920&auto=format&fit=crop")'
];

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

const STORAGE_KEYS = {
  wallpaper: 'portfolio-os.wallpaper',
  accentColor: 'portfolio-os.accent-color',
  notepadText: 'portfolio-os.notepad-text',
  desktopIcons: 'portfolio-os.desktop-icons',
};

const readStoredString = (key, fallback) => {
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const readStoredJson = (key, fallback) => {
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch {
    return fallback;
  }
};

const defaultDesktopIcons = [
  { id: 'about', name: 'About Me', icon: User, position: { x: 20, y: 20 } },
  { id: 'education', name: 'Education', icon: GraduationCap, position: { x: 20, y: 120 } },
  { id: 'projects', name: 'Projects', icon: FolderDot, position: { x: 20, y: 220 } },
  { id: 'skills', name: 'Skills', icon: Wrench, position: { x: 20, y: 320 } },
  { id: 'contact', name: 'Contact', icon: Mail, position: { x: 20, y: 420 } },
  { id: 'notepad', name: 'Notepad', icon: FileText, position: { x: 120, y: 20 } },
  { id: 'resume', name: 'Resume', icon: FileText, position: { x: 120, y: 120 } },
  { id: 'settings', name: 'Settings', icon: Settings, position: { x: 220, y: 120 } },
  { id: 'terminal', name: 'Terminal', icon: Terminal, position: { x: 120, y: 220 } },
  { id: 'music', name: 'Music', icon: Music, position: { x: 120, y: 320 } },
  { id: 'browser', name: 'Browser', icon: Globe, position: { x: 120, y: 420 } },
  { id: 'explorer', name: 'File Explorer', icon: HardDrive, position: { x: 220, y: 20 } },
  { id: 'researchlab', name: 'Research Lab', icon: BookOpenText, position: { x: 220, y: 220 } },
  { id: 'livedemo', name: 'Live Demo', icon: FlaskConical, position: { x: 220, y: 320 } },
  { id: 'aiassistant', name: 'AI Assistant', icon: Bot, position: { x: 220, y: 420 } },
  { id: 'recruitertour', name: 'Recruiter Tour', icon: Compass, position: { x: 320, y: 20 } },
];

const desktopIconMap = Object.fromEntries(defaultDesktopIcons.map((icon) => [icon.id, icon]));

const hydrateDesktopIcons = (storedIcons) => {
  if (!Array.isArray(storedIcons)) {
    return defaultDesktopIcons;
  }

  const restoredIcons = storedIcons
    .map((item) => {
      const baseIcon = desktopIconMap[item.id];

      if (!baseIcon) {
        return null;
      }

      return {
        ...baseIcon,
        position: item.position || baseIcon.position,
      };
    })
    .filter(Boolean);

  const missingIcons = defaultDesktopIcons.filter(
    (icon) => !restoredIcons.some((restoredIcon) => restoredIcon.id === icon.id),
  );

  return [...restoredIcons, ...missingIcons];
};

function App() {
  const [booting, setBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState([]);
  const [isLocked, setIsLocked] = useState(true);
  const [wallpaper, setWallpaper] = useState(() => readStoredString(STORAGE_KEYS.wallpaper, wallpapers[0]));
  const [notepadText, setNotepadText] = useState(() => readStoredString(
    STORAGE_KEYS.notepadText,
    "Welcome to my OS Portfolio!\n\nYou can use this notepad to jot down some temporary thoughts while you explore.",
  ));
  const [desktopIcons, setDesktopIcons] = useState(() => hydrateDesktopIcons(readStoredJson(STORAGE_KEYS.desktopIcons, null)));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [accentColor, setAccentColor] = useState(() => readStoredString(STORAGE_KEYS.accentColor, '#00a2ed'));
  const [isBsod, setIsBsod] = useState(false);
  const [windows, setWindows] = useState({});
  const [activeWindow, setActiveWindow] = useState(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0 });
  const [modal, setModal] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [tourIndex, setTourIndex] = useState(null);

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

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.wallpaper, wallpaper);
  }, [wallpaper]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.accentColor, accentColor);
  }, [accentColor]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.notepadText, notepadText);
  }, [notepadText]);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.desktopIcons,
      JSON.stringify(desktopIcons.map(({ id, position }) => ({ id, position }))),
    );
  }, [desktopIcons]);

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

  const updateIconPosition = (id, newPos) => {
    setDesktopIcons(prev => prev.map(icon => 
      icon.id === id ? { ...icon, position: newPos } : icon
    ));
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const pushToast = ({ title, description, tone = 'info' }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((prev) => [...prev, { id, title, description, tone }]);
    window.setTimeout(() => dismissToast(id), 3600);
  };

  const closeModal = () => {
    setModal(null);
  };

  const openExternalResource = (url, label = 'Link') => {
    window.open(url, '_blank', 'noopener,noreferrer');
    pushToast({
      tone: 'info',
      title: `${label} opened externally`,
      description: 'Launched in a real browser tab for the best experience.',
    });
  };

  
  const appConfigs = {
    about: { title: 'About Me', icon: User },
    education: { title: 'Education', icon: GraduationCap },
    projects: { title: 'Projects', icon: FolderDot },
    skills: { title: 'Skills', icon: Wrench },
    contact: { title: 'Contact', icon: Mail },
    settings: { title: 'Settings', icon: Settings },
    notepad: { title: 'Notepad', icon: FileText },
    resume: { title: 'Resume', icon: FileText },
    terminal: { title: 'Terminal', icon: Terminal },
    music: { title: 'Music Player', icon: Music },
    browser: { title: 'Web Browser', icon: Globe },
    explorer: { title: 'File Explorer', icon: HardDrive },
    taskmanager: { title: 'Task Manager', icon: LayoutGrid },
    researchlab: { title: 'Research Lab', icon: BookOpenText },
    livedemo: { title: 'Live Demo', icon: FlaskConical },
    experimenttracker: { title: 'Experiment Tracker', icon: BarChart3 },
    datasetexplorer: { title: 'Dataset Explorer', icon: Database },
    modelmonitor: { title: 'Model Monitor', icon: Activity },
    timeline: { title: 'Timeline', icon: Milestone },
    achievements: { title: 'Achievements', icon: Trophy },
    aiassistant: { title: 'AI Assistant', icon: Bot },
    recruitertour: { title: 'Recruiter Tour', icon: Compass },
  };

  const openApp = (type) => {
    playSfx('click');
    setIsStartOpen(false);

    if (isMobile) {
      const existingMobileWindow = Object.entries(windows).find(([, win]) => win.type === type);

      if (existingMobileWindow) {
        focusWindow(existingMobileWindow[0]);
        return;
      }
    }
    
    // For some apps (like Settings), maybe keep only one instance?
    // But for now, let's allow multi for everything.
    const instanceId = `${type}-${Date.now()}`;
    const z = bringToFront();
    
    setWindows(prev => ({
      ...prev,
      [instanceId]: {
        ...appConfigs[type],
        type,
        isOpen: true,
        isMinimized: false,
        isFullscreen: isMobile,
        snap: 'none',
        zIndex: z,
        launchIndex: Object.keys(prev).length % 5
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

  const bringToFront = () => {
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

  const openOrFocusApp = (type) => {
    const existingWindow = Object.entries(windows).find(([, windowConfig]) => windowConfig.type === type);

    if (existingWindow) {
      focusWindow(existingWindow[0]);
      return existingWindow[0];
    }

    openApp(type);
    return null;
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
    const menuWidth = 240;
    const menuHeight = 260;
    setContextMenu({
      isOpen: true,
      x: Math.min(e.pageX, window.innerWidth - menuWidth),
      y: Math.min(e.pageY, window.innerHeight - menuHeight),
    });
    setIsStartOpen(false);
  };

  const handleClick = () => {
    if (contextMenu.isOpen) setContextMenu({ ...contextMenu, isOpen: false });
    if (isStartOpen) setIsStartOpen(false);
  };

  const handleSortIcons = () => {
    playSfx('click');
    setDesktopIcons(prev => [...prev].sort((a, b) => a.name.localeCompare(b.name)));
    pushToast({
      tone: 'success',
      title: 'Desktop sorted',
      description: 'Icons were organized alphabetically.',
    });
  };

  const handleWallpaperChange = (nextWallpaper) => {
    setWallpaper(nextWallpaper);
    pushToast({
      tone: 'success',
      title: 'Wallpaper updated',
      description: 'Your desktop background was refreshed.',
    });
  };

  const handleAccentChange = (nextAccentColor) => {
    setAccentColor(nextAccentColor);
    pushToast({
      tone: 'success',
      title: 'Accent color changed',
      description: 'The interface palette updated instantly.',
    });
  };

  const handleSystemInfo = () => {
    setModal({
      tone: 'info',
      title: 'System Information',
      subtitle: 'Santosh Portfolio OS v2.0.4',
      description: 'A desktop-style portfolio focused on machine learning projects, interactive apps, and playful UI systems.',
      details: [
        { label: 'Build', value: '2026.03.20' },
        { label: 'Environment', value: 'React + Vite' },
        { label: 'Primary Focus', value: 'AI / ML Projects' },
        { label: 'Lab Apps', value: '9 showcase windows' },
        { label: 'Mode', value: isMobile ? 'Mobile Touch' : 'Desktop Workspace' },
      ],
      actions: [{ label: 'Close', variant: 'primary' }],
    });
  };

  const handleShutdownPrompt = () => {
    setModal({
      tone: 'warning',
      title: 'Power Options',
      subtitle: 'Choose how to leave the workspace',
      description: 'You can lock the system or reboot the full desktop experience.',
      actions: [
        { label: 'Cancel', variant: 'ghost' },
        {
          label: 'Lock Screen',
          variant: 'primary',
          onClick: () => {
            setWindows({});
            setActiveWindow(null);
            setIsStartOpen(false);
            setContextMenu({ isOpen: false, x: 0, y: 0 });
            setIsLocked(true);
            pushToast({
              tone: 'info',
              title: 'Session locked',
              description: 'The desktop was returned to the sign-in screen.',
            });
          },
        },
        {
          label: 'Restart',
          variant: 'danger',
          onClick: () => {
            handleRestart();
          },
        },
      ],
    });
  };

  const handleFilePreview = ({ name, path }) => {
    const actions = [{ label: 'Close', variant: 'ghost' }];

    if (name === 'Resume.pdf') {
      actions.unshift({
        label: 'Open Resume App',
        variant: 'primary',
        onClick: () => openApp('resume'),
      });
    }

    setModal({
      tone: 'info',
      title: 'File Preview',
      subtitle: name,
      description: 'This desktop uses lightweight previews for files inside the mock file explorer.',
      details: [
        { label: 'Name', value: name },
        { label: 'Location', value: path },
        { label: 'Status', value: 'Preview mode' },
      ],
      actions,
    });
  };

  const handleKernelShutdownRequest = () => {
    setModal({
      tone: 'danger',
      title: 'Critical Process Warning',
      subtitle: 'System Kernel',
      description: 'Ending this process will intentionally trigger a system crash screen for the portfolio demo.',
      actions: [
        { label: 'Cancel', variant: 'ghost' },
        {
          label: 'End Process',
          variant: 'danger',
          onClick: () => setIsBsod(true),
        },
      ],
    });
  };

  const finishRecruiterTour = () => {
    setTourIndex(null);
    pushToast({
      tone: 'success',
      title: 'Tour complete',
      description: 'The recruiter walkthrough finished successfully.',
    });
  };

  const startRecruiterTour = () => {
    setTourIndex(0);
    openOrFocusApp(recruiterTourSteps[0].id);
    pushToast({
      tone: 'info',
      title: 'Recruiter tour started',
      description: 'Use the floating guide to move through the strongest portfolio checkpoints.',
    });
  };

  const goToTourStep = (nextIndex) => {
    const nextStep = recruiterTourSteps[nextIndex];

    if (!nextStep) {
      finishRecruiterTour();
      return;
    }

    setTourIndex(nextIndex);
    openOrFocusApp(nextStep.id);
  };

  const handleNextTourStep = () => {
    if (tourIndex == null) {
      return;
    }

    goToTourStep(tourIndex + 1);
  };

  const handlePreviousTourStep = () => {
    if (tourIndex == null || tourIndex === 0) {
      return;
    }

    goToTourStep(tourIndex - 1);
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
          style={getWallpaperStyle(wallpaper, { filter: 'blur(20px)', transform: 'scale(1.1)' })}
        ></div>
        <LoginScreen onLogin={() => { setIsLocked(false); }} playSfx={playSfx} />
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
    initialIndex: windows[instanceId].launchIndex ?? 0,
    isActive: activeWindow === instanceId,
    noPadding: [
      'browser', 'settings', 'music', 'explorer', 'taskmanager', 'terminal', 'notepad', 'resume',
      'researchlab', 'livedemo', 'experimenttracker', 'datasetexplorer', 'modelmonitor',
      'timeline', 'achievements', 'aiassistant', 'recruitertour',
    ].includes(windows[instanceId].type),
    onClose: () => closeWindow(instanceId),
    onMinimize: () => minimizeWindow(instanceId),
    onFocus: () => focusWindow(instanceId),
    onToggleFullscreen: () => toggleFullscreen(instanceId),
    onSnap: (snap) => setWindowSnap(instanceId, snap)
  });

  return (
    <div style={{ '--accent-color': accentColor, height: '100%', position: 'relative' }}>
      <div 
        className="desktop-bg" 
        style={getWallpaperStyle(wallpaper)}
      ></div>
      <div className={`desktop ${isMobile ? 'mobile-mode' : ''}`} onClick={handleClick} onContextMenu={handleContextMenu}>
        <DesktopAtmosphere />
        {isMobile && (
          <div className="mobile-home-banner">
            <span>Mobile mode</span>
            <strong>Tap icons once to open apps. Windows launch full-screen.</strong>
          </div>
        )}
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
              onActivate={() => openApp(icon.id)}
              onDoubleClick={() => openApp(icon.id)}
            />
          ))}
        </div>

        <DesktopWidgets />

        {Object.entries(windows).map(([instanceId, win]) => (
          <Window key={instanceId} {...getWindowProps(instanceId)}>
            {win.type === 'about' && (
              <div className="about-content">
                <section className="about-hero-card">
                  <div className="about-header">
                    <div className="avatar-circle">SS</div>
                    <div>
                      <p className="section-eyebrow">Open for internships and collaborative builds</p>
                      <h2 className="title-text">Aithani Santosh Singh</h2>
                      <p className="subtitle-text">Software Engineering Student | AI Enthusiast</p>
                    </div>
                  </div>
                  <div className="about-actions">
                    <button type="button" className="resume-btn" onClick={() => openApp('resume')}>
                      <Download size={16} />
                      Resume App
                    </button>
                    <a href="https://github.com/SantoshSingh1707" target="_blank" rel="noreferrer" className="resume-btn warning-bg">
                      GitHub
                    </a>
                  </div>
                </section>

                <div className="about-stats-grid">
                  <div className="stat-card">
                    <span className="stat-label">Focus</span>
                    <strong>AI + Machine Learning</strong>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Current Track</span>
                    <strong>ML Systems</strong>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Based In</span>
                    <strong>Dehradun, India</strong>
                  </div>
                </div>

                <section className="glass-card about-story">
                  <div className="body-text">
                    <p style={{ marginBottom: '15px' }}>
                      I am a passionate computer science student at Dehradun Institute of Technology.
                      Driven by the potential of AI and machine learning, I explore cutting-edge
                      technologies, build impactful applications, and solve complex problems.
                    </p>
                    <p>
                      My strongest work centers on <strong>machine learning pipelines</strong>,
                      <strong> retrieval-augmented AI tools</strong>, and building systems that turn
                      data into useful predictions. I also keep sharpening my foundation through
                      <strong> Data Structures & Algorithms in C/Java</strong>. Check out my GitHub
                      <code> SantoshSingh1707</code> to follow the journey.
                    </p>
                  </div>
                </section>
              </div>
            )}
            {win.type === 'education' && (
              <div className="education-layout">
                <div className="glass-card education-hero">
                  <div className="flex-between">
                    <div>
                      <p className="section-eyebrow">Education</p>
                      <h3 className="card-title">Dehradun Institute of Technology</h3>
                      <p className="card-subtitle">Bachelor of Engineering in Computer Science</p>
                      <p className="card-detail">Minor: Animation</p>
                    </div>
                    <div className="badge">Expected May 2027</div>
                  </div>
                  <p className="card-detail">
                    Building strong engineering fundamentals while exploring human-centered interfaces,
                    machine learning systems, and product thinking.
                  </p>
                </div>

                <div className="grid-2">
                  <section className="glass-card">
                    <h4 className="section-title">Relevant Coursework</h4>
                    <div className="flex-wrap">
                      {['Data Structures', 'Algorithms', 'Operating Systems', 'Software Engineering', 'Artificial Intelligence', 'Data Analysis'].map(course => (
                        <span key={course} className="skill-tag">{course}</span>
                      ))}
                    </div>
                  </section>
                  <section className="glass-card">
                    <h4 className="section-title">Highlights</h4>
                    <ul className="project-list compact">
                      <li>Combining core CS learning with applied AI and machine learning experimentation.</li>
                      <li>Growing depth in Python, model training workflows, and production ML tooling.</li>
                      <li>Using project-based learning to turn coursework into practical ML products.</li>
                    </ul>
                  </section>
                </div>
              </div>
            )}
            {win.type === 'projects' && <ProjectsApp onOpenExternal={openExternalResource} />}
            {win.type === 'skills' && (
              <div className="skills-grid">
                <section className="glass-card">
                  <h4 className="skill-section-title success-text">
                    <LayoutGrid size={18} /> Core Languages
                  </h4>
                  <div className="flex-wrap">
                    {['Python', 'Java', 'C'].map(s => <span key={s} className="skill-tag success-tag">{s}</span>)}
                  </div>
                </section>
                <section className="glass-card">
                  <h4 className="skill-section-title primary-text">
                    <Wrench size={18} /> AI & ML
                  </h4>
                  <div className="flex-wrap">
                    {['TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV', 'MLflow', 'LangChain', 'ChromaDB'].map(s => <span key={s} className="skill-tag">{s}</span>)}
                  </div>
                </section>
                <section className="glass-card">
                  <h4 className="skill-section-title accent-text">
                    <Globe size={18} /> Data & Workflow
                  </h4>
                  <div className="flex-wrap">
                    {['Pandas', 'NumPy', 'DVC', 'Jupyter', 'Data Preprocessing'].map(s => <span key={s} className="skill-tag accent-tag">{s}</span>)}
                  </div>
                </section>
                <section className="glass-card">
                  <h4 className="skill-section-title warning-text">
                    <Settings size={18} /> ML Engineering
                  </h4>
                  <div className="flex-wrap">
                    {['Model Training', 'Evaluation', 'Experiment Tracking', 'Pipeline Thinking', 'Problem Solving'].map(s => <span key={s} className="skill-tag warning-tag">{s}</span>)}
                  </div>
                </section>
              </div>
            )}
            {win.type === 'contact' && (
              <div className="contact-shell">
                <section className="glass-card contact-hero">
                  <p className="section-eyebrow">Contact</p>
                  <h2 className="title-text-dark">Let's build something thoughtful.</h2>
                  <p className="body-text">
                    Reach out for internships, collaboration, project discussions, or just a good
                    engineering conversation.
                  </p>
                </section>
                <div className="contact-card-grid">
                  <a href="mailto:santosh102969@gmail.com" className="contact-card">
                    <Mail size={20} color="#ea4335" /> santosh102969@gmail.com
                  </a>
                  <a href="https://github.com/SantoshSingh1707" target="_blank" rel="noreferrer" className="contact-card">
                    <FolderDot size={20} color="#333" /> github.com/SantoshSingh1707
                  </a>
                  <button type="button" className="contact-card contact-card-button" onClick={() => openApp('resume')}>
                    <Download size={20} color="#0078d7" /> Resume App
                  </button>
                </div>
              </div>
            )}
            {win.type === 'settings' && (
              <SettingsApp 
                currentWallpaper={wallpaper} 
                setWallpaper={handleWallpaperChange} 
                wallpapers={wallpapers} 
                accentColor={accentColor}
                setAccentColor={handleAccentChange}
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
            {win.type === 'terminal' && <TerminalApp onOpenApp={openApp} onStartTour={startRecruiterTour} />}
            {win.type === 'music' && <MusicPlayer />}
            {win.type === 'browser' && <BrowserApp onOpenExternal={openExternalResource} />}
            {win.type === 'explorer' && <FileExplorer onPreviewFile={handleFilePreview} />}
            {win.type === 'resume' && <ResumeApp onOpenResume={openExternalResource} />}
            {win.type === 'researchlab' && <ResearchLabApp onOpenExternal={openExternalResource} />}
            {win.type === 'livedemo' && <LiveDemoApp />}
            {win.type === 'experimenttracker' && <ExperimentTrackerApp />}
            {win.type === 'datasetexplorer' && <DatasetExplorerApp />}
            {win.type === 'modelmonitor' && <ModelMonitorApp />}
            {win.type === 'timeline' && <TimelineApp />}
            {win.type === 'achievements' && <AchievementsApp />}
            {win.type === 'aiassistant' && <AIAssistantApp onOpenApp={openApp} />}
            {win.type === 'recruitertour' && (
              <RecruiterTourApp onStartTour={startRecruiterTour} onOpenApp={openOrFocusApp} steps={recruiterTourSteps} />
            )}
            {win.type === 'taskmanager' && (
              <TaskManager 
                windows={windows} 
                onClose={closeWindow} 
                onFocus={focusWindow} 
                onBsodRequest={handleKernelShutdownRequest} 
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
            onSystemInfo={handleSystemInfo}
          />
        )}

        {isStartOpen && (
          <StartMenu onOpenApp={openApp} onShutdown={handleShutdownPrompt} onStartTour={startRecruiterTour} />
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
        <TourGuide
          step={tourIndex != null ? recruiterTourSteps[tourIndex] : null}
          currentIndex={tourIndex ?? 0}
          totalSteps={recruiterTourSteps.length}
          onNext={handleNextTourStep}
          onPrevious={handlePreviousTourStep}
          onClose={finishRecruiterTour}
        />
        <SystemModal modal={modal} onClose={closeModal} />
        <SystemToastStack toasts={toasts} onDismiss={dismissToast} />
      </div>
    </div>
  );
}

export default App;
