
import React from 'react';
import { Bookmark, BookmarkPlus } from 'lucide-react';

interface BookmarkButtonProps {
  isSaved: boolean;
  size?: 'small' | 'default';
  onToggle: (e: React.MouseEvent) => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  isSaved,
  size = 'default',
  onToggle
}) => {
  return (
    <button 
      className="absolute top-2 right-2 text-gray-400 hover:text-accent transition-colors z-20"
      onClick={onToggle}
      aria-label={isSaved ? "Remove from My Herbs" : "Add to My Herbs"}
      title={isSaved ? "Remove from My Herbs" : "Add to My Herbs"}
    >
      {isSaved 
        ? <Bookmark size={size === 'small' ? 14 : 18} className="text-accent fill-accent" /> 
        : <BookmarkPlus size={size === 'small' ? 14 : 18} />
      }
    </button>
  );
};

export default BookmarkButton;
