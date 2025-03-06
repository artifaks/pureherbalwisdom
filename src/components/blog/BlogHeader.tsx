
import React from 'react';
import { Button } from '@/components/ui/button';
import { PenLine } from 'lucide-react';

interface BlogHeaderProps {
  onAddPost: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ 
  onAddPost, 
  isAuthenticated,
  isAdmin 
}) => {
  return (
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Herb Guide Blog</h1>
          <p className="text-gray-600">
            Explore our latest articles and insights about herbal remedies
          </p>
        </div>
        {isAuthenticated && isAdmin && (
          <Button 
            onClick={onAddPost}
            className="mt-4 sm:mt-0 bg-amber-600 hover:bg-amber-700"
          >
            <PenLine className="mr-2 h-4 w-4" />
            Write New Post
          </Button>
        )}
      </div>
      <div className="h-1 w-20 bg-amber-500 rounded"></div>
    </div>
  );
};

export default BlogHeader;
