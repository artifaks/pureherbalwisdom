import { supabase } from '@/integrations/supabase/client';

interface EbookItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface CheckoutResponse {
  success: boolean;
  url?: string;
  message?: string;
}

/**
 * Creates a Stripe checkout session for purchasing ebooks
 * @param ebooks Array of ebook items to purchase
 * @param userId The ID of the user making the purchase
 * @returns Response with success status and checkout URL
 */
export const createCheckoutSession = async (
  ebooks: EbookItem[],
  userId: string
): Promise<CheckoutResponse> => {
  try {
    console.log('Creating checkout session with ebooks:', ebooks);
    
    // DEVELOPMENT MODE: Simulate successful checkout for local testing
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Development mode: Simulating successful checkout');
      return {
        success: true,
        url: `${window.location.origin}/ebooks?purchase=success&simulate=true`,
      };
    }
    
    // PRODUCTION MODE: Use the real Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: {
        userId,
        items: ebooks,
        successUrl: `${window.location.origin}/ebooks?purchase=success`,
        cancelUrl: `${window.location.origin}/ebooks?purchase=canceled`,
      },
    });

    if (error) {
      console.error('Error creating checkout session:', error);
      return {
        success: false,
        message: error.message || 'Failed to create checkout session',
      };
    }

    if (!data || !data.url) {
      console.error('Invalid response from checkout session:', data);
      return {
        success: false,
        message: 'Invalid response from server',
      };
    }

    return {
      success: true,
      url: data.url,
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred during checkout',
    };
  }
};

/**
 * Records a purchase in the database after successful checkout
 * 
 * @param sessionId The Stripe session ID
 * @param userId The ID of the user who made the purchase
 * @returns A response indicating success or failure
 */
export const recordPurchase = async (
  sessionId: string,
  userId: string
): Promise<{ success: boolean; message: string; error?: any }> => {
  try {
    const { error } = await supabase.functions.invoke('record-purchase', {
      body: {
        sessionId,
        userId
      }
    });

    if (error) {
      return {
        success: false,
        message: 'Failed to record purchase',
        error
      };
    }

    return {
      success: true,
      message: 'Purchase recorded successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
};
