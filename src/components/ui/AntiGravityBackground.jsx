import React from 'react';
import { motion } from 'framer-motion';

const AntiGravityBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">      
      {/* Blob 1: Top Left Purple */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50%] md:w-[40vw] h-[50%] md:h-[40vw] rounded-full bg-purple-600/10 blur-[100px]"
        animate={{
          x: ['0%', '10%', '-5%', '0%'],
          y: ['0%', '15%', '-10%', '0%'],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Blob 2: Bottom Right Blue */}
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[60%] md:w-[45vw] h-[60%] md:h-[45vw] rounded-full bg-blue-600/10 blur-[120px]"
        animate={{
          x: ['0%', '-15%', '10%', '0%'],
          y: ['0%', '-10%', '5%', '0%'],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Blob 3: Center Light Blue */}
      <motion.div
        className="absolute top-[30%] left-[30%] w-[40%] md:w-[30vw] h-[40%] md:h-[30vw] rounded-full bg-cyan-500/5 blur-[90px]"
        animate={{
          x: ['0%', '20%', '-20%', '0%'],
          y: ['0%', '-20%', '20%', '0%'],
          scale: [0.8, 1.1, 0.9, 0.8],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  );
};

export default AntiGravityBackground;
