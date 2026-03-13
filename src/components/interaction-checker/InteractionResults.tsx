
import React, { useMemo } from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { allHerbs } from '@/data/allHerbs';
import { herbPairings } from '@/data/herbPairings';
import { getInteraction } from '@/data/herbInteractions';

interface InteractionResultsProps {
  herbIds: string[];
}

interface PairResult {
  herb1Name: string;
  herb2Name: string;
  herb1Id: string;
  herb2Id: string;
  synergy: string | null;
  caution: { severity: 'caution' | 'warning'; description: string } | null;
}

const InteractionResults: React.FC<InteractionResultsProps> = ({ herbIds }) => {
  const results = useMemo(() => {
    const pairs: PairResult[] = [];
    const herbMap = new Map(allHerbs.map(h => [h.id, h]));

    for (let i = 0; i < herbIds.length; i++) {
      for (let j = i + 1; j < herbIds.length; j++) {
        const id1 = herbIds[i];
        const id2 = herbIds[j];
        const herb1 = herbMap.get(id1);
        const herb2 = herbMap.get(id2);
        if (!herb1 || !herb2) continue;

        // Check synergistic pairings
        let synergy: string | null = null;
        const pairingsFor1 = herbPairings[id1];
        const pairingsFor2 = herbPairings[id2];
        if (pairingsFor1) {
          const match = pairingsFor1.find(p => p.herbId === id2);
          if (match) synergy = match.reason;
        }
        if (!synergy && pairingsFor2) {
          const match = pairingsFor2.find(p => p.herbId === id1);
          if (match) synergy = match.reason;
        }

        // Check caution interactions
        const interaction = getInteraction(id1, id2);
        const caution = interaction
          ? { severity: interaction.severity, description: interaction.description }
          : null;

        pairs.push({
          herb1Name: herb1.name,
          herb2Name: herb2.name,
          herb1Id: id1,
          herb2Id: id2,
          synergy,
          caution,
        });
      }
    }
    return pairs;
  }, [herbIds]);

  if (herbIds.length < 2) {
    return (
      <div className="text-center py-12 text-gray-400 dark:text-gray-500">
        <Info className="h-10 w-10 mx-auto mb-3 opacity-50" />
        <p className="text-sm">Select at least 2 herbs to check interactions</p>
      </div>
    );
  }

  const synergisticPairs = results.filter(r => r.synergy);
  const cautionPairs = results.filter(r => r.caution);
  const neutralPairs = results.filter(r => !r.synergy && !r.caution);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
          <CheckCircle className="h-4 w-4" />
          {synergisticPairs.length} synergistic
        </div>
        <div className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400">
          <AlertTriangle className="h-4 w-4" />
          {cautionPairs.length} caution{cautionPairs.length !== 1 ? 's' : ''}
        </div>
        <div className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
          <Info className="h-4 w-4" />
          {neutralPairs.length} no data
        </div>
      </div>

      {/* Cautions first */}
      {cautionPairs.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Cautions & Warnings
          </h3>
          {cautionPairs.map((pair, i) => (
            <div key={i} className={`p-4 rounded-lg border ${
              pair.caution?.severity === 'warning'
                ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                : 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {pair.caution?.severity === 'warning' ? (
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                )}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {pair.herb1Name} + {pair.herb2Name}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  pair.caution?.severity === 'warning'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                }`}>
                  {pair.caution?.severity}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 ml-6">{pair.caution?.description}</p>
              {pair.synergy && (
                <p className="text-sm text-green-600 dark:text-green-400 ml-6 mt-2 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Also synergistic: {pair.synergy}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Synergistic pairs */}
      {synergisticPairs.filter(p => !p.caution).length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Synergistic Pairs
          </h3>
          {synergisticPairs.filter(p => !p.caution).map((pair, i) => (
            <div key={i} className="p-4 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {pair.herb1Name} + {pair.herb2Name}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 ml-6">{pair.synergy}</p>
            </div>
          ))}
        </div>
      )}

      {/* Neutral pairs */}
      {neutralPairs.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <Info className="h-5 w-5 text-gray-400" />
            No Known Interactions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {neutralPairs.map((pair, i) => (
              <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {pair.herb1Name} + {pair.herb2Name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 mt-6">
        <p className="text-xs text-blue-600 dark:text-blue-400">
          <strong>Disclaimer:</strong> This tool provides general information only. Always consult a qualified healthcare provider before combining herbs, especially if you take medications.
        </p>
      </div>
    </div>
  );
};

export default InteractionResults;
