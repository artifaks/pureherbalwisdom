
import React from 'react';
import { Herb } from '@/data/types';
import { Sparkles } from 'lucide-react';
import ComplementaryHerbItem from './ComplementaryHerbItem';
import { getComplementaryHerbs } from '@/utils/herbPairingUtils';

interface ComplementaryHerbsProps {
  activeHerb: Herb;
  allHerbs: Herb[];
  onHerbSelect: (herb: Herb) => void;
  savedHerbs: Herb[];
  onToggleSave: (herb: Herb) => void;
}

const ComplementaryHerbs: React.FC<ComplementaryHerbsProps> = ({
  activeHerb,
  allHerbs,
  onHerbSelect,
  savedHerbs,
  onToggleSave
}) => {
  const complementaryHerbs = getComplementaryHerbs(activeHerb, allHerbs);

  // Skip rendering if no pairings found
  if (complementaryHerbs.length === 0) return null;

  // Check if herb is saved
  const isHerbSaved = (herbId: string): boolean => {
    return savedHerbs.some(herb => herb.id === herbId);
  };

  return (
    <div className="mt-12 glass p-6 rounded-xl animate-fade-in">
      <div className="flex items-center mb-6">
        <Sparkles className="mr-3 text-amber-500" size={20} />
        <h3 className="text-xl font-semibold text-gray-800">Complementary Herbs</h3>
      </div>
      
      <div className="space-y-6">
        {complementaryHerbs.map((pairing: any) => (
          <ComplementaryHerbItem
            key={pairing.herb.id}
            pairing={pairing}
            activeHerb={activeHerb}
            onHerbSelect={onHerbSelect}
            isSaved={isHerbSaved(pairing.herb.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>
    </div>
  );
};

export default ComplementaryHerbs;
