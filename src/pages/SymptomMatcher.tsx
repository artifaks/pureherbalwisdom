
import React, { useState } from 'react';
import MainNavigation from '@/components/MainNavigation';
import { allHerbs } from '@/data/allHerbs';
import { Button } from '@/components/ui/button';
import { Check, Search } from 'lucide-react';
import { Herb } from '@/data/types';
import HerbDetailModal from '@/components/HerbDetailModal';
import { useToast } from '@/hooks/use-toast';

// Common symptoms with associated herbs
const symptomGroups = [
  {
    name: 'Digestive Issues',
    symptoms: ['Bloating', 'Indigestion', 'Nausea', 'Stomach pain', 'Gas'],
    herbTags: ['digestion', 'stomach', 'nausea']
  },
  {
    name: 'Sleep Problems',
    symptoms: ['Insomnia', 'Restless sleep', 'Nightmares', 'Difficulty falling asleep'],
    herbTags: ['sleep', 'relaxation', 'calming']
  },
  {
    name: 'Stress & Anxiety',
    symptoms: ['Nervousness', 'Tension', 'Worry', 'Restlessness', 'Panic'],
    herbTags: ['anxiety', 'stress', 'nervousness', 'calming']
  },
  {
    name: 'Pain & Inflammation',
    symptoms: ['Joint pain', 'Muscle aches', 'Headaches', 'Inflammation'],
    herbTags: ['pain', 'inflammation', 'headache']
  },
  {
    name: 'Skin Issues',
    symptoms: ['Dry skin', 'Itchiness', 'Rashes', 'Eczema', 'Acne'],
    herbTags: ['skin', 'healing', 'anti-inflammatory']
  },
  {
    name: 'Respiratory Issues',
    symptoms: ['Cough', 'Congestion', 'Sore throat', 'Sinus pressure'],
    herbTags: ['respiratory', 'cough', 'congestion']
  },
  {
    name: 'Immune Support',
    symptoms: ['Frequent illness', 'Slow recovery', 'Cold symptoms', 'Flu symptoms'],
    herbTags: ['immune', 'antiviral', 'antibacterial']
  },
  {
    name: 'Energy & Fatigue',
    symptoms: ['Low energy', 'Tiredness', 'Fatigue', 'Lethargy'],
    herbTags: ['energy', 'fatigue', 'stimulating']
  }
];

const SymptomMatcher: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [matchedHerbs, setMatchedHerbs] = useState<Herb[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [activeHerb, setActiveHerb] = useState<Herb | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'oil' | 'tincture'>('benefits');
  const { toast } = useToast();

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const findRelevantHerbs = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "Select Symptoms",
        description: "Please select at least one symptom to find matching herbs.",
        variant: "destructive",
      });
      return;
    }

    // Get all relevant herb tags based on the selected symptoms
    const relevantTags: string[] = [];
    symptomGroups.forEach(group => {
      if (group.symptoms.some(symptom => selectedSymptoms.includes(symptom))) {
        relevantTags.push(...group.herbTags);
      }
    });

    // Find herbs that match the relevant tags by searching through their benefits
    const herbs = allHerbs.filter(herb => 
      herb.benefits.some(benefit => 
        relevantTags.some(tag => 
          benefit.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );

    setMatchedHerbs(herbs);
    setSearchPerformed(true);
    
    if (herbs.length === 0) {
      toast({
        title: "No Matches Found",
        description: "No herbs match your selected symptoms. Try selecting different symptoms.",
      });
    } else {
      toast({
        title: "Herbs Found",
        description: `Found ${herbs.length} herbs that may help with your symptoms.`,
      });
    }
  };

  const clearSearch = () => {
    setSelectedSymptoms([]);
    setMatchedHerbs([]);
    setSearchPerformed(false);
  };

  const handleHerbSelect = (herb: Herb) => {
    setActiveHerb(herb);
    setActiveTab('benefits');
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MainNavigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Symptom Matcher</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your symptoms below to discover herbs that may help provide relief, based on traditional herbal medicine.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Your Symptoms</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {symptomGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-amber-700 mb-3">{group.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.symptoms.map((symptom, symIndex) => (
                    <button
                      key={symIndex}
                      onClick={() => toggleSymptom(symptom)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedSymptoms.includes(symptom)
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {selectedSymptoms.includes(symptom) && (
                        <Check className="inline h-3 w-3 mr-1" />
                      )}
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center gap-4">
            <Button onClick={findRelevantHerbs} className="gap-2">
              <Search className="h-4 w-4" />
              Find Matching Herbs
            </Button>
            {selectedSymptoms.length > 0 && (
              <Button variant="outline" onClick={clearSearch}>
                Clear Selection
              </Button>
            )}
          </div>
        </div>
        
        {searchPerformed && (
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {matchedHerbs.length > 0 
                  ? `${matchedHerbs.length} Matching Herbs` 
                  : "No Matching Herbs Found"}
              </h2>
              
              {matchedHerbs.length > 0 && (
                <div className="text-sm text-gray-600">
                  <span>Based on {selectedSymptoms.length} selected {selectedSymptoms.length === 1 ? 'symptom' : 'symptoms'}</span>
                </div>
              )}
            </div>
            
            {matchedHerbs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedHerbs.map((herb) => (
                  <div 
                    key={herb.id} 
                    className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleHerbSelect(herb)}
                  >
                    <div className="h-3" style={{ backgroundColor: herb.color }}></div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">{herb.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{herb.briefDescription}</p>
                      <div className="flex flex-wrap gap-2">
                        {herb.benefits.slice(0, 3).map((benefit, index) => (
                          <span 
                            key={index} 
                            className="bg-amber-50 text-amber-800 text-xs px-2 py-1 rounded"
                          >
                            {benefit}
                          </span>
                        ))}
                        {herb.benefits.length > 3 && (
                          <span className="text-xs text-gray-500">+{herb.benefits.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-4">No herbs found matching your selected symptoms.</p>
                <p className="text-gray-500 text-sm">Try selecting different symptoms or fewer symptoms to broaden your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Herb Detail Modal */}
      <HerbDetailModal
        activeHerb={activeHerb}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedHerbs={[]}
        onHerbSelect={() => {}}
        onToggleSave={() => {}}
      />
    </div>
  );
};

export default SymptomMatcher;
