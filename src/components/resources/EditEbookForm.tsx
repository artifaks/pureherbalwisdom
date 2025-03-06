
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Ebook } from '@/types/ebook';

interface EditEbookFormProps {
  editingResource: Ebook;
  setEditingResource: React.Dispatch<React.SetStateAction<Ebook | null>>;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditEbookForm: React.FC<EditEbookFormProps> = ({
  editingResource,
  setEditingResource,
  onCancel,
  onSubmit,
  handlePriceChange
}) => {
  return (
    <Card className="mb-10 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Edit Price: {editingResource.title}</h3>
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
        <div className="flex gap-2 pt-2">
          <Button 
            type="submit" 
            className="bg-amber-500 hover:bg-amber-600"
          >
            Save Price
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
