import React from 'react';

const Tv = () => {
  return (
    <div className="pt-24 min-h-screen container mx-auto px-4 md:px-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 drop-shadow-lg">
        TV Shows
      </h1>
      <p className="text-lg md:text-xl text-white/70 max-w-2xl bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
        Our TV Shows integration is coming soon. Stay tuned for an amazing episodic catalog spanning the best networks.
      </p>
    </div>
  );
};

export default Tv;
