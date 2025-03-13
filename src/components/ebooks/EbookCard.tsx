import React from 'react';
import { Ebook } from '@/types/ebook';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Lock, BookOpen, File } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';

interface EbookCardProps {
  ebook: Ebook;
  onDownload: () => void;
  isAuthenticated: boolean;
}

const EbookCard: React.FC<EbookCardProps> = ({ ebook, onDownload, isAuthenticated }) => {
  // Determine if user can download this ebook
  const canDownload = !ebook.is_premium || isAuthenticated;
  
  // Format the file size for display
  const formattedSize = ebook.file_size ? formatFileSize(ebook.file_size) : 'Unknown size';
  
  // Get file extension for display
  const fileExtension = ebook.file_type.toUpperCase();
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white dark:bg-amber-900/40 border-amber-100 dark:border-amber-800/50 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden bg-amber-100 dark:bg-amber-800/30">
        {ebook.cover_image_url ? (
          <img 
            src={ebook.cover_image_url} 
            alt={ebook.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <BookOpen className="h-20 w-20 text-amber-300 dark:text-amber-700" />
          </div>
        )}
        
        {ebook.is_premium && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Premium
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 line-clamp-2">{ebook.title}</h3>
        {ebook.author && (
          <p className="text-sm text-gray-600 dark:text-amber-200/70">By {ebook.author}</p>
        )}
      </CardHeader>
      
      <CardContent className="flex-grow">
        {ebook.description && (
          <p className="text-gray-600 dark:text-amber-200/80 text-sm line-clamp-3 mb-3">
            {ebook.description}
          </p>
        )}
        
        <div className="flex items-center text-xs text-gray-500 dark:text-amber-200/60 mt-2">
          <File className="h-3 w-3 mr-1" />
          <span>{fileExtension} • {formattedSize}</span>
        </div>
        
        {ebook.tags && ebook.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {ebook.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-amber-50 dark:bg-amber-900/60 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300">
                {tag}
              </Badge>
            ))}
            {ebook.tags.length > 3 && (
              <Badge variant="outline" className="text-xs bg-amber-50 dark:bg-amber-900/60 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300">
                +{ebook.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 border-t border-amber-100 dark:border-amber-800/30">
        <Button 
          onClick={onDownload}
          className={`w-full flex items-center justify-center gap-2 ${
            canDownload 
              ? 'bg-amber-600 hover:bg-amber-700 text-white' 
              : 'bg-amber-200 dark:bg-amber-800 text-amber-700 dark:text-amber-300 cursor-not-allowed'
          }`}
          disabled={!canDownload}
        >
          {canDownload ? (
            <>
              <Download className="h-4 w-4" />
              Download
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Sign in to Download
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EbookCard;
