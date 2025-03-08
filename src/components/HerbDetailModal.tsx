
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Herb, HerbCategory } from '@/data/types';
import TabContent from './TabContent';
import CategoryIcon from './CategoryIcon';
import { Heart, Droplet, Beaker } from 'lucide-react';
import ComplementaryHerbs from './ComplementaryHerbs';
import { allHerbs } from '@/data/allHerbs';

interface HerbDetailModalProps {
  activeHerb: Herb | null;
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'benefits' | 'oil' | 'tincture';
  setActiveTab: (tab: 'benefits' | 'oil' | 'tincture') => void;
  savedHerbs: Herb[];
  onHerbSelect: (herb: Herb) => void;
  onToggleSave: (herb: Herb) => void;
}

const HerbDetailModal: React.FC<HerbDetailModalProps> = ({
  activeHerb,
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  savedHerbs,
  onHerbSelect,
  onToggleSave
}) => {
  if (!isOpen || !activeHerb) return null;

  // Get category display name and color
  const categoryDisplay = {
    heart: {name: 'Heart Health', color: 'text-red-600'},
    stomach: {name: 'Digestive Health', color: 'text-green-600'},
    mens: {name: 'Men\'s Health', color: 'text-blue-600'},
    womens: {name: 'Women\'s Health', color: 'text-pink-600'},
    brain: {name: 'Brain Health', color: 'text-purple-600'},
    tea: {name: 'Herbal Tea', color: 'text-amber-600'}
  }[activeHerb.category || 'heart'];

  // Close modal when clicking backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-6",
        "animate-fade-in backdrop-blur-sm transition-all duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={handleBackdropClick}
    >
      <div 
        className={cn(
          "bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl",
          "transform transition-all duration-300 animate-scale-in",
          isOpen ? "scale-100" : "scale-90"
        )}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-gray-700 
                    hover:bg-gray-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="p-4 sm:p-6 md:p-8">
          {/* Herb Title and Navigation Tabs */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center mb-4 sm:mb-6">
              <div 
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full mr-3 sm:mr-5 flex items-center justify-center animate-scale-in"
                style={{ backgroundColor: activeHerb.color }}
              />
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 animate-slide-in">{activeHerb.name}</h2>
                <div className="flex items-center mt-1">
                  <CategoryIcon category={activeHerb.category || 'heart'} size={16} className={`mr-2 ${categoryDisplay.color}`} />
                  <span className={`text-xs sm:text-sm ${categoryDisplay.color}`}>{categoryDisplay.name}</span>
                </div>
              </div>
            </div>
            
            <div className="relative mb-6 sm:mb-8 border-b overflow-x-auto pb-1 sm:pb-0">
              <div className="flex space-x-1 sm:space-x-2 min-w-max">
                <button
                  className={cn(
                    "tab-button flex items-center px-3 sm:px-6 py-2 sm:py-4 rounded-t-lg focus-ring whitespace-nowrap",
                    activeTab === 'benefits' ? "text-accent font-medium" : "text-gray-600 hover:text-gray-800"
                  )}
                  onClick={() => setActiveTab('benefits')}
                >
                  <Heart size={16} className="mr-1 sm:mr-2" />
                  <span className="text-sm sm:text-base">Benefits</span>
                </button>
                <button
                  className={cn(
                    "tab-button flex items-center px-3 sm:px-6 py-2 sm:py-4 rounded-t-lg focus-ring whitespace-nowrap",
                    activeTab === 'oil' ? "text-accent font-medium" : "text-gray-600 hover:text-gray-800"
                  )}
                  onClick={() => setActiveTab('oil')}
                >
                  <Droplet size={16} className="mr-1 sm:mr-2" />
                  <span className="text-sm sm:text-base">Herbal Oil</span>
                </button>
                <button
                  className={cn(
                    "tab-button flex items-center px-3 sm:px-6 py-2 sm:py-4 rounded-t-lg focus-ring whitespace-nowrap",
                    activeTab === 'tincture' ? "text-accent font-medium" : "text-gray-600 hover:text-gray-800"
                  )}
                  onClick={() => setActiveTab('tincture')}
                >
                  <Beaker size={16} className="mr-1 sm:mr-2" />
                  <span className="text-sm sm:text-base">Tincture</span>
                </button>
              </div>
              <div 
                className="tab-indicator absolute bottom-0 h-0.5 bg-accent"
                style={{ 
                  left: activeTab === 'benefits' ? '0%' : activeTab === 'oil' ? '33.33%' : '66.66%',
                  width: '33.33%'
                }}
              />
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="glass rounded-xl p-4 sm:p-6 md:p-8 content-shadow">
            <TabContent tab={activeTab} herb={activeHerb} />
          </div>
          
          {/* Complementary Herbs Section */}
          <ComplementaryHerbs 
            activeHerb={activeHerb} 
            allHerbs={allHerbs}
            onHerbSelect={onHerbSelect}
            savedHerbs={savedHerbs}
            onToggleSave={onToggleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default HerbDetailModal;
