
import React from 'react';
import { Button } from './ui/button';
import { Leaf, BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="px-4 py-12 md:py-24 flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Leaf className="h-8 w-8 text-amber-500 mr-2" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-800 via-amber-600 to-amber-500 bg-clip-text text-transparent">
            Wellness is Golden
          </h1>
          <Sparkles className="h-8 w-8 text-amber-500 ml-2" />
        </div>
        
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Discover the ancient wisdom of herbal remedies and natural healing. Our comprehensive 
          guide helps you explore nature's pharmacy for your well-being journey.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            asChild
            size="lg"
          >
            <Link to="#herb-guide">
              <Leaf className="mr-2 h-5 w-5" />
              Explore Herbs
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-amber-500 text-amber-700 hover:bg-amber-50 font-semibold px-6 py-3 rounded-lg shadow-sm transition-all duration-300"
            asChild
            size="lg"
          >
            <Link to="/resources">
              <BookOpen className="mr-2 h-5 w-5" />
              View E-Books
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="glass p-6 rounded-lg max-w-2xl">
            <h2 className="text-xl font-semibold text-amber-800 mb-3">
              Why Natural Healing?
            </h2>
            <p className="text-gray-700">
              Herbal remedies have been used for thousands of years across cultures to support health and vitality.
              Our carefully curated collection helps you discover herbs for heart health, digestion, cognitive function,
              and gender-specific wellness needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
