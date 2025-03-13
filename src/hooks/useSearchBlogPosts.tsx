import { useState, useCallback } from 'react';
import { BlogPost } from '@/types/blog';

export const useSearchBlogPosts = (posts: BlogPost[] = []) => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchPosts = useCallback((query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    setHasSearched(true);
    
    if (!query.trim()) {
      setSearchResults(posts);
      setIsSearching(false);
      return;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    
    // Search in title, content, excerpt, and author
    const results = posts.filter(post => 
      post.title.toLowerCase().includes(lowerCaseQuery) ||
      post.content.toLowerCase().includes(lowerCaseQuery) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(lowerCaseQuery)) ||
      (post.author && post.author.toLowerCase().includes(lowerCaseQuery))
    );
    
    setSearchResults(results);
    setIsSearching(false);
  }, [posts]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
  }, []);

  return {
    searchQuery,
    searchResults,
    isSearching,
    hasSearched,
    searchPosts,
    clearSearch
  };
};
