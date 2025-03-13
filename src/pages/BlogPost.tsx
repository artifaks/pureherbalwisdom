
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import MainNavigation from '@/components/MainNavigation';
import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft, Tag, Edit } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isAdmin } = useAuth();
  
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Get the blog post
        const { data: postData, error: postError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (postError) throw postError;
        
        if (postData) {
          // Get author username if not already set
          let authorName = postData.author;
          
          if (!authorName && postData.user_id) {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('username')
              .eq('id', postData.user_id)
              .single();
            
            authorName = profileData?.username;
          }
          
          setPost({
            id: postData.id,
            title: postData.title,
            content: postData.content,
            excerpt: postData.excerpt || undefined,
            author: authorName || undefined,
            created_at: postData.created_at,
            updated_at: postData.updated_at,
            user_id: postData.user_id,
            image_url: postData.image_url || undefined,
            tags: postData.tags || [],
            featured: postData.featured || false
          });
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);

  const goBack = () => navigate('/blog');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNavigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNavigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Button onClick={goBack} className="bg-amber-600 hover:bg-amber-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainNavigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            onClick={goBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
          
          {isAdmin && post && (
            <Link to={`/blog#admin-${post.id}`}>
              <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/20">
                <Edit className="h-4 w-4 mr-2" />
                Edit Post
              </Button>
            </Link>
          )}
        </div>
        
        <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
          {post.image_url && (
            <div className="w-full h-[400px] overflow-hidden">
              <img 
                src={post.image_url} 
                alt={post.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // If image fails to load, hide the container
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                }}
              />
            </div>
          )}
          <CardHeader className="pb-3">
            <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">{post.title}</CardTitle>
            <CardDescription className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 space-x-4">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.created_at ? (
                  format(new Date(post.created_at), 'MMMM dd, yyyy')
                ) : (
                  'Just now'
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
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </CardContent>
          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            <CardFooter className="flex flex-wrap gap-2 pt-4 pb-4 border-t border-gray-100 dark:border-gray-700">
              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400 mr-2">
                <Tag className="h-3 w-3 mr-1" />
                Tags:
              </span>
              {post.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30"
                >
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          )}
          <CardFooter className="bg-gray-50 dark:bg-gray-800 py-3 px-6 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {post.updated_at ? (
                formatDistanceToNow(new Date(post.updated_at), { addSuffix: true })
              ) : (
                formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
              )}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BlogPostPage;
