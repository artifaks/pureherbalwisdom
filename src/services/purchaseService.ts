import { supabase } from '@/integrations/supabase/client';
import { Ebook } from '@/types/ebook';

export const purchaseService = {
  // Function to check purchase status
  async checkPurchaseStatus(userId: string, ebookId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('id')
        .eq('user_id', userId)
        .eq('ebook_id', ebookId)
        .eq('payment_status', 'completed')
        .single();
      
      if (error) {
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error('Error checking purchase status:', error);
      return false;
    }
  },
  
  // Function to create a purchase record
  async createPurchaseRecord(userId: string, ebookId: string, sessionId: string): Promise<void> {
    try {
      await supabase
        .from('purchases')
        .insert({
          user_id: userId,
          ebook_id: ebookId,
          stripe_session_id: sessionId,
          payment_status: 'pending'
        });
    } catch (error) {
      console.error('Error creating purchase record:', error);
      throw error;
    }
  },
  
  // Function to verify purchase
  async verifyPurchase(userId: string, ebookId: string, sessionId: string): Promise<void> {
    try {
      const { error } = await supabase.functions.invoke('verify-purchase', {
        body: { 
          userId,
          ebookId,
          sessionId
        }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error verifying purchase:', error);
      throw error;
    }
  },
  
  // Function to create a checkout session with Stripe
  async createCheckoutSession(userId: string, ebookId: string): Promise<string | null> {
    try {
      // Find the ebook details first
      const { data: ebookData, error: ebookError } = await supabase
        .from('ebooks')
        .select('*')
        .eq('id', ebookId)
        .single();
      
      if (ebookError || !ebookData) {
        console.error('Error fetching ebook for checkout:', ebookError);
        throw new Error('Ebook not found');
      }
      
      // Format the ebook object for the checkout function
      const ebook = {
        id: ebookData.id,
        title: ebookData.title,
        description: ebookData.description || '',
        price: `$${ebookData.price.toFixed(2)}`,
        type: ebookData.type || 'ebook',
        popular: ebookData.popular || false,
        fileUrl: ebookData.file_url,
        coverUrl: ebookData.cover_url
      };
      
      // Get the current origin for the return URL
      const returnUrl = `${window.location.origin}/resources`;
      
      // Call the Supabase Edge Function to create a checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { ebook, returnUrl }
      });
      
      if (error) {
        console.error('Error invoking create-checkout function:', error);
        throw error;
      }
      
      // Store the session information in the database
      if (data && data.sessionId) {
        await purchaseService.createPurchaseRecord(userId, ebookId, data.sessionId);
      }
      
      // Return the URL for redirection
      return data?.url || null;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },
  
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
  
  // Function to check if initial migration was already done
  async hasPreviouslyMigratedEbooks(): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      console.error('Error checking migration history:', error);
      return true;
    }
  },
  
  // Function to migrate initial ebooks - this will now be disabled
  async migrateInitialEbooks(initialEbooks: Ebook[]): Promise<void> {
    console.log('Migration disabled - not adding sample ebooks');
    return;
  },
  
  // Function to delete an ebook
  async deleteEbook(ebookId: string): Promise<void> {
    try {
      console.log("PurchaseService: Deleting ebook with ID:", ebookId);
      
      // First, fetch the ebook to get file references
      const { data: ebook, error: fetchError } = await supabase
        .from('ebooks')
        .select('file_url, cover_url')
        .eq('id', ebookId)
        .single();
      
      if (fetchError) {
        console.error("PurchaseService: Error fetching ebook:", fetchError);
        throw fetchError;
      }
      
      // Delete the ebook record from database
      const { error: deleteError } = await supabase
        .from('ebooks')
        .delete()
        .eq('id', ebookId);
      
      if (deleteError) {
        console.error("PurchaseService: Error deleting ebook:", deleteError);
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
          console.log("PurchaseService: Deleting files:", filesToDelete);
          const { error: storageError } = await supabase.storage
            .from('e-books')
            .remove(filesToDelete);
          
          if (storageError) {
            console.error('PurchaseService: Error deleting files:', storageError);
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
        console.error('PurchaseService: Error deleting purchase records:', purchaseDeleteError);
        // We continue since the ebook itself was deleted
      }
      
      console.log("PurchaseService: Ebook successfully deleted");
    } catch (error) {
      console.error('PurchaseService: Error in deleteEbook:', error);
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
  
  // Function to purge sample ebooks
  async purgeSampleEbooks(): Promise<void> {
    try {
      const sampleTitles = [
        "Medicinal Herbs Field Guide",
        "Herbal Preparations & Remedies",
        "Herbs for Heart Health",
        "Women's Herbal Wellness",
        "Digestive Healing with Herbs",
        "Seasonal Foraging Calendar"
      ];
      
      const { data, error } = await supabase
        .from('ebooks')
        .select('id, title, file_url, cover_url')
        .in('title', sampleTitles);
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        console.log(`Found ${data.length} sample ebooks to purge`);
        
        for (const ebook of data) {
          if (ebook.file_url || ebook.cover_url) {
            const filesToDelete = [];
            
            if (ebook.file_url) {
              const fileUrl = ebook.file_url.replace(/^.*\//, ''); // Extract filename from URL if needed
              filesToDelete.push(fileUrl);
            }
            
            if (ebook.cover_url) {
              const coverUrl = ebook.cover_url.replace(/^.*\//, ''); // Extract filename from URL if needed
              filesToDelete.push(coverUrl);
            }
            
            if (filesToDelete.length > 0) {
              await supabase.storage
                .from('e-books')
                .remove(filesToDelete);
            }
          }
        }
        
        const ebookIds = data.map(ebook => ebook.id);
        const { error: deleteError } = await supabase
          .from('ebooks')
          .delete()
          .in('id', ebookIds);
        
        if (deleteError) {
          throw deleteError;
        }
        
        console.log(`Successfully purged ${data.length} sample ebooks`);
      } else {
        console.log('No sample ebooks found to purge');
      }
    } catch (error) {
      console.error('Error purging sample ebooks:', error);
      throw error;
    }
  }
};
