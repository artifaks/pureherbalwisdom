
import { supabase } from '@/integrations/supabase/client';
import { Ebook } from '@/types/ebook';

export const ebookService = {
  // Function to get all ebooks from Supabase
  async getAllEbooks() {
    try {
      const { data, error } = await supabase
        .from('ebooks')
        .select('*')
        .filter('file_url', 'not.is', null) // Only get ebooks with a PDF file
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Error fetching ebooks:', error);
      throw error;
    }
  },
  
  // Function to update an ebook title
  async updateEbookTitle(ebookId: string, newTitle: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('ebooks')
        .update({ title: newTitle })
        .eq('id', ebookId);
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating ebook title:', error);
      throw error;
    }
  },
  
  // Function to delete an ebook
  async deleteEbook(ebookId: string): Promise<void> {
    try {
      console.log("EbookService: Deleting ebook with ID:", ebookId);
      
      // First, fetch the ebook to get file references
      const { data: ebook, error: fetchError } = await supabase
        .from('ebooks')
        .select('file_url, cover_url')
        .eq('id', ebookId)
        .single();
      
      if (fetchError) {
        console.error("EbookService: Error fetching ebook:", fetchError);
        throw fetchError;
      }
      
      // Delete the ebook record from database
      const { error: deleteError } = await supabase
        .from('ebooks')
        .delete()
        .eq('id', ebookId);
      
      if (deleteError) {
        console.error("EbookService: Error deleting ebook:", deleteError);
        throw deleteError;
      }
      
      // Then delete any associated files if they exist
      if (ebook) {
        const filesToDelete = [];
        
        if (ebook.file_url) {
          // Extract just the filename from the full path if needed
          const fileUrl = ebook.file_url.includes('/') 
            ? ebook.file_url.split('/').pop() 
            : ebook.file_url;
          
          if (fileUrl) filesToDelete.push(fileUrl);
        }
        
        if (ebook.cover_url) {
          // Extract just the filename from the full path if needed
          const coverUrl = ebook.cover_url.includes('/') 
            ? ebook.cover_url.split('/').pop() 
            : ebook.cover_url;
          
          if (coverUrl) filesToDelete.push(coverUrl);
        }
        
        if (filesToDelete.length > 0) {
          console.log("EbookService: Deleting files:", filesToDelete);
          const { error: storageError } = await supabase.storage
            .from('e-books')
            .remove(filesToDelete);
          
          if (storageError) {
            console.error('EbookService: Error deleting files:', storageError);
            // We don't throw here since the ebook record was already deleted
          }
        }
      }
      
      // Also delete any purchase records for this ebook
      const { error: purchaseDeleteError } = await supabase
        .from('purchases')
        .delete()
        .eq('ebook_id', ebookId);
      
      if (purchaseDeleteError) {
        console.error('EbookService: Error deleting purchase records:', purchaseDeleteError);
        // We continue since the ebook itself was deleted
      }
      
      console.log("EbookService: Ebook successfully deleted");
    } catch (error) {
      console.error('EbookService: Error in deleteEbook:', error);
      throw error;
    }
  }
};
