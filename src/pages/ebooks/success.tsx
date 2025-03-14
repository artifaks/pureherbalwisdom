import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainNavigation from '@/components/MainNavigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, ArrowRight, BookOpen } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/contexts/CartContext';
import { recordPurchase } from '@/api/stripe';

const EbookPurchaseSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get the session ID from the URL
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const processPayment = async () => {
      if (!sessionId || !user) {
        setIsProcessing(false);
        return;
      }

      try {
        // Record the purchase in our database
        const result = await recordPurchase(sessionId, user.id);

        if (result.success) {
          setIsSuccess(true);
          // Clear the cart after successful purchase
          clearCart();
          
          toast({
            title: "Purchase Successful",
            description: "Thank you for your purchase! Your ebooks are now available in your library.",
            variant: "default",
          });
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        toast({
          title: "Payment Processing Error",
          description: "There was an error processing your payment. Please contact support.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    };

    processPayment();
  }, [sessionId, user, clearCart, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-amber-900">
      <MainNavigation />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-amber-900/40 rounded-lg shadow-md p-8 text-center">
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mb-4"></div>
              <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-300">
                Processing your purchase...
              </h2>
              <p className="text-gray-600 dark:text-amber-200/70 mt-2">
                Please wait while we confirm your payment.
              </p>
            </div>
          ) : isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-4">
                Thank You for Your Purchase!
              </h2>
              <p className="text-gray-600 dark:text-amber-200/70 max-w-md mx-auto mb-8">
                Your ebooks are now available in your library. You can access them at any time from the Ebooks page.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => navigate('/ebooks')}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Go to My Ebooks
                </Button>
                <Button 
                  variant="outline"
                  className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
                  onClick={() => navigate('/')}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Continue Browsing
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-300 mb-4">
                Payment Processing Error
              </h2>
              <p className="text-gray-600 dark:text-amber-200/70 max-w-md mx-auto mb-8">
                There was an error processing your payment. Please try again or contact support if the issue persists.
              </p>
              
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => navigate('/ebooks')}
              >
                Return to Ebooks
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EbookPurchaseSuccess;
