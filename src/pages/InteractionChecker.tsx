
import React, { useState } from 'react';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import HerbSelector from '@/components/interaction-checker/HerbSelector';
import InteractionResults from '@/components/interaction-checker/InteractionResults';
import { GitCompare } from 'lucide-react';

const InteractionChecker: React.FC = () => {
  const [selectedHerbIds, setSelectedHerbIds] = useState<string[]>([]);

  const handleAdd = (herbId: string) => {
    if (!selectedHerbIds.includes(herbId)) {
      setSelectedHerbIds(prev => [...prev, herbId]);
    }
  };

  const handleRemove = (herbId: string) => {
    setSelectedHerbIds(prev => prev.filter(id => id !== herbId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <MainNavigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-purple-100 dark:bg-purple-800/50 rounded-xl">
            <GitCompare className="h-7 w-7 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-amber-200">Herb Interaction Checker</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Check compatibility between herbs you plan to use together
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,1.2fr]">
          {/* Left: Selector */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
            <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Select Herbs</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Search and add 2 or more herbs to check for interactions, synergies, and cautions.
            </p>
            <HerbSelector
              selectedHerbIds={selectedHerbIds}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          </div>

          {/* Right: Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
            <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Results</h2>
            <InteractionResults herbIds={selectedHerbIds} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InteractionChecker;
