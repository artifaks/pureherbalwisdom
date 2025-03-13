import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, Leaf, Coffee, Sparkles } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

// Sample featured articles with images and tags
const sampleFeaturedArticles = [
  {
    id: 'spring-cleansing',
    title: 'Top 5 Herbs for Spring Cleansing',
    excerpt: 'Discover the best herbs to detoxify your body and prepare for the new season with these powerful cleansing herbs.',
    image: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=800&q=80',
    tags: ['Detox', 'Seasonal', 'Cleansing'],
    icon: Leaf,
    iconColor: 'text-green-500 dark:text-green-400'
  },
  {
    id: 'herbal-tea',
    title: 'How to Brew the Perfect Herbal Tea',
    excerpt: 'Learn the art of brewing herbal teas to maximize their flavor and medicinal benefits with these expert techniques.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    tags: ['Tea', 'Brewing', 'Wellness'],
    icon: Coffee,
    iconColor: 'text-amber-600 dark:text-amber-500'
  },
  {
    id: 'chamomile-rituals',
    title: 'Stress Relief Rituals with Chamomile',
    excerpt: 'Incorporate chamomile into your daily routine with these calming rituals designed to reduce stress and promote relaxation.',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80',
    tags: ['Stress Relief', 'Chamomile', 'Rituals'],
    icon: Sparkles,
    iconColor: 'text-purple-500 dark:text-purple-400'
  }
];

interface FeaturedArticlesProps {
  blogPosts?: BlogPost[];
}

const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ blogPosts }) => {
  // If real blog posts are provided, use featured posts or first 3
  const featuredPosts = blogPosts && blogPosts.length > 0 
    ? (blogPosts
        // First try to get posts marked as featured
        .filter(post => post.featured)
        // If no featured posts, take the first 3 posts
        .length > 0 ? blogPosts.filter(post => post.featured).slice(0, 3) : blogPosts.slice(0, 3))
        .map((post, index) => ({
          ...post,
          // Use the post's image if available, otherwise use sample image
          image: post.image_url || sampleFeaturedArticles[index % 3].image,
          // Use post tags if available (and convert to array if it's a string)
          tags: post.tags 
            ? (Array.isArray(post.tags) 
                ? post.tags 
                : typeof post.tags === 'string' 
                  ? post.tags.split(',').map(tag => tag.trim()) 
                  : [])
            : sampleFeaturedArticles[index % 3].tags,
          icon: sampleFeaturedArticles[index % 3].icon,
          iconColor: sampleFeaturedArticles[index % 3].iconColor
        }))
    : sampleFeaturedArticles;

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-amber-600 dark:text-amber-400" />
          Featured Articles
        </h2>
        <Link to="/blog">
          <Button variant="link" className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">
            View all articles
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredPosts.map((post, index) => (
          <Card 
            key={post.id || index} 
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-amber-100 dark:border-amber-800/30 dark:bg-gray-800/50"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  // If image fails to load, use a fallback image
                  (e.target as HTMLImageElement).src = sampleFeaturedArticles[0].image;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag, i) => (
                    <Badge 
                      key={i} 
                      variant="secondary" 
                      className="bg-amber-100/80 text-amber-800 border-amber-200 dark:bg-amber-800/80 dark:text-amber-100 dark:border-amber-700"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex items-center">
                {React.createElement(post.icon, { className: `h-5 w-5 ${post.iconColor} mr-2` })}
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">{post.title}</CardTitle>
              </div>
              <CardDescription className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 space-x-4">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.created_at ? (
                    formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
                  ) : (
                    'Recently published'
                  )}
                </span>
                {post.author && (
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                {post.excerpt || (post.content && post.content.substring(0, 120) + '...')}
              </p>
            </CardContent>
            
            <CardFooter>
              <Link to={`/blog/${post.id}`}>
                <Button 
                  variant="outline" 
                  className="text-amber-600 border-amber-200 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-700/50 dark:hover:bg-amber-900/30"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArticles;
