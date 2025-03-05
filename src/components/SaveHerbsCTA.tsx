
import React from 'react';
import { BookmarkPlus } from 'lucide-react';

interface SaveHerbsCTAProps {
  savedHerbsCount: number;
}

const SaveHerbsCTA: React.FC<SaveHerbsCTAProps> = ({ savedHerbsCount }) => {
  if (savedHerbsCount > 0) return null;
  
  return (
    <div className="glass py-4 px-6 mx-3 sm:mx-6 mt-4 mb-6 rounded-xl text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Build Your Personal Herb Collection</h3>
      <p className="text-gray-600 mb-3">
        Save herbs you're interested in by clicking the bookmark icon <BookmarkPlus className="inline w-4 h-4" /> on any herb card.
      </p>
    </div>
  );
};

export default SaveHerbsCTA;
