
import React from 'react';
import { Button } from './ui/button';
import { Leaf, Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="px-4 py-12 md:py-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background leaf pattern - subtle decoration */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=500&q=10')] opacity-5 bg-repeat"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-center mb-6">
          <Leaf className="h-10 w-10 text-amber-500 mr-2" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-800 via-amber-600 to-amber-500 bg-clip-text text-transparent">
            Unlock the Power of Herbs
          </h1>
        </div>
        
        <h2 className="text-2xl md:text-3xl text-amber-700 font-semibold mb-4">
          Your Natural Healing Guide
        </h2>
        
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Discover nature's pharmacy for holistic health, fitness, and well-being. 
          Our comprehensive guide helps you harness the healing power of herbs for a 
          balanced, vibrant life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            asChild
            size="lg"
          >
            <a href="#herb-guide">
              <Leaf className="mr-2 h-5 w-5" />
              Explore the Herb Guide
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-amber-500 text-amber-700 hover:bg-amber-50 font-semibold px-6 py-3 rounded-lg shadow-sm transition-all duration-300"
            asChild
            size="lg"
          >
            <Link to="/resources">
              <Search className="mr-2 h-5 w-5" />
              Find Remedies
            </Link>
          </Button>
        </div>
        
        {/* Dynamic herbs visual effect */}
        <div className="mt-16 relative h-20 md:h-24 overflow-hidden">
          <div className="absolute w-full animate-pulse-soft">
            <div className="flex justify-center gap-2 md:gap-4">
              {[...Array(5)].map((_, i) => (
                <img 
                  key={i}
                  src={`https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=70&h=70&q=80`}
                  alt="Herb"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shadow-md transform hover:scale-110 transition-transform"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.9 - (i * 0.1)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
