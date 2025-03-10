
import { supabase } from '@/integrations/supabase/client';

export const paymentService = {
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
        await paymentService.createPurchaseRecord(userId, ebookId, data.sessionId);
      }
      
      // Return the URL for redirection
      return data?.url || null;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }
};
