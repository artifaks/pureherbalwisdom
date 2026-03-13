
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { allHerbs } from '@/data/allHerbs';
import { getCategoryColor } from '@/utils/herbIcons';

interface HerbSelectorProps {
  selectedHerbIds: string[];
  onAdd: (herbId: string) => void;
  onRemove: (herbId: string) => void;
}

const HerbSelector: React.FC<HerbSelectorProps> = ({ selectedHerbIds, onAdd, onRemove }) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredHerbs = useMemo(() => {
    if (!search.trim()) return [];
    const query = search.toLowerCase();
    return allHerbs
      .filter(h => h.name.toLowerCase().includes(query) && !selectedHerbIds.includes(h.id))
      .slice(0, 8);
  }, [search, selectedHerbIds]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (herbId: string) => {
    onAdd(herbId);
    setSearch('');
    setIsOpen(false);
  };

  const selectedHerbs = selectedHerbIds
    .map(id => allHerbs.find(h => h.id === id))
    .filter(Boolean) as typeof allHerbs;

  return (
    <div ref={containerRef} className="space-y-3">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setIsOpen(true); }}
          onFocus={() => search.trim() && setIsOpen(true)}
          placeholder="Type to search herbs..."
          className="pl-9"
        />
        {/* Dropdown */}
        {isOpen && filteredHerbs.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 max-h-48 overflow-y-auto">
            {filteredHerbs.map(herb => {
              const categoryColor = getCategoryColor(herb.category);
              return (
                <button
                  key={herb.id}
                  onClick={() => handleSelect(herb.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryColor }} />
                  <span className="text-sm text-gray-700 dark:text-gray-200">{herb.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected herbs as chips */}
      {selectedHerbs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedHerbs.map(herb => {
            const categoryColor = getCategoryColor(herb.category);
            return (
              <Badge
                key={herb.id}
                variant="secondary"
                className="pl-3 pr-1 py-1.5 text-sm flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700"
              >
                <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: categoryColor }} />
                {herb.name}
                <button
                  onClick={() => onRemove(herb.id)}
                  className="ml-1 p-0.5 rounded-full hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HerbSelector;
