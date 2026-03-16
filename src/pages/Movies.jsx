import React from 'react';
import MovieRow from '../components/movie/MovieRow';
import { getMoviesByGenre } from '../services/tmdb';

const Movies = () => {
  return (
    <div className="pt-24 pb-20 container mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white px-4 md:px-8 drop-shadow-md">
        Explore Movies
      </h1>
      <MovieRow title="Action" fetchFunction={getMoviesByGenre} param={28} />
      <MovieRow title="Adventure" fetchFunction={getMoviesByGenre} param={12} />
      <MovieRow title="Animation" fetchFunction={getMoviesByGenre} param={16} />
      <MovieRow title="Comedy" fetchFunction={getMoviesByGenre} param={35} />
      <MovieRow title="Science Fiction" fetchFunction={getMoviesByGenre} param={878} />
      <MovieRow title="Romance" fetchFunction={getMoviesByGenre} param={10749} />
    </div>
  );
};

export default Movies;
