
import React, { useState, useEffect, useRef, createRef } from 'react';
import HerbSelector from './HerbSelector';
import WellnessBanner from './WellnessBanner';
import SearchBar, { FilterOptions } from './SearchBar';
import FloatingSearchButton from './FloatingSearchButton';
import ColorLegend from './ColorLegend';
import MyHerbsSection from './MyHerbsSection';
import HerbDetailModal from './HerbDetailModal';
import HerbsHeader from './HerbsHeader';
import SearchResultsNotice from './SearchResultsNotice';
import SaveHerbsCTA from './SaveHerbsCTA';
import HerbFooter from './HerbFooter';
import CallToAction from './CallToAction';
import SectionJumpLinks from './SectionJumpLinks';
import { Herb, HerbCategory } from '@/data/types';
import { allHerbs } from '@/data/allHerbs';
import { useToast } from "@/hooks/use-toast";
import { Moon, Zap, Brain, Heart, Leaf, Droplets, Shield, Flame } from 'lucide-react';

const HerbVisualizer: React.FC = () => {
  // State for active herb and tab
  const [activeHerb, setActiveHerb] = useState<Herb | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'oil' | 'tincture'>('benefits');
  const [filteredHerbs, setFilteredHerbs] = useState<Herb[]>(allHerbs);
  const [searchApplied, setSearchApplied] = useState(false);
  const [savedHerbs, setSavedHerbs] = useState<Herb[]>([]);
  const [showFloatingSearch, setShowFloatingSearch] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({
    heart: createRef<HTMLDivElement>(),
    stomach: createRef<HTMLDivElement>(),
    mens: createRef<HTMLDivElement>(),
    womens: createRef<HTMLDivElement>(),
    brain: createRef<HTMLDivElement>(),
    tea: createRef<HTMLDivElement>(),
  });
  const { toast } = useToast();

  // Handle scroll event to show/hide floating search button
  useEffect(() => {
    const handleScroll = () => {
      if (searchBarRef.current) {
        const searchBarPosition = searchBarRef.current.getBoundingClientRect().bottom;
        setShowFloatingSearch(searchBarPosition < 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Toggle filter drawer
  const toggleFilterDrawer = () => {
    setShowFilterDrawer(!showFilterDrawer);
  };

  // Scroll to search bar
  const scrollToSearch = () => {
    searchBarRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to specific section
  const scrollToSection = (sectionId: string) => {
    const ref = categoryRefs.current[sectionId];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      // Highlight the section briefly
      ref.current.classList.add('section-highlight');
      setTimeout(() => {
        ref.current?.classList.remove('section-highlight');
      }, 1500);
    }
  };

  // Define categories for jump links
  const jumpCategories = [
    { id: 'brain', label: 'Brain & Focus', icon: Brain, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' },
    { id: 'heart', label: 'Heart Health', icon: Heart, color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' },
    { id: 'stomach', label: 'Digestion', icon: Droplets, color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' },
    { id: 'tea', label: 'Herbal Teas', icon: Leaf, color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' },
    { id: 'mens', label: 'Men\'s Health', icon: Shield, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' },
    { id: 'womens', label: 'Women\'s Health', icon: Flame, color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative">
      {/* Wellness Banner */}
      <WellnessBanner />
      
      {/* Title for all herbs */}
      <HerbsHeader />
      
      {/* Search and Filter Bar - Now with ref for scroll detection */}
      <div ref={searchBarRef}>
        <SearchBar 
          herbs={allHerbs} 
          onSearchResults={handleSearchResults} 
          onFilterChange={handleFilterChange}
          isSticky={true}
        />
      </div>
      
      {/* Section Jump Links */}
      <SectionJumpLinks 
        categories={jumpCategories}
        onJumpToSection={scrollToSection}
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
        categoryRefs={categoryRefs.current}
      />
      
      {/* Main Content Area with Call to Action */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 lg:px-12 lg:py-6">
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
      
      {/* Floating Search Button - appears when search bar is out of view */}
      {showFloatingSearch && (
        <FloatingSearchButton 
          onSearchClick={scrollToSearch} 
          onFilterClick={toggleFilterDrawer}
          activeFilters={searchApplied}
        />
      )}
      
      {/* Side Filter Drawer - appears when filter button is clicked */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${showFilterDrawer ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-amber-200">Filter Herbs</h3>
            <button 
              onClick={toggleFilterDrawer}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-gray-400">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Condition Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-amber-200/80 mb-2">Condition</label>
              <select
                className="w-full border border-amber-200 dark:border-amber-700/50 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white dark:bg-gray-700 dark:text-amber-100"
                onChange={(e) => handleFilterChange({ condition: e.target.value, preparationMethod: '', potency: '' })}
              >
                <option value="">All Conditions</option>
                <option value="sleep">Sleep</option>
                <option value="digestion">Digestion</option>
                <option value="stress">Stress</option>
                <option value="immune">Immune Support</option>
                <option value="energy">Energy</option>
                <option value="anxiety">Anxiety</option>
                <option value="inflammation">Inflammation</option>
              </select>
            </div>
            
            {/* Preparation Method Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-amber-200/80 mb-2">Preparation Method</label>
              <select
                className="w-full border border-amber-200 dark:border-amber-700/50 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white dark:bg-gray-700 dark:text-amber-100"
                onChange={(e) => handleFilterChange({ condition: '', preparationMethod: e.target.value, potency: '' })}
              >
                <option value="">All Methods</option>
                <option value="tea">Tea</option>
                <option value="tincture">Tincture</option>
                <option value="capsule">Capsule</option>
                <option value="oil">Oil</option>
                <option value="poultice">Poultice</option>
              </select>
            </div>
            
            {/* Quick Filter Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-amber-200/80 mb-2">Quick Filters</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => handleFilterChange({ condition: 'sleep', preparationMethod: '', potency: '' })}
                  className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium hover:bg-purple-200 dark:hover:bg-purple-800/40 transition-colors"
                >
                  Sleep Aid
                </button>
                <button 
                  onClick={() => handleFilterChange({ condition: 'stress', preparationMethod: '', potency: '' })}
                  className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
                >
                  Stress Relief
                </button>
                <button 
                  onClick={() => handleFilterChange({ condition: 'immune', preparationMethod: '', potency: '' })}
                  className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-xs font-medium hover:bg-green-200 dark:hover:bg-green-800/40 transition-colors"
                >
                  Immune Support
                </button>
                <button 
                  onClick={() => handleFilterChange({ condition: 'digestion', preparationMethod: '', potency: '' })}
                  className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-xs font-medium hover:bg-amber-200 dark:hover:bg-amber-800/40 transition-colors"
                >
                  Digestion
                </button>
                <button 
                  onClick={() => handleFilterChange({ condition: 'energy', preparationMethod: '', potency: '' })}
                  className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-full text-xs font-medium hover:bg-red-200 dark:hover:bg-red-800/40 transition-colors"
                >
                  Energy
                </button>
              </div>
            </div>
            
            {searchApplied && (
              <button
                onClick={clearSearch}
                className="w-full mt-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Overlay for filter drawer */}
      {showFilterDrawer && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={toggleFilterDrawer}
        />
      )}
    </div>
  );
};

export default HerbVisualizer;
