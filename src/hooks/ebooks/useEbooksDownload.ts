
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { purchaseService } from '@/services/purchaseService';
import { Ebook } from '@/types/ebook';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

export const useEbooksDownload = (
  purchasedBooks: Record<string, boolean>, 
  setPurchasedBooks: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const { toast } = useToast();
  const { user, bypassAuth } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Handle purchase verification from URL params
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const ebookId = searchParams.get('ebook_id');
    
    if (sessionId && ebookId && user) {
      const verifyPayment = async () => {
        try {
          await purchaseService.verifyPurchase(user.id, String(ebookId), sessionId);
          
          setPurchasedBooks(prev => ({
            ...prev,
            [ebookId]: true
          }));
          
          toast({
            title: "Purchase Successful!",
            description: "Your e-book is now available for download.",
          });
          
          navigate('/resources', { replace: true });
        } catch (error) {
          console.error("Error verifying payment:", error);
          toast({
            title: "Verification Failed",
            description: "There was an issue verifying your purchase. Please contact support.",
            variant: "destructive",
          });
        }
      };
      
      verifyPayment();
    }
  }, [searchParams, user, navigate, toast, setPurchasedBooks]);

  const handlePurchase = async (resource: Ebook) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase this e-book.",
      });
      navigate('/auth');
      return;
    }
    
    try {
      const response = await supabase.functions.invoke('create-checkout', {
        body: { 
          ebook: resource,
          returnUrl: window.location.origin + '/resources'
        }
      });
      
      if (response.error) throw new Error(response.error.message);
      
      await purchaseService.createPurchaseRecord(
        user.id, 
        resource.id, 
        response.data.sessionId
      );
      
      window.location.href = response.data.url;
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Checkout Failed",
        description: error.message || "There was an error processing your purchase",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (resource: Ebook) => {
    if (!user && !bypassAuth) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to download this e-book.",
      });
      navigate('/auth');
      return;
    }
    
    // FIX: Only allow downloads for purchased books or when auth is bypassed
    // Remove the 'if (!purchasedBooks[resource.id] && !bypassAuth)' condition that was allowing
    // downloads to happen even if the book wasn't purchased
    if (!bypassAuth) {
      // Check if the book is purchased
      if (!purchasedBooks[resource.id]) {
        // If not purchased, redirect to payment flow
        handlePurchase(resource);
        return;
      }
    }
    
    if (resource.fileUrl) {
      try {
        const { data, error } = await supabase.storage
          .from('e-books')
          .download(resource.fileUrl);
        
        if (error) {
          throw error;
        }
        
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = resource.title + '.pdf';
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast({
          title: "Download Started",
          description: `"${resource.title}" is now downloading.`,
        });
      } catch (error) {
        console.error('Error downloading file:', error);
        toast({
          title: "Download Failed",
          description: "There was an error downloading the file. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Coming Soon!",
        description: `The download for "${resource.title}" will be available soon.`,
      });
    }
  };

  return {
    handlePurchase,
    handleDownload
  };
};
