
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import MainNavigation from '@/components/MainNavigation';
import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          // Get author username
          const { data: profileData } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', postData.user_id)
            .single();
          
          setPost({
            id: postData.id,
            title: postData.title,
            content: postData.content,
            excerpt: postData.excerpt || undefined,
            author: profileData?.username || undefined,
            created_at: postData.created_at,
            updated_at: postData.updated_at,
            user_id: postData.user_id
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
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button 
          variant="outline" 
          onClick={goBack} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
        
        <Card className="overflow-hidden border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-3xl font-bold text-gray-800">{post.title}</CardTitle>
            <CardDescription className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.created_at ? (
                  formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
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
            <div className="prose max-w-none">
              {/* Split content by newlines and create paragraphs */}
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 py-3 px-6">
            <p className="text-sm text-gray-500">
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
