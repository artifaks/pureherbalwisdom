import React from 'react';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Search, Leaf, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NewBlog = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-xl mb-12">
          <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight text-amber-800 dark:text-amber-300 sm:text-5xl mb-4">
                Herbal Wisdom, Naturally Shared
              </h1>
              <p className="mt-3 text-lg leading-8 text-gray-600 dark:text-amber-100 max-w-2xl mx-auto">
                Explore tips, stories, and research rooted in holistic healing.
              </p>
              
              <form className="mt-8 flex max-w-md mx-auto">
                <div className="relative flex-grow">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    className="block w-full rounded-l-md border-0 py-3 pl-10 text-gray-900 dark:text-white dark:bg-gray-800/50 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                    placeholder="Search articles by topic, herb, or ailment…"
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
        
        {/* Featured Articles Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 flex items-center mb-8">
            Featured Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Article 1 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-amber-100 dark:border-amber-800/30 dark:bg-gray-800/50">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=800&q=80" 
                  alt="Spring Cleansing" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-amber-100/80 text-amber-800 border-amber-200 dark:bg-amber-800/80 dark:text-amber-100 dark:border-amber-700">
                      Detox
                    </Badge>
                    <Badge className="bg-amber-100/80 text-amber-800 border-amber-200 dark:bg-amber-800/80 dark:text-amber-100 dark:border-amber-700">
                      Seasonal
                    </Badge>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                  Top 5 Herbs for Spring Cleansing
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Discover the best herbs to detoxify your body and prepare for the new season with these powerful cleansing herbs.
                </p>
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="text-amber-600 border-amber-200 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-700/50 dark:hover:bg-amber-900/30"
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>

            {/* Article 2 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-amber-100 dark:border-amber-800/30 dark:bg-gray-800/50">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80" 
                  alt="Herbal Tea" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-amber-100/80 text-amber-800 border-amber-200 dark:bg-amber-800/80 dark:text-amber-100 dark:border-amber-700">
                      Tea
                    </Badge>
                    <Badge className="bg-amber-100/80 text-amber-800 border-amber-200 dark:bg-amber-800/80 dark:text-amber-100 dark:border-amber-700">
                      Brewing
                    </Badge>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                  How to Brew the Perfect Herbal Tea
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Learn the art of brewing herbal teas to maximize their flavor and medicinal benefits with these expert techniques.
                </p>
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="text-amber-600 border-amber-200 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-700/50 dark:hover:bg-amber-900/30"
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>

            {/* Article 3 */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-amber-100 dark:border-amber-800/30 dark:bg-gray-800/50">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80" 
                  alt="Chamomile Rituals" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-amber-100/80 text-amber-800 border-amber-200 dark:bg-amber-800/80 dark:text-amber-100 dark:border-amber-700">
                      Stress Relief
                    </Badge>
                    <Badge className="bg-amber-100/80 text-amber-800 border-amber-200 dark:bg-amber-800/80 dark:text-amber-100 dark:border-amber-700">
                      Chamomile
                    </Badge>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                  Stress Relief Rituals with Chamomile
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Incorporate chamomile into your daily routine with these calming rituals designed to reduce stress and promote relaxation.
                </p>
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="text-amber-600 border-amber-200 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-700/50 dark:hover:bg-amber-900/30"
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewBlog;
