
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sun, ArrowRight, Sparkles } from 'lucide-react';
import { allHerbs } from '@/data/allHerbs';
import CategoryIcon from './CategoryIcon';
import { getCategoryColor } from '@/utils/herbIcons';
import { Button } from '@/components/ui/button';

const HerbOfTheDay: React.FC = () => {
  const todaysHerb = useMemo(() => {
    const dayIndex = Math.floor(Date.now() / 86400000) % allHerbs.length;
    return allHerbs[dayIndex];
  }, []);

  if (!todaysHerb) return null;

  const categoryColor = getCategoryColor(todaysHerb.category);
  const categoryLabel = todaysHerb.category === 'heart' ? 'Heart Health' :
    todaysHerb.category === 'stomach' ? 'Digestive' :
    todaysHerb.category === 'mens' ? "Men's Health" :
    todaysHerb.category === 'womens' ? "Women's Health" :
    todaysHerb.category === 'brain' ? 'Brain & Focus' : 'Herbal Tea';

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/30 shadow-lg">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 dark:bg-amber-600/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200/20 dark:bg-orange-600/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-800/40 px-3 py-1.5 rounded-full">
              <Sun className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">Herb of the Day</span>
            </div>
            <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Herb Info */}
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-amber-200 mb-2">
                {todaysHerb.name}
              </h3>

              {/* Category Badge */}
              <div className="flex items-center gap-1.5 mb-4">
                <CategoryIcon category={todaysHerb.category} size={14} />
                <span className="text-sm font-medium" style={{ color: categoryColor }}>
                  {categoryLabel}
                </span>
              </div>

              {/* Benefits */}
              {todaysHerb.benefits && todaysHerb.benefits.length > 0 && (
                <div className="space-y-2 mb-5">
                  {todaysHerb.benefits.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">{benefit}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              <Link to={`/herbs/${todaysHerb.id}`}>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg transition-all">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Visual Element */}
            <div
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl flex items-center justify-center shadow-inner flex-shrink-0"
              style={{ backgroundColor: `${todaysHerb.color}20`, borderColor: `${todaysHerb.color}40`, borderWidth: '2px' }}
            >
              <span className="text-4xl sm:text-5xl">🌿</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HerbOfTheDay;
