
import React from 'react';
import { Heart, Leaf, Sprout, Flower } from 'lucide-react';
import { HerbCategory } from '@/data/types';

const ColorLegend: React.FC = () => {
  const categories: {
    category: HerbCategory;
    name: string;
    color: string;
    icon: React.ReactNode;
    description: string;
  }[] = [
    {
      category: 'heart',
      name: 'Heart',
      color: '#e94057',
      icon: <Heart size={16} className="text-herb-heart" />,
      description: 'Cardiovascular support herbs'
    },
    {
      category: 'stomach',
      name: 'Digestive',
      color: '#4CAF50',
      icon: <Leaf size={16} className="text-herb-stomach" />,
      description: 'Digestive system support herbs'
    },
    {
      category: 'mens',
      name: "Men's Health",
      color: '#8D6E63',
      icon: <Sprout size={16} className="text-herb-mens" />,
      description: 'Male reproductive & vitality herbs'
    },
    {
      category: 'womens',
      name: "Women's Health",
      color: '#C2185B',
      icon: <Flower size={16} className="text-herb-womens" />,
      description: 'Female reproductive & hormonal herbs'
    }
  ];

  return (
    <div className="color-legend bg-amber-50/50 p-3 sm:p-4 rounded-lg border border-amber-100 mb-3 sm:mb-4 mx-3 sm:mx-6">
      <h3 className="text-amber-800 text-xs sm:text-sm font-medium mb-2">Herb Category Color Guide</h3>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {categories.map((cat) => (
          <div key={cat.category} className="flex items-center">
            <div 
              className="w-2 sm:w-3 h-10 sm:h-12 rounded-l-sm mr-2" 
              style={{ backgroundColor: cat.color }}
            />
            <div className="flex flex-col">
              <div className="flex items-center">
                {cat.icon}
                <span className="ml-1 text-xs sm:text-sm font-medium">{cat.name}</span>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-600 line-clamp-2">{cat.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorLegend;
