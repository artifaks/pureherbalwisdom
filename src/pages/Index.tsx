
import React from 'react';
import HerbVisualizer from '@/components/HerbVisualizer';
import MainNavigation from '@/components/MainNavigation';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MainNavigation />
      <HeroSection />
      <div id="herb-guide">
        <HerbVisualizer />
      </div>
    </div>
  );
};

export default Index;
