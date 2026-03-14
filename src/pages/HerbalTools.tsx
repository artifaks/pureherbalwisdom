import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, ShieldCheck, Sparkles, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
  category: string;
}

interface ReviewProduct {
  id: number;
  name: string;
  rating: number;
  image: string;
  link: string;
  review: string;
  badge: string;
}

const products: Product[] = [
  // Herbal Preparation Tools
  { id: 1, name: 'Mortar and Pestle', description: 'Tera 18/8 Stainless Steel Mortar & Pestle with Brush, Spice Grinder', image: 'https://m.media-amazon.com/images/I/61KQa4AiUlS._SX522_.jpg', link: 'https://amzn.to/4bpUujQ', category: 'preparation' },
  { id: 2, name: 'Herb Grinder / Herb Mill', description: 'COOL KNIGHT Electric Herb Grinder \u2013 Large Capacity, High Rotating Speed', image: 'https://m.media-amazon.com/images/I/61ds5SPU0rL._AC_SX679_.jpg', link: 'https://www.amazon.com/dp/B08HK6VCXP/?tag=wisdom047-20', category: 'preparation' },
  { id: 3, name: 'Herbal Scissors / Pruning Shears', description: 'Fiskars 6" Pruning Scissors for Herbs, Stems, Buds & Small Plants', image: 'https://m.media-amazon.com/images/I/51ECQDFA7NL._AC_SX679_.jpg', link: 'https://www.amazon.com/dp/B07N7963CH/?tag=wisdom047-20', category: 'preparation' },
  { id: 4, name: 'Cutting Board & Knife', description: 'KATISUN 16-Piece Kitchen Knife Block Set with Cutting Board, German Stainless Steel', image: 'https://m.media-amazon.com/images/I/71u-Gw3GNwL._AC_SX679_.jpg', link: 'https://www.amazon.com/dp/B0CKXSGV8F/?tag=wisdom047-20', category: 'preparation' },
  { id: 5, name: 'Fine Mesh Strainer', description: 'Cuisinart Mesh Strainers, 3-Count Set \u2013 CTG-00-3MS Silver', image: 'https://m.media-amazon.com/images/I/61EIor9P1BL._AC_SX679_.jpg', link: 'https://www.amazon.com/dp/B007TUQF9O/?tag=wisdom047-20', category: 'preparation' },
  { id: 6, name: 'Cheesecloth / Nut Milk Bag', description: 'Cotton Farm Nut Milk Bag & Cheese Cloth (Ultra Dense), XL 14\u00d714", 100% Organic', image: 'https://m.media-amazon.com/images/I/813DuNxSPdL._AC_SX679_.jpg', link: 'https://www.amazon.com/dp/B09J56QGWK/?tag=wisdom047-20', category: 'preparation' },
  // Storage & Extraction
  { id: 7, name: 'Glass Mason Jars', description: 'Wide Mouth Mason Jars 32 oz \u2013 12 Pack with Airtight Lids, Microwave & Dishwasher Safe', image: 'https://m.media-amazon.com/images/I/814XFbQHI6L._AC_SX679_PIbundle-12,TopRight,0,0_SH20_.jpg', link: 'https://www.amazon.com/dp/B0CMTJ55VZ/?tag=wisdom047-20', category: 'storage' },
  { id: 8, name: 'Amber Glass Dropper Bottles', description: 'Vivaplex 12-Pack, Amber 2 oz Glass Bottles with Glass Eye Droppers', image: 'https://m.media-amazon.com/images/I/81rRou2X5qL._AC_SX679_.jpg', link: 'https://www.amazon.com/dp/B00V73OA6O/?tag=wisdom047-20', category: 'storage' },
  { id: 9, name: 'Dark Glass Bottles', description: '2-Pack 16oz Amber Glass Boston Round Bottles with Airtight Poly Cone Caps', image: 'https://m.media-amazon.com/images/I/610aqjvdtgL._AC_SX679_PIbundle-2,TopRight,0,0_SH20_.jpg', link: 'https://www.amazon.com/dp/B0BRPXLB8G/?tag=wisdom047-20', category: 'storage' },
  { id: 10, name: 'Glass Measuring Cups', description: 'Pyrex Essentials 3-Pack Glass Measuring Cups Set (1, 2 & 4 Cup)', image: 'https://m.media-amazon.com/images/I/71ygLu2o0OL._AC_SX679_.jpg', link: 'https://www.amazon.com/dp/B00M2J7PCI/?tag=wisdom047-20', category: 'storage' },
  { id: 11, name: 'Funnel Set', description: 'Walfos 3-Pack Stainless Steel Kitchen Funnels with 2 Removable Strainers', image: 'https://m.media-amazon.com/images/I/71zonNU7HQL._AC_SX679_.jpg', link: 'https://www.amazon.com/dp/B08D8TJ6BB/?tag=wisdom047-20', category: 'storage' },
  { id: 12, name: 'Labels & Waterproof Marker', description: 'ONUPGO 180-Pack Waterproof Chalkboard Labels with Liquid Chalk Marker', image: 'https://m.media-amazon.com/images/I/71tXF7YSF8L._AC_SX679_.jpg', link: 'https://www.amazon.com/dp/B07Z3S4D58/?tag=wisdom047-20', category: 'storage' },
  // Herbal Processing & Drying
  { id: 13, name: 'Herb Drying Rack', description: 'PROTITOUS 6-Tier Black Mesh Zippered Herb Drying Rack with Pruning Shear', image: 'https://m.media-amazon.com/images/I/8183QvskLfL._AC_SX679_.jpg', link: 'https://www.amazon.com/dp/B08BXK6XT7/?tag=wisdom047-20', category: 'drying' },
  { id: 14, name: 'Dehydrator', description: 'COSORI Food Dehydrator \u2013 6.5 ft\u00b2 Drying Space, Stainless Steel Trays, 600W', image: 'https://m.media-amazon.com/images/I/81Gik0nihuL._AC_SX679_.jpg', link: 'https://www.amazon.com/dp/B07PY5M579/?tag=wisdom047-20', category: 'drying' },
  { id: 15, name: 'Large Mixing Bowls', description: 'FineDine Stainless Steel Mixing Bowls Set, Dishwasher Safe, 6-Piece', image: 'https://m.media-amazon.com/images/I/714fYYsqu2L._AC_SY300_SX300_QL70_FMwebp_.jpg', link: 'https://www.amazon.com/dp/B01HTYH8YA/?tag=wisdom047-20', category: 'drying' },
  // Herbal Medicine Making
  { id: 16, name: 'Double Boiler', description: 'Farberware Classic Stainless Series 2-Quart Covered Double Boiler', image: 'https://m.media-amazon.com/images/I/61Xk6RCYfsL._AC_SY300_SX300_QL70_FMwebp_.jpg', link: 'https://www.amazon.com/dp/B00004RGB7/?tag=wisdom047-20', category: 'medicine' },
  { id: 17, name: 'Stainless Steel Pot', description: 'Kirecoo 8-Quart Stainless Steel Stock Pot, Heavy Duty, Induction Compatible', image: 'https://m.media-amazon.com/images/I/61lWm3ZTaEL._AC_SY300_SX300_QL70_FMwebp_.jpg', link: 'https://www.amazon.com/dp/B0D5GQGCRN/?tag=wisdom047-20', category: 'medicine' },
  { id: 18, name: 'Digital Scale', description: 'BOMATA Large Kitchen Scale \u2013 0.1g High Precision, 5kg/11lb, USB Rechargeable', image: 'https://m.media-amazon.com/images/I/71288VVfF6L._AC_SY300_SX300_QL70_FMwebp_.jpg', link: 'https://www.amazon.com/dp/B0C7162144/?tag=wisdom047-20', category: 'medicine' },
  { id: 19, name: 'Beeswax Pellets', description: 'White Beeswax Pellets 2LB \u2013 100% Pure, Triple Filtered, for Salves & Balms', image: 'https://m.media-amazon.com/images/I/61PGIIvz6UL._AC_SX300_SY300_QL70_FMwebp_.jpg', link: 'https://www.amazon.com/dp/B07NMNDT1W/?tag=wisdom047-20', category: 'medicine' },
  { id: 20, name: 'Herbal Journal / Notebook', description: 'My Apothecary Journal: A Herbalist Logbook to Track Herbal Recipes & Remedies', image: 'https://m.media-amazon.com/images/I/31RukasINsL._SY445_SX342_FMwebp_.jpg', link: 'https://www.amazon.com/dp/B0BQ9FWB7Q/?tag=wisdom047-20', category: 'medicine' },
];

