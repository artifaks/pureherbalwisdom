import React, { useState } from 'react';
import { ShoppingCart, X, CheckCircle, Loader2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { createCheckoutSession } from '@/api/stripe';

const ShoppingCartComponent: React.FC = () => {
  const { items, totalItems, totalPrice, removeFromCart, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const navigate = useNavigate();

  // Function to handle checkout process
  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to complete your purchase.',
        variant: 'destructive'
      });
      // Redirect to auth page with purchase intent
      navigate(`/auth?redirectTo=${encodeURIComponent('/ebooks')}&purchaseIntent=true`);
      return;
    }
    
    if (items.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Add some items to your cart before checking out.',
        variant: 'default'
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Create a checkout session with Stripe
      const ebooks = items.map(item => ({
        id: item.id,
        title: item.name,
        price: item.price,
        quantity: 1
      }));
      
      console.log('Creating checkout session with ebooks:', ebooks);
      
      const response = await createCheckoutSession(ebooks, user.id);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to create checkout session');
      }
      
      // Redirect to Stripe checkout
      if (response.url) {
        window.location.href = response.url;
      } else {
        throw new Error('No checkout URL returned');
      }
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Checkout failed',
        description: error instanceof Error ? error.message : 'An error occurred during checkout',
        variant: 'destructive'
      });
      setIsProcessing(false);
    }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative border-amber-400 text-amber-700 dark:border-amber-700 dark:text-amber-300"
          onClick={() => setIsOpen(true)}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-white dark:bg-amber-950">
        <SheetHeader>
          <SheetTitle className="text-amber-800 dark:text-amber-300">Your Shopping Cart</SheetTitle>
        </SheetHeader>
        
        {purchaseSuccess ? (
          <div className="flex flex-col items-center justify-center h-60">
            <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-300 text-center">
              Thank you for your purchase!
            </h3>
            <p className="text-gray-600 dark:text-amber-200/70 text-center mt-2">
              Your e-books are now available for download
            </p>
            <Button
              className="mt-6 bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => {
                clearCart();
                setIsOpen(false);
                setPurchaseSuccess(false);
                // Navigate to the ebooks page to show their purchases
                navigate('/ebooks');
              }}
            >
              View My E-Books
            </Button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60">
            <ShoppingCart className="h-12 w-12 text-amber-300 dark:text-amber-700 mb-4" />
            <p className="text-gray-600 dark:text-amber-200/70 text-center">
              Your cart is empty
            </p>
            <p className="text-gray-500 dark:text-amber-200/50 text-sm text-center mt-1">
              Add some e-books to get started
            </p>
          </div>
        ) : (
          <div className="mt-6 flex flex-col h-[calc(100vh-10rem)]">
            <div className="flex-grow overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center py-3 border-b border-amber-100 dark:border-amber-800/50"
                >
                  <div className="h-14 w-14 bg-amber-100 dark:bg-amber-800/30 rounded-md flex items-center justify-center overflow-hidden mr-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ShoppingCart className="h-6 w-6 text-amber-400 dark:text-amber-600" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-amber-800 dark:text-amber-300 font-medium">{item.name}</h4>
                    <p className="text-amber-600 dark:text-amber-400">${item.price.toFixed(2)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-red-500 dark:text-amber-200/70 dark:hover:text-red-400"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-auto pt-4 border-t border-amber-100 dark:border-amber-800/50">
              <div className="flex justify-between mb-3">
                <span className="text-gray-600 dark:text-amber-200/70">Subtotal</span>
                <span className="text-amber-800 dark:text-amber-300 font-semibold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-gray-600 dark:text-amber-200/70">Total</span>
                <span className="text-amber-800 dark:text-amber-300 text-lg font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              
              <div className="space-y-3">
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  disabled={isProcessing}
                  onClick={handleCheckout}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-300"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartComponent;
