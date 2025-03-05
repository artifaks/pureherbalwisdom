
import React from 'react';
import { Button } from './ui/button';
import { Herb } from '@/data/types';

interface SearchResultsNoticeProps {
  filteredHerbs: Herb[];
  allHerbs: Herb[];
  searchApplied: boolean;
  clearSearch: () => void;
}

const SearchResultsNotice: React.FC<SearchResultsNoticeProps> = ({ 
  filteredHerbs, 
  allHerbs, 
  searchApplied, 
  clearSearch 
}) => {
  if (!searchApplied) return null;
  
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mx-6 mt-4 flex justify-between items-center">
      <p className="text-amber-800">
        Showing {filteredHerbs.length} {filteredHerbs.length === 1 ? 'herb' : 'herbs'} matching your search criteria.
      </p>
      <Button 
        variant="outline" 
        size="sm"
        onClick={clearSearch}
      >
        Clear Search
      </Button>
    </div>
  );
};

export default SearchResultsNotice;
