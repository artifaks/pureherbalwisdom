
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Ebook } from '@/types/ebook';
import { useAuth } from '@/hooks/use-auth';

export const useEbooksEdit = (
  resources: Ebook[], 
  setResources: React.Dispatch<React.SetStateAction<Ebook[]>>,
  fetchResources: () => Promise<void>
) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [editingResource, setEditingResource] = useState<Ebook | null>(null);
  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const isAdmin = user?.email === 'artifaks7@gmail.com'; // Replace with your admin email

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

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingResource) {
      const newPrice = `$${parseFloat(e.target.value).toFixed(2)}`;
      setEditingResource({...editingResource, price: newPrice});
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

      // Ensure data is in sync with database
      fetchResources();
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
      
      // Update the UI immediately
      setResources(prevResources => prevResources.filter(r => r.id !== resource.id));

      toast({
        title: "E-book Deleted",
        description: `"${resource.title}" has been deleted successfully.`,
      });
      
      // Force a reload of resources to ensure state is in sync with database
      fetchResources();
      
    } catch (error: any) {
      console.error('Error deleting e-book:', error);
      toast({
        title: "Delete Failed",
        description: error.message || "There was an error deleting the e-book",
        variant: "destructive",
      });
    }
  };

  const sanitizeFileName = (fileName: string): string => {
    return fileName
      .replace(/['":]/g, '') // Remove apostrophes, quotes, and colons
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/[^\w.-]/g, ''); // Remove any remaining non-alphanumeric characters except underscores, periods, and hyphens
  };

  return {
    editingResource,
    setEditingResource,
    selectedCover,
    setSelectedCover,
    isUploading,
    isAdmin,
    handleCoverChange,
    handleDescriptionChange,
    handleTitleChange,
    handlePriceChange,
    handleEditClick,
    handleEditCancel,
    handleEditSubmit,
    handleDeleteEbook,
    sanitizeFileName
  };
};

// Import needed for deleteEbook
import { purchaseService } from '@/services/purchaseService';
