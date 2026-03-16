import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Star, Calendar, Clock } from 'lucide-react';
import { getMovieDetails } from '../services/tmdb';
import PlayerModal from '../components/player/PlayerModal';
import { motion } from 'framer-motion';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) return <div className="pt-32 text-center text-white text-xl">Movie not found</div>;

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';

  return (
    <div className="relative min-h-screen pb-20">
      {/* Backdrop */}
      <div className="absolute top-0 left-0 w-full h-[60vh] md:h-[80vh] z-0">
        <img src={backdropUrl} alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/20" />
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-32 md:pt-48 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Poster */}
          {posterUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-shrink-0 w-48 sm:w-64 mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10 bg-slate-800"
            >
              <img src={posterUrl} alt={movie.title} className="w-full h-auto" />
            </motion.div>
          )}

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-white/80 mb-6">
              <span className="flex items-center gap-1 text-yellow-400 font-bold">
                <Star className="w-4 h-4 fill-current" />
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {movie.release_date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {movie.runtime} min
              </span>
              <div className="flex gap-2 ml-auto sm:ml-0 flex-wrap">
                {movie.genres?.map(g => (
                  <span key={g.id} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/10">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-3xl">
              {movie.overview}
            </p>

            <button 
              onClick={() => setIsPlayerOpen(true)}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)] w-full sm:w-auto"
            >
              <Play className="w-6 h-6 fill-current" />
              Watch Now
            </button>
          </motion.div>
        </div>

        {/* Similar Movies */}
        {movie.similar?.results?.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-6 text-white px-4 md:px-0">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movie.similar.results.slice(0, 6).map(m => {
                if (!m.poster_path) return null;
                return (
                  <Link to={`/movie/${m.id}`} key={m.id} className="group cursor-pointer block">
                    <div className="rounded-xl overflow-hidden aspect-[2/3] bg-slate-800 shadow-lg">
                      <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 group-hover:opacity-70" />
                    </div>
                    <p className="mt-2 text-sm text-center text-white/80 line-clamp-1 group-hover:text-purple-400 transition-colors">{m.title}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <PlayerModal 
        isOpen={isPlayerOpen} 
        onClose={() => setIsPlayerOpen(false)} 
        movieId={movie.id} 
        title={movie.title}
      />
    </div>
  );
};

export default MovieDetails;
