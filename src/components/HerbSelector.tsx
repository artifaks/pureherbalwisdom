
import React from 'react';
import HerbCard from './HerbCard';
import { Herb, HerbCategory } from '@/data/types';
import CategoryIcon from './CategoryIcon';

interface HerbSelectorProps {
  herbs: Herb[];
  activeHerb: Herb | null;
  handleHerbSelect: (herb: Herb) => void;
}

const HerbSelector: React.FC<HerbSelectorProps> = ({ 
  herbs, 
  activeHerb, 
  handleHerbSelect 
}) => {
  // Group herbs by category
  const categorizedHerbs = {
    heart: herbs.filter(herb => herb.category === 'heart'),
    stomach: herbs.filter(herb => herb.category === 'stomach'),
    mens: herbs.filter(herb => herb.category === 'mens'),
    womens: herbs.filter(herb => herb.category === 'womens')
  };

  // Define category labels and colors
  const categoryConfig: Record<HerbCategory, { label: string; bgColor: string }> = {
    heart: { 
      label: 'Herbs for Heart Health', 
      bgColor: 'bg-red-50/80' 
    },
    stomach: { 
      label: 'Digestive Support Herbs', 
      bgColor: 'bg-green-50/80' 
    },
    mens: { 
      label: 'Men\'s Wellness', 
      bgColor: 'bg-blue-50/80' 
    },
    womens: { 
      label: 'Women\'s Health', 
      bgColor: 'bg-pink-50/80' 
    },
  };

  return (
    <div className="glass-dark mx-3 sm:mx-6 my-4 p-2 sm:p-4 rounded-xl overflow-auto">
      {Object.entries(categorizedHerbs).map(([category, herbList]) => (
        <div key={category} className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg ${categoryConfig[category as HerbCategory].bgColor}`}>
          <div className="flex items-center mb-2 sm:mb-3">
            <CategoryIcon category={category as HerbCategory} size={18} className="mr-2" />
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              {categoryConfig[category as HerbCategory].label}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
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
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HerbSelector;
