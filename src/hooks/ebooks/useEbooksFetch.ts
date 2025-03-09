
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { purchaseService } from '@/services/purchaseService';
import { Ebook } from '@/types/ebook';
import { useAuth } from '@/hooks/use-auth';

export const useEbooksFetch = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [resources, setResources] = useState<Ebook[]>([]);
  const [purchasedBooks, setPurchasedBooks] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchResources = useCallback(async () => {
    try {
      setIsLoading(true);
      
      if (user?.email === 'artifaks7@gmail.com') {
        try {
          await purchaseService.purgeSampleEbooks();
        } catch (error) {
          console.error("Error purging sample ebooks:", error);
        }
      }
      
      const data = await purchaseService.getAllEbooks();
      
      if (data && data.length > 0) {
        // Filter to only include ebooks with a fileUrl (PDF attached)
        const formattedBooks = data
          .filter(book => book.file_url) // Only include books with a PDF file
          .map(book => ({
            id: book.id,
            title: book.title,
            description: book.description || "",
            price: `$${book.price.toFixed(2)}`,
            type: book.type,
            popular: book.popular,
            fileUrl: book.file_url,
            coverUrl: book.cover_url
          }));
        setResources(formattedBooks);
      } else {
        setResources([]);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast({
        title: "Error",
        description: "Failed to load resources",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, user]);

  // Refresh data function
  const refreshData = useCallback(() => {
    fetchResources();
  }, [fetchResources]);

  // Delete ebook function
  const handleDeleteEbook = async (resource: Ebook) => {
    try {
      console.log("Attempting to delete ebook with ID:", resource.id);
      await purchaseService.deleteEbook(resource.id);
      
      // Update the UI immediately
      setResources(prevResources => prevResources.filter(r => r.id !== resource.id));
      
      return true;
    } catch (error: any) {
      console.error('Error deleting e-book:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return {
    resources,
    setResources,
    purchasedBooks,
    setPurchasedBooks,
    isLoading,
    fetchResources,
    refreshData,
    handleDeleteEbook
  };
};
