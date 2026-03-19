import React, { useState } from 'react';
import { HardDrive, Folder, FileText, Image as ImageIcon, ChevronLeft, ChevronRight, ArrowUp, RefreshCw } from 'lucide-react';

const mockFileSystem = {
  'This PC': {
    type: 'folder',
    children: ['Local Disk (C:)', 'Documents', 'Downloads', 'Pictures']
  },
  'Local Disk (C:)': {
    type: 'folder',
    children: ['Windows', 'Program Files', 'Users']
  },
  'Documents': {
    type: 'folder',
    children: ['Resume.pdf', 'CoverLetter.docx', 'Projects']
  },
  'Downloads': {
    type: 'folder',
    children: ['installer.exe', 'vscode.zip']
  },
  'Pictures': {
    type: 'folder',
    children: ['vacation.jpg', 'profile.png']
  },
  'Projects': {
    type: 'folder',
    children: ['MachineLearning.md', 'AI_Study_Tool.md']
  }
};

const FileExplorer = () => {
  const [history, setHistory] = useState(['This PC']);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPath = history[currentIndex];
  // Fallback to empty directory if mapping is missing
  const currentFolder = mockFileSystem[currentPath] || { children: [] };

  const navigateTo = (folderName) => {
    if (mockFileSystem[folderName]) {
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(folderName);
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    } else {
      // It's a file
      alert(`Opening ${folderName}... (Preview)`);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const goUp = () => {
    if (currentPath !== 'This PC') {
      navigateTo('This PC');
    }
  };

  const getIcon = (name) => {
    if (name.includes('.')) {
      if (name.endsWith('.jpg') || name.endsWith('.png')) return <ImageIcon size={40} color="#00a2ed" strokeWidth={1.5} />;
      return <FileText size={40} color="#aaa" strokeWidth={1.5} />;
    }
    if (name.includes('(')) return <HardDrive size={40} color="#666" strokeWidth={1.5} />;
    return <Folder size={40} color="#f4b41a" fill="#f4b41a" strokeWidth={1} />;
  };

  return (
    <div className="file-explorer">
      <div className="explorer-toolbar">
        <div className="explorer-nav-btns">
          <ChevronLeft className={`nav-icon ${currentIndex === 0 ? 'disabled' : ''}`} onClick={goBack} />
          <ChevronRight className={`nav-icon ${currentIndex === history.length - 1 ? 'disabled' : ''}`} onClick={goForward} />
          <ArrowUp className={`nav-icon ${currentPath === 'This PC' ? 'disabled' : ''}`} onClick={goUp} />
          <RefreshCw className="nav-icon" size={16} style={{ marginLeft: '10px' }} />
        </div>
        <div className="explorer-path-bar">
          <Folder size={16} color="#f4b41a" fill="#f4b41a" />
          <span>{currentPath}</span>
        </div>
        <div className="explorer-search">
          <input type="text" placeholder={`Search ${currentPath}`} />
        </div>
      </div>
      
      <div className="explorer-body">
        <div className="explorer-sidebar">
          <ul>
            <li onClick={() => navigateTo('This PC')}><HardDrive size={16} color="#555" /> This PC</li>
            <li onClick={() => navigateTo('Documents')}><Folder size={16} color="#f4b41a" fill="#f4b41a" /> Documents</li>
            <li onClick={() => navigateTo('Downloads')}><Folder size={16} color="#00a2ed" fill="#00a2ed" /> Downloads</li>
            <li onClick={() => navigateTo('Pictures')}><ImageIcon size={16} color="#ff4b4b" /> Pictures</li>
          </ul>
        </div>
        
        <div className="explorer-content">
          {currentFolder.children.map((item, idx) => (
            <div key={idx} className="explorer-item" onDoubleClick={() => navigateTo(item)}>
              {getIcon(item)}
              <span className="item-name">{item}</span>
            </div>
          ))}
          {currentFolder.children.length === 0 && <p className="empty-msg">This folder is empty.</p>}
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
