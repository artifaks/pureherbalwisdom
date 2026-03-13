
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft, Tag, Edit, Share2 } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { Helmet } from 'react-helmet';
import { processBlogContent, generateExcerpt } from '@/utils/blogUtils';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setIsLoading(true);

        const { data: postData, error: postError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (postError) throw postError;

        if (postData) {
          let authorName = postData.author;

          if (!authorName && postData.user_id) {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('username')
              .eq('id', postData.user_id)
              .single();
            authorName = profileData?.username;
          }

          setPost({
            id: postData.id,
            title: postData.title,
            content: postData.content,
            excerpt: postData.excerpt || undefined,
            author: authorName || 'Pure Herbal Wisdom',
            created_at: postData.created_at,
            updated_at: postData.updated_at,
            user_id: postData.user_id,
            image_url: postData.image_url || undefined,
            tags: postData.tags || [],
            featured: postData.featured || false
          });
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Auto-link herbs and add affiliate CTAs to the content
  const processedContent = useMemo(() => {
    if (!post?.content) return '';
    return processBlogContent(post.content);
  }, [post?.content]);

  const metaDescription = post?.excerpt || (post?.content ? generateExcerpt(post.content) : '');
  const metaTitle = post?.meta_title || (post?.title ? `${post.title} | Pure Herbal Wisdom Blog` : 'Pure Herbal Wisdom Blog');
  const pageUrl = `https://poetic-pie-7ed910.netlify.app/blog/${id}`;

  const goBack = () => navigate('/blog');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <MainNavigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <MainNavigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Button onClick={goBack} className="bg-amber-600 hover:bg-amber-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Dynamic SEO Meta Tags */}
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={tags.join(', ')} />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        {post.image_url && <meta property="og:image" content={post.image_url} />}
        <meta property="article:published_time" content={post.created_at} />
        <meta property="article:author" content={post.author || 'Pure Herbal Wisdom'} />
        {tags.map((tag, i) => (
          <meta key={i} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={metaDescription} />
        {post.image_url && <meta name="twitter:image" content={post.image_url} />}

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": metaDescription,
            "image": post.image_url || '',
            "datePublished": post.created_at,
            "dateModified": post.updated_at || post.created_at,
            "author": {
              "@type": "Person",
              "name": post.author || "Pure Herbal Wisdom"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Pure Herbal Wisdom",
              "url": "https://poetic-pie-7ed910.netlify.app"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": pageUrl
            },
            "keywords": tags.join(', ')
          })}
        </script>
      </Helmet>

      <MainNavigation />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={goBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>

          <div className="flex gap-2">
            {isAdmin && (
              <Link to={`/blog#admin-${post.id}`}>
                <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
            )}
          </div>
        </div>

        <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
          {post.image_url && (
            <div className="w-full h-[400px] overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                }}
              />
            </div>
          )}

          <CardHeader className="pb-3">
            <CardTitle className="text-3xl font-bold text-gray-800 dark:text-gray-100">{post.title}</CardTitle>
            <CardDescription className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 space-x-4">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.created_at ? format(new Date(post.created_at), 'MMMM dd, yyyy') : 'Just now'}
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
            {/* Rendered content with auto-linked herbs and affiliate CTAs */}
            <div className="prose dark:prose-invert max-w-none prose-a:text-amber-700 dark:prose-a:text-amber-400 prose-a:font-medium">
              <div dangerouslySetInnerHTML={{ __html: processedContent }} />
            </div>
          </CardContent>

          {tags.length > 0 && (
            <CardFooter className="flex flex-wrap gap-2 pt-4 pb-4 border-t border-gray-100 dark:border-gray-700">
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

          <CardFooter className="bg-gray-50 dark:bg-gray-800 py-3 px-6 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {formatDistanceToNow(new Date(post.updated_at || post.created_at), { addSuffix: true })}
            </p>
          </CardFooter>
        </Card>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
