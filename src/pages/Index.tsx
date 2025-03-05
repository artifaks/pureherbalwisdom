
import React from 'react';
import HerbVisualizer from '@/components/HerbVisualizer';
import MainNavigation from '@/components/MainNavigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MainNavigation />
      <HerbVisualizer />
    </div>
  );
};

export default Index;
