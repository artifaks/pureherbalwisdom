
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
      
      // Only proceed with migration if there are no ebooks
      if (count === 0) {
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
  }
};
