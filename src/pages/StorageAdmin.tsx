import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { organizeStorageFiles } from '@/utils/organizeStorageFiles';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface StorageStats {
  rootFiles: number;
  filesInFilesFolder: number;
  filesInCoversFolder: number;
}

const StorageAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<StorageStats | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const checkStorageStatus = async () => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      // Check root files
      const { data: rootFiles, error: rootError } = await supabase.storage
        .from('ebooks')
        .list('');
      
      if (rootError) throw rootError;
      
      // Check files folder
      const { data: filesInFolder, error: filesError } = await supabase.storage
        .from('ebooks')
        .list('files');
      
      if (filesError && filesError.message !== 'The resource was not found') throw filesError;
      
      // Check covers folder
      const { data: coversInFolder, error: coversError } = await supabase.storage
        .from('ebooks')
        .list('covers');
      
      if (coversError && coversError.message !== 'The resource was not found') throw coversError;
      
      // Filter out folders from root files count
      const actualRootFiles = rootFiles?.filter(file => file.id !== null) || [];
      
      setStats({
        rootFiles: actualRootFiles.length,
        filesInFilesFolder: filesInFolder?.length || 0,
        filesInCoversFolder: coversInFolder?.length || 0
      });
      
      setMessage('Storage status checked successfully');
    } catch (error: any) {
      console.error('Error checking storage status:', error);
      setMessage(`Error: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrganize = async () => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      await organizeStorageFiles();
      setMessage('Files organized successfully');
      // Refresh stats after organizing
      await checkStorageStatus();
    } catch (error: any) {
      console.error('Error organizing files:', error);
      setMessage(`Error: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 text-amber-800 dark:text-amber-300">
        Storage Administration
      </h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Storage Organization</CardTitle>
          <CardDescription>
            Organize your storage files into the proper folder structure for the ebooks feature.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This utility will move your existing files in the Supabase storage bucket into the proper folders:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Files starting with "cover_" will be moved to the "covers" folder</li>
            <li>All other files will be moved to the "files" folder</li>
          </ul>
          
          {stats && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <h3 className="font-medium mb-2">Current Storage Status:</h3>
              <p>Files in root directory: {stats.rootFiles}</p>
              <p>Files in "files" folder: {stats.filesInFilesFolder}</p>
              <p>Files in "covers" folder: {stats.filesInCoversFolder}</p>
            </div>
          )}
          
          {message && (
            <div className={`mt-4 p-3 rounded-md ${message.startsWith('Error') ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300' : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'}`}>
              {message}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={checkStorageStatus}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Check Status
          </Button>
          <Button 
            onClick={handleOrganize}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Organize Files
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Storage Management Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6">
            <li className="mb-2">
              <strong>File Structure:</strong> Keep all ebook files in the "files" folder and cover images in the "covers" folder.
            </li>
            <li className="mb-2">
              <strong>Naming Convention:</strong> Cover images should start with "cover_" followed by a unique identifier.
            </li>
            <li className="mb-2">
              <strong>File Types:</strong> Ebooks should be PDF files, and covers should be image files (JPG, PNG).
            </li>
            <li className="mb-2">
              <strong>File Size:</strong> Keep files under 50MB to avoid upload issues with Supabase.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorageAdmin;
