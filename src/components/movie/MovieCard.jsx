import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';

const MovieCard = ({ movie }) => {
  const { openPlayer } = usePlayer();

  if (!movie.poster_path) return null;

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <motion.div
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.2 }}
      className="relative flex-none w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] aspect-[2/3] rounded-xl overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.5)] bg-slate-800 cursor-pointer"
      onClick={() => openPlayer(movie)}
    >
      <img
        src={posterUrl}
        alt={movie.title || movie.name}
        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-40"
        loading="lazy"
      />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current" />
        </div>
        
        <h3 className="text-white font-bold text-sm md:text-base line-clamp-1 mb-1 shadow-black">
          {movie.title || movie.name}
        </h3>
        
        <div className="flex items-center gap-2 text-xs md:text-sm text-white/80">
          <span className="flex items-center gap-1 text-yellow-400 font-bold">
            <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" />
            {movie.vote_average?.toFixed(1)}
          </span>
          <span>{movie.release_date?.split('-')[0]}</span>
        </div>

        <Link 
          to={`/movie/${movie.id}`} 
          className="mt-2 text-xs text-center text-white/50 hover:text-white transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default MovieCard;
