import React, { useState } from 'react';
import { Loader2, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainNavigation from '@/components/MainNavigation';
import ImageUploader from '@/components/plant-identifier/ImageUploader';
import IdentificationResults from '@/components/plant-identifier/IdentificationResults';
import { identifyPlant } from '@/services/plantIdentification';
import { matchPlantsToHerbs, PlantMatch } from '@/utils/plantMatcher';
import { allHerbs } from '@/data/allHerbs';
import { useToast } from '@/hooks/use-toast';

const PlantIdentifier: React.FC = () => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PlantMatch[] | null>(null);
  const [isPlant, setIsPlant] = useState(true);
  const { toast } = useToast();

  const handleIdentify = async () => {
    if (!imageBase64) return;

    setLoading(true);
    setResults(null);

    try {
      const result = await identifyPlant(imageBase64);
      setIsPlant(result.isPlant);

      if (result.isPlant && result.suggestions.length > 0) {
        const matches = matchPlantsToHerbs(result.suggestions, allHerbs);
        setResults(matches);
      } else {
        setResults([]);
      }
    } catch (err: any) {
      const message = err?.message || 'Something went wrong. Please try again.';
      toast({
        title: 'Identification Failed',
        description: message,
        variant: 'destructive',
      });
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <MainNavigation />
      <div className="max-w-2xl mx-auto px-4 pb-12">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-800 mb-3">
            <ScanLine className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Plant Identifier
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Snap a photo and discover what plant you're looking at
          </p>
        </div>

        {/* Image Uploader */}
        <ImageUploader onImageSelected={setImageBase64} disabled={loading} />

        {/* Identify Button */}
        {imageBase64 && !results && (
          <div className="mt-4 text-center">
            <Button
              onClick={handleIdentify}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <ScanLine className="h-4 w-4 mr-2" />
                  Identify Plant
                </>
              )}
            </Button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-medium">Analyzing your plant...</span>
            </div>
          </div>
        )}

        {/* Results */}
        {results !== null && !loading && (
          <div className="mt-6">
            <IdentificationResults matches={results} isPlant={isPlant} />
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                onClick={() => {
                  setResults(null);
                  setImageBase64(null);
                }}
                className="border-emerald-300 text-emerald-700 dark:border-emerald-600 dark:text-emerald-400"
              >
                Identify Another Plant
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantIdentifier;
