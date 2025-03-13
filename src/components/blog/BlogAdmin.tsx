import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PenLine, Plus, Trash2, Save, X, FileText, Edit3, UploadCloud } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import ImageUploader from './ImageUploader';

interface BlogAdminProps {
  posts: BlogPost[];
  onPostsChange: () => void;
}

const BlogAdmin: React.FC<BlogAdminProps> = ({ posts, onPostsChange }) => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('view');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    image_url: '',
    tags: '',
  });
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  if (!user || !isAdmin) {
    return null;
  }

  const resetForm = () => {
    setNewPost({
      title: '',
      content: '',
      excerpt: '',
      image_url: '',
      tags: '',
    });
    setEditingPost(null);
    setIsCreating(false);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([
          {
            title: newPost.title,
            content: newPost.content,
            excerpt: newPost.excerpt || newPost.content.substring(0, 150) + '...',
            image_url: newPost.image_url,
            tags: newPost.tags.split(',').map(tag => tag.trim()),
            user_id: user.id,
          },
        ])
        .select();
      
      if (error) throw error;
      
      toast({
        title: 'Success!',
        description: 'Your blog post has been created.',
        variant: 'default',
      });
      
      resetForm();
      onPostsChange();
      setActiveTab('view');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create blog post',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !user) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: editingPost.title,
          content: editingPost.content,
          excerpt: editingPost.excerpt || editingPost.content.substring(0, 150) + '...',
          image_url: editingPost.image_url || '',
          tags: typeof editingPost.tags === 'string' 
            ? editingPost.tags.split(',').map(tag => tag.trim())
            : editingPost.tags || [],
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingPost.id);
      
      if (error) throw error;
      
      toast({
        title: 'Success!',
        description: 'Your blog post has been updated.',
        variant: 'default',
      });
      
      resetForm();
      onPostsChange();
      setActiveTab('view');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update blog post',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postToDelete.id);
      
      if (error) throw error;
      
      toast({
        title: 'Success!',
        description: 'Blog post has been deleted.',
        variant: 'default',
      });
      
      setPostToDelete(null);
      onPostsChange();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete blog post',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="mb-10 border-amber-200 dark:border-amber-800/50">
      <CardHeader className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-100 dark:border-amber-800/30 rounded-t-lg">
        <CardTitle className="text-xl font-semibold text-amber-800 dark:text-amber-300 flex items-center">
          <PenLine className="mr-2 h-5 w-5 text-amber-600 dark:text-amber-400" />
          Blog Management
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full rounded-none border-b border-amber-100 dark:border-amber-800/30 bg-amber-50/50 dark:bg-amber-900/10">
            <TabsTrigger 
              value="view" 
              className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-300"
            >
              <FileText className="mr-2 h-4 w-4" />
              View Posts
            </TabsTrigger>
            <TabsTrigger 
              value="create" 
              className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-300"
              onClick={() => {
                setIsCreating(true);
                setEditingPost(null);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="view" className="p-4">
            {posts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">No blog posts yet.</p>
                <Button 
                  onClick={() => {
                    setActiveTab('create');
                    setIsCreating(true);
                  }}
                  className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Post
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div 
                    key={post.id} 
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow flex justify-between items-start"
                  >
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white">{post.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Recently created'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingPost({
                            ...post,
                            image_url: post.image_url || '',
                            tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || '')
                          });
                          setIsCreating(false);
                          setActiveTab('create');
                        }}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800/30 dark:hover:bg-blue-900/20"
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPostToDelete(post)}
                          className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800/30 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="create" className="p-6">
            <form onSubmit={isCreating ? handleCreatePost : handleUpdatePost}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={isCreating ? newPost.title : (editingPost?.title || '')}
                    onChange={(e) => isCreating 
                      ? setNewPost({...newPost, title: e.target.value})
                      : setEditingPost(prev => prev ? {...prev, title: e.target.value} : null)
                    }
                    placeholder="Enter post title"
                    required
                    className="border-amber-200 focus:border-amber-400 dark:border-amber-800/50 dark:focus:border-amber-700"
                  />
                </div>
                
                <div>
                  <Label htmlFor="excerpt">Excerpt (optional)</Label>
                  <Input
                    id="excerpt"
                    value={isCreating ? newPost.excerpt : (editingPost?.excerpt || '')}
                    onChange={(e) => isCreating 
                      ? setNewPost({...newPost, excerpt: e.target.value})
                      : setEditingPost(prev => prev ? {...prev, excerpt: e.target.value} : null)
                    }
                    placeholder="Brief summary of your post"
                    className="border-amber-200 focus:border-amber-400 dark:border-amber-800/50 dark:focus:border-amber-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="image_upload" className="flex items-center">
                      <UploadCloud className="h-4 w-4 mr-2" />
                      Featured Image
                    </Label>
                    {(isCreating ? newPost.image_url : (editingPost?.image_url)) && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        className="text-xs text-red-500 hover:text-red-700"
                        onClick={() => {
                          if (isCreating) {
                            setNewPost({...newPost, image_url: ''});
                          } else {
                            setEditingPost(prev => prev ? {...prev, image_url: ''} : null);
                          }
                        }}
                      >
                        <X className="h-3 w-3 mr-1" /> Clear URL
                      </Button>
                    )}
                  </div>
                  
                  <div className="border border-amber-200 dark:border-amber-800/50 rounded-md p-4 bg-amber-50/30 dark:bg-amber-900/10">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <ImageUploader 
                            onImageUploaded={(url) => {
                              if (isCreating) {
                                setNewPost({...newPost, image_url: url});
                              } else {
                                setEditingPost(prev => prev ? {...prev, image_url: url} : null);
                              }
                            }}
                            existingImageUrl={isCreating ? newPost.image_url : (editingPost?.image_url || '')}
                          />
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400">URL:</span>
                        </div>
                        <Input
                          id="image_url"
                          value={isCreating ? newPost.image_url : (editingPost?.image_url || '')}
                          onChange={(e) => isCreating 
                            ? setNewPost({...newPost, image_url: e.target.value})
                            : setEditingPost(prev => prev ? {...prev, image_url: e.target.value} : null)
                          }
                          placeholder="Or enter image URL manually"
                          className="pl-16 border-amber-200 focus:border-amber-400 dark:border-amber-800/50 dark:focus:border-amber-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={isCreating ? newPost.tags : (
                      typeof editingPost?.tags === 'string' 
                        ? editingPost.tags 
                        : Array.isArray(editingPost?.tags) 
                          ? editingPost.tags.join(', ') 
                          : ''
                    )}
                    onChange={(e) => isCreating 
                      ? setNewPost({...newPost, tags: e.target.value})
                      : setEditingPost(prev => prev ? {...prev, tags: e.target.value} : null)
                    }
                    placeholder="Herbal, Wellness, Tips"
                    className="border-amber-200 focus:border-amber-400 dark:border-amber-800/50 dark:focus:border-amber-700"
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={isCreating ? newPost.content : (editingPost?.content || '')}
                    onChange={(e) => isCreating 
                      ? setNewPost({...newPost, content: e.target.value})
                      : setEditingPost(prev => prev ? {...prev, content: e.target.value} : null)
                    }
                    placeholder="Write your blog post content here..."
                    required
                    className="min-h-[200px] border-amber-200 focus:border-amber-400 dark:border-amber-800/50 dark:focus:border-amber-700"
                  />
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setActiveTab('view');
                    }}
                    disabled={isSubmitting}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800/50"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-700 dark:hover:bg-amber-800"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Saving...
                      </div>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {isCreating ? 'Create Post' : 'Update Post'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!postToDelete} onOpenChange={(open) => !open && setPostToDelete(null)}>
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
              onClick={handleDeletePost}
              className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default BlogAdmin;
