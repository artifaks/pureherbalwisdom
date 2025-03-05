
import React, { useState } from 'react';
import ContentArea from './ContentArea';
import HerbSelector from './HerbSelector';
import WellnessBanner from './WellnessBanner';
import { Herb } from '@/data/types';
import { allHerbs } from '@/data/allHerbs';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

const HerbVisualizer: React.FC = () => {
  // State for active herb and tab
  const [activeHerb, setActiveHerb] = useState<Herb | null>(null);
  const [activeTab, setActiveTab] = useState<'benefits' | 'oil' | 'tincture'>('benefits');

  const handleHerbSelect = (herb: Herb) => {
    setActiveHerb(herb);
    setActiveTab('benefits');
  };

  const renderCallToAction = () => {
    if (activeHerb === null) {
      return (
        <div className="text-center my-6 py-8 glass rounded-2xl max-w-md mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            Discover Nature's Healing Power
          </h2>
          <p className="text-gray-600 mb-6 px-4">
            Select an herb above to explore its properties, benefits, and preparation methods.
          </p>
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-all 
                      transform hover:scale-105 font-medium shadow-md"
            onClick={() => {
              // Smooth scroll to the herbs section
              document.querySelector('.glass-dark')?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              });
            }}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Start Exploring
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Wellness Banner */}
      <WellnessBanner />
      
      {/* Title for all herbs */}
      <div className="glass sticky top-0 z-10 py-6 px-8 flex items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Comprehensive Herb Guide</h1>
      </div>
      
      {/* Herb Selection Boxes - All herbs */}
      <HerbSelector 
        herbs={allHerbs} 
        activeHerb={activeHerb} 
        handleHerbSelect={handleHerbSelect}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:px-12 lg:py-6">
        {renderCallToAction()}
        <ContentArea
          activeHerb={activeHerb}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeCategory={activeHerb?.category || 'heart'}
        />
      </div>
      
      {/* Footer */}
      <div className="glass py-4 px-6 text-center text-sm text-gray-600">
        <p>Always consult with a healthcare professional before starting any herbal regimen.</p>
      </div>
    </div>
  );
};

export default HerbVisualizer;
