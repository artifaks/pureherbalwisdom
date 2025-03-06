
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, X } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface EditPostFormProps {
  post: BlogPost;
  setEditingPost: React.Dispatch<React.SetStateAction<BlogPost | null>>;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EditPostForm: React.FC<EditPostFormProps> = ({
  post,
  setEditingPost,
  isSubmitting,
  onCancel,
  onSubmit
}) => {
  return (
    <Card className="mb-8 border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-blue-800">Edit Blog Post</CardTitle>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={post.title}
              onChange={(e) => setEditingPost({...post, title: e.target.value})}
              placeholder="Enter post title"
              required
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-excerpt">Excerpt (optional)</Label>
            <Input
              id="edit-excerpt"
              value={post.excerpt || ''}
              onChange={(e) => setEditingPost({...post, excerpt: e.target.value})}
              placeholder="Brief description of your post"
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-content">Content</Label>
            <Textarea
              id="edit-content"
              value={post.content}
              onChange={(e) => setEditingPost({...post, content: e.target.value})}
              placeholder="Write your post content here..."
              className="min-h-[200px] border-blue-200 focus:border-blue-400"
              required
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-3 bg-blue-50 border-t border-blue-100">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <X className="mr-1 h-4 w-4" />
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || !post.title || !post.content}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="mr-1 h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EditPostForm;
