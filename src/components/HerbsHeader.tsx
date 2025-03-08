
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Search, Heart } from 'lucide-react';
import { Button } from './ui/button';

const HerbsHeader: React.FC = () => {
  return (
    <div className="glass sticky top-0 z-10 py-4 sm:py-6 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center">
        <Leaf className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-amber-600" />
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
          Comprehensive Herb Guide
        </h1>
        <Leaf className="w-5 h-5 sm:w-6 sm:h-6 ml-2 text-amber-600 transform rotate-180" />
      </div>
      
      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
        <Button variant="outline" size="sm" asChild>
          <Link to="/search">
            <Search className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Search</span>
          </Link>
        </Button>
        <Button variant="secondary" size="sm">
          <Heart className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Saved Herbs</span>
        </Button>
      </div>
    </div>
  );
};

export default HerbsHeader;
