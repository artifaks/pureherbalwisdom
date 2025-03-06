
import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResourceHeaderProps {
  onAddBook: () => void;
  isAuthenticated: boolean;
}

const ResourceHeader: React.FC<ResourceHeaderProps> = ({ onAddBook, isAuthenticated }) => {
  return (
    <>
      <div className="glass sticky top-0 z-10 py-6 px-8 flex items-center justify-center">
        <BookOpen className="w-6 h-6 mr-2 text-amber-600" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
          Herbal E-Books & Resources
        </h1>
        <BookOpen className="w-6 h-6 ml-2 text-amber-600 transform rotate-180" />
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Premium Herbal Resources</h2>
        {isAuthenticated && (
          <Button 
            onClick={onAddBook} 
            className="bg-amber-500 hover:bg-amber-600 text-white"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add E-Book
          </Button>
        )}
      </div>
      
      <p className="text-gray-600 mb-10">
        Expand your herbal knowledge with our curated collection of e-books, guides, and reference materials.
        These resources provide in-depth information about medicinal plants, preparation methods, and
        traditional uses to enhance your herbal practice.
      </p>
    </>
  );
};

export default ResourceHeader;
