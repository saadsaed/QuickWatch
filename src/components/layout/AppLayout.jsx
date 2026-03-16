import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import AntiGravityBackground from '../ui/AntiGravityBackground';

const AppLayout = () => {
  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white overflow-hidden">
      <AntiGravityBackground />
      <Navbar />
      <main className="relative z-10 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
