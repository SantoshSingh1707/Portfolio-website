import React, { useRef, useState } from 'react';
import { ExternalLink, Pause, Play, Search, Square, Youtube } from 'lucide-react';

const YOUTUBE_SEARCH_URL = 'https://www.youtube.com/results?search_query=';
const YOUTUBE_EMBED_URL = 'https://www.youtube-nocookie.com/embed';
const PIPED_API_URL = 'https://api.piped.private.coffee';

const isLikelyVideoId = (value) => /^[a-zA-Z0-9_-]{11}$/.test(value);

const extractYoutubeVideoId = (value) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  if (isLikelyVideoId(trimmed)) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed.includes('://') ? trimmed : `https://${trimmed}`);

    if (parsed.hostname.includes('youtu.be')) {
      const candidate = parsed.pathname.split('/').filter(Boolean)[0] || '';
      return isLikelyVideoId(candidate) ? candidate : '';
    }

    const queryId = parsed.searchParams.get('v');
    if (queryId && isLikelyVideoId(queryId)) {
      return queryId;
    }

    const segments = parsed.pathname.split('/').filter(Boolean);
    const namedSegmentIndex = segments.findIndex((segment) => ['embed', 'shorts', 'live'].includes(segment));
    if (namedSegmentIndex >= 0) {
      const candidate = segments[namedSegmentIndex + 1] || '';
      return isLikelyVideoId(candidate) ? candidate : '';
    }
  } catch {
    return '';
  }

  return '';
};

const formatDuration = (seconds) => {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return 'Live';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  return `${minutes}:${String(secs).padStart(2, '0')}`;
};

