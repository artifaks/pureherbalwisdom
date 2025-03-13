import React from 'react';
import { Search, Filter } from 'lucide-react';

interface FloatingSearchButtonProps {
  onSearchClick: () => void;
  onFilterClick: () => void;
  activeFilters: boolean;
}

const FloatingSearchButton: React.FC<FloatingSearchButtonProps> = ({ 
  onSearchClick, 
  onFilterClick,
  activeFilters
}) => {
  return (
    <div className="fixed bottom-6 right-6 flex space-x-3 z-40">
      {/* Filter Button */}
      <button
        onClick={onFilterClick}
        className="w-12 h-12 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 relative"
        aria-label="Open filters"
      >
        <Filter className="h-5 w-5" />
        {activeFilters && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </button>
      
      {/* Search Button */}
      <button
        onClick={onSearchClick}
        className="w-14 h-14 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
        aria-label="Jump to search"
      >
        <Search className="h-6 w-6" />
      </button>
    </div>
  );
};

export default FloatingSearchButton;
