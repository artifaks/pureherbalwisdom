import React, { useRef, useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  disabled?: boolean;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, disabled }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;

    // Compress if larger than 4MB
    const base64 = await fileToBase64(file);
    if (file.size > 4 * 1024 * 1024) {
      const compressed = await compressImage(base64);
      setPreview(compressed);
      onImageSelected(compressed);
    } else {
      setPreview(base64);
      onImageSelected(base64);
    }
  };

  const compressImage = (base64: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width *= ratio;
          height *= ratio;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = base64;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearImage = () => {
    setPreview(null);
    if (cameraRef.current) cameraRef.current.value = '';
    if (uploadRef.current) uploadRef.current.value = '';
  };

  if (preview) {
    return (
      <div className="relative">
        <img
          src={preview}
          alt="Selected plant"
          className="w-full max-h-80 object-contain rounded-xl border-2 border-emerald-200 dark:border-emerald-700"
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full"
          onClick={clearImage}
          disabled={disabled}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-xl p-8 text-center bg-emerald-50/50 dark:bg-emerald-900/20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center">
          <Camera className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Identify a Plant
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Take a photo or upload an image of a plant to identify it
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          <Button
            onClick={() => cameraRef.current?.click()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Camera className="h-4 w-4 mr-2" />
            Take Photo
          </Button>
          <Button
            variant="outline"
            onClick={() => uploadRef.current?.click()}
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-600 dark:text-emerald-400 dark:hover:bg-emerald-900/40"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
        </div>
      </div>

      <input
        ref={cameraRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        className="hidden"
        onChange={handleInputChange}
      />
      <input
        ref={uploadRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ImageUploader;
