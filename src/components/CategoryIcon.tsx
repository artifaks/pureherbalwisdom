
import React from 'react';
import { Heart, Leaf, FlowerIcon, FruitCherries, Sprout } from 'lucide-react';

interface CategoryIconProps {
  category: 'heart' | 'stomach' | 'mens' | 'womens';
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
      return <FlowerIcon size={size} className={`text-herb-womens ${className}`} />;
    default:
      return <Heart size={size} className={className} />;
  }
};

export default CategoryIcon;
