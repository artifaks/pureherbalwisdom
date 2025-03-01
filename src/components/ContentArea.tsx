
import React from 'react';
import { Heart, Droplet, Beaker } from 'lucide-react';
import CategoryIcon from './CategoryIcon';
import TabContent from './TabContent';
import { cn } from '@/lib/utils';

interface Herb {
  id: string;
  name: string;
  color: string;
  benefits: string[];
  oilPreparation: string;
  tincturePreparation: string;
}

interface ContentAreaProps {
  activeHerb: Herb | null;
  activeTab: 'benefits' | 'oil' | 'tincture';
  setActiveTab: (tab: 'benefits' | 'oil' | 'tincture') => void;
  activeCategory: 'heart' | 'stomach' | 'mens' | 'womens';
}

const ContentArea: React.FC<ContentAreaProps> = ({ 
  activeHerb, 
  activeTab, 
  setActiveTab, 
  activeCategory 
}) => {
  if (!activeHerb) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 animate-fade-in">
        <div className="glass p-10 rounded-2xl max-w-2xl text-center content-shadow">
          <div className="flex justify-center mb-8">
            <CategoryIcon category={activeCategory} size={80} className="animate-pulse-soft" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {activeCategory === 'heart' ? 'Heart-Healing Herbs Guide' : 
             activeCategory === 'stomach' ? 'Stomach-Soothing Herbs Guide' :
             activeCategory === 'mens' ? 'Men\'s Health Herbs Guide' :
             'Women\'s Health Herbs Guide'}
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {activeCategory === 'heart' 
              ? 'Explore herbs known for their heart health benefits. Learn how each herb supports cardiovascular wellness and how to prepare medicinal oils and tinctures at home.'
              : activeCategory === 'stomach'
              ? 'Discover herbs that can help soothe digestive issues and promote stomach health. Learn about their benefits and how to prepare them for effective use at home.'
              : activeCategory === 'mens'
              ? 'These powerful herbs have been traditionally used to support men\'s health issues including prostate health, hormone balance, and vitality. Discover how to prepare and use them effectively.'
              : 'Explore herbs specifically beneficial for women\'s health concerns such as menstrual issues, hormonal balance, and reproductive wellness. Learn how to create effective preparations at home.'}
          </p>
          <p className="text-gray-700 font-medium">
            Select an herb from the collection above to begin your journey.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Herb Title and Navigation Tabs */}
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <div 
            className="w-14 h-14 rounded-full mr-5 flex items-center justify-center animate-scale-in"
            style={{ backgroundColor: activeHerb.color }}
          />
          <h2 className="text-3xl font-bold text-gray-800 animate-slide-in">{activeHerb.name}</h2>
        </div>
        
        <div className="relative mb-8 border-b">
          <div className="flex space-x-2">
            <button
              className={cn(
                "tab-button flex items-center px-6 py-4 rounded-t-lg focus-ring",
                activeTab === 'benefits' ? "text-accent font-medium" : "text-gray-600 hover:text-gray-800"
              )}
              onClick={() => setActiveTab('benefits')}
            >
              <Heart size={18} className="mr-2" />
              Benefits
            </button>
            <button
              className={cn(
                "tab-button flex items-center px-6 py-4 rounded-t-lg focus-ring",
                activeTab === 'oil' ? "text-accent font-medium" : "text-gray-600 hover:text-gray-800"
              )}
              onClick={() => setActiveTab('oil')}
            >
              <Droplet size={18} className="mr-2" />
              Herbal Oil
            </button>
            <button
              className={cn(
                "tab-button flex items-center px-6 py-4 rounded-t-lg focus-ring",
                activeTab === 'tincture' ? "text-accent font-medium" : "text-gray-600 hover:text-gray-800"
              )}
              onClick={() => setActiveTab('tincture')}
            >
              <Beaker size={18} className="mr-2" />
              Tincture
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
      <div className="glass rounded-xl p-8 content-shadow">
        <TabContent tab={activeTab} herb={activeHerb} />
      </div>
    </div>
  );
};

export default ContentArea;
