
import React from 'react';
import { Button } from './ui/button';
import { Leaf, ArrowRight, Heart, Moon, Sparkles, Zap, Flame, Shield, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

const featuredHerbsData = [
  {
    name: 'Lavender',
    image: '/lovable-uploads/ce78786c-c28c-4f36-878c-68976a466ff8.png',
    description: 'Known for its calming effects on the nervous system, helping reduce anxiety and promote better sleep.',
    tags: ['Anxiety Relief', 'Sleep Aid', 'Aromatherapy'],
    icon: Moon, // Sleep icon
    iconColor: 'text-purple-500'
  },
  {
    name: 'Ginger',
    image: 'https://images.unsplash.com/photo-1573414404852-1840ae22db94?auto=format&fit=crop&w=300&q=80',
    description: 'A powerful digestive aid that helps reduce nausea, inflammation, and supports the immune system.',
    tags: ['Digestive Health', 'Anti-Inflammatory', 'Immune Support'],
    icon: Flame, // Energy/Digestive icon
    iconColor: 'text-orange-500'
  },
  {
    name: 'Turmeric',
    image: 'https://images.unsplash.com/photo-1615485500784-8e97deb1eb10?auto=format&fit=crop&w=300&q=80',
    description: 'Contains curcumin, which has powerful anti-inflammatory effects and is a strong antioxidant.',
    tags: ['Anti-Inflammatory', 'Antioxidant', 'Joint Health'],
    icon: Shield, // Protection/Antioxidant icon
    iconColor: 'text-amber-600'
  },
  {
    name: 'Ashwagandha',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=300&q=80',
    description: 'An adaptogenic herb that helps the body manage stress and promotes mental clarity and focus.',
    tags: ['Stress Relief', 'Energy', 'Focus'],
    icon: Brain, // Brain/Focus icon
    iconColor: 'text-blue-500'
  },
  {
    name: 'Chamomile',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=300&q=80',
    description: 'A gentle herb with calming properties that helps soothe digestion and promote relaxation and sleep.',
    tags: ['Relaxation', 'Digestive Aid', 'Sleep Support'],
    icon: Sparkles, // Calming icon
    iconColor: 'text-yellow-400'
  }
];

const FeaturedHerbs: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-2 bg-amber-50 rounded-lg mb-4">
            <Leaf className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Featured Herbs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover these powerful healing herbs and their remarkable benefits for your health and wellbeing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredHerbsData.map((herb, index) => (
            <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg border-amber-100">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={herb.image} 
                  alt={herb.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
                  {React.createElement(herb.icon, { className: `h-5 w-5 ${herb.iconColor}` })}
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-amber-800">{herb.name}</h3>
                  {React.createElement(herb.icon, { className: `h-5 w-5 ${herb.iconColor}` })}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {herb.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="outline" 
                      className="bg-amber-50 text-amber-700 border-amber-200 flex items-center"
                    >
                      {tagIndex === 0 && React.createElement(herb.icon, { className: `h-3 w-3 ${herb.iconColor} mr-1` })}
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{herb.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="ghost" 
                  className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 p-0"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Save to collection
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            className="bg-amber-500 hover:bg-amber-600"
            asChild
            size="lg"
          >
            <a href="#herb-guide">
              View All 100+ Herbs
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHerbs;
