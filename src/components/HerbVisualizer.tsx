
import React, { useState } from 'react';
import ContentArea from './ContentArea';
import CategoryHeader from './CategoryHeader';
import HerbSelector from './HerbSelector';
import WellnessBanner from './WellnessBanner';
import { Herb, HerbCategory } from '@/data/types';
import { heartHerbs } from '@/data/heartHerbs';
import { stomachHerbs } from '@/data/stomachHerbs';
import { mensHerbs } from '@/data/mensHerbs';
import { womensHerbs } from '@/data/womensHerbs';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

const HerbVisualizer: React.FC = () => {
  // State for active herb, tab, and category
  const [activeHerb, setActiveHerb] = useState<Herb | null>(null);
  const [activeTab, setActiveTab] = useState<'benefits' | 'oil' | 'tincture'>('benefits');
  const [activeCategory, setActiveCategory] = useState<HerbCategory>('heart');

  // Category button colors
  const categoryColors = {
    heart: 'bg-red-100 text-red-800 border-red-200',
    stomach: 'bg-green-100 text-green-800 border-green-200',
    mens: 'bg-blue-100 text-blue-800 border-blue-200',
    womens: 'bg-pink-100 text-pink-800 border-pink-200',
  };

  // Get current herbs based on category
  const herbs = 
    activeCategory === 'heart' ? heartHerbs : 
    activeCategory === 'stomach' ? stomachHerbs : 
    activeCategory === 'mens' ? mensHerbs : 
    womensHerbs;

  const handleCategoryChange = (category: HerbCategory) => {
    setActiveCategory(category);
    setActiveHerb(null);
  };

  const handleHerbSelect = (herb: Herb) => {
    setActiveHerb(herb);
    setActiveTab('benefits');
  };

  const renderCallToAction = () => {
    if (activeHerb === null) {
      return (
        <div className="text-center my-12 py-8 glass rounded-2xl max-w-md mx-auto">
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
      
      {/* Header with Category Toggles */}
      <CategoryHeader 
        activeCategory={activeCategory} 
        handleCategoryChange={handleCategoryChange} 
        categoryColors={categoryColors}
      />
      
      {/* Herb Selection Boxes */}
      <HerbSelector 
        herbs={herbs} 
        activeHerb={activeHerb} 
        handleHerbSelect={handleHerbSelect}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:px-16 lg:py-8">
        {renderCallToAction()}
        <ContentArea
          activeHerb={activeHerb}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeCategory={activeCategory}
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
