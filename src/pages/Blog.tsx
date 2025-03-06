
import React, { useState } from 'react';
import MainNavigation from '@/components/MainNavigation';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogPostList from '@/components/blog/BlogPostList';
import AddPostForm from '@/components/blog/AddPostForm';
import EditPostForm from '@/components/blog/EditPostForm';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useAuth } from '@/hooks/use-auth';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { BlogPost } from '@/types/blog';

const Blog = () => {
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
    handleDeletePost
  } = useBlogPosts();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  const handleSubmitCreate = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    try {
      await handleCreatePost(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    try {
      await handleUpdatePost(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      await handleDeletePost(postToDelete);
      setPostToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogHeader 
          onAddPost={() => setIsAddingPost(true)} 
          isAuthenticated={!!user}
          isAdmin={isAdmin}
        />

        {isAddingPost && (
          <AddPostForm
            newPost={newPost}
            setNewPost={setNewPost}
            isSubmitting={isSubmitting}
            onCancel={() => setIsAddingPost(false)}
            onSubmit={handleSubmitCreate}
          />
        )}

        {editingPost && (
          <EditPostForm
            post={editingPost}
            setEditingPost={setEditingPost}
            isSubmitting={isSubmitting}
            onCancel={() => setEditingPost(null)}
            onSubmit={handleSubmitUpdate}
          />
        )}

        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <BlogPostList 
            posts={posts} 
            isAdmin={isAdmin}
            onEditClick={(post) => setEditingPost(post)}
            onDeleteClick={(post) => setPostToDelete(post)}
          />
        )}
      </div>

      <AlertDialog open={!!postToDelete} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the blog post "{postToDelete?.title}". 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Blog;
