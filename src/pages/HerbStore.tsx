import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Search, ExternalLink, Leaf, Heart, Brain, Users, Flower2, Coffee, ShieldCheck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { allHerbs } from '@/data/allHerbs';
import { HerbCategory } from '@/data/types';
import CategoryIcon from '@/components/CategoryIcon';

const AWIN_AFFILIATE_ID = '2668518';
const AWIN_MERCHANT_ID = '87941';
const STARWEST_BASE_URL = 'https://www.starwest-botanicals.com';

function buildAwinLink(destinationUrl: string): string {
  const encoded = encodeURIComponent(destinationUrl);
  return `https://www.awin1.com/cread.php?awinmid=${AWIN_MERCHANT_ID}&awinaffid=${AWIN_AFFILIATE_ID}&ued=${encoded}`;
}

const categories: { key: HerbCategory | 'all'; label: string; icon: React.ReactNode }[] = [
  { key: 'all', label: 'All Herbs', icon: <Leaf className="h-4 w-4" /> },
  { key: 'heart', label: 'Heart Health', icon: <Heart className="h-4 w-4" /> },
  { key: 'stomach', label: 'Digestive', icon: <Leaf className="h-4 w-4" /> },
  { key: 'brain', label: 'Brain Health', icon: <Brain className="h-4 w-4" /> },
  { key: 'mens', label: "Men's Health", icon: <Users className="h-4 w-4" /> },
  { key: 'womens', label: "Women's Health", icon: <Flower2 className="h-4 w-4" /> },
  { key: 'tea', label: 'Herbal Teas', icon: <Coffee className="h-4 w-4" /> },
];

const HerbStore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<HerbCategory | 'all'>('all');

  const filteredHerbs = useMemo(() => {
    return allHerbs.filter((herb) => {
      const matchesSearch = herb.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || herb.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="glass sticky top-0 z-10 py-4 px-4 sm:px-8 flex items-center justify-between">
        <Button variant="ghost" asChild className="p-2">
          <Link to="/">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </Button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-amber-300 flex items-center">
          <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-green-600 dark:text-amber-400" />
          Herb Store
        </h1>
        <div className="w-10" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="glass-dark rounded-2xl p-6 sm:p-10 mb-8 text-center bg-gradient-to-br from-green-600/10 via-emerald-500/10 to-teal-500/10 dark:from-amber-900/30 dark:to-amber-800/20 border border-green-200 dark:border-amber-700/40">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-amber-200 mb-3">
            Shop Premium Organic Herbs
          </h2>
          <p className="text-gray-600 dark:text-amber-300/80 max-w-2xl mx-auto mb-6">
            Browse our curated selection of organic herbs from Starwest Botanicals — trusted since 1975.
            Click any herb to shop for organic, ethically-sourced products.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-amber-400/70">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-green-500 dark:text-amber-500" />
              Organic & Ethically Sourced
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-green-500 dark:text-amber-500" />
              Trusted Since 1975
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-green-500 dark:text-amber-500" />
              Secure Checkout
            </span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search herbs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat.key}
                size="sm"
                variant={activeCategory === cat.key ? 'default' : 'outline'}
                className={`rounded-full ${
                  activeCategory === cat.key
                    ? 'bg-green-600 hover:bg-green-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white'
                    : 'dark:border-amber-700/50 dark:text-amber-300'
                }`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.icon}
                <span className="ml-1">{cat.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-500 dark:text-amber-400/60 mb-4 text-center">
          {filteredHerbs.length} herb{filteredHerbs.length !== 1 ? 's' : ''} available
        </p>

        {/* Herb Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredHerbs.map((herb) => {
            const shopUrl = buildAwinLink(
              `${STARWEST_BASE_URL}/search/?search_query=${encodeURIComponent(herb.name)}`
            );

            return (
              <div
                key={herb.id}
                className="glass rounded-xl p-5 flex flex-col hover:shadow-lg transition-shadow border border-transparent hover:border-green-200 dark:hover:border-amber-700/50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: herb.color }}
                  >
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 dark:text-amber-200 truncate">{herb.name}</h3>
                    {herb.category && (
                      <span className="text-xs text-gray-500 dark:text-amber-400/60 capitalize">{herb.category}</span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-amber-300/70 mb-4 line-clamp-2 flex-1">
                  {herb.benefits[0]}
                </p>

                <div className="flex gap-2">
                  <Button
                    asChild
                    size="sm"
                    className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white rounded-full text-xs"
                  >
                    <a href={shopUrl} target="_blank" rel="noopener noreferrer">
                      <ShoppingBag className="h-3.5 w-3.5 mr-1" />
                      Shop
                      <ExternalLink className="h-3 w-3 ml-1 opacity-70" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="rounded-full text-xs dark:border-amber-700/50 dark:text-amber-300"
                  >
                    <Link to={`/herbs/${herb.id}`}>
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredHerbs.length === 0 && (
          <div className="text-center py-16">
            <Leaf className="h-12 w-12 text-gray-300 dark:text-amber-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-amber-400/60">No herbs found matching your search.</p>
          </div>
        )}

        {/* Affiliate Disclosure */}
        <p className="text-xs text-gray-400 dark:text-amber-500/50 text-center mt-8 max-w-lg mx-auto">
          As an affiliate of Starwest Botanicals, we may earn a commission from qualifying purchases at no extra cost to you.
          All products are sold and fulfilled by Starwest Botanicals.
        </p>
      </div>
    </div>
  );
};

export default HerbStore;
