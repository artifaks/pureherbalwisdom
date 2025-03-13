import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Leaf, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BlogHeroProps {
  onSearch: (query: string) => void;
}

const BlogHero: React.FC<BlogHeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-xl mb-12">
      <div className="absolute inset-0 bg-[url('/herb-pattern.png')] opacity-5"></div>
      <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-amber-800 dark:text-amber-300 sm:text-5xl mb-4">
            Herbal Wisdom, Naturally Shared
          </h1>
          <p className="mt-3 text-lg leading-8 text-gray-600 dark:text-amber-100 max-w-2xl mx-auto">
            Explore tips, stories, and research rooted in holistic healing.
          </p>
          
          <form onSubmit={handleSearch} className="mt-8 flex max-w-md mx-auto">
            <div className="relative flex-grow">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                className="block w-full rounded-l-md border-0 py-3 pl-10 text-gray-900 dark:text-white dark:bg-gray-800/50 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                placeholder="Search articles by topic, herb, or ailment…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              type="submit"
              className="rounded-l-none bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800"
            >
              Search
            </Button>
          </form>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              className="bg-white text-amber-700 border-amber-300 hover:bg-amber-50 dark:bg-gray-800 dark:text-amber-300 dark:border-amber-700/50 dark:hover:bg-gray-700/80"
              size="lg"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Browse All Articles
            </Button>
            <Button 
              className="bg-amber-700 text-white hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700"
              size="lg"
            >
              <Leaf className="mr-2 h-5 w-5" />
              Start with Herbal Basics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
