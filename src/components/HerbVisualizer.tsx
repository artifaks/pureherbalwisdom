import React, { useState, useEffect } from 'react';
import HerbSelector from './HerbSelector';
import WellnessBanner from './WellnessBanner';
import SearchBar, { FilterOptions } from './SearchBar';
import ColorLegend from './ColorLegend';
import MyHerbsSection from './MyHerbsSection';
import HerbDetailModal from './HerbDetailModal';
import HerbsHeader from './HerbsHeader';
import SearchResultsNotice from './SearchResultsNotice';
import SaveHerbsCTA from './SaveHerbsCTA';
import HerbFooter from './HerbFooter';
import CallToAction from './CallToAction';
import { Herb } from '@/data/types';
import { allHerbs } from '@/data/allHerbs';
import { useToast } from "@/hooks/use-toast";

const HerbVisualizer: React.FC = () => {
  // State for active herb and tab
  const [activeHerb, setActiveHerb] = useState<Herb | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'oil' | 'tincture'>('benefits');
  const [filteredHerbs, setFilteredHerbs] = useState<Herb[]>(allHerbs);
  const [searchApplied, setSearchApplied] = useState(false);
  const [savedHerbs, setSavedHerbs] = useState<Herb[]>([]);
  const { toast } = useToast();

  // Load saved herbs from localStorage on mount
  useEffect(() => {
    const storedHerbs = localStorage.getItem('savedHerbs');
    if (storedHerbs) {
      try {
        const parsedHerbs = JSON.parse(storedHerbs);
        // Match against actual herb data to ensure we have the latest info
        const validHerbs = parsedHerbs.map((savedHerbId: string) => 
          allHerbs.find(herb => herb.id === savedHerbId)
        ).filter(Boolean);
        setSavedHerbs(validHerbs);
      } catch (error) {
        console.error('Error parsing saved herbs', error);
      }
    }
  }, []);

  // Save herbs to localStorage whenever the savedHerbs state changes
  useEffect(() => {
    if (savedHerbs.length > 0) {
      // Only store the IDs to keep localStorage size small
      const herbIds = savedHerbs.map(herb => herb.id);
      localStorage.setItem('savedHerbs', JSON.stringify(herbIds));
    } else {
      localStorage.removeItem('savedHerbs');
    }
  }, [savedHerbs]);

  const handleHerbSelect = (herb: Herb) => {
    setActiveHerb(herb);
    setActiveTab('benefits');
    setIsModalOpen(true); // Open modal when herb is selected
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleSave = (herb: Herb) => {
    const isCurrentlySaved = savedHerbs.some(savedHerb => savedHerb.id === herb.id);
    
    if (isCurrentlySaved) {
      // Remove herb
      setSavedHerbs(savedHerbs.filter(savedHerb => savedHerb.id !== herb.id));
      toast({
        description: `${herb.name} removed from your collection`,
        variant: "default",
      });
    } else {
      // Add herb
      setSavedHerbs([...savedHerbs, herb]);
      toast({
        description: `${herb.name} added to your collection`,
        variant: "default",
      });
    }
  };

  const handleSearchResults = (results: Herb[]) => {
    setFilteredHerbs(results);
    setSearchApplied(results.length !== allHerbs.length);
  };

  const handleFilterChange = (filters: FilterOptions) => {
    let results = [...allHerbs];
    
    // Filter by condition
    if (filters.condition) {
      results = results.filter(herb => 
        herb.benefits.some(benefit => benefit.toLowerCase().includes(filters.condition.toLowerCase()))
      );
    }
    
    // Filter by preparation method
    if (filters.preparationMethod) {
      results = results.filter(herb => {
        const oilMatch = filters.preparationMethod === 'oil' && herb.oilPreparation.length > 0;
        const tinctureMatch = filters.preparationMethod === 'tincture' && herb.tincturePreparation.length > 0;
        return oilMatch || tinctureMatch;
      });
    }
    
    // For potency filter (placeholder implementation)
    if (filters.potency) {
      results = results;
    }
    
    setFilteredHerbs(results);
    setSearchApplied(results.length !== allHerbs.length);
  };

  const clearSearch = () => {
    setFilteredHerbs(allHerbs);
    setSearchApplied(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Wellness Banner */}
      <WellnessBanner />
      
      {/* Title for all herbs */}
      <HerbsHeader />
      
      {/* Search and Filter Bar */}
      <SearchBar 
        herbs={allHerbs} 
        onSearchResults={handleSearchResults} 
        onFilterChange={handleFilterChange}
      />

      {/* Search Results Notice */}
      <SearchResultsNotice 
        filteredHerbs={filteredHerbs}
        allHerbs={allHerbs}
        searchApplied={searchApplied}
        clearSearch={clearSearch}
      />
      
      {/* My Herbs Section - Shows user's saved herbs */}
      {savedHerbs.length > 0 && (
        <MyHerbsSection 
          savedHerbs={savedHerbs}
          activeHerb={activeHerb}
          handleHerbSelect={handleHerbSelect}
          onToggleSave={handleToggleSave}
        />
      )}
      
      {/* Color Legend */}
      <ColorLegend />
      
      {/* Herb Selection Boxes - All herbs */}
      <HerbSelector 
        herbs={filteredHerbs} 
        activeHerb={activeHerb} 
        handleHerbSelect={handleHerbSelect}
        savedHerbs={savedHerbs}
        onToggleSave={handleToggleSave}
      />
      
      {/* Main Content Area with Call to Action */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:px-12 lg:py-6">
        {activeHerb === null && <CallToAction />}
      </div>
      
      {/* Herb Detail Modal */}
      <HerbDetailModal
        activeHerb={activeHerb}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedHerbs={savedHerbs}
        onHerbSelect={handleHerbSelect}
        onToggleSave={handleToggleSave}
      />
      
      {/* Show My Herbs CTA if no saved herbs yet */}
      <SaveHerbsCTA savedHerbsCount={savedHerbs.length} />
      
      {/* Footer */}
      <HerbFooter />
    </div>
  );
};

export default HerbVisualizer;
