
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
  const { user, bypassAuth } = useAuth();

  // Completely separate function ONLY for downloading
  const handleDownload = async (resource: Ebook) => {
    console.log("DOWNLOAD FLOW: Download requested for:", resource.title);
    console.log("DOWNLOAD FLOW: User authenticated:", !!user);
    console.log("DOWNLOAD FLOW: BypassAuth status:", bypassAuth);
    console.log("DOWNLOAD FLOW: Is purchased:", purchasedBooks[resource.id] || false);

    // Check if the user is authenticated or if we're bypassing auth
    if (!user && !bypassAuth) {
      console.log("DOWNLOAD FLOW: Not authenticated, redirecting to auth");
      toast({
        title: "Authentication Required",
        description: "Please sign in to download e-books.",
      });
      navigate('/auth');
      return;
    }

    // Check if the book is purchased or if we're bypassing auth
    if (!purchasedBooks[resource.id] && !bypassAuth) {
      console.log("DOWNLOAD FLOW: Not purchased, redirecting to purchase flow");
      toast({
        title: "Purchase Required",
        description: `You need to purchase "${resource.title}" first.`,
      });
      return;
    }

    console.log("DOWNLOAD FLOW: Proceeding with download, purchase verified or bypassed");
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

  // Completely separate function ONLY for purchasing
  const handlePurchase = async (resource: Ebook) => {
    console.log("PURCHASE FLOW: Purchase requested for:", resource.title);
    console.log("PURCHASE FLOW: User authenticated:", !!user);
    console.log("PURCHASE FLOW: Is already purchased:", purchasedBooks[resource.id] || false);

    // Don't allow purchase if the book is already purchased
    if (purchasedBooks[resource.id]) {
      console.log("PURCHASE FLOW: Book already purchased, redirecting to download flow");
      toast({
        title: "Already Purchased",
        description: `You already own "${resource.title}". You can download it.`,
      });
      return;
    }

    // Check if the user is authenticated
    if (!user) {
      console.log("PURCHASE FLOW: Not authenticated, redirecting to auth");
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase e-books.",
      });
      navigate('/auth');
      return;
    }

    console.log("PURCHASE FLOW: Proceeding with purchase flow");
    try {
      const redirectUrl = await purchaseService.createCheckoutSession(
        user.id,
        resource.id
      );
      
      if (redirectUrl) {
        toast({
          title: "Redirecting to Checkout",
          description: "You'll be redirected to complete your purchase.",
        });
        window.location.href = redirectUrl;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Checkout Failed",
        description: error.message || "There was an error creating the checkout session",
        variant: "destructive",
      });
    }
  };

  return {
    handleDownload,
    handlePurchase
  };
};
