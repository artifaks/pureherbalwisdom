import React, { useState } from 'react';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedArticles from '@/components/blog/FeaturedArticles';
import BlogPostList from '@/components/blog/BlogPostList';
import BlogAdmin from '@/components/blog/BlogAdmin';
import { useSearchBlogPosts } from '@/hooks/useSearchBlogPosts';
import useBlogAdmin from '@/hooks/useBlogAdmin';
import { useAuth } from '@/hooks/use-auth';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { BlogPost } from '@/types/blog';
import { Helmet } from 'react-helmet';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EnhancedBlog = () => {
  const { user, isAdmin } = useAuth();
  const {
    posts,
    loading: isLoading,
    fetchPosts,
  } = useBlogAdmin();
  
  const {
    searchQuery,
    searchResults,
    isSearching,
    hasSearched,
    searchPosts,
    clearSearch
  } = useSearchBlogPosts(posts);

  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  const confirmDelete = async () => {
    if (postToDelete) {
      // This is handled by the BlogAdmin component now
      setPostToDelete(null);
    }
  };

  const handleSearch = (query: string) => {
    searchPosts(query);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine which posts to display
  const displayedPosts = hasSearched ? searchResults : posts;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Herb Guide Blog | Herbal Wisdom, Naturally Shared</title>
        <meta name="description" content="Explore tips, stories, and research rooted in holistic healing. Learn about herbs, natural remedies, and traditional plant medicine." />
        <meta name="keywords" content="herbal blog, herb guide, natural remedies, holistic healing, medicinal plants, herbal wisdom" />
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Herb Guide Blog | Herbal Wisdom, Naturally Shared" />
        <meta property="og:description" content="Explore tips, stories, and research rooted in holistic healing. Learn about herbs, natural remedies, and traditional plant medicine." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://herbharmonyvisualizer.com/blog" />
        <meta property="og:image" content="https://herbharmonyvisualizer.com/og-image-blog.jpg" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Herb Guide Blog | Herbal Wisdom, Naturally Shared" />
        <meta name="twitter:description" content="Explore tips, stories, and research rooted in holistic healing. Learn about herbs, natural remedies, and traditional plant medicine." />
        <meta name="twitter:image" content="https://herbharmonyvisualizer.com/twitter-image-blog.jpg" />
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "headline": "Herb Guide Blog | Herbal Wisdom, Naturally Shared",
              "description": "Explore tips, stories, and research rooted in holistic healing. Learn about herbs, natural remedies, and traditional plant medicine.",
              "url": "https://herbharmonyvisualizer.com/blog",
              "publisher": {
                "@type": "Organization",
                "name": "Herb Harmony Visualizer",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://herbharmonyvisualizer.com/logo.png"
                }
              }
            }
          `}
        </script>
      </Helmet>

      <MainNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <BlogHero onSearch={handleSearch} />
        
        {/* Search Results Notice */}
        {hasSearched && (
          <div className="mb-8 flex items-center justify-between bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800/30">
            <div className="flex items-center">
              <Search className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
              <p className="text-gray-700 dark:text-amber-100">
                {isSearching ? (
                  'Searching...'
                ) : (
                  searchResults.length > 0 ? (
                    `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'} for "${searchQuery}"`
                  ) : (
                    `No results found for "${searchQuery}"`
                  )
                )}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearSearch}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Search
            </Button>
          </div>
        )}
        
        {/* Admin Section */}
        {isAdmin && (
          <BlogAdmin posts={posts} onPostsChange={fetchPosts} />
        )}
        
        {/* Featured Articles Section - Only show when not searching */}
        {!hasSearched && !isLoading && (
          <FeaturedArticles blogPosts={posts} />
        )}
        
        {/* Blog Post List */}
        <div id="blog-posts" className="scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-amber-300 mb-6">
            {hasSearched ? 'Search Results' : 'All Articles'}
          </h2>
          
          {isLoading || isSearching ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
          ) : (
            <BlogPostList 
              posts={displayedPosts} 
              isAdmin={isAdmin}
              isAuthenticated={!!user}
            />
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!postToDelete} onOpenChange={() => setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post
              and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EnhancedBlog;
