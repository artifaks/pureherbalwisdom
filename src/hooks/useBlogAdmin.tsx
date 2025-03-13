import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/types/blog';
import { useAuth } from './use-auth';
import { toast } from '@/components/ui/use-toast';

export function useBlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAdmin } = useAuth();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPosts(data || []);
    } catch (err: any) {
      console.error('Error fetching blog posts:', err);
      setError(err.message || 'Failed to fetch blog posts');
      toast({
        title: 'Error',
        description: 'Failed to load blog posts. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user || !isAdmin) {
      toast({
        title: 'Error',
        description: 'You do not have permission to create posts',
        variant: 'destructive',
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          ...post,
          user_id: user.id,
        }])
        .select();

      if (error) throw error;
      
      await fetchPosts();
      return data?.[0] || null;
    } catch (err: any) {
      console.error('Error creating blog post:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to create blog post',
        variant: 'destructive',
      });
      return null;
    }
  };

  const updatePost = async (id: string, updates: Partial<BlogPost>) => {
    if (!user || !isAdmin) {
      toast({
        title: 'Error',
        description: 'You do not have permission to update posts',
        variant: 'destructive',
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
      
      await fetchPosts();
      return true;
    } catch (err: any) {
      console.error('Error updating blog post:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to update blog post',
        variant: 'destructive',
      });
      return false;
    }
  };

  const deletePost = async (id: string) => {
    if (!user || !isAdmin) {
      toast({
        title: 'Error',
        description: 'You do not have permission to delete posts',
        variant: 'destructive',
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchPosts();
      return true;
    } catch (err: any) {
      console.error('Error deleting blog post:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to delete blog post',
        variant: 'destructive',
      });
      return false;
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    return updatePost(id, { featured });
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    toggleFeatured,
  };
}

export default useBlogAdmin;