// Best Reviewed Products - placeholder for your top picks
const bestReviewed: ReviewProduct[] = [
  {
    id: 101,
    name: 'Mortar and Pestle',
    rating: 5,
    image: 'https://m.media-amazon.com/images/I/61KQa4AiUlS._SX522_.jpg',
    link: 'https://amzn.to/4bpUujQ',
    review: 'The perfect tool for grinding fresh herbs. Heavy-duty stainless steel that will last a lifetime. A must-have for any herbalist!',
    badge: 'Best Overall',
  },
  {
    id: 102,
    name: 'COSORI Food Dehydrator',
    rating: 5,
    image: 'https://m.media-amazon.com/images/I/81Gik0nihuL._AC_SX679_.jpg',
    link: 'https://www.amazon.com/dp/B07PY5M579/?tag=wisdom047-20',
    review: 'Incredible for drying herbs at home. Consistent temperature control preserves the potency of your herbs perfectly.',
    badge: 'Best for Drying',
  },
  {
    id: 103,
    name: 'Amber Glass Dropper Bottles',
    rating: 5,
    image: 'https://m.media-amazon.com/images/I/81rRou2X5qL._AC_SX679_.jpg',
    link: 'https://www.amazon.com/dp/B00V73OA6O/?tag=wisdom047-20',
    review: 'Essential for storing tinctures and herbal extracts. The amber glass protects from UV light, and the droppers make dosing easy.',
    badge: 'Best for Tinctures',
  },
  {
    id: 104,
    name: 'My Apothecary Journal',
    rating: 5,
    image: 'https://m.media-amazon.com/images/I/31RukasINsL._SY445_SX342_FMwebp_.jpg',
    link: 'https://www.amazon.com/dp/B0BQ9FWB7Q/?tag=wisdom047-20',
    review: 'Track all your herbal recipes, remedies, and experiments in one beautiful journal. A great gift for any herbalist!',
    badge: 'Best Gift',
  },
];

