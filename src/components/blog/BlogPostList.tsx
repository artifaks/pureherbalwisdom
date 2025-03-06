
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Calendar, User, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface BlogPostListProps {
  posts: BlogPost[];
  isAdmin: boolean;
  isAuthenticated: boolean;
  onEditClick: (post: BlogPost) => void;
  onDeleteClick: (post: BlogPost) => void;
}

const BlogPostList: React.FC<BlogPostListProps> = ({ 
  posts, 
  isAdmin,
  isAuthenticated,
  onEditClick,
  onDeleteClick
}) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 mb-4">No blog posts yet.</p>
        {isAdmin && (
          <p className="text-gray-600">
            Click "Write New Post" to create your first blog post.
          </p>
        )}
        {isAuthenticated && !isAdmin && (
          <Alert className="mt-4 max-w-md mx-auto">
            <Info className="h-4 w-4" />
            <AlertTitle>Admin privileges required</AlertTitle>
            <AlertDescription>
              You are logged in, but you need admin privileges to create blog posts.
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {isAuthenticated && !isAdmin && posts.length > 0 && (
        <Alert className="mb-6 border-amber-300 bg-amber-50">
          <Info className="h-4 w-4 text-amber-600" />
          <AlertTitle>Admin privileges required</AlertTitle>
          <AlertDescription>
            You are logged in, but you need admin privileges to create, edit, or delete blog posts.
          </AlertDescription>
        </Alert>
      )}
      
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-gray-800">{post.title}</CardTitle>
            <CardDescription className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.created_at ? (
                  formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
                ) : (
                  'Just now'
                )}
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
            <div className="mb-4">
              <p className="text-gray-600">{post.excerpt || post.content.substring(0, 150)}...</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between bg-gray-50 py-3 px-6">
            <Link to={`/blog/${post.id}`}>
              <Button variant="outline" className="text-amber-600 border-amber-300 hover:bg-amber-50">
                Read More
              </Button>
            </Link>
            {isAdmin && (
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditClick(post)}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteClick(post)}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BlogPostList;
