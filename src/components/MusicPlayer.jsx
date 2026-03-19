import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const tracks = [
  {
    title: 'Lofi Study Beats',
    artist: 'Chillhop Session',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    title: 'Night Drive Notes',
    artist: 'Neon Avenue',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    title: 'Deep Work Radio',
    artist: 'Focus Club',
    cover: 'https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=400&auto=format&fit=crop',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) {
    return '00:00';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);

  const currentTrack = useMemo(() => tracks[trackIndex], [trackIndex]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.load();

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [trackIndex, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.play().catch(() => setIsPlaying(false));
    setIsPlaying(true);
  };

  const updateTrack = (nextIndex) => {
    setTrackIndex(nextIndex);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
  };

  const playPrevious = () => {
    updateTrack((trackIndex - 1 + tracks.length) % tracks.length);
  };

  const playNext = () => {
    updateTrack((trackIndex + 1) % tracks.length);
  };

  const handleTimeUpdate = (event) => {
    const nextCurrentTime = event.target.currentTime;
    const nextDuration = event.target.duration || 0;
    const nextProgress = nextDuration ? (nextCurrentTime / nextDuration) * 100 : 0;

    setCurrentTime(nextCurrentTime);
    setDuration(nextDuration);
    setProgress(nextProgress);
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;

    if (!audio || !duration) {
      return;
    }

    const nextTime = (Number(event.target.value) / 100) * duration;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
    setProgress(Number(event.target.value));
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(event) => setDuration(event.target.duration || 0)}
        onEnded={() => {
          setIsPlaying(false);
          playNext();
        }}
      ></audio>

      <div className="music-player-shell">
        <div className="music-visual">
          <img src={currentTrack.cover} alt="Album Art" className="album-art" />
          <div className="music-overlay-card">
            <span className="music-kicker">Now Playing</span>
            <h3>{currentTrack.title}</h3>
            <p>{currentTrack.artist}</p>
          </div>
        </div>

        <div className="music-meta-panel">
          <div className="track-info">
            <span className="track-pill">Lo-fi Rotation</span>
            <h3>{currentTrack.title}</h3>
            <p>{currentTrack.artist}</p>
          </div>

          <div className="progress-wrap">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="progress-slider"
            />
            <div className="track-times">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="player-controls">
            <button type="button" className="control-icon-button" onClick={playPrevious}>
              <SkipBack size={22} className="control-icon" />
            </button>
            <button type="button" className="play-btn" onClick={togglePlay}>
              {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" style={{ marginLeft: '4px' }} />}
            </button>
            <button type="button" className="control-icon-button" onClick={playNext}>
              <SkipForward size={22} className="control-icon" />
            </button>
          </div>

          <div className="music-footer-row">
            <div className="music-volume">
              <Volume2 size={16} />
              <span>Listening session active</span>
            </div>
            <span className="music-queue-count">{trackIndex + 1} / {tracks.length}</span>
          </div>
        </div>
      </div>

      <div className="music-track-list">
        {tracks.map((track, index) => (
          <button
            key={track.title}
            type="button"
            className={`music-track-card ${trackIndex === index ? 'active' : ''}`}
            onClick={() => updateTrack(index)}
          >
            <img src={track.cover} alt={track.title} />
            <div>
              <strong>{track.title}</strong>
              <span>{track.artist}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
