import React, { useMemo, useState } from 'react';
import {
  HardDrive,
  Folder,
  FileText,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  RefreshCw,
  Search,
} from 'lucide-react';

const mockFileSystem = {
  'This PC': {
    type: 'folder',
    children: ['Local Disk (C:)', 'Documents', 'Downloads', 'Pictures'],
  },
  'Local Disk (C:)': {
    type: 'folder',
    children: ['Windows', 'Program Files', 'Users'],
  },
  Documents: {
    type: 'folder',
    children: ['Resume.pdf', 'CoverLetter.docx', 'Projects'],
  },
  Downloads: {
    type: 'folder',
    children: ['installer.exe', 'vscode.zip'],
  },
  Pictures: {
    type: 'folder',
    children: ['vacation.jpg', 'profile.png'],
  },
  Projects: {
    type: 'folder',
    children: ['MachineLearning.md', 'AI_Study_Tool.md', 'KidneyDiseaseClassifier.ipynb'],
  },
};

const FileExplorer = ({ onPreviewFile }) => {
  const [history, setHistory] = useState(['This PC']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const currentPath = history[currentIndex];
  const currentFolder = mockFileSystem[currentPath] || { children: [] };

  const navigateTo = (folderName) => {
    if (mockFileSystem[folderName]) {
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(folderName);
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
      setSearchQuery('');
    } else {
      onPreviewFile?.({ name: folderName, path: `${currentPath}\\${folderName}` });
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSearchQuery('');
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSearchQuery('');
    }
  };

  const goUp = () => {
    if (currentPath !== 'This PC') {
      navigateTo('This PC');
    }
  };

  const visibleItems = useMemo(() => {
    return currentFolder.children.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [currentFolder.children, searchQuery]);

  const getIcon = (name) => {
    if (name.includes('.')) {
      if (name.endsWith('.jpg') || name.endsWith('.png')) {
        return <ImageIcon size={34} color="#00a2ed" strokeWidth={1.5} />;
      }

      return <FileText size={34} color="#7d8da1" strokeWidth={1.5} />;
    }

    if (name.includes('(')) {
      return <HardDrive size={34} color="#46647f" strokeWidth={1.5} />;
    }

    return <Folder size={34} color="#f4b41a" fill="#f4b41a" strokeWidth={1} />;
  };

  return (
    <div className="file-explorer">
      <div className="explorer-toolbar">
        <div className="explorer-nav-btns">
          <button type="button" className="explorer-nav-btn" onClick={goBack} disabled={currentIndex === 0}>
            <ChevronLeft size={16} />
          </button>
          <button type="button" className="explorer-nav-btn" onClick={goForward} disabled={currentIndex === history.length - 1}>
            <ChevronRight size={16} />
          </button>
          <button type="button" className="explorer-nav-btn" onClick={goUp} disabled={currentPath === 'This PC'}>
            <ArrowUp size={16} />
          </button>
          <button type="button" className="explorer-nav-btn" onClick={() => setSearchQuery('')}>
            <RefreshCw size={16} />
          </button>
        </div>
        <div className="explorer-path-bar">
          <Folder size={16} color="#f4b41a" fill="#f4b41a" />
          <span>{currentPath}</span>
        </div>
        <div className="explorer-search">
          <Search size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={`Search ${currentPath}`}
          />
        </div>
      </div>

      <div className="explorer-body">
        <div className="explorer-sidebar">
          <div className="explorer-sidebar-title">Quick Access</div>
          <ul>
            <li onClick={() => navigateTo('This PC')}><HardDrive size={16} color="#555" /> This PC</li>
            <li onClick={() => navigateTo('Documents')}><Folder size={16} color="#f4b41a" fill="#f4b41a" /> Documents</li>
            <li onClick={() => navigateTo('Downloads')}><Folder size={16} color="#00a2ed" fill="#00a2ed" /> Downloads</li>
            <li onClick={() => navigateTo('Pictures')}><ImageIcon size={16} color="#ff4b4b" /> Pictures</li>
          </ul>
        </div>

        <div className="explorer-main">
          <div className="explorer-overview">
            <div>
              <span className="explorer-kicker">Folder</span>
              <h3>{currentPath}</h3>
              <p>{visibleItems.length} item{visibleItems.length === 1 ? '' : 's'} ready to explore.</p>
            </div>
            <div className="explorer-summary-chip">Preview mode</div>
          </div>

          <div className="explorer-content">
            {visibleItems.map((item) => (
              <button key={item} type="button" className="explorer-item" onDoubleClick={() => navigateTo(item)} onClick={() => setSearchQuery(item)}>
                <div className="explorer-item-icon">{getIcon(item)}</div>
                <span className="item-name">{item}</span>
              </button>
            ))}
            {visibleItems.length === 0 && <p className="empty-msg">No files match your search in this folder.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
