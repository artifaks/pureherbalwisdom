import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost as BlogPostType } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Tag, ArrowLeft, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        if (data) {
          setPost(data as BlogPostType);
        }
      } catch (err: any) {
        console.error('Error fetching blog post:', err);
        setError(err.message || 'Failed to load blog post');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const formattedDate = post?.created_at 
    ? format(new Date(post.created_at), 'MMMM dd, yyyy')
    : 'Recently published';

  const tags = post?.tags 
    ? (Array.isArray(post.tags) 
      ? post.tags 
      : typeof post.tags === 'string' 
        ? post.tags.split(',').map(tag => tag.trim()) 
        : [])
    : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <Card className="max-w-4xl mx-auto my-8 border-red-200 dark:border-red-800/50">
        <CardHeader className="bg-red-50 dark:bg-red-900/20">
          <CardTitle className="text-red-700 dark:text-red-300">Error</CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <p className="text-gray-700 dark:text-gray-300">{error || 'Blog post not found'}</p>
          <Button asChild className="mt-4">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      <div className="mb-6">
        <Button asChild variant="outline" className="mb-4">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
        
        {isAdmin && (
          <Link to={`/blog#admin-${post.id}`} className="ml-4">
            <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/20">
              Edit Post
            </Button>
          </Link>
        )}
      </div>

      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
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
        
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-6 gap-4">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formattedDate}
            </span>
            {post.author && (
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {post.author}
              </span>
            )}
          </div>
          
          <div className="prose dark:prose-invert max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400 mr-2">
                <Tag className="h-3 w-3 mr-1" />
                Tags:
              </span>
              {tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogPostDetail;
