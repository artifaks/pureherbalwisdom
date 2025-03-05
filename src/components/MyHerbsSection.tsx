
import React from 'react';
import { Herb } from '@/data/types';
import HerbCard from './HerbCard';
import { Bookmark } from 'lucide-react';

interface MyHerbsSectionProps {
  savedHerbs: Herb[];
  activeHerb: Herb | null;
  handleHerbSelect: (herb: Herb) => void;
  onToggleSave: (herb: Herb) => void;
}

const MyHerbsSection: React.FC<MyHerbsSectionProps> = ({
  savedHerbs,
  activeHerb,
  handleHerbSelect,
  onToggleSave
}) => {
  if (savedHerbs.length === 0) {
    return (
      <div className="glass p-6 rounded-xl mx-3 sm:mx-6 my-4 text-center">
        <Bookmark className="mx-auto mb-3 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">My Herbs Collection</h3>
        <p className="text-gray-500">
          Your saved herbs will appear here. Bookmark herbs you're interested in by clicking the bookmark icon on any herb card.
        </p>
      </div>
    );
  }

  return (
    <div className="glass p-4 rounded-xl mx-3 sm:mx-6 my-4">
      <div className="flex items-center mb-4">
        <Bookmark className="mr-2 text-accent" size={18} />
        <h3 className="text-lg font-semibold text-gray-800">My Herbs Collection ({savedHerbs.length})</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
        {savedHerbs.map((herb) => (
          <HerbCard
            key={herb.id}
            id={herb.id}
            name={herb.name}
            color={herb.color}
            isActive={activeHerb?.id === herb.id}
            onClick={() => handleHerbSelect(herb)}
            category={herb.category}
            benefits={herb.benefits}
            isSaved={true}
            onToggleSave={() => onToggleSave(herb)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyHerbsSection;
