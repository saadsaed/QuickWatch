import axios from 'axios';

const TMDB_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const tmdbApi = axios.create({
  baseURL: TMDB_URL,
});

// Add a request interceptor to automatically attach the API key or Token
tmdbApi.interceptors.request.use((config) => {
  // Prefer the token if it exists (More secure/recommended by TMDB)
  if (TMDB_TOKEN) {
    config.headers.Authorization = `Bearer ${TMDB_TOKEN}`;
  } else if (TMDB_API_KEY) {
    // Fallback to API key in query params if token isn't provided
    config.params = config.params || {};
    config.params.api_key = TMDB_API_KEY;
  }
  return config;
});

export const getTrendingMovies = async () => {
  const response = await tmdbApi.get('/trending/movie/day');
  return response.data;
};

export const getTopRatedMovies = async () => {
  const response = await tmdbApi.get('/movie/top_rated');
  return response.data;
};

export const getMoviesByGenre = async (genreId) => {
  const response = await tmdbApi.get('/discover/movie', {
    params: {
      with_genres: genreId,
    },
  });
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await tmdbApi.get('/search/movie', {
    params: {
      query,
    },
  });
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'videos,credits,similar',
    },
  });
  return response.data;
};

export default tmdbApi;