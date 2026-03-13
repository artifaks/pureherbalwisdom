import { allHerbs } from '@/data/allHerbs';

// Generate a URL-friendly slug from a title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Auto-generate excerpt from HTML content
export const generateExcerpt = (htmlContent: string, maxLength = 160): string => {
  // Strip HTML tags
  const text = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
};

// Extract herb names found in content and suggest as tags
export const extractHerbTags = (content: string): string[] => {
  const text = content.replace(/<[^>]*>/g, ' ').toLowerCase();
  const foundHerbs: string[] = [];

  // Sort herbs by name length (longest first) to match multi-word names first
  const sortedHerbs = [...allHerbs].sort((a, b) => b.name.length - a.name.length);

  for (const herb of sortedHerbs) {
    const herbNameLower = herb.name.toLowerCase();
    // Use word boundary matching to avoid partial matches
    const regex = new RegExp(`\\b${herbNameLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(text) && !foundHerbs.includes(herb.name)) {
      foundHerbs.push(herb.name);
    }
  }

  return foundHerbs.slice(0, 10); // Limit to 10 herb tags
};

// Auto-link herb names in HTML content to their herb detail pages + affiliate shop buttons
export const autoLinkHerbs = (htmlContent: string): string => {
  let processed = htmlContent;

  // Sort herbs by name length (longest first) to match multi-word names first
  const sortedHerbs = [...allHerbs].sort((a, b) => b.name.length - a.name.length);

  // Track which herbs we've already linked to avoid double-linking
  const linkedHerbs = new Set<string>();

  for (const herb of sortedHerbs) {
    if (linkedHerbs.has(herb.name.toLowerCase())) continue;

    const herbNameLower = herb.name.toLowerCase();
    const herbId = herb.id || herbNameLower.replace(/\s+/g, '-');
    const escapedName = herb.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Only link the first occurrence of each herb (not inside existing links or tags)
    // Match herb name that's NOT already inside an <a> tag
    const regex = new RegExp(
      `(?<!<a[^>]*>)(?<![\\w-])\\b(${escapedName})\\b(?![\\w-])(?![^<]*<\\/a>)`,
      'i'
    );

    if (regex.test(processed)) {
      processed = processed.replace(regex, (match) => {
        linkedHerbs.add(herbNameLower);
        return `<a href="/herb/${herbId}" class="text-amber-700 dark:text-amber-400 font-medium hover:underline" title="Learn about ${herb.name}">${match}</a>`;
      });
    }
  }

  return processed;
};

// Generate affiliate CTA section to append at the end of blog posts
export const generateAffiliateCTA = (herbNames: string[]): string => {
  if (herbNames.length === 0) return '';

  const herbLinks = herbNames.slice(0, 5).map(name => {
    const searchQuery = encodeURIComponent(name);
    const affiliateUrl = `https://www.awin1.com/cread.php?awinmid=87941&awinaffid=2668518&ued=https://www.starwest-botanicals.com/search/?search_query=${searchQuery}`;
    return `<a href="${affiliateUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition-colors no-underline">Shop ${name} &rarr;</a>`;
  });

  return `
    <div class="mt-10 p-6 bg-gradient-to-r from-amber-50 to-green-50 dark:from-amber-900/20 dark:to-green-900/20 rounded-xl border border-amber-200 dark:border-amber-800/30">
      <h3 class="text-xl font-bold text-amber-800 dark:text-amber-300 mb-2">Ready to Try These Herbs?</h3>
      <p class="text-gray-600 dark:text-gray-300 mb-4">Shop premium organic herbs from Starwest Botanicals, our trusted partner.</p>
      <div class="flex flex-wrap gap-3">
        ${herbLinks.join('\n        ')}
      </div>
      <p class="text-xs text-gray-400 mt-3">We may earn a commission from purchases made through these links.</p>
    </div>
  `;
};

// Process blog content: auto-link herbs and add affiliate CTA
export const processBlogContent = (htmlContent: string): string => {
  // First, auto-link herb names
  const linkedContent = autoLinkHerbs(htmlContent);

  // Extract herb names found in the content
  const herbNames = extractHerbTags(htmlContent);

  // Generate affiliate CTA section
  const affiliateCTA = generateAffiliateCTA(herbNames);

  return linkedContent + affiliateCTA;
};

// Suggest category tags based on content
export const suggestCategories = (content: string): string[] => {
  const text = content.toLowerCase();
  const categories: string[] = [];

  const categoryKeywords: Record<string, string[]> = {
    'Digestive Health': ['digestion', 'stomach', 'gut', 'bloating', 'nausea', 'digestive'],
    'Immune Support': ['immune', 'cold', 'flu', 'infection', 'antibacterial', 'antiviral'],
    'Stress & Anxiety': ['stress', 'anxiety', 'calm', 'relax', 'sleep', 'insomnia', 'nervous'],
    'Skin Care': ['skin', 'acne', 'eczema', 'rash', 'topical', 'complexion'],
    'Heart Health': ['heart', 'blood pressure', 'cholesterol', 'cardiovascular', 'circulation'],
    'Brain Health': ['brain', 'memory', 'focus', 'cognitive', 'concentration', 'mental'],
    "Women's Health": ['menstrual', 'pms', 'menopause', 'hormonal', 'fertility', 'pregnancy'],
    "Men's Health": ['prostate', 'testosterone', 'stamina', 'vitality'],
    'Anti-Inflammatory': ['inflammation', 'anti-inflammatory', 'pain', 'arthritis', 'joint'],
    'Herbal Tea': ['tea', 'brew', 'infusion', 'decoction', 'tisane'],
    'Tinctures': ['tincture', 'extract', 'alcohol-based', 'drops'],
    'Essential Oils': ['essential oil', 'aromatherapy', 'diffuser'],
  };

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(kw => text.includes(kw))) {
      categories.push(category);
    }
  }

  return categories;
};
