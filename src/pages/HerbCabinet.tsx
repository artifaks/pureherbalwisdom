
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import CabinetHerbCard, { CabinetEntry } from '@/components/herb-cabinet/CabinetHerbCard';
import AddHerbDialog from '@/components/herb-cabinet/AddHerbDialog';
import { allHerbs } from '@/data/allHerbs';
import { Archive, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'herbCabinet';

const HerbCabinet: React.FC = () => {
  const [cabinet, setCabinet] = useState<CabinetEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCabinet(JSON.parse(stored));
      } catch {
        setCabinet([]);
      }
    }
  }, []);

  const saveCabinet = (updated: CabinetEntry[]) => {
    setCabinet(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleAddHerb = (herbId: string) => {
    if (cabinet.some(e => e.herbId === herbId)) return;
    const newEntry: CabinetEntry = {
      herbId,
      notes: '',
      dateAdded: new Date().toISOString(),
      dosage: '',
    };
    saveCabinet([newEntry, ...cabinet]);
  };

  const handleUpdateEntry = (herbId: string, notes: string, dosage: string) => {
    const updated = cabinet.map(e =>
      e.herbId === herbId ? { ...e, notes, dosage } : e
    );
    saveCabinet(updated);
  };

  const handleRemove = (herbId: string) => {
    saveCabinet(cabinet.filter(e => e.herbId !== herbId));
  };

  const cabinetHerbs = cabinet
    .map(entry => {
      const herb = allHerbs.find(h => h.id === entry.herbId);
      return herb ? { herb, entry } : null;
    })
    .filter(Boolean) as { herb: typeof allHerbs[0]; entry: CabinetEntry }[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <MainNavigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-800/50 rounded-xl">
              <Archive className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-amber-200">My Herb Cabinet</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {cabinetHerbs.length} herb{cabinetHerbs.length !== 1 ? 's' : ''} in your collection
              </p>
            </div>
          </div>
          <AddHerbDialog
            existingHerbIds={cabinet.map(e => e.herbId)}
            onAddHerb={handleAddHerb}
          />
        </div>

        {/* Content */}
        {cabinetHerbs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cabinetHerbs.map(({ herb, entry }) => (
              <CabinetHerbCard
                key={herb.id}
                herb={herb}
                entry={entry}
                onUpdateEntry={handleUpdateEntry}
                onRemove={handleRemove}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-full mb-6">
              <Archive className="h-12 w-12 text-emerald-300 dark:text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Your herb cabinet is empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
              Start building your personal collection! Add herbs you own, track dosages, and keep notes on how you use them.
            </p>
            <Link to="/search">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Search className="h-4 w-4 mr-2" />
                Browse Herbs to Add
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HerbCabinet;
