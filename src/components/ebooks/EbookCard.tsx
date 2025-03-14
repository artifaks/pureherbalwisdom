import React from 'react';
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
  userId?: string; // Add userId prop
}

const EbookCard: React.FC<EbookCardProps> = ({ 
  ebook, 
  onDownload, 
  isAuthenticated,
  userId
}) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toast } = useToast();
  const inCart = isInCart(ebook.id);

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

      <CardContent className="flex-grow pb-3">
        <div className="bg-amber-100 dark:bg-amber-800/30 rounded-md p-6 mb-4 flex justify-center items-center">
          {ebook.cover_image_url ? (
            <img 
              src={ebook.cover_image_url} 
              alt={`${ebook.title} cover`} 
              className="max-h-48 max-w-full object-contain"
            />
          ) : (
            <Book className="h-24 w-24 text-amber-400 dark:text-amber-600" />
          )}
        </div>

        <p className="text-gray-700 dark:text-amber-200/90 text-sm line-clamp-3 mb-2">
          {ebook.description}
        </p>

        <div className="flex flex-wrap gap-1 mt-2">
          {ebook.categories?.map(category => (
            <Badge key={category.id} variant="outline" className="text-xs border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300">
              {category.name}
            </Badge>
          ))}
          {ebook.tags && ebook.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs border-gray-300 dark:border-amber-700/50 text-gray-600 dark:text-amber-200/70">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-amber-200/70">
          {ebook.file_type && (
            <span className="mr-2">{ebook.file_type}</span>
          )}
          {ebook.file_size && (
            <span>{Math.round(ebook.file_size / 1024 / 1024 * 10) / 10} MB</span>
          )}
        </div>

        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={handleAction}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {!isAuthenticated ? 'Sign In' : `Purchase ($${ebook.price?.toFixed(2)})`}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EbookCard;
