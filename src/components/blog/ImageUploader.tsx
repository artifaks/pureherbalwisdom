import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Upload, Image as ImageIcon, X, Check } from 'lucide-react';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  existingImageUrl?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, existingImageUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(existingImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file (JPEG, PNG, etc.)',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Image must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    // Create a preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Upload to Supabase
    await uploadImage(file);

    // Clean up preview URL
    return () => URL.revokeObjectURL(objectUrl);
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      // First, check if the bucket exists and create it if it doesn't
      try {
        // Try to create the bucket (this will fail if it already exists, which is fine)
        await supabase.storage.createBucket('images', {
          public: true,
          fileSizeLimit: 5242880, // 5MB
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
        });
        
        console.log('Successfully created images bucket');
        // Note: Policies need to be created through migrations or the Supabase dashboard
        // We can't create them directly from the client
      } catch (bucketError: any) {
        // If error is not about bucket already existing, log it
        if (!bucketError.message?.includes('already exists')) {
          console.warn('Bucket creation warning:', bucketError);
        } else {
          console.log('Bucket already exists, continuing with upload');
        }
        // Continue anyway - we'll try to upload regardless
      }

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
        
      // Set upload to complete since we can't track progress
      setUploadProgress(100);

      if (error) throw error;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // Pass the URL to the parent component
      onImageUploaded(publicUrl);

      toast({
        title: 'Upload successful',
        description: 'Image has been uploaded successfully',
        variant: 'default',
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="image-upload" className="block mb-2">
        Featured Image
      </Label>

      {previewUrl ? (
        <div className="relative">
          <div className="relative rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 aspect-video bg-gray-100 dark:bg-gray-800">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 rounded-full h-8 w-8"
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4">
                <p className="mb-2">Uploading... {uploadProgress}%</p>
                <Progress value={uploadProgress} className="w-full h-2" />
              </div>
            )}
            {!isUploading && previewUrl && (
              <div className="absolute bottom-2 right-2 bg-green-500 text-white rounded-full p-1">
                <Check className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ImageIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
            Drag and drop an image, or click to select
          </p>
          <Button
            type="button"
            variant="outline"
            className="bg-white dark:bg-gray-800"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Select Image'}
          </Button>
        </div>
      )}

      <Input
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />

      {!previewUrl && existingImageUrl && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          <p>Current image: {existingImageUrl.split('/').pop()}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
