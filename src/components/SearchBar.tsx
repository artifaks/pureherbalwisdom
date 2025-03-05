
import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Herb } from '@/data/types';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  herbs: Herb[];
  onSearchResults: (results: Herb[]) => void;
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  condition: string;
  preparationMethod: string;
  potency: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ herbs, onSearchResults, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Herb[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    condition: '',
    preparationMethod: '',
    potency: ''
  });
  
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Generate suggestions based on search query
  useEffect(() => {
    if (searchQuery.length > 1) {
      const matchedHerbs = herbs.filter(herb => 
        herb.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(matchedHerbs);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, herbs]);
  
  // Handle search submission
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      onSearchResults(herbs);
      return;
    }
    
    const results = herbs.filter(herb => 
      herb.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    onSearchResults(results);
    setShowSuggestions(false);
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (herb: Herb) => {
    setSearchQuery(herb.name);
    onSearchResults([herb]);
    setShowSuggestions(false);
  };
  
  // Handle filter changes
  const handleFilterChange = (filterType: keyof FilterOptions, value: string) => {
    const updatedFilters = { ...filters, [filterType]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  return (
    <div className="w-full bg-white/95 backdrop-blur-sm sticky top-0 z-30 border-b border-gray-200 shadow-sm py-3 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col space-y-3">
          {/* Search Bar */}
          <div className="flex items-center relative" ref={searchRef}>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search herbs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {suggestions.map((herb) => (
                    <div
                      key={herb.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleSuggestionClick(herb)}
                    >
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: herb.color }}
                      />
                      <span>{herb.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button 
              onClick={handleSearch}
              className="rounded-l-none rounded-r-lg"
            >
              Search
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="ml-2 relative"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" />
              {Object.values(filters).some(value => value !== '') && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
              )}
            </Button>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 animate-slide-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Condition Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    value={filters.condition}
                    onChange={(e) => handleFilterChange('condition', e.target.value)}
                  >
                    <option value="">All Conditions</option>
                    <option value="sleep">Sleep</option>
                    <option value="digestion">Digestion</option>
                    <option value="stress">Stress</option>
                    <option value="immune">Immune Support</option>
                    <option value="energy">Energy</option>
                  </select>
                </div>
                
                {/* Preparation Method Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Method</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    value={filters.preparationMethod}
                    onChange={(e) => handleFilterChange('preparationMethod', e.target.value)}
                  >
                    <option value="">All Methods</option>
                    <option value="tea">Tea</option>
                    <option value="tincture">Tincture</option>
                    <option value="capsule">Capsule</option>
                    <option value="oil">Oil</option>
                    <option value="poultice">Poultice</option>
                  </select>
                </div>
                
                {/* Potency Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Potency</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    value={filters.potency}
                    onChange={(e) => handleFilterChange('potency', e.target.value)}
                  >
                    <option value="">All Potency Levels</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="strong">Strong</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const resetFilters = { condition: '', preparationMethod: '', potency: '' };
                    setFilters(resetFilters);
                    onFilterChange(resetFilters);
                  }}
                  className="mr-2"
                >
                  Reset Filters
                </Button>
                <Button
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
