
import React from 'react';
import { Sparkles } from 'lucide-react';

const WellnessBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 py-6 shadow-md text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=300&q=10')] opacity-10 bg-repeat-x bg-center mix-blend-overlay" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-900">
            Wellness is <span className="text-amber-700 italic">Golden</span>
          </h1>
          <Sparkles className="ml-2 h-5 w-5 text-amber-600" />
        </div>
        
        <p className="text-amber-800 mt-2 text-sm md:text-base max-w-2xl mx-auto">
          Discover nature's healing treasures for your wellbeing journey
        </p>
      </div>
    </div>
  );
};

export default WellnessBanner;
