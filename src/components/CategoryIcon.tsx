
import React from 'react';
import { Heart, Droplet, Beaker } from 'lucide-react';

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
      return (
        <svg 
          viewBox="0 0 24 24" 
          width={size} 
          height={size} 
          className={`text-herb-stomach ${className}`} 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M4,12 Q7,4 12,8 Q17,12 20,12 Q23,18 12,20 Q1,18 4,12" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="currentColor" 
          />
        </svg>
      );
    case 'mens':
      return (
        <svg 
          viewBox="0 0 24 24" 
          width={size} 
          height={size} 
          className={`text-herb-mens ${className}`} 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" />
          <path d="M12,13 L12,21 M9,18 L15,18" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'womens':
      return (
        <svg 
          viewBox="0 0 24 24" 
          width={size} 
          height={size} 
          className={`text-herb-womens ${className}`} 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" />
          <path d="M12,13 L12,21 M8,17 L16,17" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="19" r="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    default:
      return <Heart size={size} className={className} />;
  }
};

export default CategoryIcon;
