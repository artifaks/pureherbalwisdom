
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainNavigation from '@/components/MainNavigation';
import { allHerbs } from '@/data/allHerbs';
import { Herb } from '@/data/types';
import HerbDetailModal from '@/components/HerbDetailModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Clock, Filter, Search as SearchIcon, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SearchResult {
  herb: Herb;
  matchType: 'name' | 'benefit' | 'category' | 'compound' | 'traditional';
  matchedText: string;
}

// Common compounds and traditional medicine systems
const knownCompounds = [
  'curcumin', 'saponins', 'flavonoids', 'polyphenols', 'alkaloids', 
  'carotenoids', 'terpenes', 'anthraquinones', 'glycosides'
];

const traditionalSystems = [
  'ayurvedic', 'ayurveda', 'tcm', 'chinese medicine', 'traditional chinese', 
  'western herbal', 'native american', 'indigenous', 'european'
];

// Categories for filtering
const categoryFilters = [
  { id: 'heart', label: 'Heart Health' },
  { id: 'stomach', label: 'Digestive Health' },
  { id: 'mens', label: 'Men\'s Health' },
  { id: 'womens', label: 'Women\'s Health' },
  { id: 'brain', label: 'Brain Health' },
];

// Benefit filters
const benefitFilters = [
  { id: 'anti-inflammatory', label: 'Anti-inflammatory' },
  { id: 'anxiety', label: 'Anxiety Relief' },
  { id: 'sleep', label: 'Sleep Support' },
  { id: 'digestion', label: 'Digestive Support' },
  { id: 'immune', label: 'Immune Support' },
  { id: 'energy', label: 'Energy' },
  { id: 'stress', label: 'Stress Relief' },
];

// Preparation method filters
const preparationFilters = [
  { id: 'tea', label: 'Tea' },
  { id: 'tincture', label: 'Tincture' },
  { id: 'oil', label: 'Oil' },
  { id: 'capsule', label: 'Capsule' },
  { id: 'powder', label: 'Powder' },
];

