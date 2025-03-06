
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
  
  // Function to get all ebooks from Supabase
  async getAllEbooks() {
    try {
      const { data, error } = await supabase
        .from('ebooks')
        .select('*')
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
      // Check if migration was ever performed before by checking
      // if there's a record of a deleted ebook or existing ebooks
      const { count: currentCount, error: currentError } = await supabase
        .from('ebooks')
        .select('*', { count: 'exact', head: true });
      
      if (currentError) throw currentError;
      
      // If there are ebooks now, no need to check deletion history
      if (currentCount && currentCount > 0) return true;
      
      // Check if we can find any deleted ebooks in the database history
      // by looking for ebook-related purchase records
      const { count: purchaseCount, error: purchaseError } = await supabase
        .from('purchases')
        .select('*', { count: 'exact', head: true });
      
      if (purchaseError) throw purchaseError;
      
      // If we find any purchase records, it means ebooks existed before
      return purchaseCount > 0;
    } catch (error) {
      console.error('Error checking migration history:', error);
      // Default to false so migration can happen if we can't determine
      return false;
    }
  },
  
  // Function to migrate initial ebooks
  async migrateInitialEbooks(initialEbooks: Ebook[]): Promise<void> {
    try {
      // First check if ebooks table is actually empty
      const { count, error: countError } = await supabase
        .from('ebooks')
        .select('*', { count: 'exact', head: true });
      
      if (countError) {
        throw countError;
      }
      
      // Check if we've already migrated ebooks before (to prevent re-adding after deletion)
      const hasMigratedBefore = await this.hasPreviouslyMigratedEbooks();
      
      // Only proceed with migration if there are no ebooks AND we've never migrated before
      if (count === 0 && !hasMigratedBefore) {
        console.log('Migrating initial ebooks as no previous migration detected');
        
        const ebooksForInsert = initialEbooks.map(ebook => ({
          title: ebook.title,
          description: ebook.description,
          price: parseFloat(ebook.price.replace('$', '')),
          type: ebook.type,
          popular: ebook.popular
        }));
        
        const { error: insertError } = await supabase
          .from('ebooks')
          .insert(ebooksForInsert);
        
        if (insertError) {
          throw insertError;
        }
      }
    } catch (error) {
      console.error('Error migrating initial ebooks:', error);
      throw error;
    }
  },
  
  // Function to delete an ebook
  async deleteEbook(ebookId: string): Promise<void> {
    try {
      // First get the ebook to access its files
      const { data: ebook, error: fetchError } = await supabase
        .from('ebooks')
        .select('file_url, cover_url')
        .eq('id', ebookId)
        .maybeSingle();
      
      if (fetchError) {
        throw fetchError;
      }
      
      // Delete the ebook from the database
      const { error: deleteError } = await supabase
        .from('ebooks')
        .delete()
        .eq('id', ebookId);
      
      if (deleteError) {
        throw deleteError;
      }
      
      // Delete associated files if they exist
      if (ebook) {
        const filesToDelete = [];
        
        if (ebook.file_url) {
          filesToDelete.push(ebook.file_url);
        }
        
        if (ebook.cover_url) {
          filesToDelete.push(ebook.cover_url);
        }
        
        if (filesToDelete.length > 0) {
          const { error: storageError } = await supabase.storage
            .from('e-books')
            .remove(filesToDelete);
          
          if (storageError) {
            console.error('Error deleting files:', storageError);
            // Continue execution even if file deletion fails
          }
        }
      }
      
    } catch (error) {
      console.error('Error deleting ebook:', error);
      throw error;
    }
  }
};
