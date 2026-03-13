import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PenLine, Plus, Trash2, Save, X, FileText, Edit3, UploadCloud, Wand2, Eye, Code, ClipboardPaste, Tag, Sparkles } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import ImageUploader from './ImageUploader';
import { generateSlug, generateExcerpt, extractHerbTags, suggestCategories } from '@/utils/blogUtils';

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
  const [contentMode, setContentMode] = useState<'visual' | 'html'>('html');
  const [showPreview, setShowPreview] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    image_url: '',
    tags: '',
    meta_title: '',
    meta_description: '',
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
      meta_title: '',
      meta_description: '',
    });
    setEditingPost(null);
    setIsCreating(false);
    setSuggestedTags([]);
    setShowPreview(false);
  };

  // Auto-fill everything when content is pasted
  const handleContentChange = (content: string) => {
    if (isCreating) {
      const updates: any = { ...newPost, content };

      // Auto-generate excerpt if empty
      if (!newPost.excerpt) {
        updates.excerpt = generateExcerpt(content);
      }

      // Auto-suggest tags from herbs found in content
      const herbTags = extractHerbTags(content);
      const categoryTags = suggestCategories(content);
      const allSuggested = [...new Set([...herbTags, ...categoryTags])];
      setSuggestedTags(allSuggested);

      // Auto-fill tags if empty
      if (!newPost.tags && allSuggested.length > 0) {
        updates.tags = allSuggested.slice(0, 8).join(', ');
      }

      setNewPost(updates);
    } else {
      setEditingPost(prev => prev ? { ...prev, content } : null);
    }
  };

  // Auto-generate meta when title changes
  const handleTitleChange = (title: string) => {
    if (isCreating) {
      const updates: any = { ...newPost, title };
      // Auto-generate meta title
      if (!newPost.meta_title) {
        updates.meta_title = `${title} | Pure Herbal Wisdom`;
      }
      setNewPost(updates);
    } else {
      setEditingPost(prev => prev ? { ...prev, title } : null);
    }
  };

  // Add suggested tag to the tags field
  const addSuggestedTag = (tag: string) => {
    const currentTags = isCreating ? newPost.tags : (typeof editingPost?.tags === 'string' ? editingPost.tags : '');
    const tagsArray = currentTags.split(',').map(t => t.trim()).filter(Boolean);
    if (!tagsArray.includes(tag)) {
      const newTags = [...tagsArray, tag].join(', ');
      if (isCreating) {
        setNewPost({ ...newPost, tags: newTags });
      } else {
        setEditingPost(prev => prev ? { ...prev, tags: newTags } : null);
      }
    }
  };

  // Handle paste from SEOWriting (accepts HTML)
  const handlePasteFromSEOWriting = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        // Try to get HTML first (SEOWriting copies HTML)
        if (item.types.includes('text/html')) {
          const blob = await item.getType('text/html');
          const html = await blob.text();
          handleContentChange(html);
          toast({
            title: 'Content pasted!',
            description: 'HTML content from SEOWriting has been imported. Excerpt and tags auto-generated.',
          });
          return;
        }
        // Fallback to plain text
        if (item.types.includes('text/plain')) {
          const blob = await item.getType('text/plain');
          const text = await blob.text();
          handleContentChange(text);
          toast({
            title: 'Content pasted!',
            description: 'Text content has been imported.',
          });
          return;
        }
      }
    } catch {
      // Fallback: use basic clipboard API
      try {
        const text = await navigator.clipboard.readText();
        handleContentChange(text);
        toast({
          title: 'Content pasted!',
          description: 'Content has been imported from clipboard.',
        });
      } catch {
        toast({
          title: 'Paste failed',
          description: 'Please paste content directly into the content field.',
          variant: 'destructive',
        });
      }
    }
  };

  // Auto-fill all empty fields
  const handleAutoFill = () => {
    const content = isCreating ? newPost.content : (editingPost?.content || '');
    const title = isCreating ? newPost.title : (editingPost?.title || '');

    if (!content) {
      toast({ title: 'No content', description: 'Paste your content first, then click Auto-Fill.', variant: 'destructive' });
      return;
    }

    const excerpt = generateExcerpt(content);
    const herbTags = extractHerbTags(content);
    const categoryTags = suggestCategories(content);
    const allTags = [...new Set([...herbTags, ...categoryTags])].slice(0, 8);
    const metaTitle = title ? `${title} | Pure Herbal Wisdom` : '';
    const metaDesc = excerpt;

    if (isCreating) {
      setNewPost(prev => ({
        ...prev,
        excerpt: prev.excerpt || excerpt,
        tags: prev.tags || allTags.join(', '),
        meta_title: prev.meta_title || metaTitle,
        meta_description: prev.meta_description || metaDesc,
      }));
    } else {
      setEditingPost(prev => prev ? {
        ...prev,
        excerpt: prev.excerpt || excerpt,
        tags: prev.tags || allTags.join(', '),
        meta_title: prev.meta_title || metaTitle,
        meta_description: prev.meta_description || metaDesc,
      } : null);
    }

    setSuggestedTags(allTags);

    toast({
      title: 'Auto-filled!',
      description: `Generated excerpt, ${allTags.length} tags, and SEO meta data.`,
    });
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    try {
      const slug = generateSlug(newPost.title);
      const excerpt = newPost.excerpt || generateExcerpt(newPost.content);
      const tags = newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean);

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          title: newPost.title,
          content: newPost.content,
          excerpt,
          image_url: newPost.image_url || null,
          tags,
          user_id: user.id,
          author: 'Pure Herbal Wisdom',
        }])
        .select();

      if (error) throw error;

      toast({
        title: 'Published!',
        description: 'Your blog post is now live.',
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
      const tags = typeof editingPost.tags === 'string'
        ? editingPost.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : editingPost.tags || [];

      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: editingPost.title,
          content: editingPost.content,
          excerpt: editingPost.excerpt || generateExcerpt(editingPost.content),
          image_url: editingPost.image_url || null,
          tags,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingPost.id);

      if (error) throw error;

      toast({
        title: 'Updated!',
        description: 'Blog post has been updated.',
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
        title: 'Deleted',
        description: 'Blog post has been removed.',
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

  const currentContent = isCreating ? newPost.content : (editingPost?.content || '');
  const currentTags = isCreating ? newPost.tags : (
    typeof editingPost?.tags === 'string' ? editingPost.tags : Array.isArray(editingPost?.tags) ? editingPost.tags.join(', ') : ''
  );

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
              View Posts ({posts.length})
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
              {editingPost ? 'Edit Post' : 'Create Post'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="p-4">
            {posts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">No blog posts yet.</p>
                <Button
                  onClick={() => { setActiveTab('create'); setIsCreating(true); }}
                  className="bg-amber-600 hover:bg-amber-700"
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
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 dark:text-white">{post.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Recently created'}
                        {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                          <span className="ml-2">
                            {post.tags.slice(0, 3).map((tag, i) => (
                              <Badge key={i} variant="outline" className="ml-1 text-xs bg-amber-50 text-amber-600 border-amber-200">
                                {tag}
                              </Badge>
                            ))}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
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
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPostToDelete(post)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="create" className="p-6">
            {/* Quick Actions Bar */}
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-amber-50 dark:from-green-900/20 dark:to-amber-900/20 rounded-lg border border-green-200 dark:border-green-800/30">
              <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Quick Actions — Paste from SEOWriting, auto-fill everything
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePasteFromSEOWriting}
                  className="bg-white dark:bg-gray-800 border-green-300 text-green-700 hover:bg-green-50"
                >
                  <ClipboardPaste className="h-4 w-4 mr-1" />
                  Paste from SEOWriting
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAutoFill}
                  className="bg-white dark:bg-gray-800 border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <Wand2 className="h-4 w-4 mr-1" />
                  Auto-Fill All Fields
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="bg-white dark:bg-gray-800"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </Button>
              </div>
            </div>

            <form onSubmit={isCreating ? handleCreatePost : handleUpdatePost}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={isCreating ? newPost.title : (editingPost?.title || '')}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title"
                    required
                    className="border-amber-200 focus:border-amber-400 dark:border-amber-800/50"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt (auto-generated from content)</Label>
                  <Input
                    id="excerpt"
                    value={isCreating ? newPost.excerpt : (editingPost?.excerpt || '')}
                    onChange={(e) => isCreating
                      ? setNewPost({ ...newPost, excerpt: e.target.value })
                      : setEditingPost(prev => prev ? { ...prev, excerpt: e.target.value } : null)
                    }
                    placeholder="Auto-generated when you paste content"
                    className="border-amber-200 focus:border-amber-400 dark:border-amber-800/50"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center">
                      <UploadCloud className="h-4 w-4 mr-2" />
                      Featured Image
                    </Label>
                    {(isCreating ? newPost.image_url : (editingPost?.image_url)) && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-xs text-red-500"
                        onClick={() => {
                          if (isCreating) setNewPost({ ...newPost, image_url: '' });
                          else setEditingPost(prev => prev ? { ...prev, image_url: '' } : null);
                        }}
                      >
                        <X className="h-3 w-3 mr-1" /> Remove
                      </Button>
                    )}
                  </div>
                  <div className="border border-amber-200 dark:border-amber-800/50 rounded-md p-4 bg-amber-50/30 dark:bg-amber-900/10">
                    <ImageUploader
                      onImageUploaded={(url) => {
                        if (isCreating) setNewPost({ ...newPost, image_url: url });
                        else setEditingPost(prev => prev ? { ...prev, image_url: url } : null);
                      }}
                      existingImageUrl={isCreating ? newPost.image_url : (editingPost?.image_url || '')}
                    />
                    <Input
                      value={isCreating ? newPost.image_url : (editingPost?.image_url || '')}
                      onChange={(e) => isCreating
                        ? setNewPost({ ...newPost, image_url: e.target.value })
                        : setEditingPost(prev => prev ? { ...prev, image_url: e.target.value } : null)
                      }
                      placeholder="Or paste image URL"
                      className="mt-2 border-amber-200"
                    />
                  </div>
                </div>

                {/* Tags with suggestions */}
                <div>
                  <Label htmlFor="tags" className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    Tags (auto-detected from herbs in your content)
                  </Label>
                  <Input
                    id="tags"
                    value={currentTags}
                    onChange={(e) => isCreating
                      ? setNewPost({ ...newPost, tags: e.target.value })
                      : setEditingPost(prev => prev ? { ...prev, tags: e.target.value } : null)
                    }
                    placeholder="Auto-filled when content is pasted"
                    className="border-amber-200 focus:border-amber-400 dark:border-amber-800/50"
                  />
                  {suggestedTags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="text-xs text-gray-500 mr-1">Suggested:</span>
                      {suggestedTags.map((tag, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs cursor-pointer bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                          onClick={() => addSuggestedTag(tag)}
                        >
                          + {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content with mode toggle */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="content">Content (supports HTML from SEOWriting)</Label>
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant={contentMode === 'html' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setContentMode('html')}
                        className="text-xs h-7"
                      >
                        <Code className="h-3 w-3 mr-1" />
                        HTML
                      </Button>
                      <Button
                        type="button"
                        variant={contentMode === 'visual' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setContentMode('visual')}
                        className="text-xs h-7"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>

                  {contentMode === 'html' ? (
                    <Textarea
                      id="content"
                      value={currentContent}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder="Paste your HTML content from SEOWriting here, or write content directly..."
                      required
                      className="min-h-[400px] font-mono text-sm border-amber-200 focus:border-amber-400 dark:border-amber-800/50"
                    />
                  ) : (
                    <div className="min-h-[400px] p-4 border border-amber-200 dark:border-amber-800/50 rounded-md bg-white dark:bg-gray-900 overflow-auto prose dark:prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: currentContent || '<p class="text-gray-400">Content preview will appear here...</p>' }} />
                    </div>
                  )}
                </div>

                {/* SEO Meta Fields */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800/30">
                  <Label className="text-blue-800 dark:text-blue-300 font-medium mb-3 block">SEO Meta (auto-generated)</Label>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="meta_title" className="text-xs text-blue-600">Meta Title</Label>
                      <Input
                        id="meta_title"
                        value={isCreating ? newPost.meta_title : (editingPost?.meta_title || '')}
                        onChange={(e) => isCreating
                          ? setNewPost({ ...newPost, meta_title: e.target.value })
                          : setEditingPost(prev => prev ? { ...prev, meta_title: e.target.value } : null)
                        }
                        placeholder="Auto-generated from title"
                        className="border-blue-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="meta_description" className="text-xs text-blue-600">Meta Description</Label>
                      <Input
                        id="meta_description"
                        value={isCreating ? newPost.meta_description : (editingPost?.meta_description || '')}
                        onChange={(e) => isCreating
                          ? setNewPost({ ...newPost, meta_description: e.target.value })
                          : setEditingPost(prev => prev ? { ...prev, meta_description: e.target.value } : null)
                        }
                        placeholder="Auto-generated from content"
                        className="border-blue-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit buttons */}
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => { resetForm(); setActiveTab('view'); }}
                    disabled={isSubmitting}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Publishing...
                      </div>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {isCreating ? 'Publish Post' : 'Update Post'}
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
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{postToDelete?.title}". This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost} className="bg-red-600 text-white hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default BlogAdmin;
