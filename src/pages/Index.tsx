
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
      
      {/* Light background shift for Testimonials section */}
      <div className="bg-gradient-to-b from-transparent to-gray-50/70 py-1">
        <Testimonials />
      </div>
      
      {/* Section divider */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent my-8"></div>
      </div>
      
      <FinalCTA />
      
      {/* Subtle background color shift before herb guide */}
      <div className="bg-gradient-to-b from-transparent to-amber-50/30 pt-8">
        <div id="herb-guide">
          <HerbVisualizer />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
