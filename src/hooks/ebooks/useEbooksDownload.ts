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

    console.log("DOWNLOAD FLOW: Proceeding with download");
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

  // Keep purchase function for backward compatibility, but make it just call handleDownload
  const handlePurchase = async (resource: Ebook) => {
    handleDownload(resource);
  };

  return {
    handleDownload,
    handlePurchase
  };
};
