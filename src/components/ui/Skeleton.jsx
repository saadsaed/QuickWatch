import React from 'react';

export const Skeleton = ({ className }) => {
  return (
    <div className={`bg-white/10 animate-pulse rounded-md ${className}`}></div>
  );
};
