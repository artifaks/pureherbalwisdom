
import React from 'react';
import { Heart, Droplet, Beaker } from 'lucide-react';

interface Herb {
  id: string;
  name: string;
  color: string;
  benefits: string[];
  oilPreparation: string;
  tincturePreparation: string;
}

interface TabContentProps {
  tab: 'benefits' | 'oil' | 'tincture';
  herb: Herb;
}

const TabContent: React.FC<TabContentProps> = ({ tab, herb }) => {
  return (
    <div className="tab-content">
      {tab === 'benefits' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Heart size={18} className="mr-3 text-herb-heart" />
            Health Benefits
          </h3>
          <ul className="space-y-4">
            {herb.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start bg-gray-50/80 p-3 rounded-lg hover:bg-gray-100/80 transition-colors">
                <span className="text-accent mr-3 text-xl font-bold">•</span>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {tab === 'oil' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Droplet size={18} className="mr-3 text-cyan-500" />
            {herb.name} Oil Preparation
          </h3>
          <div className="glass p-6 rounded-xl">
            <pre className="whitespace-pre-wrap text-gray-700 font-sans">{herb.oilPreparation}</pre>
          </div>
        </div>
      )}
      
      {tab === 'tincture' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Beaker size={18} className="mr-3 text-purple-500" />
            {herb.name} Tincture Preparation
          </h3>
          <div className="glass p-6 rounded-xl">
            <pre className="whitespace-pre-wrap text-gray-700 font-sans">{herb.tincturePreparation}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabContent;