const categoryLabels: Record<string, { label: string; emoji: string }> = {
  all: { label: 'All Tools', emoji: '' },
  preparation: { label: 'Herbal Preparation Tools', emoji: '' },
  storage: { label: 'Storage & Extraction', emoji: '' },
  drying: { label: 'Herbal Processing & Drying', emoji: '' },
  medicine: { label: 'Herbal Medicine Making', emoji: '' },
};

const HerbalTools: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedProducts = activeCategory === 'all'
    ? ['preparation', 'storage', 'drying', 'medicine'].map((cat) => ({
        category: cat,
        ...categoryLabels[cat],
        items: filteredProducts.filter((p) => p.category === cat),
      })).filter((g) => g.items.length > 0)
    : [{ category: activeCategory, ...categoryLabels[activeCategory], items: filteredProducts }];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="glass sticky top-0 z-10 py-4 px-4 sm:px-8 flex items-center justify-between">
        <Button variant="ghost" asChild className="p-2">
          <Link to="/">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </Button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-amber-300 flex items-center">
          Herbal Tools & Supplies
        </h1>
        <div className="w-10" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Banner */}
        <div className="rounded-2xl p-6 sm:p-10 mb-10 text-center bg-gradient-to-br from-green-700 to-emerald-800 dark:from-amber-900 dark:to-amber-800 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-amber-200 mb-3">
            Herbal Preparation Tools & Supplies
          </h2>
          <p className="text-green-100 dark:text-amber-300/80 max-w-2xl mx-auto mb-6">
            Everything you need to prepare, store, dry, and create your own herbal remedies at home.
            Hand-picked tools trusted by herbalists.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-green-200 dark:text-amber-400/70">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" />
              Trusted Products
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              Hand-Picked by Herbalists
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" />
              Amazon Affiliate Links
            </span>
          </div>
        </div>

        {/* Best Reviewed Products Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-amber-500" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-amber-200">
              Best Reviewed Products
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bestReviewed.map((product) => (
              <a
                key={product.id}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-amber-200 dark:border-amber-700/50"
              >
                {/* Badge */}
                <div className="absolute top-3 left-3 z-10 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {product.badge}
                </div>
                {/* Image */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 flex items-center justify-center h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-amber-200 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-amber-300/70 mb-3 line-clamp-3">
                    {product.review}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 dark:text-amber-400 group-hover:underline">
                    View on Amazon <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-green-200 dark:border-amber-700/30 mb-10" />

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tools & supplies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(categoryLabels).map(([key, { label }]) => (
              <Button
                key={key}
                size="sm"
                variant={activeCategory === key ? 'default' : 'outline'}
                className={`rounded-full ${
                  activeCategory === key
                    ? 'bg-green-600 hover:bg-green-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white'
                    : 'dark:border-amber-700/50 dark:text-amber-300'
                }`}
                onClick={() => setActiveCategory(key)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Sections */}
        {groupedProducts.map((group) => (
          <div key={group.category} className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 dark:text-amber-200 mb-4 pb-2 border-b-2 border-green-200 dark:border-amber-700/40">
              {group.label}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {group.items.map((product) => (
                <a
                  key={product.id}
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  {/* Image */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 flex items-center justify-center h-44 border-b border-gray-100 dark:border-gray-600">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-4 flex flex-col h-40">
                    <h4 className="font-bold text-gray-800 dark:text-amber-200 text-sm mb-1">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-amber-300/60 mb-3 line-clamp-2 flex-1">
                      {product.description}
                    </p>
                    <span className="inline-flex items-center justify-center gap-1 w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
                      Shop on Amazon <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-gray-300 dark:text-amber-700 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-amber-400/60">No tools found matching your search.</p>
          </div>
        )}

        {/* Affiliate Disclosure */}
        <div className="mt-12 p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl text-center">
          <p className="text-xs text-gray-400 dark:text-amber-500/50 max-w-2xl mx-auto">
            <strong>Affiliate Disclosure:</strong> As an Amazon Associate (Tag: wisdom047-20), Pure Herbal Wisdom earns
            from qualifying purchases. All products are sold and fulfilled by Amazon. Prices may vary.
            We only recommend products we believe in and that support your herbal journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HerbalTools;
