import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Skeleton } from '../ui/Skeleton';

const MovieRow = ({ title, fetchFunction, param }) => {
  const rowRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMoved, setIsMoved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFunction(param);
        setMovies(data.results || []);
      } catch (error) {
        console.error('Error fetching movies for row:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchFunction, param]);

  const handleScroll = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!loading && movies.length === 0) return null;

  return (
    <div className="py-6 container mx-auto px-4 md:px-8 relative z-10 hover:z-20">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white/90 drop-shadow-md pb-2">
        {title}
      </h2>
      
      <div className="relative group">
        <button
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white p-2 rounded-r-xl h-2/3 opacity-0 group-hover:opacity-100 transition-all ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleScroll('left')}
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <div
          ref={rowRef}
          className="flex whitespace-nowrap gap-4 md:gap-6 overflow-x-auto scroll-smooth py-4 no-scrollbar pr-12 md:pr-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="flex-none w-[140px] sm:w-[160px] md:w-[200px] lg:w-[240px] aspect-[2/3] rounded-xl shadow-lg" />
              ))
            : movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
        </div>

        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white p-2 rounded-l-xl h-2/3 opacity-0 xl:group-hover:opacity-100 transition-all"
          onClick={() => handleScroll('right')}
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>
    </div>
  );
};

export default React.memo(MovieRow);
