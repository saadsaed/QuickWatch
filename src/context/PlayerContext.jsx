import React, { createContext, useContext, useState } from 'react';
import PlayerModal from '../components/player/PlayerModal';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [activeMovie, setActiveMovie] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPlayer = (movie) => {
    setActiveMovie(movie);
    setIsOpen(true);
  };

  const closePlayer = () => {
    setIsOpen(false);
    setTimeout(() => setActiveMovie(null), 350); // wait for exit animation
  };

  // Detect TV vs Movie: TMDB sets media_type='tv' on TV items,
  // or we can check for 'name' (TV) vs 'title' (movie) as a fallback.
  const resolvedMediaType =
    activeMovie?.media_type === 'tv' || (!activeMovie?.title && activeMovie?.name)
      ? 'tv'
      : 'movie';

  return (
    <PlayerContext.Provider value={{ openPlayer, closePlayer, activeMovie }}>
      {children}
      <PlayerModal
        isOpen={isOpen}
        onClose={closePlayer}
        movieId={activeMovie?.id}
        title={activeMovie?.title || activeMovie?.name}
        mediaType={resolvedMediaType}
      />
    </PlayerContext.Provider>
  );
};