const MusicPlayer = ({ onOpenExternal }) => {
  const youtubeFrameRef = useRef(null);
  const [youtubeInput, setYoutubeInput] = useState('');
  const [youtubeVideoId, setYoutubeVideoId] = useState('');
  const [youtubeHint, setYoutubeHint] = useState('Search YouTube in-app or paste a direct YouTube link to play.');
  const [youtubeResults, setYoutubeResults] = useState([]);
  const [isSearchingYoutube, setIsSearchingYoutube] = useState(false);
  const [isYoutubePlaying, setIsYoutubePlaying] = useState(false);

  const openExternal = (url, label) => {
    if (onOpenExternal) {
      onOpenExternal(url, label);
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const sendYoutubeCommand = (func) => {
    const playerWindow = youtubeFrameRef.current?.contentWindow;

    if (!playerWindow) {
      return;
    }

    playerWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func,
        args: [],
      }),
      '*',
    );
  };

  const openYouTubeSearch = () => {
    const query = youtubeInput.trim() || 'lofi music';
    openExternal(`${YOUTUBE_SEARCH_URL}${encodeURIComponent(query)}`, 'YouTube Search');
    setYoutubeHint(`Opened YouTube search for "${query}".`);
  };

  const searchYoutubeInApp = async () => {
    const query = youtubeInput.trim() || 'lofi music';

    setIsSearchingYoutube(true);
    setYoutubeHint(`Searching YouTube for "${query}"...`);

    try {
      const response = await fetch(`${PIPED_API_URL}/search?q=${encodeURIComponent(query)}&filter=videos`);

      if (!response.ok) {
        throw new Error(`Search failed with status ${response.status}`);
      }

      const payload = await response.json();
      const items = Array.isArray(payload.items) ? payload.items : [];
      const parsedResults = items
        .filter((item) => item?.type === 'stream' && item?.url)
        .map((item) => {
          const videoId = extractYoutubeVideoId(item.url);

          return {
            id: videoId || `${item.url}-${item.title}`,
            videoId,
            title: item.title || 'Untitled video',
            channel: item.uploaderName || 'Unknown channel',
            duration: formatDuration(item.duration),
            thumbnail: item.thumbnail,
            youtubeUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : `https://www.youtube.com${item.url}`,
          };
        })
        .filter((item) => item.videoId)
        .slice(0, 8);

      setYoutubeResults(parsedResults);

      if (parsedResults.length) {
        setYoutubeHint(`Found ${parsedResults.length} results. Click a result to play in-app.`);
      } else {
        setYoutubeHint('No playable YouTube results found. Try a different search phrase.');
      }
    } catch {
      setYoutubeHint('Could not fetch in-app search results right now. Opening YouTube search instead.');
      openYouTubeSearch();
    } finally {
      setIsSearchingYoutube(false);
    }
  };

  const playEmbeddedYoutube = () => {
    const videoId = extractYoutubeVideoId(youtubeInput);

    if (videoId) {
      setYoutubeVideoId(videoId);
      setYoutubeResults([]);
      setIsYoutubePlaying(true);
      setYoutubeHint('Embedded YouTube player loaded.');
      return;
    }

    if (youtubeInput.trim()) {
      openYouTubeSearch();
      setYoutubeHint('No direct YouTube link detected, so search results were opened externally.');
      return;
    }

    setYoutubeHint('Paste a YouTube URL like https://www.youtube.com/watch?v=... or youtu.be/...');
  };

  const playYoutubeResult = (result) => {
    setYoutubeVideoId(result.videoId);
    setYoutubeInput(result.youtubeUrl);
    setIsYoutubePlaying(true);
    setYoutubeHint(`Now playing "${result.title}" in embedded YouTube player.`);
  };

  const toggleYoutubePlayback = () => {
    if (!youtubeVideoId) {
      return;
    }

    if (isYoutubePlaying) {
      sendYoutubeCommand('pauseVideo');
      setIsYoutubePlaying(false);
      return;
    }

    sendYoutubeCommand('playVideo');
    setIsYoutubePlaying(true);
  };

  const stopYoutubePlayback = () => {
    if (!youtubeVideoId) {
      return;
    }

    sendYoutubeCommand('stopVideo');
    setIsYoutubePlaying(false);
  };

  const youtubeEmbedSrc = youtubeVideoId
    ? `${YOUTUBE_EMBED_URL}/${youtubeVideoId}?autoplay=1&rel=0&enablejsapi=1`
    : '';

  return (
    <div className="music-player youtube-only">
      <section className="music-youtube-panel music-youtube-panel-standalone">
        <div className="music-youtube-head">
          <div className="music-youtube-title">
            <Youtube size={16} />
            <span>YouTube Music Integration</span>
          </div>
          <button type="button" className="music-youtube-btn secondary" onClick={openYouTubeSearch}>
            <Search size={14} />
            Open YouTube
          </button>
        </div>

        <div className="music-youtube-controls">
          <input
            type="text"
            value={youtubeInput}
            onChange={(event) => setYoutubeInput(event.target.value)}
            placeholder="Paste YouTube URL or type a song name..."
            className="music-youtube-input"
          />
          <button type="button" className="music-youtube-btn secondary" onClick={searchYoutubeInApp} disabled={isSearchingYoutube}>
            <Search size={14} />
            {isSearchingYoutube ? 'Searching...' : 'Search In App'}
          </button>
          <button type="button" className="music-youtube-btn" onClick={playEmbeddedYoutube}>
            Play Link
          </button>
        </div>
        <p className="music-youtube-hint">{youtubeHint}</p>

        {youtubeResults.length ? (
          <div className="music-youtube-results">
            {youtubeResults.map((result) => (
              <div key={result.id} className="music-youtube-result-card">
                <button type="button" className="music-youtube-result-main" onClick={() => playYoutubeResult(result)}>
                  <img src={result.thumbnail} alt={result.title} loading="lazy" />
                  <div>
                    <strong>{result.title}</strong>
                    <span>{result.channel}</span>
                    <small>{result.duration}</small>
                  </div>
                </button>
                <button
                  type="button"
                  className="music-youtube-link-out"
                  onClick={() => openExternal(result.youtubeUrl, result.title)}
                >
                  <ExternalLink size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : null}

        {youtubeVideoId ? (
          <div className="music-youtube-player-controls">
            <button type="button" className="music-youtube-player-btn" onClick={toggleYoutubePlayback}>
              {isYoutubePlaying ? <Pause size={14} /> : <Play size={14} />}
              {isYoutubePlaying ? 'Pause' : 'Play'}
            </button>
            <button type="button" className="music-youtube-player-btn stop" onClick={stopYoutubePlayback}>
              <Square size={14} />
              Stop
            </button>
          </div>
        ) : null}

        {youtubeVideoId ? (
          <div className="music-youtube-embed">
            <iframe
              ref={youtubeFrameRef}
              src={youtubeEmbedSrc}
              title="YouTube player"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="music-youtube-empty">
            Search for a track and press <strong>Search In App</strong>, then click a result to play.
          </div>
        )}
      </section>
    </div>
  );
};

export default MusicPlayer;
