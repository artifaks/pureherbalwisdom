
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Herb } from '@/data/types';
import { BookOpen, Clock, MapPin, Users } from 'lucide-react';

interface HerbHistoryProps {
  herb: Herb;
}

// This is placeholder data - in a real application, you would fetch this from your database
const getHerbHistory = (herbName: string) => {
  return {
    origin: [
      `${herbName} has been used for thousands of years in traditional medicine systems across the world.`,
      `It was first documented in ancient texts dating back to approximately 500 BCE.`,
      `Native to regions spanning from Southern Europe to Western Asia, it spread globally through trade routes.`
    ],
    traditionalUse: [
      `In traditional Chinese medicine, ${herbName.toLowerCase()} was considered a balancing herb.`,
      `Ayurvedic practitioners used it for supporting overall wellness and vitality.`,
      `Indigenous peoples incorporated it into healing ceremonies and daily wellness practices.`,
      `European herbalists documented its use in manuscripts from the Middle Ages.`
    ],
    modernHistory: [
      `In the 19th century, ${herbName.toLowerCase()} began to be studied by Western scientists.`,
      `By the early 20th century, its active compounds were starting to be identified.`,
      `In recent decades, scientific research has expanded our understanding of its mechanisms and benefits.`,
      `Today, it's used in various forms from traditional preparations to standardized extracts.`
    ]
  };
};

const HerbHistory: React.FC<HerbHistoryProps> = ({ herb }) => {
  const history = getHerbHistory(herb.name);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <BookOpen className="mr-3 h-6 w-6 text-amber-600" />
        History of {herb.name}
      </h2>
      
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-8">
          <div className="bg-white/50 p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-green-600" />
              Origins & Geography
            </h3>
            <div className="space-y-2">
              {history.origin.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700">{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div className="bg-white/50 p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              Traditional Use
            </h3>
            <div className="space-y-2">
              {history.traditionalUse.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700">{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div className="bg-white/50 p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-purple-600" />
              Modern History
            </h3>
            <div className="space-y-2">
              {history.modernHistory.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default HerbHistory;
