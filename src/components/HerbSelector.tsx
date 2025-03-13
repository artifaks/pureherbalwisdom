
import React, { useState } from 'react';
import HerbCard from './HerbCard';
import { Herb, HerbCategory } from '@/data/types';
import CategoryIcon from './CategoryIcon';
import { ChevronDown, ChevronUp, ChevronsUp, ChevronsDown } from 'lucide-react';

interface HerbSelectorProps {
  herbs: Herb[];
  activeHerb: Herb | null;
  handleHerbSelect: (herb: Herb) => void;
  savedHerbs: Herb[];
  onToggleSave: (herb: Herb) => void;
  categoryRefs?: Record<string, React.RefObject<HTMLDivElement>>;
}

const HerbSelector: React.FC<HerbSelectorProps> = ({ 
  herbs, 
  activeHerb, 
  handleHerbSelect,
  savedHerbs,
  onToggleSave,
  categoryRefs
}) => {
  // Group herbs by category
  const categorizedHerbs = {
    heart: herbs.filter(herb => herb.category === 'heart'),
    stomach: herbs.filter(herb => herb.category === 'stomach'),
    mens: herbs.filter(herb => herb.category === 'mens'),
    womens: herbs.filter(herb => herb.category === 'womens'),
    brain: herbs.filter(herb => herb.category === 'brain'),
    tea: herbs.filter(herb => herb.category === 'tea')
  };

  // State to track which categories are expanded/collapsed
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    heart: true,
    stomach: true,
    mens: true,
    womens: true,
    brain: true,
    tea: true
  });
  
  // Toggle expand/collapse for a category
  const toggleCategory = (category: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering other click handlers
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // Expand all categories
  const expandAllCategories = () => {
    const allExpanded = Object.keys(categorizedHerbs).reduce((acc, category) => {
      acc[category] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedCategories(allExpanded);
  };
  
  // Collapse all categories
  const collapseAllCategories = () => {
    const allCollapsed = Object.keys(categorizedHerbs).reduce((acc, category) => {
      acc[category] = false;
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedCategories(allCollapsed);
  };

  // Define category labels and colors
  const categoryConfig: Record<HerbCategory, { label: string; bgColor: string; borderColor: string; titleBg: string }> = {
    heart: { 
      label: 'Herbs for Heart Health', 
      bgColor: 'bg-red-50/90 dark:bg-red-900/40',
      borderColor: 'border-red-200 dark:border-red-800/70',
      titleBg: 'bg-red-100/70 dark:bg-red-800/80'
    },
    stomach: { 
      label: 'Digestive Support Herbs', 
      bgColor: 'bg-green-50/90 dark:bg-green-900/40',
      borderColor: 'border-green-200 dark:border-green-800/70',
      titleBg: 'bg-green-100/70 dark:bg-green-800/80'
    },
    mens: { 
      label: 'Men\'s Wellness', 
      bgColor: 'bg-blue-50/90 dark:bg-blue-900/40',
      borderColor: 'border-blue-200 dark:border-blue-800/70',
      titleBg: 'bg-blue-100/70 dark:bg-blue-800/80'
    },
    womens: { 
      label: 'Women\'s Health', 
      bgColor: 'bg-pink-50/90 dark:bg-pink-900/40',
      borderColor: 'border-pink-200 dark:border-pink-800/70',
      titleBg: 'bg-pink-100/70 dark:bg-pink-800/80'
    },
    brain: {
      label: 'Brain & Cognitive Health',
      bgColor: 'bg-purple-50/90 dark:bg-purple-900/40',
      borderColor: 'border-purple-200 dark:border-purple-800/70',
      titleBg: 'bg-purple-100/70 dark:bg-purple-800/80'
    },
    tea: {
      label: 'Herbal Teas',
      bgColor: 'bg-amber-50/90 dark:bg-amber-900/40',
      borderColor: 'border-amber-200 dark:border-amber-800/70',
      titleBg: 'bg-amber-100/70 dark:bg-amber-800/80'
    }
  };

  // Check if herb is saved
  const isHerbSaved = (herbId: string): boolean => {
    return savedHerbs.some(herb => herb.id === herbId);
  };

  // Only display categories that have herbs
  const categoriesToShow = Object.entries(categorizedHerbs).filter(
    ([_, herbList]) => herbList.length > 0
  );

  console.log("Brain herbs count:", categorizedHerbs.brain.length);
  console.log("All herbs count:", herbs.length);
  console.log("Brain herbs:", categorizedHerbs.brain);

  return (
    <div className="glass-dark mx-2 sm:mx-6 my-3 sm:my-4 p-2 sm:p-4 rounded-xl overflow-auto dark:bg-gray-800/30 dark:backdrop-blur-md">
      {/* Expand/Collapse All Controls */}
      <div className="flex justify-end mb-4 px-2">
        <div className="flex space-x-2">
          <button
            onClick={expandAllCategories}
            className="flex items-center px-2 sm:px-3 py-1.5 bg-amber-100 text-amber-800 dark:bg-amber-700/80 dark:text-white rounded-md text-xs font-medium hover:bg-amber-200 dark:hover:bg-amber-600/90 transition-colors shadow-sm dark:shadow-amber-900/20"
            aria-label="Expand all sections"
          >
            <ChevronsDown size={16} className="mr-0.5 sm:mr-1" />
            <span className="hidden xs:inline">Expand All</span>
            <span className="xs:hidden">Expand</span>
          </button>
          <button
            onClick={collapseAllCategories}
            className="flex items-center px-2 sm:px-3 py-1.5 bg-gray-100 text-gray-800 dark:bg-gray-600/80 dark:text-white rounded-md text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-500/90 transition-colors shadow-sm dark:shadow-gray-900/20"
            aria-label="Collapse all sections"
          >
            <ChevronsUp size={16} className="mr-0.5 sm:mr-1" />
            <span className="hidden xs:inline">Collapse All</span>
            <span className="xs:hidden">Collapse</span>
          </button>
        </div>
      </div>
      {categoriesToShow.map(([category, herbList]) => (
        <div 
          key={category} 
          ref={categoryRefs?.[category]}
          className={`mb-6 sm:mb-8 rounded-lg transition-all duration-300 overflow-hidden border ${categoryConfig[category as HerbCategory].borderColor} 
          ${categoryConfig[category as HerbCategory].bgColor} ${activeHerb?.category === category ? 'ring-2 ring-accent/30 shadow-md' : 'shadow-sm'} scroll-mt-32`}
          id={`herb-category-${category}`}
        >
          <div 
            className={`px-3 sm:px-4 py-2.5 sm:py-3 ${categoryConfig[category as HerbCategory].titleBg} border-b ${categoryConfig[category as HerbCategory].borderColor} cursor-pointer`}
            onClick={(e) => toggleCategory(category, e)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CategoryIcon category={category as HerbCategory} size={18} className="mr-1.5 sm:mr-2 dark:text-amber-200" />
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 dark:text-white truncate">
                  {categoryConfig[category as HerbCategory].label}
                </h2>
              </div>
              <button 
                className="p-1 rounded-full hover:bg-white/20 dark:hover:bg-gray-600/40 transition-colors"
                onClick={(e) => toggleCategory(category, e)}
                aria-label={expandedCategories[category] ? 'Collapse section' : 'Expand section'}
              >
                {expandedCategories[category] ? 
                  <ChevronUp size={18} className="text-gray-600 dark:text-amber-100" /> : 
                  <ChevronDown size={18} className="text-gray-600 dark:text-amber-100" />}
              </button>
            </div>
          </div>
          
          {/* Content area - conditionally rendered based on expanded state */}
          <div 
            className={`overflow-hidden transition-all duration-300 ${expandedCategories[category] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'} dark:text-gray-100`}
          >
            <div className="p-2 xs:p-3 sm:p-4">
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1.5 xs:gap-2 sm:gap-3 md:gap-4">
                {herbList.map((herb) => (
                  <HerbCard
                    key={herb.id}
                    id={herb.id}
                    name={herb.name}
                    color={herb.color}
                    isActive={activeHerb?.id === herb.id}
                    onClick={() => handleHerbSelect(herb)}
                    category={herb.category}
                    benefits={herb.benefits}
                    isSaved={isHerbSaved(herb.id)}
                    onToggleSave={() => onToggleSave(herb)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Section divider after each category */}
          {category !== categoriesToShow[categoriesToShow.length - 1][0] && (
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-2"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HerbSelector;
