import React from 'react';
import { EbookCategory } from '@/types/ebook';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface EbookCategoryFilterProps {
  categories: EbookCategory[];
  selectedCategories: string[];
  onChange: (categoryId: string) => void;
}

const EbookCategoryFilter: React.FC<EbookCategoryFilterProps> = ({
  categories,
  selectedCategories,
  onChange
}) => {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <div key={category.id} className="flex items-center space-x-2">
          <Checkbox
            id={`category-${category.id}`}
            checked={selectedCategories.includes(category.id)}
            onCheckedChange={() => onChange(category.id)}
            className="border-amber-300 dark:border-amber-700 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
          />
          <Label
            htmlFor={`category-${category.id}`}
            className="text-sm font-medium text-gray-700 dark:text-amber-200 cursor-pointer"
          >
            {category.name}
          </Label>
        </div>
      ))}
      
      {categories.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-amber-200/60 italic">
          No categories available
        </p>
      )}
    </div>
  );
};

export default EbookCategoryFilter;
