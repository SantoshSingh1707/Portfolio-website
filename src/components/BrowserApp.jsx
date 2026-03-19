import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Search } from 'lucide-react';

const BrowserApp = () => {
  const [urlInput, setUrlInput] = useState('https://en.wikipedia.org/');
  const [currentUrl, setCurrentUrl] = useState('https://en.wikipedia.org/');

  const handleNavigate = (e) => {
    e.preventDefault();
    let target = urlInput;
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = 'https://' + target;
    }
    setCurrentUrl(target);
    setUrlInput(target);
  };

  return (
    <div className="browser-app">
      <div className="browser-header">
        <div className="browser-nav-btns">
          <ArrowLeft size={16} className="nav-icon" />
          <ArrowRight size={16} className="nav-icon disabled" />
          <RotateCw size={16} className="nav-icon" onClick={() => setCurrentUrl(currentUrl)} />
          <Home size={16} className="nav-icon" onClick={() => { setUrlInput('https://en.wikipedia.org/'); setCurrentUrl('https://en.wikipedia.org/'); }} />
        </div>
        
        <form className="browser-address-bar" onSubmit={handleNavigate}>
          <Search size={14} color="#888" />
          <input 
            type="text" 
            value={urlInput} 
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Search or enter web address"
          />
        </form>
      </div>
      
      <div className="browser-content">
        <iframe 
          src={currentUrl} 
          title="Browser" 
          frameBorder="0"
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
      </div>
    </div>
  );
};

export default BrowserApp;
