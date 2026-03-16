import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/tmdb';
import MovieCard from '../components/movie/MovieCard';
import { Skeleton } from '../components/ui/Skeleton';
import { useDebounce } from '../hooks/useDebounce';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      setError(null);
      try {
        const data = await searchMovies(debouncedQuery);
        setResults(data.results || []);
        
        // Sync URL with successful debounced query
        if (debouncedQuery !== searchParams.get('q')) {
          setSearchParams({ q: debouncedQuery }, { replace: true });
        }
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to fetch search results. Please try again.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, setSearchParams, searchParams]);

  return (
    <div className="pt-24 min-h-screen container mx-auto px-4 md:px-8 relative z-10">
      <div className="mb-8 block sm:hidden">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-white text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white/90 drop-shadow-md">
        {debouncedQuery ? `Search results for "${debouncedQuery}"` : 'Search Movies'}
      </h1>

      {loading && (
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="w-full aspect-[2/3] rounded-xl shadow-lg" />
          ))}
        </div>
      )}

      {error && (
        <div className="text-center py-12 text-red-400 bg-red-400/10 rounded-xl border border-red-400/20 backdrop-blur-md">
          {error}
        </div>
      )}

      {!loading && !error && results.length === 0 && debouncedQuery && (
        <div className="text-center py-20 text-white/50 bg-white/5 rounded-xl border border-white/5 backdrop-blur-md">
          <p className="text-xl">No results found for "{debouncedQuery}"</p>
          <p className="text-sm mt-2">Try adjusting your search terms.</p>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 pb-20">
          {results.map((movie) => (
            <div key={movie.id} className="w-full">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
