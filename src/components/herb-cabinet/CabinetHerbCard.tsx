
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Herb } from '@/data/types';
import CategoryIcon from '@/components/CategoryIcon';
import { getCategoryColor, getHerbIcon } from '@/utils/herbIcons';
import HerbNoteEditor from './HerbNoteEditor';

export interface CabinetEntry {
  herbId: string;
  notes: string;
  dateAdded: string;
  dosage?: string;
}

interface CabinetHerbCardProps {
  herb: Herb;
  entry: CabinetEntry;
  onUpdateEntry: (herbId: string, notes: string, dosage: string) => void;
  onRemove: (herbId: string) => void;
}

const CabinetHerbCard: React.FC<CabinetHerbCardProps> = ({ herb, entry, onUpdateEntry, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const categoryColor = getCategoryColor(herb.category);

  const categoryLabel = herb.category === 'heart' ? 'Heart' :
    herb.category === 'stomach' ? 'Stomach' :
    herb.category === 'mens' ? "Men's" :
    herb.category === 'womens' ? "Women's" :
    herb.category === 'brain' ? 'Brain' : 'Tea';

  const handleSave = (notes: string, dosage: string) => {
    onUpdateEntry(herb.id, notes, dosage);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
      style={{ borderTop: `4px solid ${categoryColor}` }}>
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <Link to={`/herbs/${herb.id}`} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${categoryColor}15` }}>
              {getHerbIcon(herb.id, categoryColor, 18)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {herb.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <CategoryIcon category={herb.category} size={10} />
                <span>{categoryLabel}</span>
              </div>
            </div>
          </Link>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setIsEditing(!isEditing)}>
              <Edit2 className="h-3.5 w-3.5 text-gray-400 hover:text-amber-600" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => onRemove(herb.id)}>
              <Trash2 className="h-3.5 w-3.5 text-gray-400 hover:text-red-500" />
            </Button>
          </div>
        </div>

        {/* Notes preview or editor */}
        {isEditing ? (
          <HerbNoteEditor
            notes={entry.notes}
            dosage={entry.dosage || ''}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="space-y-2">
            {entry.dosage && (
              <p className="text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 px-2 py-1 rounded inline-block">
                Dosage: {entry.dosage}
              </p>
            )}
            {entry.notes ? (
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{entry.notes}</p>
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500 italic">No notes yet — tap edit to add</p>
            )}
            <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 pt-1">
              <Calendar className="h-3 w-3" />
              <span>Added {new Date(entry.dateAdded).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CabinetHerbCard;
