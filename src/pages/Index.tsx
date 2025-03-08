
import React from 'react';
import MainNavigation from '@/components/MainNavigation';
import HeroSection from '@/components/HeroSection';
import FeaturedHerbs from '@/components/FeaturedHerbs';
import FeatureHighlights from '@/components/FeatureHighlights';
import Testimonials from '@/components/Testimonials';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import HerbVisualizer from '@/components/HerbVisualizer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MainNavigation />
      <HeroSection />
      <FeaturedHerbs />
      <FeatureHighlights />
      <Testimonials />
      <FinalCTA />
      <div id="herb-guide">
        <HerbVisualizer />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
