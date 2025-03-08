
import React from 'react';
import { Herb } from '@/data/types';
import HerbCard from './HerbCard';

interface ComplementaryHerbItemProps {
  pairing: {
    herb: Herb;
    reason: string;
  };
  activeHerb: Herb;
  onHerbSelect: (herb: Herb) => void;
  isSaved: boolean;
  onToggleSave: (herb: Herb) => void;
}

const ComplementaryHerbItem: React.FC<ComplementaryHerbItemProps> = ({
  pairing,
  activeHerb,
  onHerbSelect,
  isSaved,
  onToggleSave
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white/70 p-4 rounded-lg hover:bg-white/90 transition-colors">
      <div className="flex justify-center sm:w-1/6">
        <HerbCard
          id={pairing.herb.id}
          name={pairing.herb.name}
          color={pairing.herb.color}
          isActive={false}
          onClick={() => onHerbSelect(pairing.herb)}
          category={pairing.herb.category}
          benefits={pairing.herb.benefits}
          isSaved={isSaved}
          onToggleSave={() => onToggleSave(pairing.herb)}
          size="small"
        />
      </div>
      <div className="sm:w-5/6">
        <h4 className="font-medium text-gray-800 mb-1 text-center sm:text-left">
          {pairing.herb.name} + {activeHerb.name}
        </h4>
        <p className="text-gray-600 text-sm sm:text-base">{pairing.reason}</p>
      </div>
    </div>
  );
};

export default ComplementaryHerbItem;
