
import React from 'react';
import { Heart, Leaf, Flower, Sprout, Brain } from 'lucide-react';
import { HerbCategory } from '@/data/types';

interface CategoryIconProps {
  category: HerbCategory;
  size?: number;
  className?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, size = 24, className = '' }) => {
  switch (category) {
    case 'heart':
      return <Heart size={size} className={`text-herb-heart ${className}`} />;
    case 'stomach':
      return <Leaf size={size} className={`text-herb-stomach ${className}`} />;
    case 'mens':
      return <Sprout size={size} className={`text-herb-mens ${className}`} />;
    case 'womens':
      return <Flower size={size} className={`text-herb-womens ${className}`} />;
    case 'brain':
      return <Brain size={size} className={`text-herb-brain ${className}`} />;
    default:
      return <Heart size={size} className={className} />;
  }
};

export default CategoryIcon;
