
import React from 'react';
import { Button } from './ui/button';
import { BookOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  return (
    <div className="text-center my-8 py-10 glass rounded-2xl max-w-xl mx-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 to-amber-50/20 z-0"></div>
      
      <div className="relative z-10 px-6">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Discover Nature's Healing Power
          </h2>
          <Sparkles className="ml-2 h-5 w-5 text-amber-500" />
        </div>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Select an herb above to explore its properties, benefits, and preparation methods. Our comprehensive guide helps you harness the power of natural remedies.
        </p>
        
        <Button 
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-all 
                    transform hover:scale-105 font-medium shadow-md"
          asChild
          size="lg"
        >
          <Link to="/resources">
            <BookOpen className="mr-2 h-5 w-5" />
            Explore E-Books Collection
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
