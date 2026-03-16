import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Server } from 'lucide-react';

// Verified-working embed servers — 2Embed confirmed working, others as fallbacks
const SERVERS = {
  movie: [
    { id: 'A', name: '2Embed',  url: (id) => `https://www.2embed.cc/embed/${id}` },
    { id: 'B', name: 'VidSrc',  url: (id) => `https://vidsrc.to/embed/movie/${id}` },
    { id: 'C', name: 'VidLink', url: (id) => `https://vidlink.pro/movie/${id}` },
    { id: 'D', name: 'VSrcXYZ', url: (id) => `https://vidsrc.xyz/embed/movie?tmdb=${id}` },
  ],
  tv: [
    { id: 'A', name: '2Embed',  url: (id) => `https://www.2embed.cc/embedtvfull/${id}&s=1&e=1` },
    { id: 'B', name: 'VidSrc',  url: (id) => `https://vidsrc.to/embed/tv/${id}/1/1` },
    { id: 'C', name: 'VidLink', url: (id) => `https://vidlink.pro/tv/${id}/1/1` },
    { id: 'D', name: 'VSrcXYZ', url: (id) => `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=1&episode=1` },
  ],
};



const PlayerModal = ({ isOpen, onClose, movieId, title, mediaType = 'movie' }) => {
  const [activeServerId, setActiveServerId] = useState('A');

  // Reset to first server on every new movie
  useEffect(() => {
    setActiveServerId('A');
  }, [movieId]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen || !movieId) return null;

  const type = mediaType === 'tv' ? 'tv' : 'movie';
  const servers = SERVERS[type];
  const activeServer = servers.find(s => s.id === activeServerId) || servers[0];
  const iframeSrc = activeServer.url(movieId);

  console.log(`[CineStream] Server: ${activeServer.name} | URL: ${iframeSrc}`);

  return (
    <AnimatePresence>
      <motion.div
        key="player-modal"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          backgroundColor: '#000', display: 'flex', flexDirection: 'column',
        }}
      >
        {/* ── Header ── */}
        <div className="flex-none flex items-center justify-between px-4 py-3 md:px-6 md:py-4 bg-gradient-to-b from-black/90 to-transparent z-10">
          <h2 className="text-lg md:text-xl font-bold text-white truncate pr-4">
            {title || 'Now Streaming'}
          </h2>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Server Tabs */}
            <div className="flex bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/10 gap-1">
              {servers.map((server) => (
                <button
                  key={server.id}
                  onClick={() => setActiveServerId(server.id)}
                  title={`Switch to ${server.name}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeServerId === server.id
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                      : 'text-white/50 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Server className="w-3 h-3" />
                  <span className="hidden sm:inline">{server.name}</span>
                  <span className="sm:hidden">{server.id}</span>
                </button>
              ))}
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close player"
              className="p-2 bg-white/10 hover:bg-red-500/70 backdrop-blur-md rounded-full text-white transition-all hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Debug URL strip ── */}
        <div className="flex-none px-4 pb-2 text-[11px] text-white/20 font-mono truncate">
          {iframeSrc}
        </div>

        {/* ── Player ── */}
        <div style={{ flex: 1, minHeight: 0, padding: '0 12px 12px' }}>
          <div
            style={{
              width: '100%', height: '100%', minHeight: '300px',
              borderRadius: '12px', overflow: 'hidden', position: 'relative',
              background: '#06060f',
              border: '1px solid rgba(168,85,247,0.15)',
              boxShadow: '0 0 60px rgba(0,0,0,0.8)',
            }}
          >
            {/* Notice bar if server A errors — prompt user to switch */}
            <div
              className="absolute bottom-0 left-0 right-0 z-10 text-center py-2 text-xs text-white/30 pointer-events-none"
            >
              If the player is blank, try switching servers above
            </div>

            <iframe
              key={iframeSrc}
              src={iframeSrc}
              title={`Streaming: ${title}`}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer"
              referrerPolicy="origin"
              style={{
                width: '100%', height: '100%',
                border: 'none', display: 'block',
              }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlayerModal;