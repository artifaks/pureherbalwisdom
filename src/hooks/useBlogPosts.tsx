
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { BlogPost } from '@/types/blog';
import { toast } from '@/components/ui/use-toast';

export const useBlogPosts = () => {
  const { user, isAdmin } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: '',
  });

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('Fetching blog posts...');
      
      // Get all blog posts
      const { data: blogPostsData, error: blogPostsError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (blogPostsError) {
        throw blogPostsError;
      }
      
      if (blogPostsData) {
        // Get all user profiles in a single query
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, username');
        
        // Create a map of user_id to username for quick lookup
        const userMap = new Map();
        if (profilesData) {
          profilesData.forEach(profile => {
            userMap.set(profile.id, profile.username);
          });
        }
        
        // Format posts with author info
        const postsWithAuthors = blogPostsData.map(post => ({
          id: post.id,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || undefined,
          author: userMap.get(post.user_id) || undefined,
          created_at: post.created_at,
          updated_at: post.updated_at,
          user_id: post.user_id
        } as BlogPost));
        
        setPosts(postsWithAuthors);
        console.log('Blog posts loaded:', postsWithAuthors.length);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !isAdmin) {
      console.error('You must be an admin to create a post');
      return;
    }
    
    try {
      console.log('Creating new blog post...');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          title: newPost.title,
          content: newPost.content,
          excerpt: newPost.excerpt || null,
          user_id: user.id
        }])
        .select();
      
      if (error) {
        throw error;
      }
      
      console.log('Blog post created:', data);
      
      // Reset form and refresh posts
      setNewPost({
        title: '',
        content: '',
        excerpt: '',
      });
      setIsAddingPost(false);
      
      // Refresh posts
      fetchPosts();
      
      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });
    } catch (error: any) {
      console.error('Error creating blog post:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create blog post",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !isAdmin || !editingPost) {
      console.error('Invalid state for updating post');
      return;
    }
    
    try {
      console.log('Updating blog post:', editingPost.id);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          title: editingPost.title,
          content: editingPost.content,
          excerpt: editingPost.excerpt || null
        })
        .eq('id', editingPost.id)
        .select();
      
      if (error) {
        throw error;
      }
      
      console.log('Blog post updated:', data);
      
      // Reset form and refresh posts
      setEditingPost(null);
      
      // Refresh posts
      fetchPosts();
      
      toast({
        title: "Success",
        description: "Blog post updated successfully!",
      });
    } catch (error: any) {
      console.error('Error updating blog post:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update blog post",
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (post: BlogPost) => {
    if (!user || !isAdmin) {
      console.error('You must be an admin to delete a post');
      return;
    }
    
    try {
      console.log('Deleting blog post:', post.id);
      
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', post.id);
      
      if (error) {
        throw error;
      }
      
      console.log('Blog post deleted');
      
      // Refresh posts
      fetchPosts();
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully!",
      });
    } catch (error: any) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  return {
    posts,
    isLoading,
    isAddingPost,
    setIsAddingPost,
    editingPost,
    setEditingPost,
    newPost,
    setNewPost,
    fetchPosts,
    handleCreatePost,
    handleUpdatePost,
    handleDeletePost
  };
};
