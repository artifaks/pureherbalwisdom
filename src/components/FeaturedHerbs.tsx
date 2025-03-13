
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Leaf, ArrowRight, Heart, Moon, Sparkles, Zap, Flame, Shield, Brain, Droplets, Sun, Flower, Wind, Eye, Pill, Dumbbell, Mail, X, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from './ui/use-toast';

const featuredHerbsData = [
  {
    name: 'Lavender',
    image: '/lovable-uploads/ce78786c-c28c-4f36-878c-68976a466ff8.png',
    description: 'Known for its calming effects on the nervous system, helping reduce anxiety and promote better sleep.',
    tags: ['Anxiety Relief', 'Sleep Aid', 'Aromatherapy'],
    icon: Moon, // Sleep icon
    iconColor: 'text-purple-500 dark:text-amber-300'
  },
  {
    name: 'Ginger',
    image: 'https://images.unsplash.com/photo-1573414404852-1840ae22db94?auto=format&fit=crop&w=300&q=80',
    description: 'A powerful digestive aid that helps reduce nausea, inflammation, and supports the immune system.',
    tags: ['Digestive Health', 'Anti-Inflammatory', 'Immune Support'],
    icon: Flame, // Energy/Digestive icon
    iconColor: 'text-orange-500 dark:text-amber-500'
  },
  {
    name: 'Turmeric',
    image: 'https://images.unsplash.com/photo-1615485500784-8e97deb1eb10?auto=format&fit=crop&w=300&q=80',
    description: 'Contains curcumin, which has powerful anti-inflammatory effects and is a strong antioxidant.',
    tags: ['Anti-Inflammatory', 'Antioxidant', 'Joint Health'],
    icon: Shield, // Protection/Antioxidant icon
    iconColor: 'text-amber-600 dark:text-amber-400'
  },
  {
    name: 'Ashwagandha',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=300&q=80',
    description: 'An adaptogenic herb that helps the body manage stress and promotes mental clarity and focus.',
    tags: ['Stress Relief', 'Energy', 'Focus'],
    icon: Brain, // Brain/Focus icon
    iconColor: 'text-blue-500 dark:text-amber-300'
  },
  {
    name: 'Chamomile',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=300&q=80',
    description: 'A gentle herb with calming properties that helps soothe digestion and promote relaxation and sleep.',
    tags: ['Relaxation', 'Digestive Aid', 'Sleep Support'],
    icon: Sparkles, // Calming icon
    iconColor: 'text-yellow-400 dark:text-amber-400'
  },
  {
    name: 'Peppermint',
    image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=300&q=80',
    description: 'Refreshing herb that aids digestion, relieves headaches, and clears respiratory passages.',
    tags: ['Digestive Aid', 'Headache Relief', 'Breath Freshener'],
    icon: Wind, // Fresh breath/cooling icon
    iconColor: 'text-green-500 dark:text-amber-300'
  },
  {
    name: 'Echinacea',
    image: 'https://images.unsplash.com/photo-1530092285049-1c42085fd395?auto=format&fit=crop&w=300&q=80',
    description: 'Powerful immune-boosting herb that helps fight infections and reduce the duration of colds.',
    tags: ['Immune Support', 'Cold Relief', 'Anti-Viral'],
    icon: Shield, // Protection icon
    iconColor: 'text-pink-500 dark:text-amber-400'
  },
  {
    name: 'Valerian Root',
    image: 'https://images.unsplash.com/photo-1567331711402-509c12c41959?auto=format&fit=crop&w=300&q=80',
    description: 'Natural sedative that improves sleep quality and reduces anxiety without morning grogginess.',
    tags: ['Sleep Aid', 'Anxiety Relief', 'Muscle Relaxant'],
    icon: Moon, // Sleep icon
    iconColor: 'text-indigo-600 dark:text-amber-300'
  },
  {
    name: 'Aloe Vera',
    image: 'https://images.unsplash.com/photo-1596046501884-dd410f1bc8ca?auto=format&fit=crop&w=300&q=80',
    description: 'Soothing plant with healing properties for skin, digestive issues, and inflammation.',
    tags: ['Skin Health', 'Wound Healing', 'Digestive Support'],
    icon: Droplets, // Moisture/healing icon
    iconColor: 'text-green-400 dark:text-amber-300'
  },
  {
    name: 'St. John\'s Wort',
    image: 'https://images.unsplash.com/photo-1533792344354-cafd31e1bd26?auto=format&fit=crop&w=300&q=80',
    description: 'Herbal remedy that may help with mild to moderate depression and improve mood.',
    tags: ['Mood Support', 'Depression Relief', 'Nerve Pain'],
    icon: Sun, // Mood brightening icon
    iconColor: 'text-yellow-500 dark:text-amber-400'
  },
  {
    name: 'Rosemary',
    image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=300&q=80',
    description: 'Aromatic herb that enhances memory, improves concentration, and has antioxidant properties.',
    tags: ['Memory Enhancement', 'Focus', 'Antioxidant'],
    icon: Brain, // Memory/focus icon
    iconColor: 'text-blue-600 dark:text-amber-300'
  },
  {
    name: 'Milk Thistle',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=300&q=80',
    description: 'Supports liver health and detoxification, protecting liver cells from toxins and promoting regeneration.',
    tags: ['Liver Support', 'Detoxification', 'Antioxidant'],
    icon: Shield, // Protection/detox icon
    iconColor: 'text-purple-400 dark:text-amber-400'
  },
  {
    name: 'Elderberry',
    image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&w=300&q=80',
    description: 'Rich in antioxidants and vitamins that boost immunity and fight cold and flu symptoms.',
    tags: ['Immune Boost', 'Cold & Flu', 'Antioxidant'],
    icon: Zap, // Immune boost icon
    iconColor: 'text-indigo-500 dark:text-amber-500'
  },
  {
    name: 'Dandelion',
    image: 'https://images.unsplash.com/photo-1558704164-ab7a0016c1f3?auto=format&fit=crop&w=300&q=80',
    description: 'Natural diuretic that supports kidney function, liver health, and aids in digestion.',
    tags: ['Detoxification', 'Liver Support', 'Digestive Aid'],
    icon: Flower, // Flower/cleansing icon
    iconColor: 'text-yellow-500 dark:text-amber-400'
  },
  {
    name: 'Ginkgo Biloba',
    image: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=300&q=80',
    description: 'Ancient herb that improves circulation, memory, and cognitive function while reducing inflammation.',
    tags: ['Brain Health', 'Circulation', 'Anti-Aging'],
    icon: Eye, // Vision/clarity icon
    iconColor: 'text-green-600 dark:text-amber-300'
  },
  {
    name: 'Rhodiola',
    image: 'https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?auto=format&fit=crop&w=300&q=80',
    description: 'Adaptogenic herb that helps the body resist physical and mental stress while boosting energy.',
    tags: ['Energy', 'Stress Relief', 'Mental Performance'],
    icon: Dumbbell, // Strength/endurance icon
    iconColor: 'text-red-500 dark:text-amber-500'
  }
];

