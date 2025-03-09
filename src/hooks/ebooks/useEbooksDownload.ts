
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
    console.log("PURCHASE FLOW: Starting purchase process for:", resource.title);
    
    if (!user) {
      console.log("PURCHASE FLOW: No user - redirecting to auth");
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase this e-book.",
      });
      navigate('/auth');
      return;
    }
    
    try {
      console.log("PURCHASE FLOW: Creating checkout session for:", resource.title);
      
      const response = await supabase.functions.invoke('create-checkout', {
        body: { 
          ebook: resource,
          returnUrl: window.location.origin + '/resources'
        }
      });
      
      if (response.error) throw new Error(response.error.message);
      
      console.log("PURCHASE FLOW: Checkout session created:", response.data.sessionId);
      
      await purchaseService.createPurchaseRecord(
        user.id, 
        resource.id, 
        response.data.sessionId
      );
      
      // Redirect to Stripe checkout
      console.log("PURCHASE FLOW: Redirecting to Stripe checkout:", response.data.url);
      window.location.href = response.data.url;
    } catch (error: any) {
      console.error("PURCHASE FLOW: Error creating checkout session:", error);
      toast({
        title: "Checkout Failed",
        description: error.message || "There was an error processing your purchase",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (resource: Ebook) => {
    console.log("FLOW: Download/Purchase requested for:", resource.title);
    console.log("FLOW: User authenticated:", !!user);
    console.log("FLOW: BypassAuth status:", bypassAuth);
    console.log("FLOW: Is purchased:", purchasedBooks[resource.id]);
    
    // Check if user needs to authenticate
    if (!user && !bypassAuth) {
      console.log("FLOW: Authentication required, redirecting to auth page");
      toast({
        title: "Authentication Required",
        description: "Please sign in to download this e-book.",
      });
      navigate('/auth');
      return;
    }
    
    // IMPORTANT FIX: Separate paths for purchase and download completely
    if (!purchasedBooks[resource.id] && !bypassAuth) {
      console.log("FLOW: Book not purchased, initiating purchase flow");
      // Don't use await here as we're redirecting
      handlePurchase(resource);
      return; // Crucial - prevent proceeding to download
    }
    
    console.log("FLOW: Proceeding with download, purchase verified or bypassed");
    
    // Only proceed with download after all checks pass
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
