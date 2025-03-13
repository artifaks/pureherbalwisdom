import React from 'react';
import { 
  Moon, 
  Zap, 
  Brain, 
  Heart, 
  Leaf, 
  Droplets, 
  Shield, 
  Flame
} from 'lucide-react';
import { HerbCategory } from '@/data/types';

interface SectionJumpLinksProps {
  categories: Array<{
    id: HerbCategory | string;
    label: string;
    icon: React.ElementType;
    color: string;
  }>;
  onJumpToSection: (sectionId: string) => void;
}

const SectionJumpLinks: React.FC<SectionJumpLinksProps> = ({ 
  categories,
  onJumpToSection
}) => {
  return (
    <div className="sticky top-16 z-10 bg-gradient-to-r from-indigo-50/90 via-purple-50/90 to-pink-50/90 dark:from-gray-900/95 dark:via-gray-900/95 dark:to-gray-900/95 backdrop-blur-sm py-2 px-3 md:px-6 rounded-lg shadow-sm mb-4 overflow-x-auto">
      <div className="flex items-center space-x-2 md:space-x-4">
        <span className="text-sm font-medium text-gray-700 dark:text-amber-200/80 whitespace-nowrap">Jump to:</span>
        <div className="flex flex-nowrap space-x-2 pb-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onJumpToSection(category.id)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all hover:shadow-md ${category.color} whitespace-nowrap`}
            >
              <category.icon size={16} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionJumpLinks;
