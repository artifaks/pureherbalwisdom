
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Leaf, Heart, Beaker, Droplet, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { allHerbs } from '@/data/allHerbs';
import { Herb } from '@/data/types';
import TabContent from '@/components/TabContent';
import BenefitsChart from '@/components/BenefitsChart';
import HerbHistory from '@/components/HerbHistory';
import ScientificStudies from '@/components/ScientificStudies';
import ComplementaryHerbs from '@/components/ComplementaryHerbs';
import { useToast } from '@/hooks/use-toast';
import BookmarkButton from '@/components/BookmarkButton';
import { getCategoryColor } from '@/utils/herbIcons';
import CategoryIcon from '@/components/CategoryIcon';
import HerbFooter from '@/components/HerbFooter';

const HerbDetailPage: React.FC = () => {
  const { herbId } = useParams<{ herbId: string }>();
  const [herb, setHerb] = useState<Herb | null>(null);
  const [savedHerbs, setSavedHerbs] = useState<Herb[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  // Load saved herbs from localStorage on mount
  useEffect(() => {
    const storedHerbs = localStorage.getItem('savedHerbs');
    if (storedHerbs) {
      try {
        const parsedHerbs = JSON.parse(storedHerbs);
        // Match against actual herb data to ensure we have the latest info
        const validHerbs = parsedHerbs.map((savedHerbId: string) => 
          allHerbs.find(herb => herb.id === savedHerbId)
        ).filter(Boolean);
        setSavedHerbs(validHerbs);
      } catch (error) {
        console.error('Error parsing saved herbs', error);
      }
    }
  }, []);

  // Find the herb based on the ID from URL params
  useEffect(() => {
    if (herbId) {
      const foundHerb = allHerbs.find(h => h.id === herbId);
      if (foundHerb) {
        setHerb(foundHerb);
        // Set document title
        document.title = `${foundHerb.name} | Herb Encyclopedia`;
      }
    }
    
    // Clean up on unmount
    return () => {
      document.title = 'Herb Encyclopedia';
    };
  }, [herbId]);

  const handleToggleSave = (herb: Herb) => {
    const isCurrentlySaved = savedHerbs.some(savedHerb => savedHerb.id === herb.id);
    
    let newSavedHerbs;
    if (isCurrentlySaved) {
      // Remove herb
      newSavedHerbs = savedHerbs.filter(savedHerb => savedHerb.id !== herb.id);
      toast({
        description: `${herb.name} removed from your collection`,
        variant: "default",
      });
    } else {
      // Add herb
      newSavedHerbs = [...savedHerbs, herb];
      toast({
        description: `${herb.name} added to your collection`,
        variant: "default",
      });
    }
    
    setSavedHerbs(newSavedHerbs);
    // Save to localStorage
    localStorage.setItem('savedHerbs', JSON.stringify(newSavedHerbs.map(h => h.id)));
  };

  const handleHerbSelect = (selectedHerb: Herb) => {
    // Navigate to the selected herb's page
    window.location.href = `/herbs/${selectedHerb.id}`;
  };

  // If herb is not found
  if (!herb) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-16 h-16 text-amber-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Herb Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn't find the herb you're looking for.</p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Herb Encyclopedia
          </Link>
        </Button>
      </div>
    );
  }

  const isSaved = savedHerbs.some(savedHerb => savedHerb.id === herb.id);
  const categoryColor = getCategoryColor(herb.category);
  
  // Get category display name
  const categoryDisplay = {
    heart: {name: 'Heart Health', color: 'text-red-600'},
    stomach: {name: 'Digestive Health', color: 'text-green-600'},
    mens: {name: 'Men\'s Health', color: 'text-blue-600'},
    womens: {name: 'Women\'s Health', color: 'text-pink-600'},
    brain: {name: 'Brain Health', color: 'text-purple-600'},
    tea: {name: 'Herbal Tea', color: 'text-amber-600'}
  }[herb.category || 'heart'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header with back button and herb name */}
      <div className="glass sticky top-0 z-10 py-4 px-4 sm:px-8 flex items-center justify-between">
        <Button variant="ghost" asChild className="p-2">
          <Link to="/">
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
            <span className="hidden sm:inline">Back to Encyclopedia</span>
          </Link>
        </Button>
        
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent flex items-center">
          <Leaf className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-amber-600" />
          {herb.name}
        </h1>
        
        <BookmarkButton 
          isSaved={isSaved} 
          size="default" 
          onToggle={() => handleToggleSave(herb)} 
        />
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Herb Hero Section */}
        <div className="glass-dark rounded-2xl p-4 sm:p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-32 w-32 sm:h-48 sm:w-48 opacity-10 rounded-bl-full" 
               style={{ backgroundColor: herb.color }}></div>
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: herb.color }}>
              <Leaf className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start mb-2">
                <CategoryIcon category={herb.category || 'heart'} size={20} className={`mr-2 ${categoryDisplay.color}`} />
                <span className={`text-sm ${categoryDisplay.color}`}>{categoryDisplay.name}</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{herb.name}</h1>
              
              <p className="text-gray-600 dark:text-amber-200 mb-4 max-w-3xl text-base md:text-lg">
                {herb.benefits[0]} 
                {herb.benefits.length > 1 && ` and ${herb.benefits.length - 1} other benefits.`}
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Button size="sm" variant="outline" className="rounded-full dark:border-amber-700/50 dark:text-amber-300 dark:hover:bg-amber-800/30">
                  <Heart className="h-4 w-4 mr-2" />
                  Benefits
                </Button>
                <Button size="sm" variant="outline" className="rounded-full dark:border-amber-700/50 dark:text-amber-300 dark:hover:bg-amber-800/30">
                  <Droplet className="h-4 w-4 mr-2" />
                  Oil Preparation
                </Button>
                <Button size="sm" variant="outline" className="rounded-full dark:border-amber-700/50 dark:text-amber-300 dark:hover:bg-amber-800/30">
                  <Beaker className="h-4 w-4 mr-2" />
                  Tincture
                </Button>
                <Button size="sm" variant="outline" className="rounded-full dark:border-amber-700/50 dark:text-amber-300 dark:hover:bg-amber-800/30">
                  <BookOpen className="h-4 w-4 mr-2" />
                  History
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for different sections */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="preparations">Preparations</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="studies">Scientific Studies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center dark:text-amber-300">
                  <Heart size={20} className="mr-3 text-herb-heart dark:text-amber-400" />
                  Health Benefits
                </h2>
                <ul className="space-y-3">
                  {herb.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start bg-white/50 dark:bg-amber-900/20 p-4 rounded-lg">
                      <span className="text-accent dark:text-amber-400 mr-3 text-xl font-bold">•</span>
                      <span className="text-gray-700 dark:text-amber-100">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 dark:text-amber-300">Benefits Visualization</h2>
                <BenefitsChart herb={herb} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preparations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center dark:text-amber-300">
                  <Droplet size={20} className="mr-3 text-cyan-500 dark:text-amber-400" />
                  Oil Preparation
                </h3>
                <div className="bg-white/50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-gray-700 dark:text-amber-100 font-sans">{herb.oilPreparation}</pre>
                </div>
              </div>
              
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center dark:text-amber-300">
                  <Beaker size={20} className="mr-3 text-purple-500 dark:text-amber-400" />
                  Tincture Preparation
                </h3>
                <div className="bg-white/50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-gray-700 dark:text-amber-100 font-sans">{herb.tincturePreparation}</pre>
                </div>
              </div>
              
              {herb.bestTimeToConsume && (
                <div className="glass rounded-xl p-6 md:col-span-2">
                  <h3 className="text-xl font-semibold mb-4">Best Time to Consume</h3>
                  <div className="bg-white/50 p-4 rounded-lg">
                    <p className="text-gray-700">{herb.bestTimeToConsume}</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="glass rounded-xl p-6">
              <HerbHistory herb={herb} />
            </div>
          </TabsContent>
          
          <TabsContent value="studies">
            <div className="glass rounded-xl p-6">
              <ScientificStudies herb={herb} />
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Complementary Herbs Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-amber-300">Complementary Herbs</h2>
          <ComplementaryHerbs 
            activeHerb={herb} 
            allHerbs={allHerbs}
            onHerbSelect={handleHerbSelect}
            savedHerbs={savedHerbs}
            onToggleSave={handleToggleSave}
          />
        </div>
        
        {/* External Resources */}
        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-amber-300">External Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center justify-center gap-2 dark:border-amber-700/50 dark:text-amber-300 dark:hover:bg-amber-800/30" asChild>
              <a href={`https://www.ncbi.nlm.nih.gov/pmc/?term=${herb.name}+medicinal+properties`} target="_blank" rel="noopener noreferrer">
                PubMed Research
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 dark:border-amber-700/50 dark:text-amber-300 dark:hover:bg-amber-800/30" asChild>
              <a href={`https://plants.usda.gov/java/nameSearch?keywordquery=${herb.name}&mode=sciname&sort=1`} target="_blank" rel="noopener noreferrer">
                USDA Plant Database
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 dark:border-amber-700/50 dark:text-amber-300 dark:hover:bg-amber-800/30" asChild>
              <a href={`https://examine.com/supplements/${herb.name.toLowerCase().replace(' ', '-')}`} target="_blank" rel="noopener noreferrer">
                Examine.com
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      <HerbFooter />
    </div>
  );
};

export default HerbDetailPage;
