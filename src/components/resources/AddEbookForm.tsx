
import React, { useState } from 'react';
import { Plus, X, Upload, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AddEbookFormProps {
  newBook: {
    title: string;
    description: string;
    type: string;
    price: string;
  };
  setNewBook: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    type: string;
    price: string;
  }>>;
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  selectedCover: File | null;
  setSelectedCover: React.Dispatch<React.SetStateAction<File | null>>;
  isUploading: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddEbookForm: React.FC<AddEbookFormProps> = ({
  newBook,
  setNewBook,
  selectedFile,
  setSelectedFile,
  selectedCover,
  setSelectedCover,
  isUploading,
  onCancel,
  onSubmit,
  handlePriceChange,
  handleFileChange,
  handleCoverChange
}) => {
  return (
    <Card className="mb-10 p-6">
      <h3 className="text-xl font-semibold mb-4">Add New E-Book</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title"
            value={newBook.title}
            onChange={e => setNewBook({...newBook, title: e.target.value})}
            placeholder="E-Book Title"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description"
            value={newBook.description}
            onChange={e => setNewBook({...newBook, description: e.target.value})}
            placeholder="Briefly describe your e-book content"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            value={newBook.type}
            onChange={e => setNewBook({...newBook, type: e.target.value})}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="e-book">E-Book</option>
            <option value="guide">Guide</option>
            <option value="calendar">Calendar</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input 
            id="price"
            type="number"
            min="0.00"
            step="0.01"
            value={newBook.price}
            onChange={handlePriceChange}
            placeholder="4.99"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="cover">Cover Image</Label>
          <div className="flex items-center gap-2">
            <Input
              id="cover"
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="flex-1"
            />
            {selectedCover && (
              <span className="text-sm text-green-600">
                {selectedCover.name}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Upload an attractive cover image for your e-book (optional)</p>
        </div>
        
        <div>
          <Label htmlFor="file">PDF File</Label>
          <div className="flex items-center gap-2">
            <Input
              id="file"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="flex-1"
              required
            />
            {selectedFile && (
              <span className="text-sm text-green-600">
                {selectedFile.name}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            type="submit" 
            className="bg-amber-500 hover:bg-amber-600" 
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Add E-Book'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isUploading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddEbookForm;