const FeaturedHerbs: React.FC = () => {
  const [displayedHerbs, setDisplayedHerbs] = useState(featuredHerbsData.slice(0, 6));
  const [email, setEmail] = useState('');
  const [selectedHerb, setSelectedHerb] = useState<string | null>(null);
  const [savedHerbs, setSavedHerbs] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to save email subscription and herb to Supabase
  const saveEmailSubscription = async (email: string, herbName: string) => {
    try {
      // First, save the email subscription if it doesn't exist
      const { data: existingSubscription, error: subscriptionError } = await supabase
        .from('newsletter_subscriptions')
        .select('id')
        .eq('email', email)
        .single();
        
      if (subscriptionError && subscriptionError.code !== 'PGRST116') { // PGRST116 is the error code for "not found"
        throw subscriptionError;
      }
      
      let subscriptionId;
      
      if (!existingSubscription) {
        // Create new subscription
        const { data: newSubscription, error: createError } = await supabase
          .from('newsletter_subscriptions')
          .insert({
            email: email,
            status: 'active'
          })
          .select('id')
          .single();
          
        if (createError) throw createError;
        subscriptionId = newSubscription.id;
      } else {
        subscriptionId = existingSubscription.id;
      }
      
      // Find the herb ID based on the herb name
      const { data: herbData, error: herbError } = await supabase
        .from('herbs')
        .select('id')
        .eq('common_name', herbName)
        .single();
        
      if (herbError) {
        // If herb not found in database, we'll just use the name as a placeholder
        // In a real app, you'd want to handle this differently
        const { data: savedHerb, error: saveError } = await supabase
          .from('saved_herbs')
          .insert({
            artifaks: email, // Using artifaks field to store email (based on schema)
            herb_id: herbName, // Using the name as a placeholder
            notes: `User saved herb via email subscription`
          });
          
        if (saveError) throw saveError;
      } else {
        // Save the herb with proper herb_id
        const { data: savedHerb, error: saveError } = await supabase
          .from('saved_herbs')
          .insert({
            artifaks: email, // Using artifaks field to store email (based on schema)
            herb_id: herbData.id,
            notes: `User saved herb via email subscription`
          });
          
        if (saveError) throw saveError;
      }
      
      return true;
    } catch (error) {
      console.error('Error saving subscription:', error);
      return false;
    }
  };
  
  // Add custom animations to the CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      @keyframes float-reverse {
        0% { transform: translateY(0px); }
        50% { transform: translateY(10px); }
        100% { transform: translateY(0px); }
      }
      @keyframes pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
      @keyframes spin-slow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes spin-reverse {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(-360deg); }
      }
      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes sway {
        0%, 100% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      .animate-float-reverse {
        animation: float-reverse 7s ease-in-out infinite;
      }
      .animate-pulse-slow {
        animation: pulse-slow 4s ease-in-out infinite;
      }
      .animate-spin-slow {
        animation: spin-slow 10s linear infinite;
      }
      .animate-spin-reverse {
        animation: spin-reverse 12s linear infinite;
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
        opacity: 0;
      }
      .animate-sway {
        animation: sway 8s ease-in-out infinite;
        transform-origin: bottom center;
      }
      .animate-bounce {
        animation: bounce 4s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <section className="py-16 px-4 dark:bg-[#171410]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 group">
          <div className="inline-block p-2 bg-amber-50 dark:bg-amber-800/30 rounded-lg mb-4 animate-pulse-slow">
            <Leaf className="h-6 w-6 text-amber-600 dark:text-amber-500 animate-spin-slow" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-amber-100 mb-3 relative inline-block">
            Pure Herbal Wisdom
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-500 dark:bg-amber-400 transform scale-x-0 transition-transform group-hover:scale-x-100 origin-left"></span>
          </h2>
          <p className="text-gray-600 dark:text-amber-100 max-w-2xl mx-auto">
            Discover nature's pharmacy for holistic health, fitness, and well-being.<br/>
            Our guide helps you harness the healing power of herbs for a vibrant life.
          </p>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-300 mb-4 flex items-center">
            <Leaf className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
            🌿 Featured Remedies
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-amber-50/30 dark:bg-amber-900/10 p-4 sm:p-6 rounded-xl">
          {displayedHerbs.map((herb, index) => (
            <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-amber-100 dark:border-amber-700/40 dark:bg-[#1f1a14] animate-fade-in-up" style={{animationDelay: `${index * 150}ms`}}>
              <div className="h-48 overflow-hidden relative flex items-center justify-center bg-amber-50 dark:bg-amber-900/50">
                <div className="flex flex-col items-center justify-center">
                  {React.createElement(herb.icon, { 
                    className: `h-24 w-24 ${herb.iconColor} transition-colors ${
                      index % 3 === 0 ? 'animate-float' : 
                      index % 3 === 1 ? 'animate-float-reverse' : 
                      index % 3 === 2 ? 'animate-sway' : 'animate-bounce'
                    }` 
                  })}
                  <h3 className="text-2xl font-semibold text-amber-800 dark:text-amber-300 mt-3">{herb.name}</h3>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {React.createElement(herb.icon, { className: `h-5 w-5 ${herb.iconColor} mr-2 transition-colors` })}
                    <span className="text-amber-700 dark:text-amber-300 font-medium">Benefits</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {herb.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="outline" 
                      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-800/30 dark:text-amber-300 dark:border-amber-600/40 flex items-center hover:scale-105 transition-transform"
                    >
                      {tagIndex === 0 && React.createElement(herb.icon, { className: `h-3 w-3 ${herb.iconColor} mr-1 transition-colors` })}
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-amber-100">{herb.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="ghost" 
                  className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-800/20 p-0 group"
                  onClick={() => {
                    setSelectedHerb(herb.name);
                    setIsDialogOpen(true);
                  }}
                >
                  <Heart className={`h-4 w-4 mr-1 transition-colors group-hover:scale-125 ${savedHerbs.includes(herb.name) ? 'text-red-500 dark:text-red-400' : 'text-amber-600 dark:text-amber-400 group-hover:text-red-500 dark:group-hover:text-red-300'}`} />
                  {savedHerbs.includes(herb.name) ? 'Saved to collection' : 'Save to collection'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 mb-6">
          <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-300 mb-4 flex items-center justify-center">
            <Sparkles className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
            🌟 Popular Herbs
          </h3>
        </div>
        <div className="text-center mt-6 space-y-4">
          {displayedHerbs.length < featuredHerbsData.length ? (
            <Button 
              className="group bg-amber-500 hover:bg-amber-600 dark:bg-amber-400 dark:hover:bg-amber-500 text-white animate-pulse-slow hover:shadow-md hover:shadow-amber-300/30 transition-all duration-300"
              size="lg"
              onClick={() => setDisplayedHerbs(featuredHerbsData)}
            >
              Show More Herbs
              <Zap className="ml-2 h-4 w-4 group-hover:scale-125 transition-transform" />
            </Button>
          ) : displayedHerbs.length > 6 ? (
            <Button 
              className="group bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-800/30 dark:text-amber-200 dark:hover:bg-amber-700/40 mr-4 hover:shadow-md hover:shadow-amber-200/30 transition-all duration-300"
              size="lg"
              onClick={() => setDisplayedHerbs(featuredHerbsData.slice(0, 6))}
            >
              Show Less
              <ArrowRight className="ml-2 h-4 w-4 rotate-90 group-hover:translate-y-1 transition-transform" />
            </Button>
          ) : null}
          
          <Button 
            className="group bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700 dark:text-white hover:shadow-lg hover:shadow-amber-700/20 transition-all duration-300 ml-4 border-2 border-amber-400 dark:border-amber-500"
            asChild
            size="lg"
          >
            <a href="#herb-guide" className="flex items-center">
              View All 100+ Herbs
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
      {/* Email Subscription Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-[#1f1a14] border-amber-100 dark:border-amber-700/40">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-amber-800 dark:text-amber-300">
              Save {selectedHerb} to Your Collection
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-amber-100">
              Enter your email to save this herb to your personal collection and receive updates about its benefits and usage.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email" className="text-amber-700 dark:text-amber-300">Email</Label>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com" 
                  className="flex-1 border-amber-200 dark:border-amber-700/40 dark:bg-amber-900/30 dark:text-amber-100 focus-visible:ring-amber-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-amber-100/70">
              <Check className="h-4 w-4 text-green-500" />
              <span>We'll only send you information about your saved herbs.</span>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-700/40 dark:text-amber-300 dark:hover:bg-amber-800/20"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={async () => {
                setIsSubmitting(true);
                
                try {
                  // Save to Supabase
                  const success = await saveEmailSubscription(email, selectedHerb || '');
                  
                  if (success && selectedHerb && !savedHerbs.includes(selectedHerb)) {
                    setSavedHerbs([...savedHerbs, selectedHerb]);
                  }
                  
                  setIsDialogOpen(false);
                  
                  if (success) {
                    toast({
                      title: "Herb saved to collection",
                      description: `${selectedHerb} has been saved to your collection. We'll send updates to ${email}.`,
                      className: "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700/40",
                    });
                  } else {
                    toast({
                      title: "Error saving herb",
                      description: "There was a problem saving your herb. Please try again.",
                      variant: "destructive",
                    });
                  }
                } catch (error) {
                  console.error('Error in save process:', error);
                  toast({
                    title: "Error saving herb",
                    description: "There was a problem saving your herb. Please try again.",
                    variant: "destructive",
                  });
                } finally {
                  setIsSubmitting(false);
                }
              }}
              disabled={!email.includes('@') || isSubmitting}
              className="bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-400 dark:hover:bg-amber-500 dark:text-gray-900"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-pulse">Saving...</span>
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 mr-2" />
                  Save to Collection
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FeaturedHerbs;
