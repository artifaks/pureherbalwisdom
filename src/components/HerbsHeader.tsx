
import React from 'react';
import { Leaf } from 'lucide-react';

const HerbsHeader: React.FC = () => {
  return (
    <div className="glass sticky top-0 z-10 py-4 sm:py-6 px-4 sm:px-8 flex items-center justify-center">
      <Leaf className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-amber-600" />
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
        Comprehensive Herb Guide
      </h1>
      <Leaf className="w-5 h-5 sm:w-6 sm:h-6 ml-2 text-amber-600 transform rotate-180" />
    </div>
  );
};

export default HerbsHeader;
