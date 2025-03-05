
import React, { useState, useEffect } from 'react';
import ContentArea from './ContentArea';
import HerbSelector from './HerbSelector';
import WellnessBanner from './WellnessBanner';
import SearchBar, { FilterOptions } from './SearchBar';
import ColorLegend from './ColorLegend';
import { Herb } from '@/data/types';
import { allHerbs } from '@/data/allHerbs';
import { Button } from './ui/button';
import { Sparkles, Leaf } from 'lucide-react';

const HerbVisualizer: React.FC = () => {
  // State for active herb and tab
  const [activeHerb, setActiveHerb] = useState<Herb | null>(null);
  const [activeTab, setActiveTab] = useState<'benefits' | 'oil' | 'tincture'>('benefits');
  const [filteredHerbs, setFilteredHerbs] = useState<Herb[]>(allHerbs);
  const [searchApplied, setSearchApplied] = useState(false);

  const handleHerbSelect = (herb: Herb) => {
    setActiveHerb(herb);
    setActiveTab('benefits');
  };

  const handleSearchResults = (results: Herb[]) => {
    setFilteredHerbs(results);
    setSearchApplied(results.length !== allHerbs.length);
  };

  const handleFilterChange = (filters: FilterOptions) => {
    let results = [...allHerbs];
    
    // Filter by condition (this is a simplified example - actual implementation would depend on your data structure)
    if (filters.condition) {
      // This is a simplified filter - you would need to adjust based on your actual data structure
      results = results.filter(herb => 
        herb.benefits.some(benefit => benefit.toLowerCase().includes(filters.condition.toLowerCase()))
      );
    }
    
    // Filter by preparation method
    if (filters.preparationMethod) {
      results = results.filter(herb => {
        const oilMatch = filters.preparationMethod === 'oil' && herb.oilPreparation.length > 0;
        const tinctureMatch = filters.preparationMethod === 'tincture' && herb.tincturePreparation.length > 0;
        // For other preparation methods, you would need additional data fields
        return oilMatch || tinctureMatch;
      });
    }
    
    // For potency filter, you would need to add a potency field to your herb data
    // This is a placeholder implementation
    if (filters.potency) {
      // Placeholder implementation - adjust based on your data
      results = results;
    }
    
    setFilteredHerbs(results);
    setSearchApplied(results.length !== allHerbs.length);
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
      
      {/* Title for all herbs - Updated with larger font and decorative element */}
      <div className="glass sticky top-0 z-10 py-6 px-8 flex items-center justify-center">
        <Leaf className="w-6 h-6 mr-2 text-amber-600" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
          Comprehensive Herb Guide
        </h1>
        <Leaf className="w-6 h-6 ml-2 text-amber-600 transform rotate-180" />
      </div>
      
      {/* Search and Filter Bar */}
      <SearchBar 
        herbs={allHerbs} 
        onSearchResults={handleSearchResults} 
        onFilterChange={handleFilterChange}
      />

      {searchApplied && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mx-6 mt-4 flex justify-between items-center">
          <p className="text-amber-800">
            Showing {filteredHerbs.length} {filteredHerbs.length === 1 ? 'herb' : 'herbs'} matching your search criteria.
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setFilteredHerbs(allHerbs);
              setSearchApplied(false);
            }}
          >
            Clear Search
          </Button>
        </div>
      )}
      
      {/* Color Legend */}
      <ColorLegend />
      
      {/* Herb Selection Boxes - All herbs */}
      <HerbSelector 
        herbs={filteredHerbs} 
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
