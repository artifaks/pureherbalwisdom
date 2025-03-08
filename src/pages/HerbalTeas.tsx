
import React, { useState } from 'react';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import { herbalTeas } from '@/data/herbalTeas';
import { cn } from '@/lib/utils';
import { Leaf, Clock, Coffee, Droplet, Check } from 'lucide-react';
import { Herb } from '@/data/types';

const HerbalTeas: React.FC = () => {
  const [selectedTea, setSelectedTea] = useState<Herb | null>(null);

  const openTeaDetails = (tea: Herb) => {
    setSelectedTea(tea);
  };

  const closeTeaDetails = () => {
    setSelectedTea(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Healing Herbal Teas
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the ancient healing powers of herbal teas. From calming chamomile 
            to invigorating peppermint, explore our collection of teas and their unique health benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {herbalTeas.map((tea) => (
            <div 
              key={tea.id}
              onClick={() => openTeaDetails(tea)}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div 
                className="h-24 flex items-center justify-center"
                style={{ backgroundColor: tea.color }}
              >
                <Coffee className="h-12 w-12 text-white" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{tea.name}</h3>
                <p className="text-gray-600 mb-3">{tea.benefits[0]}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Best time: {tea.bestTimeToConsume ? tea.bestTimeToConsume.split(',')[0] : "Anytime"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Tea Detail Modal */}
        {selectedTea && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm"
            onClick={closeTeaDetails}
          >
            <div 
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center mb-6">
                  <div 
                    className="w-14 h-14 rounded-full mr-5 flex items-center justify-center"
                    style={{ backgroundColor: selectedTea.color }}
                  >
                    <Coffee className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">{selectedTea.name}</h2>
                  </div>
                </div>
                
                <div className="glass rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Leaf size={18} className="mr-3 text-green-600" />
                    Health Benefits
                  </h3>
                  <ul className="space-y-4">
                    {selectedTea.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start bg-gray-50/80 p-3 rounded-lg hover:bg-gray-100/80 transition-colors">
                        <Check className="text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Coffee size={18} className="mr-3 text-amber-600" />
                      Preparation
                    </h3>
                    <pre className="whitespace-pre-wrap text-gray-700 font-sans">{selectedTea.tincturePreparation}</pre>
                  </div>
                  
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Droplet size={18} className="mr-3 text-blue-500" />
                      Effects & Timing
                    </h3>
                    <div className="mb-4">
                      <p className="text-gray-700">
                        <span className="font-medium">Effects:</span> {selectedTea.effects ? selectedTea.effects.join(', ') : "Various healing properties"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700">
                        <span className="font-medium">Best time to consume:</span> {selectedTea.bestTimeToConsume || "Anytime"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button 
                    onClick={closeTeaDetails}
                    className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default HerbalTeas;