const Search: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Extract search query from URL if present
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [selectedPreparations, setSelectedPreparations] = useState<string[]>([]);
  
  // Herb detail modal states
  const [activeHerb, setActiveHerb] = useState<Herb | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'oil' | 'tincture'>('benefits');
  
  // Load recent searches from localStorage
  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      try {
        setRecentSearches(JSON.parse(storedSearches));
      } catch (error) {
        console.error('Error parsing recent searches', error);
      }
    }
  }, []);
  
  // Update URL when search query changes
  useEffect(() => {
    if (searchQuery) {
      const newParams = new URLSearchParams();
      newParams.set('q', searchQuery);
      navigate(`/search?${newParams.toString()}`, { replace: true });
    }
  }, [searchQuery, navigate]);
  
  // Generate search suggestions based on partial input
  useEffect(() => {
    if (searchQuery.length > 1) {
      const herbNameSuggestions = allHerbs
        .filter(herb => herb.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(herb => herb.name);
      
      const benefitSuggestions = Array.from(
        new Set(
          allHerbs.flatMap(herb => 
            herb.benefits.filter(benefit => 
              benefit.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
        )
      );
      
      const allSuggestions = [...herbNameSuggestions, ...benefitSuggestions].slice(0, 7);
      setSuggestions(allSuggestions);
      setShowSuggestions(allSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);
  
  // Search function
  const performSearch = () => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    
    // Add to recent searches
    if (!recentSearches.includes(searchQuery)) {
      const newRecentSearches = [searchQuery, ...recentSearches].slice(0, 5);
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    }
    
    const query = searchQuery.toLowerCase().trim();
    const searchResults: SearchResult[] = [];
    
    // Search through all herbs
    allHerbs.forEach(herb => {
      // Match by name
      if (herb.name.toLowerCase().includes(query)) {
        searchResults.push({
          herb,
          matchType: 'name',
          matchedText: herb.name
        });
        return; // Found by name, no need to check other properties
      }
      
      // Match by benefits
      const matchedBenefit = herb.benefits.find(
        benefit => benefit.toLowerCase().includes(query)
      );
      
      if (matchedBenefit) {
        searchResults.push({
          herb,
          matchType: 'benefit',
          matchedText: matchedBenefit
        });
        return; // Found by benefit, no need to check other properties
      }
      
      // Match by category
      if (herb.category && herb.category.toLowerCase().includes(query)) {
        searchResults.push({
          herb,
          matchType: 'category',
          matchedText: herb.category
        });
        return;
      }
      
      // Match by compounds (checking benefits for compound mentions)
      if (knownCompounds.some(compound => 
        query.includes(compound) && 
        herb.benefits.some(benefit => benefit.toLowerCase().includes(compound))
      )) {
        const compound = knownCompounds.find(c => 
          query.includes(c) && herb.benefits.some(b => b.toLowerCase().includes(c))
        );
        searchResults.push({
          herb,
          matchType: 'compound',
          matchedText: compound || 'Compound'
        });
        return;
      }
      
      // Match by traditional medicine system
      if (traditionalSystems.some(system => 
        query.includes(system) && 
        herb.benefits.some(benefit => benefit.toLowerCase().includes(system))
      )) {
        const system = traditionalSystems.find(s => 
          query.includes(s) && herb.benefits.some(b => b.toLowerCase().includes(s))
        );
        searchResults.push({
          herb,
          matchType: 'traditional',
          matchedText: system || 'Traditional Medicine'
        });
      }
    });
    
    // Apply filters if selected
    let filteredResults = [...searchResults];
    
    if (selectedCategories.length > 0) {
      filteredResults = filteredResults.filter(
        result => result.herb.category && selectedCategories.includes(result.herb.category)
      );
    }
    
    if (selectedBenefits.length > 0) {
      filteredResults = filteredResults.filter(result => 
        result.herb.benefits.some(benefit => 
          selectedBenefits.some(selectedBenefit => 
            benefit.toLowerCase().includes(selectedBenefit.toLowerCase())
          )
        )
      );
    }
    
    if (selectedPreparations.length > 0) {
      filteredResults = filteredResults.filter(result => {
        if (selectedPreparations.includes('oil') && result.herb.oilPreparation.length > 0) {
          return true;
        }
        if (selectedPreparations.includes('tincture') && result.herb.tincturePreparation.length > 0) {
          return true;
        }
        // For other preparation methods, check benefit descriptions
        return selectedPreparations.some(prep => 
          result.herb.benefits.some(benefit => 
            benefit.toLowerCase().includes(prep.toLowerCase())
          )
        );
      });
    }
    
    setResults(filteredResults);
    setShowSuggestions(false);
    
    // Show toast with search results count
    if (filteredResults.length === 0) {
      toast({
        title: "No Results Found",
        description: "Try adjusting your search terms or filters",
        variant: "destructive",
      });
    } else {
      toast({
        title: `${filteredResults.length} Results Found`,
        description: `For search: "${searchQuery}"`,
      });
    }
  };
  
  // Trigger search on initial load if query is present
  useEffect(() => {
    if (initialQuery) {
      performSearch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    // Manually update URL and perform search
    const newParams = new URLSearchParams();
    newParams.set('q', suggestion);
    navigate(`/search?${newParams.toString()}`, { replace: true });
    
    // Use setTimeout to ensure state is updated before search
    setTimeout(() => {
      performSearch();
    }, 0);
  };
  
  const handleRecentSearchClick = (recentSearch: string) => {
    setSearchQuery(recentSearch);
    // Use setTimeout to ensure state is updated before search
    setTimeout(() => {
      performSearch();
    }, 0);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
    navigate('/search', { replace: true });
  };
  
  const handleHerbSelect = (herb: Herb) => {
    setActiveHerb(herb);
    setActiveTab('benefits');
    setIsModalOpen(true);
  };
  
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  
  const toggleBenefit = (benefitId: string) => {
    if (selectedBenefits.includes(benefitId)) {
      setSelectedBenefits(selectedBenefits.filter(id => id !== benefitId));
    } else {
      setSelectedBenefits([...selectedBenefits, benefitId]);
    }
  };
  
  const togglePreparation = (prepId: string) => {
    if (selectedPreparations.includes(prepId)) {
      setSelectedPreparations(selectedPreparations.filter(id => id !== prepId));
    } else {
      setSelectedPreparations([...selectedPreparations, prepId]);
    }
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBenefits([]);
    setSelectedPreparations([]);
  };
  
  const applyFilters = () => {
    performSearch();
    setShowFilters(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MainNavigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Herb Search</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find herbs by name, benefits, categories, or traditional uses
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 relative">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              
              <Input
                type="text"
                placeholder="Search herbs, benefits, or categories..."
                className="pl-10 pr-4 py-2 rounded-l-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') performSearch();
                }}
                onFocus={() => {
                  if (searchQuery.length > 1) {
                    setShowSuggestions(suggestions.length > 0);
                  }
                }}
              />
              
              {searchQuery && (
                <button 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={clearSearch}
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
              
              {/* Search Suggestions */}
              {showSuggestions && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Button 
              onClick={performSearch}
              className="gap-2"
            >
              <SearchIcon className="h-4 w-4" />
              Search
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" />
              {(selectedCategories.length > 0 || selectedBenefits.length > 0 || selectedPreparations.length > 0) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
              )}
            </Button>
          </div>
          
          {/* Recent Searches */}
          {recentSearches.length > 0 && !showSuggestions && !results.length && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-1" /> Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Filters Section */}
          {showFilters && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filters */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categoryFilters.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => toggleCategory(category.id)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          selectedCategories.includes(category.id)
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {selectedCategories.includes(category.id) && (
                          <Check className="inline h-3 w-3 mr-1" />
                        )}
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Benefit Filters */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {benefitFilters.map((benefit) => (
                      <button
                        key={benefit.id}
                        onClick={() => toggleBenefit(benefit.id)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          selectedBenefits.includes(benefit.id)
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {selectedBenefits.includes(benefit.id) && (
                          <Check className="inline h-3 w-3 mr-1" />
                        )}
                        {benefit.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Preparation Filters */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Preparation</h3>
                  <div className="flex flex-wrap gap-2">
                    {preparationFilters.map((prep) => (
                      <button
                        key={prep.id}
                        onClick={() => togglePreparation(prep.id)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          selectedPreparations.includes(prep.id)
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {selectedPreparations.includes(prep.id) && (
                          <Check className="inline h-3 w-3 mr-1" />
                        )}
                        {prep.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
                <Button
                  size="sm"
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Search Results */}
        {results.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {results.length} {results.length === 1 ? 'Result' : 'Results'} for "{searchQuery}"
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result, index) => (
                <div 
                  key={`${result.herb.id}-${index}`} 
                  className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleHerbSelect(result.herb)}
                >
                  <div className="h-3" style={{ backgroundColor: result.herb.color }}></div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{result.herb.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">
                      {result.matchType === 'name' && 'Found by herb name'}
                      {result.matchType === 'benefit' && 'Found by health benefit'}
                      {result.matchType === 'category' && 'Found by category'}
                      {result.matchType === 'compound' && 'Found by active compound'}
                      {result.matchType === 'traditional' && 'Found by traditional use'}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      {result.matchType === 'benefit' ? result.matchedText : result.herb.benefits[0] || "Natural herbal remedy"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.herb.benefits.slice(0, 3).map((benefit, index) => (
                        <span 
                          key={index} 
                          className="bg-amber-50 text-amber-800 text-xs px-2 py-1 rounded"
                        >
                          {benefit}
                        </span>
                      ))}
                      {result.herb.benefits.length > 3 && (
                        <span className="text-xs text-gray-500">+{result.herb.benefits.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* No Results State */}
        {searchQuery && results.length === 0 && !showSuggestions && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <SearchIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No herbs found</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-4">
              We couldn't find any herbs matching "{searchQuery}". Try different keywords or check out our symptom matcher.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={clearSearch}>
                Clear Search
              </Button>
              <Button onClick={() => navigate('/symptom-matcher')}>
                Try Symptom Matcher
              </Button>
            </div>
          </div>
        )}
        
        {/* Initial State (No Search Yet) */}
        {!searchQuery && !results.length && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <SearchIcon className="h-8 w-8 text-amber-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Search for Herbs</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-4">
              Enter herb names, health benefits, ailments, or categories to find relevant herbs for your needs.
            </p>
            <div className="text-sm text-gray-600 max-w-md mx-auto mb-6">
              <p className="mb-2"><strong>Try searching for:</strong></p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Lavender", "Anxiety Relief", "Heart Health", "Anti-inflammatory", "Ginger", "Sleep Support"].map((suggestion, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={() => navigate('/symptom-matcher')}>
              Or Try Symptom Matcher
            </Button>
          </div>
        )}
      </div>
      
      {/* Herb Detail Modal */}
      <HerbDetailModal
        activeHerb={activeHerb}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedHerbs={[]}
        onHerbSelect={() => {}}
        onToggleSave={() => {}}
      />
    </div>
  );
};

export default Search;
