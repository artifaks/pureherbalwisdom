
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

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  useEffect(() => {
    const checkPurchases = async () => {
      if (!user) return;
      
      const purchases: Record<string, boolean> = {};
      
      for (const resource of resources) {
        const isPurchased = await purchaseService.checkPurchaseStatus(user.id, resource.id);
        purchases[resource.id] = isPurchased;
      }
      
      setPurchasedBooks(purchases);
    };
    
    if (user && resources.length > 0) {
      checkPurchases();
    }
  }, [user, resources]);

  return {
    resources,
    setResources,
    purchasedBooks,
    setPurchasedBooks,
    isLoading,
    fetchResources
  };
};
