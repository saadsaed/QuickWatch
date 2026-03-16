import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';

// Lazy loading pages
const Home = lazy(() => import('../pages/Home'));
const Movies = lazy(() => import('../pages/Movies'));
const Tv = lazy(() => import('../pages/Tv'));
const Search = lazy(() => import('../pages/Search'));
const MovieDetails = lazy(() => import('../pages/MovieDetails'));

const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv" element={<Tv />} />
          <Route path="search" element={<Search />} />
          <Route path="movie/:id" element={<MovieDetails />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
