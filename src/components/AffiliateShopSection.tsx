import React from 'react';
import { ShoppingBag, Search, ShieldCheck, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AffiliateShopSectionProps {
  herbName: string;
}

const AWIN_AFFILIATE_ID = '2668518';
const AWIN_MERCHANT_ID = '87941';
const STARWEST_BASE_URL = 'https://www.starwest-botanicals.com';

function buildAwinLink(destinationUrl: string): string {
  const encoded = encodeURIComponent(destinationUrl);
  return `https://www.awin1.com/cread.php?awinmid=${AWIN_MERCHANT_ID}&awinaffid=${AWIN_AFFILIATE_ID}&ued=${encoded}`;
}

const AffiliateShopSection: React.FC<AffiliateShopSectionProps> = ({ herbName }) => {
  const searchUrl = `${STARWEST_BASE_URL}/search/?search_query=${encodeURIComponent(herbName)}`;
  const shopLink = buildAwinLink(searchUrl);
  const compareLink = buildAwinLink(`${STARWEST_BASE_URL}/herbs-and-spices/`);

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 mb-8 border border-green-200 dark:border-amber-700/50 bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-teal-50/40 dark:from-amber-950/40 dark:via-amber-900/30 dark:to-amber-950/20">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-amber-200 mb-2">
          Ready to Try {herbName}?
        </h2>
        <p className="text-gray-600 dark:text-amber-300/80 max-w-xl mx-auto">
          Shop organic, ethically-sourced {herbName} from trusted vendors. Compare prices and read verified reviews.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <Button
          asChild
          size="lg"
          className="bg-green-600 hover:bg-green-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-semibold rounded-full px-8"
        >
          <a href={shopLink} target="_blank" rel="noopener noreferrer">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Shop {herbName}
            <ExternalLink className="h-4 w-4 ml-2 opacity-70" />
          </a>
        </Button>

        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-green-300 text-green-700 hover:bg-green-50 dark:border-amber-600 dark:text-amber-300 dark:hover:bg-amber-800/30 rounded-full px-8"
        >
          <a href={compareLink} target="_blank" rel="noopener noreferrer">
            <Search className="h-5 w-5 mr-2" />
            Compare Products
            <ExternalLink className="h-4 w-4 ml-2 opacity-70" />
          </a>
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-amber-400/70">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-4 w-4 text-green-500 dark:text-amber-500" />
          Verified quality
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-4 w-4 text-green-500 dark:text-amber-500" />
          Best prices
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-4 w-4 text-green-500 dark:text-amber-500" />
          Secure checkout
        </span>
      </div>

      <p className="text-xs text-gray-400 dark:text-amber-500/50 text-center mt-4">
        As an affiliate, we may earn a commission from qualifying purchases at no extra cost to you.
      </p>
    </div>
  );
};

export default AffiliateShopSection;
