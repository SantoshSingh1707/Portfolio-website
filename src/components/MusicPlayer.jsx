import React, { useState, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (e) => {
    const p = (e.target.currentTime / e.target.duration) * 100;
    setProgress(isNaN(p) ? 0 : p);
  };

  const currentTrack = {
    title: "Lofi Study Beats",
    artist: "Chillhop",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&auto=format&fit=crop"
  };

  return (
    <div className="music-player">
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      ></audio>

      <img src={currentTrack.cover} alt="Album Art" className="album-art" />
      
      <div className="track-info">
        <h3>{currentTrack.title}</h3>
        <p>{currentTrack.artist}</p>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="player-controls">
        <SkipBack size={24} className="control-icon" />
        <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" style={{ marginLeft: '4px' }} />}
        </button>
        <SkipForward size={24} className="control-icon" />
      </div>
    </div>
  );
};

export default MusicPlayer;
