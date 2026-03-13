import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { PlantMatch } from '@/utils/plantMatcher';

interface IdentificationResultsProps {
  matches: PlantMatch[];
  isPlant: boolean;
}

const IdentificationResults: React.FC<IdentificationResultsProps> = ({ matches, isPlant }) => {
  if (!isPlant) {
    return (
      <div className="text-center py-8 px-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
        <p className="text-amber-800 dark:text-amber-300 font-medium">
          This doesn't appear to be a plant. Try uploading a clearer image of a plant with visible leaves or flowers.
        </p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-8 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400">
          No results found. Try a clearer photo with good lighting.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Identification Results ({matches.length})
      </h3>
      {matches.map((match, index) => {
        const confidence = Math.round(match.suggestion.probability * 100);
        const displayName =
          match.suggestion.commonNames[0] || match.suggestion.name;
        const scientificName = match.suggestion.name;

        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
          >
            <div className="flex items-start gap-4">
              {match.suggestion.similarImageUrl ? (
                <img
                  src={match.suggestion.similarImageUrl}
                  alt={displayName}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center flex-shrink-0">
                  <Leaf className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {displayName}
                  </h4>
                  {match.matchedHerb && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-300">
                      <CheckCircle2 className="h-3 w-3" />
                      In our database
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  {scientificName}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <Progress
                    value={confidence}
                    className="h-2 flex-1"
                  />
                  <span
                    className={`text-sm font-medium ${
                      confidence >= 70
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : confidence >= 40
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {confidence}%
                  </span>
                </div>

                {match.matchedHerb && (
                  <Link
                    to={`/herbs/${match.matchedHerb.id}`}
                    className="inline-flex items-center gap-1 mt-2 text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
                  >
                    View Herb Details
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IdentificationResults;
