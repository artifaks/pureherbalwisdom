import React, { useEffect, useState } from 'react';
import { Book, Download, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ebook } from '@/types/ebook';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { hasUserPurchasedEbook } from '@/api/purchases';

interface EbookCardProps {
  ebook: Ebook;
  onDownload: (ebook: Ebook) => Promise<boolean | void>;
  isAuthenticated: boolean;
  userId?: string;
}

const EbookCard: React.FC<EbookCardProps> = ({ 
  ebook, 
  onDownload, 
  isAuthenticated,
  userId
}) => {
  const { addToCart, isInCart } = useCart();
  const { toast } = useToast();
  const inCart = isInCart(ebook.id);
  const [userHasPurchased, setUserHasPurchased] = useState(false);

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (userId && ebook?.id) {
        const hasPurchased = await hasUserPurchasedEbook(userId, ebook.id);
        setUserHasPurchased(!!hasPurchased);
      }
    };

    checkPurchaseStatus();
  }, [userId, ebook?.id]);

  const handleAction = async () => {
    if (!isAuthenticated) {
      toast({
        title: 'Login Required',
        description: 'Please log in to purchase ebooks.',
        variant: 'default'
      });

      window.location.href = `/auth?redirectTo=${encodeURIComponent('/ebooks')}&purchaseIntent=true&ebookId=${ebook.id}`;
      return;
    }

    if (!inCart) {
      addToCart({
        id: ebook.id,
        name: ebook.title,
        price: ebook.price || 0,
        image: ebook.cover_image_url
      });

      toast({
        title: 'Added to Cart',
        description: `"${ebook.title}" has been added to your cart.`,
        variant: 'default'
      });
    } else {
      toast({
        title: 'Already in Cart',
        description: `"${ebook.title}" is already in your cart.`,
        variant: 'default'
      });
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-md dark:bg-amber-900/40 dark:border-amber-800/50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 line-clamp-2">
            {ebook.title}
          </h3>
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
            ${ebook.price?.toFixed(2)}
          </Badge>
        </div>
        {ebook.author && (
          <p className="text-sm text-gray-600 dark:text-amber-200/70">
            by {ebook.author}
          </p>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <img
          src={ebook.cover_image_url}
          alt={ebook.title}
          className="w-full h-48 object-cover rounded-md"
        />
      </CardContent>
      <CardFooter className="flex flex-col">
        {userHasPurchased ? (
          <Button
            onClick={() => onDownload(ebook)}
            className="w-full mt-2"
            variant="default"
          >
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        ) : (
          <Button
            onClick={handleAction}
            className="w-full mt-2"
            variant="default"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EbookCard;
