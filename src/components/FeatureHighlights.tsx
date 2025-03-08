
import React from 'react';
import { BookOpen, Search, Leaf, Heart } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-amber-500" />,
    title: '100+ Herbs with Proven Benefits',
    description: 'A comprehensive database of herbs with scientific insights and traditional wisdom.'
  },
  {
    icon: <Search className="h-10 w-10 text-amber-500" />,
    title: 'Search & Filter by Ailments',
    description: 'Easily find the right herbs for your specific health concerns and wellness goals.'
  },
  {
    icon: <Leaf className="h-10 w-10 text-amber-500" />,
    title: 'Holistic Healing Insights',
    description: 'Learn how herbs interact with your body to promote health and natural healing.'
  },
  {
    icon: <Heart className="h-10 w-10 text-amber-500" />,
    title: 'Create Your Own Collection',
    description: 'Save and organize your favorite herbs for different wellness needs and routines.'
  }
];

const FeatureHighlights: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent to-amber-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">Why Use Our Herb Guide?</h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass p-6 rounded-xl text-center transition-transform duration-300 hover:transform hover:scale-105"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
