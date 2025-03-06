
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import MainNavigation from '@/components/MainNavigation';
import BlogPostList from '@/components/blog/BlogPostList';
import BlogHeader from '@/components/blog/BlogHeader';
import AddPostForm from '@/components/blog/AddPostForm';
import EditPostForm from '@/components/blog/EditPostForm';
import { BlogPost } from '@/types/blog';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const Blog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();
  const {
    posts,
    isLoading,
    isAddingPost,
    setIsAddingPost,
    editingPost,
    setEditingPost,
    newPost,
    setNewPost,
    handleCreatePost,
    handleUpdatePost,
    handleDeletePost,
  } = useBlogPosts();

  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Please log in to view the blog...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MainNavigation />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogHeader 
          onAddPost={() => setIsAddingPost(true)} 
          isAuthenticated={!!user}
          isAdmin={isAdmin}
        />

        {isAddingPost && isAdmin && (
          <AddPostForm
            newPost={newPost}
            setNewPost={setNewPost}
            isSubmitting={false}
            onCancel={() => {
              setIsAddingPost(false);
              setNewPost({
                title: '',
                content: '',
                excerpt: '',
              });
            }}
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await handleCreatePost(e);
                toast({
                  title: "Success!",
                  description: "Your post has been published.",
                });
              } catch (error) {
                toast({
                  variant: "destructive",
                  title: "Error",
                  description: "Failed to publish post. Please try again.",
                });
              }
            }}
          />
        )}

        {editingPost && isAdmin && (
          <EditPostForm
            post={editingPost}
            setEditingPost={setEditingPost}
            isSubmitting={false}
            onCancel={() => setEditingPost(null)}
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await handleUpdatePost(e);
                toast({
                  title: "Success!",
                  description: "Your post has been updated.",
                });
              } catch (error) {
                toast({
                  variant: "destructive",
                  title: "Error",
                  description: "Failed to update post. Please try again.",
                });
              }
            }}
          />
        )}

        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        ) : (
          <BlogPostList 
            posts={posts} 
            isAdmin={isAdmin}
            onEditClick={(post) => setEditingPost(post)}
            onDeleteClick={async (post) => {
              if (window.confirm("Are you sure you want to delete this post?")) {
                try {
                  await handleDeletePost(post);
                  toast({
                    title: "Success!",
                    description: "Your post has been deleted.",
                  });
                } catch (error) {
                  toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to delete post. Please try again.",
                  });
                }
              }
            }}
          />
        )}
      </div>

      <div className="mt-auto py-6 border-t border-gray-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Herb Guide Blog. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
