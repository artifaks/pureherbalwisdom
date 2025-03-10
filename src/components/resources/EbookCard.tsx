
import React from 'react';
import { Download, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { Ebook } from '@/types/ebook';
import { supabase } from '@/integrations/supabase/client';

interface EbookCardProps {
  resource: Ebook;
  isPurchased: boolean;
  onDownload: (resource: Ebook) => void;
  onEditClick: (resource: Ebook) => void;
  onDeleteClick?: (resource: Ebook) => void;
}

const EbookCard: React.FC<EbookCardProps> = ({ 
  resource, 
  isPurchased, 
  onDownload,
  onEditClick,
  onDeleteClick 
}) => {
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className={`p-1 ${resource.popular ? 'bg-amber-500' : 'bg-gray-100'}`}>
        <p className={`text-center text-xs font-medium ${resource.popular ? 'text-white' : 'text-gray-500'}`}>
          {resource.popular ? 'POPULAR RESOURCE' : resource.type.toUpperCase()}
        </p>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        {/* Book cover image */}
        {resource.coverUrl ? (
          <div className="mb-4 w-full h-40 flex justify-center">
            <img 
              src={`${supabase.storage.from('e-books').getPublicUrl(resource.coverUrl).data.publicUrl}`}
              alt={`Cover of ${resource.title}`}
              className="h-full object-contain rounded-md shadow-sm"
            />
          </div>
        ) : (
          <div className="mb-4 w-full h-40 flex items-center justify-center bg-gray-100 rounded-md">
            <BookOpen className="h-16 w-16 text-gray-400" />
          </div>
        )}
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{resource.title}</h3>
        <p className="text-gray-600 mb-4 flex-1">{resource.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <span className="text-lg font-bold text-amber-600">{resource.price}</span>
            <Button 
              onClick={() => onEditClick(resource)}
              variant="ghost" 
              size="icon" 
              className="ml-1 h-8 w-8 text-gray-500 hover:text-amber-600"
            >
              <Edit className="h-3 w-3" />
            </Button>
            {onDeleteClick && (
              <Button 
                onClick={() => onDeleteClick(resource)}
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-gray-500 hover:text-red-600"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Button 
            onClick={() => onDownload(resource)}
            className="bg-amber-500 hover:bg-amber-600 text-white"
          >
            <Download className="mr-1 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EbookCard;
