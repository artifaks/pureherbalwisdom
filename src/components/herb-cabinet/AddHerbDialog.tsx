
import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search, Check } from 'lucide-react';
import { allHerbs } from '@/data/allHerbs';
import { getCategoryColor } from '@/utils/herbIcons';
import CategoryIcon from '@/components/CategoryIcon';

interface AddHerbDialogProps {
  existingHerbIds: string[];
  onAddHerb: (herbId: string) => void;
}

const AddHerbDialog: React.FC<AddHerbDialogProps> = ({ existingHerbIds, onAddHerb }) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const filteredHerbs = useMemo(() => {
    if (!search.trim()) return allHerbs.slice(0, 20);
    const query = search.toLowerCase();
    return allHerbs.filter(h => h.name.toLowerCase().includes(query)).slice(0, 20);
  }, [search]);

  const handleAdd = (herbId: string) => {
    onAddHerb(herbId);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-amber-600 hover:bg-amber-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Herb
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Herb to Cabinet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search herbs by name..."
              className="pl-9"
              autoFocus
            />
          </div>
          <div className="max-h-64 overflow-y-auto space-y-1">
            {filteredHerbs.map(herb => {
              const isInCabinet = existingHerbIds.includes(herb.id);
              const categoryColor = getCategoryColor(herb.category);
              return (
                <button
                  key={herb.id}
                  onClick={() => !isInCabinet && handleAdd(herb.id)}
                  disabled={isInCabinet}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isInCabinet
                      ? 'bg-green-50 dark:bg-green-900/20 cursor-default'
                      : 'hover:bg-amber-50 dark:hover:bg-amber-900/20 cursor-pointer'
                  }`}
                >
                  <CategoryIcon category={herb.category} size={14} />
                  <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                    {herb.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}>
                    {herb.category === 'heart' ? 'Heart' :
                     herb.category === 'stomach' ? 'Stomach' :
                     herb.category === 'mens' ? "Men's" :
                     herb.category === 'womens' ? "Women's" :
                     herb.category === 'brain' ? 'Brain' : 'Tea'}
                  </span>
                  {isInCabinet && <Check className="h-4 w-4 text-green-500" />}
                </button>
              );
            })}
            {filteredHerbs.length === 0 && (
              <p className="text-center text-sm text-gray-400 py-4">No herbs found matching "{search}"</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddHerbDialog;
