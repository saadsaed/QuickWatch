import React from 'react';
import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlayer } from '../../context/PlayerContext';

const HeroSection = ({ movie }) => {
  const { openPlayer } = usePlayer();

  if (!movie) {
    return (
      <div className="w-full h-[70vh] md:h-[85vh] bg-slate-900/50 animate-pulse flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] lg:h-[90vh]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={backdropUrl}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover"
        />
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-end pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {movie.title || movie.name}
          </motion.h1>
          
          <motion.div 
            className="flex items-center gap-4 text-sm md:text-base font-medium mb-6 text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-green-400 font-bold">{Math.round(movie.vote_average * 10)}% Match</span>
            <span>{movie.release_date?.split('-')[0]}</span>
            <span className="px-2 py-0.5 border border-white/20 rounded-md text-xs">HD</span>
          </motion.div>

          <motion.p 
            className="text-base md:text-lg text-white/70 mb-8 line-clamp-3 md:line-clamp-4 max-w-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {movie.overview}
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button 
              onClick={() => openPlayer(movie)}
              className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-3 w-full sm:w-auto rounded-full font-bold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
            >
              <Play className="w-5 h-5 fill-current" />
              Play Now
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 md:px-8 py-3 w-full sm:w-auto rounded-full font-bold hover:bg-white/20 transition-all hover:scale-105 active:scale-95 border border-white/20 shadow-xl">
              <Info className="w-5 h-5" />
              More Info
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
