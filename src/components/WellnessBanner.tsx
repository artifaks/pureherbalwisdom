
import React from 'react';

const WellnessBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 py-4 shadow-md text-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-900">
        Wellness is <span className="text-amber-700 italic">Golden</span>
      </h1>
      <p className="text-amber-800 mt-1 text-sm md:text-base">
        Discover nature's healing treasures for your wellbeing journey
      </p>
    </div>
  );
};

export default WellnessBanner;
