
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

interface AddPostFormProps {
  newPost: {
    title: string;
    content: string;
    excerpt: string;
  };
  setNewPost: React.Dispatch<React.SetStateAction<{
    title: string;
    content: string;
    excerpt: string;
  }>>;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({
  newPost,
  setNewPost,
  isSubmitting,
  onCancel,
  onSubmit
}) => {
  return (
    <Card className="mb-8 border-amber-200 bg-amber-50/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-amber-800">Create New Blog Post</CardTitle>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newPost.title}
              onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              placeholder="Enter post title"
              required
              className="border-amber-200 focus:border-amber-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt (optional)</Label>
            <Input
              id="excerpt"
              value={newPost.excerpt}
              onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
              placeholder="Brief description of your post"
              className="border-amber-200 focus:border-amber-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={newPost.content}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              placeholder="Write your post content here..."
              className="min-h-[200px] border-amber-200 focus:border-amber-400"
              required
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-3 bg-amber-50 border-t border-amber-100">
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
            disabled={isSubmitting || !newPost.title || !newPost.content}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Check className="mr-1 h-4 w-4" />
            Publish Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddPostForm;
