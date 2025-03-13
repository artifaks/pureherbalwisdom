
import React, { useState, useMemo } from 'react';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import { herbalTeas } from '@/data/herbalTeas';
import { cn } from '@/lib/utils';
import { Leaf, Clock, Coffee, Droplet, Check, Sun, Moon, Filter, X, Zap, Brain, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { Herb } from '@/data/types';

const HerbalTeas: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [selectedTea, setSelectedTea] = useState<Herb | null>(null);
  const [filters, setFilters] = useState<{
    timeOfDay: string | null;
    useCase: string | null;
    teaType: string | null;
  }>({
    timeOfDay: null,
    useCase: null,
    teaType: null
  });
  
  // Filter options
  const filterOptions = {
    timeOfDay: ['Morning', 'Afternoon', 'Evening', 'Anytime'],
    useCase: ['Sleep', 'Digestion', 'Focus', 'Stress', 'Immune'],
    teaType: ['Adaptogen', 'Relaxing', 'Stimulating', 'Digestive']
  };

  const openTeaDetails = (tea: Herb) => {
    setSelectedTea(tea);
  };

  const closeTeaDetails = () => {
    setSelectedTea(null);
  };
  
  // Apply filters to tea list
  const filteredTeas = useMemo(() => {
    return herbalTeas.filter(tea => {
      // Time of day filter
      if (filters.timeOfDay && tea.bestTimeToConsume) {
        const timeString = tea.bestTimeToConsume.toLowerCase();
        if (!timeString.includes(filters.timeOfDay.toLowerCase())) {
          return false;
        }
      }
      
      // Use case filter
      if (filters.useCase && tea.benefits) {
        const benefitsString = tea.benefits.join(' ').toLowerCase();
        const effectsString = tea.effects ? tea.effects.join(' ').toLowerCase() : '';
        const combinedString = benefitsString + ' ' + effectsString;
        
        if (!combinedString.includes(filters.useCase.toLowerCase())) {
          return false;
        }
      }
      
      // Tea type filter
      if (filters.teaType) {
        const typeString = tea.effects ? tea.effects.join(' ').toLowerCase() : '';
        const benefitsString = tea.benefits.join(' ').toLowerCase();
        const combinedString = typeString + ' ' + benefitsString;
        
        if (!combinedString.includes(filters.teaType.toLowerCase())) {
          return false;
        }
      }
      
      return true;
    });
  }, [filters, herbalTeas]);
  
  // Toggle a filter
  const toggleFilter = (type: 'timeOfDay' | 'useCase' | 'teaType', value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }));
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      timeOfDay: null,
      useCase: null,
      teaType: null
    });
  };
  
  // Helper function to get appropriate icon for time of day
  const getTimeIcon = (timeString: string | undefined) => {
    if (!timeString) return <Clock className="h-4 w-4 mr-1" />;
    
    const time = timeString.toLowerCase();
    if (time.includes('morning')) {
      return <Sun className="h-4 w-4 mr-1 text-amber-500 dark:text-amber-400" />;
    } else if (time.includes('evening') || time.includes('bedtime')) {
      return <Moon className="h-4 w-4 mr-1 text-indigo-500 dark:text-indigo-400" />;
    } else {
      return <Clock className="h-4 w-4 mr-1 text-blue-500 dark:text-blue-400" />;
    }
  };
  
  // Helper function to get benefit icon
  const getBenefitIcon = (benefit: string) => {
    const b = benefit.toLowerCase();
    if (b.includes('sleep') || b.includes('calm') || b.includes('relax')) {
      return '💤';
    } else if (b.includes('focus') || b.includes('clarity') || b.includes('mental')) {
      return '🧠';
    } else if (b.includes('digest') || b.includes('stomach')) {
      return '🍃';
    } else if (b.includes('immune') || b.includes('health')) {
      return '⚡';
    } else if (b.includes('stress')) {
      return '🧘‍♂️';
    }
    return '🌿';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-amber-300 mb-4">
            Healing Herbal Teas
          </h1>
          <p className="text-lg text-gray-600 dark:text-amber-100/90 max-w-3xl mx-auto leading-relaxed">
            Discover the ancient healing powers of herbal teas. From calming chamomile 
            to invigorating peppermint, explore our collection of teas and their unique health benefits.
          </p>
        </div>
        
        {/* Filter Section */}
        <div className="mb-8 glass dark:bg-amber-950/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-amber-200 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter Teas
            </h2>
            {(filters.timeOfDay || filters.useCase || filters.teaType) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-sm text-gray-600 dark:text-amber-300 hover:text-gray-900 dark:hover:text-amber-100"
              >
                <X className="h-3 w-3 mr-1" /> Clear
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Time of Day Filters */}
            <div>
              <p className="text-xs text-gray-500 dark:text-amber-200/70 mb-2 font-medium">Time of Day</p>
              <div className="flex flex-wrap gap-2">
                {filterOptions.timeOfDay.map(time => (
                  <Button 
                    key={time} 
                    size="sm" 
                    variant={filters.timeOfDay === time ? "default" : "outline"}
                    className={cn(
                      "text-xs py-1 h-auto",
                      filters.timeOfDay === time 
                        ? "bg-amber-600 hover:bg-amber-700 text-white" 
                        : "dark:border-amber-700/50 dark:text-amber-300 dark:hover:bg-amber-800/30"
                    )}
                    onClick={() => toggleFilter('timeOfDay', time)}
                  >
                    {time === 'Morning' && <Sun className="h-3 w-3 mr-1" />}
                    {time === 'Evening' && <Moon className="h-3 w-3 mr-1" />}
                    {time === 'Afternoon' && <Sun className="h-3 w-3 mr-1" />}
                    {time === 'Anytime' && <Clock className="h-3 w-3 mr-1" />}
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Use Case Filters */}
            <div>
              <p className="text-xs text-gray-500 dark:text-amber-200/70 mb-2 font-medium">Use Case</p>
              <div className="flex flex-wrap gap-2">
                {filterOptions.useCase.map(useCase => (
                  <Button 
                    key={useCase} 
                    size="sm" 
                    variant={filters.useCase === useCase ? "default" : "outline"}
                    className={cn(
                      "text-xs py-1 h-auto",
                      filters.useCase === useCase 
                        ? "bg-amber-600 hover:bg-amber-700 text-white" 
                        : "dark:border-amber-700/50 dark:text-amber-300 dark:hover:bg-amber-800/30"
                    )}
                    onClick={() => toggleFilter('useCase', useCase)}
                  >
                    {useCase === 'Sleep' && <Moon className="h-3 w-3 mr-1" />}
                    {useCase === 'Digestion' && <Droplet className="h-3 w-3 mr-1" />}
                    {useCase === 'Focus' && <Brain className="h-3 w-3 mr-1" />}
                    {useCase === 'Stress' && <Heart className="h-3 w-3 mr-1" />}
                    {useCase === 'Immune' && <Zap className="h-3 w-3 mr-1" />}
                    {useCase}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Tea Type Filters */}
            <div>
              <p className="text-xs text-gray-500 dark:text-amber-200/70 mb-2 font-medium">Tea Type</p>
              <div className="flex flex-wrap gap-2">
                {filterOptions.teaType.map(type => (
                  <Button 
                    key={type} 
                    size="sm" 
                    variant={filters.teaType === type ? "default" : "outline"}
                    className={cn(
                      "text-xs py-1 h-auto",
                      filters.teaType === type 
                        ? "bg-amber-600 hover:bg-amber-700 text-white" 
                        : "dark:border-amber-700/50 dark:text-amber-300 dark:hover:bg-amber-800/30"
                    )}
                    onClick={() => toggleFilter('teaType', type)}
                  >
                    {type === 'Adaptogen' && <Leaf className="h-3 w-3 mr-1" />}
                    {type === 'Relaxing' && <Moon className="h-3 w-3 mr-1" />}
                    {type === 'Stimulating' && <Zap className="h-3 w-3 mr-1" />}
                    {type === 'Digestive' && <Droplet className="h-3 w-3 mr-1" />}
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeas.length > 0 ? (
            filteredTeas.map((tea) => (
              <div 
                key={tea.id}
                onClick={() => openTeaDetails(tea)}
                className="bg-white dark:bg-amber-950/30 rounded-xl overflow-hidden shadow-md dark:shadow-amber-900/20 
                         hover:shadow-lg dark:hover:shadow-amber-900/30 hover:scale-102 transition-all duration-300 cursor-pointer"
              >
                <div 
                  className="h-24 flex items-center justify-center relative"
                  style={{ backgroundColor: tea.color }}
                >
                  <div className="absolute inset-0 bg-black/5 dark:bg-black/20"></div>
                  <Coffee className="h-12 w-12 text-white drop-shadow-md" />
                </div>
                <div className="p-5 flex flex-col h-48">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-amber-200 mb-2">{tea.name}</h3>
                  <p className="text-gray-600 dark:text-amber-100/80 mb-3 flex-grow">
                    <span className="mr-1">{getBenefitIcon(tea.benefits[0])}</span> {tea.benefits[0]}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-amber-200/70 mt-auto">
                    {getTimeIcon(tea.bestTimeToConsume)}
                    <span>Best time: {tea.bestTimeToConsume ? tea.bestTimeToConsume.split(',')[0] : "Anytime"}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-amber-200/70 mb-3">No teas match your current filters</p>
              <Button 
                onClick={clearFilters}
                variant="outline"
                className="dark:border-amber-700/50 dark:text-amber-300 dark:hover:bg-amber-800/30"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Tea Detail Modal */}
        {selectedTea && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm"
            onClick={closeTeaDetails}
          >
            <div 
              className="bg-white dark:bg-amber-950/90 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center mb-6">
                  <div 
                    className="w-14 h-14 rounded-full mr-5 flex items-center justify-center relative"
                    style={{ backgroundColor: selectedTea.color }}
                  >
                    <div className="absolute inset-0 rounded-full bg-black/5 dark:bg-black/20"></div>
                    <Coffee className="h-8 w-8 text-white drop-shadow-md" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-amber-200">{selectedTea.name}</h2>
                  </div>
                </div>
                
                <div className="glass rounded-xl p-6 mb-6 dark:bg-amber-950/30 dark:border-amber-800/30">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-amber-300 mb-4 flex items-center">
                    <Leaf size={20} className="mr-3 text-green-600 dark:text-green-500 drop-shadow-sm" />
                    Health Benefits
                  </h3>
                  <ul className="space-y-4">
                    {selectedTea.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start bg-gray-50/80 dark:bg-amber-900/20 p-3 rounded-lg hover:bg-gray-100/80 dark:hover:bg-amber-900/30 transition-colors">
                        <div className="flex-shrink-0 mt-0.5 mr-3">
                          <span className="text-green-600 dark:text-green-500">{getBenefitIcon(benefit)}</span>
                        </div>
                        <span className="text-gray-700 dark:text-amber-100">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass p-6 rounded-xl dark:bg-amber-950/30 dark:border-amber-800/30">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-amber-300 mb-4 flex items-center">
                      <Coffee size={20} className="mr-3 text-amber-600 dark:text-amber-500 drop-shadow-sm" />
                      Preparation
                    </h3>
                    <pre className="whitespace-pre-wrap text-gray-700 dark:text-amber-100 font-sans">{selectedTea.tincturePreparation}</pre>
                  </div>
                  
                  <div className="glass p-6 rounded-xl dark:bg-amber-950/30 dark:border-amber-800/30">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-amber-300 mb-4 flex items-center">
                      <Droplet size={20} className="mr-3 text-blue-500 dark:text-blue-400 drop-shadow-sm" />
                      Effects & Timing
                    </h3>
                    <div className="mb-4">
                      <p className="text-gray-700 dark:text-amber-100">
                        <span className="font-medium dark:text-amber-200">Effects:</span> 
                        {selectedTea.effects ? (
                          <span>
                            {selectedTea.effects.map((effect, idx) => (
                              <span key={idx} className="inline-flex items-center mr-2">
                                <span className="mr-1">{getBenefitIcon(effect)}</span> {effect}{idx < selectedTea.effects.length - 1 ? ',' : ''}
                              </span>
                            ))}
                          </span>
                        ) : "Various healing properties"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 dark:text-amber-100">
                        <span className="font-medium dark:text-amber-200">Best time to consume:</span> 
                        <span className="inline-flex items-center">
                          <span className="mr-1">{getTimeIcon(selectedTea.bestTimeToConsume)}</span>
                          {selectedTea.bestTimeToConsume || "Anytime"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button 
                    onClick={closeTeaDetails}
                    className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:ring-offset-amber-950"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default HerbalTeas;
