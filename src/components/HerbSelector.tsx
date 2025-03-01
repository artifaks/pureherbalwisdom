
import React from 'react';
import HerbCard from './HerbCard';
import { Herb } from '@/data/types';

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
    <div className="glass-dark mx-6 my-4 p-4 rounded-xl overflow-x-auto">
      <div className="flex space-x-4 min-w-max px-2 py-1">
        {herbs.map((herb) => (
          <HerbCard
            key={herb.id}
            id={herb.id}
            name={herb.name}
            color={herb.color}
            isActive={activeHerb?.id === herb.id}
            onClick={() => handleHerbSelect(herb)}
          />
        ))}
      </div>
    </div>
  );
};

export default HerbSelector;
