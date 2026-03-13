
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import HerbCard from '@/components/HerbCard';
import { allHerbs } from '@/data/allHerbs';
import { Bookmark, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SavedHerbs: React.FC = () => {
  const [savedHerbIds, setSavedHerbIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('savedHerbs');
    if (stored) {
      try {
        setSavedHerbIds(JSON.parse(stored));
      } catch {
        setSavedHerbIds([]);
      }
    }
  }, []);

  const savedHerbs = allHerbs.filter(herb => savedHerbIds.includes(herb.id));

  const handleToggleSave = (herbId: string) => {
    const updated = savedHerbIds.filter(id => id !== herbId);
    setSavedHerbIds(updated);
    localStorage.setItem('savedHerbs', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setSavedHerbIds([]);
    localStorage.setItem('savedHerbs', JSON.stringify([]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <MainNavigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 dark:bg-amber-800/50 rounded-xl">
              <Bookmark className="h-7 w-7 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-amber-200">Saved Herbs</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {savedHerbs.length} herb{savedHerbs.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </div>
          {savedHerbs.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/30"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Content */}
        {savedHerbs.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {savedHerbs.map(herb => (
              <HerbCard
                key={herb.id}
                id={herb.id}
                name={herb.name}
                color={herb.color}
                isActive={false}
                onClick={() => {}}
                category={herb.category}
                benefits={herb.benefits}
                isSaved={true}
                onToggleSave={() => handleToggleSave(herb.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-full mb-6">
              <Bookmark className="h-12 w-12 text-amber-300 dark:text-amber-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No herbs saved yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
              Browse herbs and tap the bookmark icon to save your favorites here for quick access.
            </p>
            <Link to="/search">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <Search className="h-4 w-4 mr-2" />
                Browse Herbs
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SavedHerbs;
