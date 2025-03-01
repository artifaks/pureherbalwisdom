
import React, { useState } from 'react';
import CategoryIcon from './CategoryIcon';
import HerbCard from './HerbCard';
import ContentArea from './ContentArea';
import { cn } from '@/lib/utils';

interface Herb {
  id: string;
  name: string;
  color: string;
  benefits: string[];
  oilPreparation: string;
  tincturePreparation: string;
}

const HerbVisualizer: React.FC = () => {
  // State for active herb, tab, and category
  const [activeHerb, setActiveHerb] = useState<Herb | null>(null);
  const [activeTab, setActiveTab] = useState<'benefits' | 'oil' | 'tincture'>('benefits');
  const [activeCategory, setActiveCategory] = useState<'heart' | 'stomach' | 'mens' | 'womens'>('heart');

  // Heart herbs data
  const heartHerbs = [
    {
      id: 'hawthorn',
      name: 'Hawthorn',
      color: '#e94057',
      benefits: [
        'Improves blood flow to the heart',
        'May reduce blood pressure',
        'Contains antioxidants that protect blood vessels',
        'Traditionally used for heart failure'
      ],
      oilPreparation: "1. Use hawthorn berries, dried and crushed\n2. Place in carrier oil at 1:5 ratio\n3. Keep in jar for 4-6 weeks, shaking daily\n4. Strain and store in dark bottles",
      tincturePreparation: "1. Fill jar 2/3 with berries\n2. Cover with alcohol\n3. Store for 6-8 weeks\n4. Strain and use 20-40 drops in water"
    },
    {
      id: 'arjuna',
      name: 'Arjuna',
      color: '#A1887F',
      benefits: [
        'Traditional heart tonic in Ayurveda',
        'Supports healthy heart muscle function',
        'May help maintain cholesterol levels',
        'Has antioxidant properties'
      ],
      oilPreparation: "1. Use powdered arjuna bark\n2. Mix with sesame oil 1:4 ratio\n3. Warm infuse for 3 hours\n4. Store in dark amber bottles",
      tincturePreparation: "1. Mix 1 part arjuna bark with 5 parts alcohol\n2. Let sit for 8 weeks, shaking daily\n3. Strain through muslin cloth\n4. Take 30-60 drops daily"
    },
    {
      id: 'linden',
      name: 'Linden',
      color: '#AED581',
      benefits: [
        'Relaxes blood vessels and improves circulation',
        'May reduce high blood pressure',
        'Mild sedative properties for stress reduction',
        'Contains antioxidants for heart health'
      ],
      oilPreparation: "1. Collect linden flowers and leaves\n2. Cover with olive oil completely\n3. Solar infuse for 2-3 weeks\n4. Strain and use for chest rubs",
      tincturePreparation: "1. Fill jar with linden flowers\n2. Cover with 80 proof vodka\n3. Store for 4-6 weeks\n4. Use 20-30 drops as needed"
    }
  ];

  // Stomach herbs data
  const stomachHerbs = [
    {
      id: 'peppermint',
      name: 'Peppermint',
      color: '#4CAF50',
      benefits: [
        'Relieves indigestion and upset stomach',
        'Reduces bloating and gas',
        'Soothes intestinal spasms',
        'Helps with IBS symptoms'
      ],
      oilPreparation: "1. Harvest fresh peppermint leaves\n2. Add to carrier oil\n3. Heat gently for 2-3 hours\n4. Strain and store in dark bottles",
      tincturePreparation: "1. Fill jar with fresh leaves\n2. Cover with alcohol or vinegar\n3. Store for 4-6 weeks\n4. Use 10-15 drops in water"
    },
    {
      id: 'ginger',
      name: 'Ginger',
      color: '#f8cb66',
      benefits: [
        'Reduces nausea and vomiting',
        'Speeds gastric emptying',
        'Relieves gas and bloating',
        'Anti-inflammatory for digestive tract'
      ],
      oilPreparation: "1. Grate fresh ginger root\n2. Add to carrier oil\n3. Heat in double boiler\n4. Strain and store",
      tincturePreparation: "1. Fill jar with grated ginger\n2. Cover with alcohol\n3. Store for 6-8 weeks\n4. Take for nausea or indigestion"
    },
    {
      id: 'chamomile',
      name: 'Chamomile',
      color: '#FFF59D',
      benefits: [
        'Soothes stomach cramps',
        'Reduces acid reflux symptoms',
        'Helps with stress-related digestive issues',
        'Anti-inflammatory for digestive tract'
      ],
      oilPreparation: "1. Use dried chamomile flowers\n2. Cover with carrier oil\n3. Infuse using low heat\n4. Strain and store properly",
      tincturePreparation: "1. Fill jar with dried flowers\n2. Cover with vodka\n3. Store for 4 weeks\n4. Take before meals"
    }
  ];

  // Men's health herbs data
  const mensHerbs = [
    {
      id: 'saw-palmetto',
      name: 'Saw Palmetto',
      color: '#8D6E63',
      benefits: [
        'Supports prostate health',
        'May help with urinary symptoms of BPH',
        'Can help balance testosterone levels',
        'Anti-inflammatory properties'
      ],
      oilPreparation: "1. Crush dried saw palmetto berries\n2. Mix with carrier oil at 1:4 ratio\n3. Warm infuse for 3-4 hours\n4. Strain and store in dark bottles",
      tincturePreparation: "1. Fill jar halfway with crushed berries\n2. Cover with high-proof alcohol\n3. Store for 6-8 weeks in dark place\n4. Take 20-30 drops twice daily"
    },
    {
      id: 'nettle-root',
      name: 'Nettle Root',
      color: '#33691E',
      benefits: [
        'Supports prostate health',
        'May reduce inflammatory conditions',
        'Can help manage benign prostate hyperplasia',
        'Contains compounds that may inhibit DHT'
      ],
      oilPreparation: "1. Use dried nettle root, chopped\n2. Cover with olive oil in jar\n3. Warm infuse for 4-6 hours\n4. Store in cool, dark place",
      tincturePreparation: "1. Fill jar 1/3 with dried nettle root\n2. Cover with vodka completely\n3. Store 4-6 weeks, shaking daily\n4. Take 30-60 drops daily"
    },
    {
      id: 'ginseng',
      name: 'Ginseng',
      color: '#FFAB91',
      benefits: [
        'Increases energy and reduces fatigue',
        'May improve erectile function',
        'Adaptogen that helps body handle stress',
        'Supports immune system function'
      ],
      oilPreparation: "1. Use dried ginseng root\n2. Cover with sesame or olive oil\n3. Slow infuse for 6-8 weeks\n4. Use in small amounts for massage",
      tincturePreparation: "1. Chop ginseng root finely\n2. Use 1:5 ratio with 50% alcohol\n3. Steep for 8 weeks minimum\n4. Take 20-40 drops daily"
    }
  ];

  // Women's health herbs data
  const womensHerbs = [
    {
      id: 'red-raspberry',
      name: 'Red Raspberry',
      color: '#C2185B',
      benefits: [
        'Supports uterine health',
        'May ease menstrual cramps',
        'Rich in nutrients for pregnancy',
        'Has astringent properties for tissues'
      ],
      oilPreparation: "1. Use dried raspberry leaves\n2. Cover with sweet almond oil\n3. Solar infuse for 2-3 weeks\n4. Use for massage over lower abdomen",
      tincturePreparation: "1. Pack jar with dried leaves\n2. Cover with apple cider vinegar or vodka\n3. Steep 4 weeks, shaking daily\n4. Take 30-40 drops daily"
    },
    {
      id: 'chasteberry',
      name: 'Chasteberry',
      color: '#9C27B0',
      benefits: [
        'Helps regulate hormonal balance',
        'May reduce PMS symptoms',
        'Supports healthy menstrual cycles',
        'Traditional remedy for menopause symptoms'
      ],
      oilPreparation: "1. Crush dried chasteberries\n2. Infuse in jojoba oil for 4 weeks\n3. Keep in cool, dark place\n4. Use for lymphatic massage",
      tincturePreparation: "1. Fill jar 1/3 with dried berries\n2. Cover with vodka completely\n3. Store 6-8 weeks in dark place\n4. Take 20-40 drops each morning"
    },
    {
      id: 'black-cohosh',
      name: 'Black Cohosh',
      color: '#616161',
      benefits: [
        'Helps manage menopausal symptoms',
        'May reduce hot flashes and night sweats',
        'Supports hormonal balance',
        'Can help with menstrual discomfort'
      ],
      oilPreparation: "1. Use dried black cohosh root\n2. Cover with carrier oil\n3. Warm infuse for 2-3 hours\n4. External use only for muscle tension",
      tincturePreparation: "1. Use 1 part root to 5 parts alcohol\n2. Store in dark place for 8 weeks\n3. Shake jar daily during extraction\n4. Take 10-30 drops up to twice daily"
    }
  ];

  // Get current herbs based on category
  const herbs = 
    activeCategory === 'heart' ? heartHerbs : 
    activeCategory === 'stomach' ? stomachHerbs : 
    activeCategory === 'mens' ? mensHerbs : 
    womensHerbs;

  // Category button colors
  const categoryColors = {
    heart: 'bg-red-100 text-red-800 border-red-200',
    stomach: 'bg-green-100 text-green-800 border-green-200',
    mens: 'bg-blue-100 text-blue-800 border-blue-200',
    womens: 'bg-pink-100 text-pink-800 border-pink-200',
  };

  const handleCategoryChange = (category: 'heart' | 'stomach' | 'mens' | 'womens') => {
    setActiveCategory(category);
    setActiveHerb(null);
  };

  const handleHerbSelect = (herb: Herb) => {
    setActiveHerb(herb);
    setActiveTab('benefits');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header with Category Toggles */}
      <div className="glass sticky top-0 z-10 py-6 px-8 flex items-center justify-center">
        <div className="flex flex-wrap gap-3 justify-center">
          {(['heart', 'stomach', 'mens', 'womens'] as const).map((category) => (
            <button 
              key={category}
              className={cn(
                "category-button flex items-center px-5 py-3 rounded-xl transition-all duration-300 border",
                "focus-ring",
                activeCategory === category 
                  ? `active ${categoryColors[category]}` 
                  : "bg-white/70 hover:bg-white border-gray-100"
              )}
              onClick={() => handleCategoryChange(category)}
            >
              <CategoryIcon category={category} size={20} className="mr-2" />
              <span className="font-medium">
                {category === 'heart' ? 'Heart' : 
                 category === 'stomach' ? 'Stomach' : 
                 category === 'mens' ? 'Men\'s Health' : 
                 'Women\'s Health'}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Herb Selection Boxes */}
      <div className="glass-dark mx-6 my-4 p-4 rounded-xl overflow-x-auto">
        <div className="flex space-x-4 min-w-max px-2 py-1">
          {herbs.map((herb) => (
            <HerbCard
              key={herb.id}
              id={herb.id}
              name={herb.name}
              color={herb.color}
              isActive={activeHerb?.id === herb.id}
              onClick={() => handleHerbSelect(herb)}
            />
          ))}
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:px-16 lg:py-8">
        <ContentArea
          activeHerb={activeHerb}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeCategory={activeCategory}
        />
      </div>
      
      {/* Footer */}
      <div className="glass py-4 px-6 text-center text-sm text-gray-600">
        <p>Always consult with a healthcare professional before starting any herbal regimen.</p>
      </div>
    </div>
  );
};

export default HerbVisualizer;
