
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, X } from 'lucide-react';

interface HerbNoteEditorProps {
  notes: string;
  dosage: string;
  onSave: (notes: string, dosage: string) => void;
  onCancel: () => void;
}

const HerbNoteEditor: React.FC<HerbNoteEditorProps> = ({ notes, dosage, onSave, onCancel }) => {
  const [editNotes, setEditNotes] = useState(notes);
  const [editDosage, setEditDosage] = useState(dosage);

  return (
    <div className="space-y-3 p-3 bg-amber-50/50 dark:bg-amber-900/10 rounded-lg border border-amber-200/50 dark:border-amber-700/30">
      <div>
        <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Dosage</label>
        <Input
          value={editDosage}
          onChange={(e) => setEditDosage(e.target.value)}
          placeholder="e.g., 1 tsp daily, 2 capsules..."
          className="text-sm h-8"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Notes</label>
        <textarea
          value={editNotes}
          onChange={(e) => setEditNotes(e.target.value)}
          placeholder="How you use it, where you bought it..."
          className="w-full text-sm p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
          rows={3}
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-3 w-3 mr-1" /> Cancel
        </Button>
        <Button size="sm" onClick={() => onSave(editNotes, editDosage)} className="bg-amber-600 hover:bg-amber-700 text-white">
          <Save className="h-3 w-3 mr-1" /> Save
        </Button>
      </div>
    </div>
  );
};

export default HerbNoteEditor;
