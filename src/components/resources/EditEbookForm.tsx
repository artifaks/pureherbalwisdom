
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Ebook } from '@/types/ebook';

interface EditEbookFormProps {
  editingResource: Ebook;
  setEditingResource: React.Dispatch<React.SetStateAction<Ebook | null>>;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCover: File | null;
}

const EditEbookForm: React.FC<EditEbookFormProps> = ({
  editingResource,
  setEditingResource,
  onCancel,
  onSubmit,
  handlePriceChange,
  handleTitleChange,
  handleDescriptionChange,
  handleCoverChange,
  selectedCover
}) => {
  return (
    <Card className="mb-10 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Edit E-Book</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onCancel}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        {handleTitleChange && (
          <div>
            <Label htmlFor="edit-title">Title</Label>
            <Input 
              id="edit-title"
              type="text"
              value={editingResource.title}
              onChange={handleTitleChange}
              required
            />
          </div>
        )}
        
        <div>
          <Label htmlFor="edit-price">Price ($)</Label>
          <Input 
            id="edit-price"
            type="number"
            min="0.00"
            step="0.01"
            value={editingResource.price.replace('$', '')}
            onChange={handlePriceChange}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="edit-description">Description</Label>
          <Textarea 
            id="edit-description"
            value={editingResource.description}
            onChange={handleDescriptionChange}
            className="min-h-[100px]"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="edit-cover">Cover Image (Optional)</Label>
          <Input 
            id="edit-cover"
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
          />
          {selectedCover && (
            <p className="text-sm text-green-600 mt-1">
              New cover selected: {selectedCover.name}
            </p>
          )}
          {editingResource.coverUrl && !selectedCover && (
            <p className="text-sm text-gray-500 mt-1">
              Current cover will be kept if no new image is selected
            </p>
          )}
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            type="submit" 
            className="bg-amber-500 hover:bg-amber-600"
          >
            Save Changes
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EditEbookForm;
