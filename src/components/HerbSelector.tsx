
import React from 'react';
import HerbCard from './HerbCard';
import { Herb } from '@/data/types';
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
  return (
    <div className="glass-dark mx-6 my-4 p-4 rounded-xl overflow-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-2">
        {herbs.map((herb) => (
          <HerbCard
            key={herb.id}
            id={herb.id}
            name={herb.name}
            color={herb.color}
            isActive={activeHerb?.id === herb.id}
            onClick={() => handleHerbSelect(herb)}
            category={herb.category}
          />
        ))}
      </div>
    </div>
  );
};

export default HerbSelector;
