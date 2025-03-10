
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { purchaseService } from '@/services/purchaseService';
import { Ebook } from '@/types/ebook';

export const useEbooksDownload = (
  purchasedBooks: Record<string, boolean>,
  setPurchasedBooks: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Function to handle download - only works if user has purchased the book
  const handleDownload = async (resource: Ebook) => {
    console.log("DOWNLOAD FLOW: Download requested for:", resource.title);
    console.log("DOWNLOAD FLOW: User authenticated:", !!user);
    console.log("DOWNLOAD FLOW: Purchase status:", purchasedBooks[resource.id]);

    // Check if the user is authenticated
    if (!user) {
      console.log("DOWNLOAD FLOW: Not authenticated, redirecting to auth");
      toast({
        title: "Authentication Required",
        description: "Please sign in to download e-books.",
      });
      navigate('/auth');
      return;
    }

    // Check if the user has purchased this ebook
    if (!purchasedBooks[resource.id]) {
      console.log("DOWNLOAD FLOW: Book not purchased, initiating purchase flow");
      // Initiate the purchase flow
      try {
        const checkoutUrl = await purchaseService.createCheckoutSession(user.id, resource.id);
        if (checkoutUrl) {
          // Redirect to Stripe checkout
          window.location.href = checkoutUrl;
        } else {
          throw new Error("Failed to create checkout session");
        }
      } catch (error: any) {
        console.error("Error creating checkout:", error);
        toast({
          title: "Checkout Failed",
          description: error.message || "There was an error initiating the checkout process",
          variant: "destructive",
        });
      }
      return;
    }

    console.log("DOWNLOAD FLOW: Book purchased, proceeding with download");
    try {
      const { data, error } = await supabase.storage
        .from('e-books')
        .download(resource.fileUrl);
      
      if (error) {
        throw error;
      }
      
      // Create a download link for the file
      const url = URL.createObjectURL(data);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = resource.title.replace(/\s+/g, '_') + '.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: `"${resource.title}" is being downloaded.`,
      });
    } catch (error: any) {
      console.error("Error downloading e-book:", error);
      toast({
        title: "Download Failed",
        description: error.message || "There was an error downloading the e-book",
        variant: "destructive",
      });
    }
  };

  // Handle purchase function (now the same as download for compatibility)
  const handlePurchase = async (resource: Ebook) => {
    handleDownload(resource);
  };

  return {
    handleDownload,
    handlePurchase
  };
};
