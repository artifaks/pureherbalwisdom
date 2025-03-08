
import React from 'react';
import { Button } from './ui/button';
import { Leaf, Sparkles } from 'lucide-react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 md:py-16 text-center relative">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-4">
                <Leaf className="h-20 w-20 text-white" />
              </div>
              <div className="absolute bottom-4 right-4">
                <Leaf className="h-20 w-20 text-white" />
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-white mr-2" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Begin Your Natural Healing Journey
                </h2>
                <Sparkles className="h-8 w-8 text-white ml-2" />
              </div>
              
              <p className="text-white text-opacity-90 text-lg max-w-2xl mx-auto mb-8">
                Discover the world of herbal remedies and unlock nature's pharmacy. 
                Our comprehensive guide helps you find the perfect herbs for your wellness needs.
              </p>
              
              <Button 
                size="lg"
                className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-3 text-lg font-medium shadow-md"
                asChild
              >
                <a href="#herb-guide">
                  <Leaf className="mr-2 h-5 w-5" />
                  Browse the Herb Guide
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
