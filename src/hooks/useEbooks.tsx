import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { purchaseService } from '@/services/purchaseService';
import { Ebook } from '@/types/ebook';
import { useAuth } from '@/hooks/use-auth';

export const useEbooks = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resources, setResources] = useState<Ebook[]>([]);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    description: "",
    type: "e-book",
    price: "4.99",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editingResource, setEditingResource] = useState<Ebook | null>(null);
  const [purchasedBooks, setPurchasedBooks] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  const isAdmin = user?.email === 'artifaks7@gmail.com'; // Replace with your admin email

  const sanitizeFileName = (fileName: string): string => {
    return fileName
      .replace(/['":]/g, '') // Remove apostrophes, quotes, and colons
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/[^\w.-]/g, ''); // Remove any remaining non-alphanumeric characters except underscores, periods, and hyphens
  };

  useEffect(() => {
    const fetchResources = async () => {
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
          const formattedBooks = data.map(book => ({
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
    };

    fetchResources();
  }, [toast, user]);

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
  }, [searchParams, user, navigate, toast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedCover(event.target.files[0]);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editingResource) {
      setEditingResource({...editingResource, description: e.target.value});
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingResource) {
      setEditingResource({...editingResource, title: e.target.value});
    }
  };

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
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to download this e-book.",
      });
      navigate('/auth');
      return;
    }
    
    if (!purchasedBooks[resource.id]) {
      handlePurchase(resource);
      return;
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

  const handleAddBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add a new e-book.",
      });
      navigate('/auth');
      return;
    }
    
    if (!newBook.title || !newBook.description || !newBook.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to add a new e-book.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFile) {
      toast({
        title: "Missing File",
        description: "Please upload a PDF file for your e-book.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const sanitizedTitle = sanitizeFileName(newBook.title.toLowerCase());
      const fileName = `${Date.now()}_${sanitizedTitle}.${fileExt}`;
      
      const { data: fileData, error: fileError } = await supabase.storage
        .from('e-books')
        .upload(fileName, selectedFile);
      
      if (fileError) {
        throw fileError;
      }

      let coverFileName = null;
      if (selectedCover) {
        const coverExt = selectedCover.name.split('.').pop();
        const sanitizedCoverName = sanitizeFileName(newBook.title.toLowerCase());
        coverFileName = `cover_${Date.now()}_${sanitizedCoverName}.${coverExt}`;
        
        const { error: coverError } = await supabase.storage
          .from('e-books')
          .upload(coverFileName, selectedCover);
        
        if (coverError) {
          throw coverError;
        }
      }

      const { data: insertData, error: insertError } = await supabase
        .from('ebooks')
        .insert({
          title: newBook.title,
          description: newBook.description,
          price: parseFloat(newBook.price),
          type: newBook.type,
          popular: false,
          file_url: fileName,
          cover_url: coverFileName
        })
        .select()
        .single();
      
      if (insertError) {
        throw insertError;
      }

      const newEbook: Ebook = {
        id: insertData.id,
        title: insertData.title,
        description: insertData.description || "",
        price: `$${insertData.price.toFixed(2)}`,
        type: insertData.type,
        popular: insertData.popular,
        fileUrl: insertData.file_url,
        coverUrl: insertData.cover_url
      };
      
      setResources([...resources, newEbook]);
      setNewBook({ title: "", description: "", type: "e-book", price: "4.99" });
      setSelectedFile(null);
      setSelectedCover(null);
      setIsAddingBook(false);
      
      toast({
        title: "E-book Added",
        description: `"${newBook.title}" has been added to your resources at $${parseFloat(newBook.price).toFixed(2)}.`,
      });
    } catch (error: any) {
      console.error('Error uploading files:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "There was an error uploading your files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditClick = (resource: Ebook) => {
    if (!isAdmin) return;
    setEditingResource(resource);
    setSelectedCover(null);
  };

  const handleEditCancel = () => {
    setEditingResource(null);
    setSelectedCover(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to edit an e-book.",
      });
      navigate('/auth');
      return;
    }
    
    if (!editingResource) return;
    
    setIsUploading(true);
    
    try {
      let updatedCoverUrl = editingResource.coverUrl;
      
      if (selectedCover) {
        if (editingResource.coverUrl) {
          const { error: deleteError } = await supabase.storage
            .from('e-books')
            .remove([editingResource.coverUrl]);
          
          if (deleteError) {
            console.error("Error deleting old cover:", deleteError);
            // Continue anyway
          }
        }
        
        const coverExt = selectedCover.name.split('.').pop();
        const sanitizedTitle = sanitizeFileName(editingResource.title.toLowerCase());
        const coverFileName = `cover_${Date.now()}_${sanitizedTitle}.${coverExt}`;
        
        const { error: coverError } = await supabase.storage
          .from('e-books')
          .upload(coverFileName, selectedCover);
        
        if (coverError) {
          throw coverError;
        }
        
        updatedCoverUrl = coverFileName;
      }
      
      // Extract numeric price value without the $ sign
      const priceValue = parseFloat(editingResource.price.replace(/[$,]/g, ''));
      
      const { error } = await supabase
        .from('ebooks')
        .update({
          title: editingResource.title,
          price: priceValue,
          description: editingResource.description,
          cover_url: updatedCoverUrl
        })
        .eq('id', editingResource.id);
      
      if (error) {
        console.error("Update error details:", error);
        throw error;
      }
      
      // Update the resources state with the updated ebook
      const updatedResources = resources.map(resource => {
        if (resource.id === editingResource.id) {
          return {
            ...editingResource,
            coverUrl: updatedCoverUrl
          };
        }
        return resource;
      });
      
      setResources(updatedResources);
      setEditingResource(null);
      setSelectedCover(null);
      
      toast({
        title: "E-Book Updated",
        description: `"${editingResource.title}" has been updated successfully.`,
      });
    } catch (error: any) {
      console.error("Error updating e-book:", error);
      toast({
        title: "Update Failed",
        description: error.message || "There was an error updating the e-book",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingResource) {
      const newPrice = `$${parseFloat(e.target.value).toFixed(2)}`;
      setEditingResource({...editingResource, price: newPrice});
    } else {
      setNewBook({...newBook, price: e.target.value});
    }
  };

  const handleDeleteEbook = async (resource: Ebook) => {
    if (!user || !isAdmin) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to delete e-books.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Attempting to delete ebook with ID:", resource.id);
      
      await purchaseService.deleteEbook(resource.id);
      
      // Update the UI by removing the deleted ebook
      setResources(prevResources => prevResources.filter(r => r.id !== resource.id));

      toast({
        title: "E-book Deleted",
        description: `"${resource.title}" has been deleted successfully.`,
      });
    } catch (error: any) {
      console.error('Error deleting e-book:', error);
      toast({
        title: "Delete Failed",
        description: error.message || "There was an error deleting the e-book",
        variant: "destructive",
      });
    }
  };

  return {
    user,
    resources,
    isLoading,
    isAddingBook,
    setIsAddingBook,
    newBook,
    setNewBook,
    selectedFile,
    setSelectedFile,
    selectedCover,
    setSelectedCover,
    isUploading,
    editingResource,
    setEditingResource,
    purchasedBooks,
    handleFileChange,
    handleCoverChange,
    handleDescriptionChange,
    handleDownload,
    handleAddBookSubmit,
    handleEditClick,
    handleEditCancel,
    handleEditSubmit,
    handlePriceChange,
    isAdmin,
    handleDeleteEbook,
    handleTitleChange,
  };
};
