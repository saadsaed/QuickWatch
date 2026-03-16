import React, { useState, useEffect } from 'react';
import HeroSection from '../components/movie/HeroSection';
import MovieRow from '../components/movie/MovieRow';
import { getTrendingMovies, getTopRatedMovies, getMoviesByGenre } from '../services/tmdb';

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await getTrendingMovies();
        if (data.results && data.results.length > 0) {
          setHeroMovie(data.results[0]);
        }
      } catch (error) {
        console.error('Error fetching hero movie:', error);
      }
    };
    fetchHero();
  }, []);

  return (
    <div className="pb-20">
      <HeroSection movie={heroMovie} />
      
      <div className="-mt-12 sm:-mt-24 md:-mt-32 relative z-20">
        <MovieRow title="Trending Now" fetchFunction={getTrendingMovies} />
        <MovieRow title="Top Rated" fetchFunction={getTopRatedMovies} />
        <MovieRow title="Action Movies" fetchFunction={getMoviesByGenre} param={28} />
        <MovieRow title="Comedy" fetchFunction={getMoviesByGenre} param={35} />
        <MovieRow title="Horror" fetchFunction={getMoviesByGenre} param={27} />
      </div>
    </div>
  );
};

export default Home;
