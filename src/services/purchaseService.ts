
import { supabase } from '@/integrations/supabase/client';
import { Ebook } from '@/types/ebook';

export const purchaseService = {
  async createPurchaseRecord(userId: string, ebookId: string | number, stripeSessionId: string) {
    return await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        ebook_id: ebookId,
        stripe_session_id: stripeSessionId,
        payment_status: 'pending'
      });
  },

  async checkPurchaseStatus(userId: string, ebookId: string | number) {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', userId)
      .eq('ebook_id', ebookId)
      .eq('payment_status', 'completed')
      .single();
    
    if (error && error.code !== 'PGRST116') {
      // PGRST116 is the error for no rows returned
      console.error('Error checking purchase status:', error);
    }
    
    return !!data; // Return true if purchase exists and is completed
  },

  async verifyPurchase(userId: string, ebookId: string | number, sessionId: string) {
    try {
      const response = await supabase.functions.invoke('verify-purchase', {
        body: { userId, ebookId, sessionId }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error verifying purchase:', error);
      throw error;
    }
  },

  async getAllEbooks() {
    const { data, error } = await supabase
      .from('ebooks')
      .select('*');
    
    if (error) {
      console.error('Error fetching ebooks:', error);
      throw error;
    }
    
    return data;
  },

  async migrateInitialEbooks(ebooks: Ebook[]) {
    // This function will migrate the initial ebooks data to the database
    const { data, error } = await supabase
      .from('ebooks')
      .select('*');
    
    if (error) {
      console.error('Error checking ebooks:', error);
      return false;
    }
    
    // Only migrate if there are no ebooks yet
    if (data && data.length === 0) {
      const ebooksToInsert = ebooks.map(book => ({
        title: book.title,
        description: book.description,
        price: parseFloat(book.price.replace('$', '')),
        type: book.type,
        popular: book.popular,
        file_url: book.fileUrl
      }));
      
      const { error: insertError } = await supabase
        .from('ebooks')
        .insert(ebooksToInsert);
      
      if (insertError) {
        console.error('Error migrating ebooks:', insertError);
        return false;
      }
      
      return true;
    }
    
    return false;
  }
};
