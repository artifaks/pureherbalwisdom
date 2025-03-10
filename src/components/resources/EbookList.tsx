
import React from 'react';
import EbookCard from './EbookCard';
import { Ebook } from '@/types/ebook';
import { BookOpen } from 'lucide-react';

interface EbookListProps {
  resources: Ebook[];
  purchasedBooks: Record<string, boolean>;
  isUploading: boolean;
  handleDownload: (resource: Ebook) => void;
  handleEditClick: (resource: Ebook) => void;
  handleDeleteClick?: (resource: Ebook) => void;
  refreshData?: () => void;
}

const EbookList: React.FC<EbookListProps> = ({ 
  resources, 
  purchasedBooks,
  isUploading, 
  handleDownload,
  handleEditClick,
  handleDeleteClick,
  refreshData
}) => {
  // Add a check for resources being undefined
  if (!resources || resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No eBooks Available</h3>
        <p className="text-gray-500 max-w-md">
          There are currently no eBooks in your library. Add new eBooks using the button above.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <EbookCard
          key={resource.id}
          resource={resource}
          isPurchased={true} // Always set to true to enable download
          onDownload={handleDownload}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
};

export default EbookList;
