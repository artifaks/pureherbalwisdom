
import React from 'react';
import { Button } from './ui/button';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  return (
    <div className="text-center my-6 py-8 glass rounded-2xl max-w-md mx-auto">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
        Discover Nature's Healing Power
      </h2>
      <p className="text-gray-600 mb-6 px-4">
        Select an herb above to explore its properties, benefits, and preparation methods.
      </p>
      <Button 
        className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition-all 
                  transform hover:scale-105 font-medium shadow-md"
        asChild
      >
        <Link to="/resources">
          <BookOpen className="mr-2 h-4 w-4" />
          Start Exploring E-Books
        </Link>
      </Button>
    </div>
  );
};

export default CallToAction;
