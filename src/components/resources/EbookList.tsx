
import React from 'react';
import EbookCard from './EbookCard';
import { Ebook } from '@/types/ebook';

interface EbookListProps {
  resources: Ebook[];
  purchasedBooks: Record<string, boolean>;
  isUploading: boolean;
  handleDownload: (resource: Ebook) => void;
  handleEditClick: (resource: Ebook) => void;
  handleDeleteClick?: (resource: Ebook) => void;
}

const EbookList: React.FC<EbookListProps> = ({ 
  resources, 
  purchasedBooks,
  isUploading, 
  handleDownload, 
  handleEditClick,
  handleDeleteClick
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <EbookCard
          key={resource.id}
          resource={resource}
          isPurchased={purchasedBooks[resource.id] || false}
          onDownload={handleDownload}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
};

export default EbookList;
