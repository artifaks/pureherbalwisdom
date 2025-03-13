import React, { useState, useEffect } from 'react';
import { BookOpen, File, Search, Filter } from 'lucide-react';
import MainNavigation from '@/components/MainNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Ebook, EbookCategory } from '@/types/ebook';
import { setupEbooksDatabase } from '@/utils/setupEbooksDatabase';

const Ebooks: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [showSetupGuide, setShowSetupGuide] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingUpDatabase, setIsSettingUpDatabase] = useState(true);

  // Check if the ebooks tables exist and run setup if needed
  useEffect(() => {
    const checkAndSetupDatabase = async () => {
      try {
        setIsLoading(true);
        setIsSettingUpDatabase(true);
        
        // Try to fetch from the ebook_categories table
        const { data, error } = await supabase
          .from('ebook_categories')
          .select('count')
          .limit(1);
        
        // If there's an error, the table might not exist
        if (error) {
          console.error('Error checking ebooks tables:', error);
          setShowSetupGuide(true);
          // Run the setup utility to notify the user
          await setupEbooksDatabase();
        } else {
          // If we successfully fetched data, the table exists
          setShowSetupGuide(false);
        }
      } catch (error) {
        console.error('Error checking ebooks tables:', error);
        setShowSetupGuide(true);
      } finally {
        setIsSettingUpDatabase(false);
        setIsLoading(false);
      }
    };

    checkAndSetupDatabase();
  }, []);

  // Fetch all ebooks and categories
  const { data: ebooks, isLoading: ebooksLoading } = useQuery({
    queryKey: ['ebooks-public'],
    queryFn: async () => {
      // For authenticated users, we can fetch all ebooks including premium ones
      // For unauthenticated users, we'll only get non-premium ebooks due to RLS
      const { data, error } = await supabase
        .from('ebooks')
        .select(`
          *,
          ebook_category_junction(
            category_id,
            ebook_categories(
              id,
              name
            )
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching ebooks:', error);
        toast({
          title: 'Error fetching ebooks',
          description: error.message,
          variant: 'destructive'
        });
        return [];
      }
      
      // Transform the data to include categories directly on the ebook
      return data.map(ebook => ({
        ...ebook,
        categories: ebook.ebook_category_junction
          ? ebook.ebook_category_junction
              .filter(junction => junction.ebook_categories)
              .map(junction => junction.ebook_categories)
          : []
      }));
    },
    enabled: !showSetupGuide && !isLoading
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['ebook-categories-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ebook_categories')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching ebook categories:', error);
        return [];
      }
      
      return data as EbookCategory[];
    },
    enabled: !showSetupGuide && !isLoading
  });

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  // Filter ebooks based on search term and category
  const filteredEbooks = ebooks?.filter(ebook => {
    // Filter by search term
    const matchesSearch = !searchTerm || 
      ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ebook.description && ebook.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ebook.author && ebook.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ebook.tags && ebook.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    // Filter by category
    const matchesCategory = !selectedCategory || 
      ebook.categories.some(category => category.id === selectedCategory);
    
    // Filter by premium status
    const matchesPremium = !showPremiumOnly || ebook.is_premium;
    
    return matchesSearch && matchesCategory && matchesPremium;
  });

  // Function to handle ebook download
  const handleDownload = async (ebook: Ebook) => {
    if (ebook.is_premium && !user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to download premium ebooks.',
        variant: 'default'
      });
      return;
    }
    
    try {
      // Get the download URL
      const { data, error } = await supabase.storage
        .from('ebooks')
        .createSignedUrl(ebook.file_url, 60); // 60 seconds expiry
      
      if (error) throw error;
      
      // Open the download URL in a new tab
      window.open(data.signedUrl, '_blank');
      
      toast({
        title: 'Download Started',
        description: `Your download of "${ebook.title}" has started.`,
        variant: 'default'
      });
    } catch (error) {
      console.error('Error downloading ebook:', error);
      toast({
        title: 'Download Failed',
        description: 'There was an error downloading the ebook. Please try again.',
        variant: 'destructive'
      });
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-amber-900">
        <MainNavigation />
        <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mb-4"></div>
          {isSettingUpDatabase ? (
            <>
              <p className="text-amber-800 dark:text-amber-300 text-lg">Checking ebooks database...</p>
              <p className="text-gray-600 dark:text-amber-200/70 mt-2 text-center max-w-md">
                This may take a moment. We're checking if the necessary database tables for the ebooks feature are set up.
              </p>
            </>
          ) : (
            <p className="text-amber-800 dark:text-amber-300 text-lg">Loading ebooks...</p>
          )}
        </div>
      </div>
    );
  }

  // Show setup guide if needed
  if (showSetupGuide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-amber-900">
        <MainNavigation />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white dark:bg-amber-900/40 rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-amber-800 dark:text-amber-300 mb-6 flex items-center">
              <BookOpen className="mr-3 h-8 w-8 text-amber-600 dark:text-amber-400" />
              E-Books Setup Guide
            </h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-4">
                The E-Books feature requires some additional setup to work properly. Follow these steps to enable it:
              </p>
              
              <h2 className="text-xl font-semibold text-amber-700 dark:text-amber-400 mt-6 mb-3">1. Run the Database Migration</h2>
              <p>Run the following command in your terminal to create the necessary database tables:</p>
              <pre className="bg-gray-100 dark:bg-amber-900/60 p-3 rounded overflow-x-auto mb-4">
                <code>npx supabase migration up</code>
              </pre>
              
              <h2 className="text-xl font-semibold text-amber-700 dark:text-amber-400 mt-6 mb-3">2. Create a Storage Bucket</h2>
              <p>In your Supabase dashboard, create a new storage bucket named "ebooks" with the following settings:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Bucket Name: <code>ebooks</code></li>
                <li>Public Access: Enabled (for cover images)</li>
                <li>Create two folders inside the bucket: <code>files</code> and <code>covers</code></li>
              </ul>
              
              <h2 className="text-xl font-semibold text-amber-700 dark:text-amber-400 mt-6 mb-3">3. Add Some E-Books</h2>
              <p>
                Once the database tables and storage bucket are set up, you can add e-books through the admin interface at <code>/ebooks/admin</code>.
                Only admin users can access this page.
              </p>
              
              <div className="bg-amber-50 dark:bg-amber-900/60 p-4 rounded-md mt-6">
                <h3 className="text-lg font-medium text-amber-800 dark:text-amber-300 mb-2">Need Help?</h3>
                <p className="text-amber-700 dark:text-amber-200">
                  If you're having trouble setting up the E-Books feature, please check the documentation or contact support.
                </p>
              </div>
              
              {isAdmin && (
                <div className="mt-8">
                  <Button 
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => window.location.href = '/ebooks/admin'}
                  >
                    Go to Admin Panel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display the actual ebooks
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-amber-900">
      <MainNavigation />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-800 dark:text-amber-300 flex items-center">
              <BookOpen className="mr-2 h-8 w-8 text-amber-600 dark:text-amber-400" />
              Herbal E-Books
            </h1>
            <p className="text-gray-600 dark:text-amber-200/70 mt-2">
              Discover our collection of herbal wisdom and knowledge
            </p>
          </div>
          
          {isAdmin && (
            <Button 
              className="mt-4 md:mt-0 bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => window.location.href = '/ebooks/admin'}
            >
              Manage E-Books
            </Button>
          )}
        </div>
        
        {/* Search and filter controls */}
        <div className="mb-8 bg-white dark:bg-amber-900/40 rounded-lg p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-amber-200/50 h-4 w-4" />
              <Input
                placeholder="Search ebooks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-amber-200 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-2">
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="rounded-md border border-amber-200 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100 px-3 py-2"
              >
                <option value="">All Categories</option>
                {categories?.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              
              {user && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="premium-only"
                    checked={showPremiumOnly}
                    onChange={(e) => setShowPremiumOnly(e.target.checked)}
                    className="rounded border-amber-300 dark:border-amber-700 text-amber-600"
                  />
                  <label htmlFor="premium-only" className="text-sm text-gray-700 dark:text-amber-200">
                    Premium Only
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {ebooksLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
          </div>
        ) : filteredEbooks && filteredEbooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEbooks.map((ebook) => (
              <div key={ebook.id} className="bg-white dark:bg-amber-900/40 border border-amber-100 dark:border-amber-800/50 rounded-lg p-4 h-full flex flex-col">
                <div className="bg-amber-50 dark:bg-amber-800/30 rounded-md h-40 mb-4 flex items-center justify-center overflow-hidden">
                  {ebook.cover_image_url ? (
                    <img 
                      src={ebook.cover_image_url} 
                      alt={ebook.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <File className="h-16 w-16 text-amber-300 dark:text-amber-700" />
                  )}
                </div>
                
                <div className="mb-2 flex items-center">
                  {ebook.is_premium && (
                    <span className="bg-amber-100 dark:bg-amber-800/50 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full text-xs font-medium mr-2">
                      Premium
                    </span>
                  )}
                  {ebook.price !== null && (
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs font-medium">
                      ${ebook.price.toFixed(2)}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300">{ebook.title}</h3>
                
                {ebook.author && (
                  <p className="text-sm text-gray-600 dark:text-amber-200/70 mt-1">By {ebook.author}</p>
                )}
                
                {ebook.categories && ebook.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {ebook.categories.map(category => (
                      <span 
                        key={category.id} 
                        className="text-xs bg-amber-50 dark:bg-amber-800/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="text-sm text-gray-500 dark:text-amber-200/50 mt-4 flex-grow line-clamp-3">
                  {ebook.description || 'No description available.'}
                </p>
                
                <div className="mt-4 pt-4 border-t border-amber-100 dark:border-amber-800/30">
                  <Button 
                    className={`w-full ${ebook.is_premium && !user 
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800/40 dark:hover:bg-gray-800/60 dark:text-gray-200' 
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-800/40 dark:hover:bg-amber-800/60 dark:text-amber-200'}`}
                    onClick={() => handleDownload(ebook)}
                    disabled={ebook.is_premium && !user}
                  >
                    {ebook.is_premium && !user ? 'Login to Download' : 'Download'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <File className="h-16 w-16 text-amber-300 dark:text-amber-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-300 mb-2">No ebooks found</h3>
            <p className="text-gray-600 dark:text-amber-200/70">
              {searchTerm || selectedCategory || showPremiumOnly
                ? 'Try adjusting your search filters'
                : 'Check back later for new ebooks'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ebooks;
