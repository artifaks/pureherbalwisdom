import React from 'react';
import { BlogPost as BlogPostType } from '@/types/blog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Tag } from 'lucide-react';
import { format } from 'date-fns';

interface BlogPostProps {
  post: BlogPostType;
  isFullPost?: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, isFullPost = false }) => {
  const formattedDate = post.created_at 
    ? format(new Date(post.created_at), 'MMMM dd, yyyy')
    : 'Recently published';

  const tags = Array.isArray(post.tags) 
    ? post.tags 
    : typeof post.tags === 'string' 
      ? post.tags.split(',').map(tag => tag.trim()) 
      : [];

  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      {post.image_url && (
        <div className="w-full h-64 overflow-hidden">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // If image fails to load, hide the container
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {post.title}
        </CardTitle>
        <CardDescription className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mt-2 gap-4">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {formattedDate}
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
        <div className="prose dark:prose-invert max-w-none">
          {isFullPost ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              {post.excerpt || post.content.substring(0, 150)}...
            </p>
          )}
        </div>
      </CardContent>
      
      {tags.length > 0 && (
        <CardFooter className="flex flex-wrap gap-2 pt-0 pb-4">
          <span className="flex items-center text-sm text-gray-500 dark:text-gray-400 mr-2">
            <Tag className="h-3 w-3 mr-1" />
            Tags:
          </span>
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline"
              className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30"
            >
              {tag}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};

export default BlogPost;
