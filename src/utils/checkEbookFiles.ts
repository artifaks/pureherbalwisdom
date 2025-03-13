import { supabase } from '@/integrations/supabase/client';

interface Ebook {
  id: string;
  title: string;
  file_url: string | null;
  cover_url: string | null;
}

export interface EbookFileStatus {
  id: string;
  title: string;
  fileExists: boolean;
  coverExists: boolean;
  fileUrl: string | null;
  coverUrl: string | null;
}

/**
 * Checks if a file exists in Supabase storage
 * @param path Path to the file in storage
 * @param bucket Name of the storage bucket
 * @returns Boolean indicating if the file exists
 */
const checkFileExists = async (path: string | null, bucket: string): Promise<boolean> => {
  if (!path) return false;
  
  try {
    const { data, error } = await supabase.storage.from(bucket).download(path);
    
    if (error) {
      console.log(`Error checking file ${path}:`, error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error(`Error checking file ${path}:`, error);
    return false;
  }
};

/**
 * Checks all ebooks for missing files and covers
 * @returns Array of ebook status objects
 */
export const checkEbookFiles = async (): Promise<EbookFileStatus[]> => {
  try {
    // Fetch all ebooks from the database
    const { data: ebooks, error } = await supabase
      .from('ebooks')
      .select('id, title, file_url, cover_url');
    
    if (error) {
      console.error('Error fetching ebooks:', error);
      return [];
    }
    
    if (!ebooks || ebooks.length === 0) {
      console.log('No ebooks found in the database');
      return [];
    }
    
    // Check each ebook's files
    const results = await Promise.all(
      ebooks.map(async (ebook) => {
        // Type assertion to ensure ebook has the expected structure
        const ebookData = ebook as unknown as Ebook;
        
        const fileExists = await checkFileExists(ebookData.file_url, 'ebooks');
        const coverExists = await checkFileExists(ebookData.cover_url, 'ebooks');
        
        return {
          id: ebookData.id,
          title: ebookData.title,
          fileExists,
          coverExists,
          fileUrl: ebookData.file_url,
          coverUrl: ebookData.cover_url
        };
      })
    );
    
    return results;
  } catch (error) {
    console.error('Error checking ebook files:', error);
    return [];
  }
};

/**
 * Creates the necessary storage buckets and folders for ebooks
 * @returns Object with success status and message
 */
export const setupEbookStorage = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // Check if the ebooks bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      return { success: false, message: `Error checking buckets: ${bucketsError.message}` };
    }
    
    const ebooksBucketExists = buckets.some(bucket => bucket.name === 'ebooks');
    
    // Create the ebooks bucket if it doesn't exist
    if (!ebooksBucketExists) {
      const { error: createError } = await supabase.storage.createBucket('ebooks', {
        public: true,
        fileSizeLimit: 50000000 // 50MB limit
      });
      
      if (createError) {
        return { success: false, message: `Error creating ebooks bucket: ${createError.message}` };
      }
      
      console.log('Created ebooks bucket');
    }
    
    // Create folders if they don't exist (by uploading empty placeholder files)
    const folders = ['files', 'covers'];
    
    for (const folder of folders) {
      // Check if folder exists by listing files with the folder prefix
      const { data: folderFiles, error: folderError } = await supabase.storage
        .from('ebooks')
        .list(folder);
      
      if (folderError && folderError.message !== 'The resource was not found') {
        return { success: false, message: `Error checking ${folder} folder: ${folderError.message}` };
      }
      
      // If folder doesn't exist or is empty, create it with a placeholder
      if (!folderFiles || folderFiles.length === 0) {
        // Create an empty file
        const emptyFile = new Blob([''], { type: 'text/plain' });
        
        // Upload the empty file to create the folder
        const { error: uploadError } = await supabase.storage
          .from('ebooks')
          .upload(`${folder}/.placeholder`, emptyFile, {
            upsert: true
          });
        
        if (uploadError) {
          return { success: false, message: `Error creating ${folder} folder: ${uploadError.message}` };
        }
        
        console.log(`Created ${folder} folder`);
      }
    }
    
    return { success: true, message: 'Ebook storage setup completed successfully' };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, message: `Error setting up ebook storage: ${errorMessage}` };
  }
};

/**
 * Utility function to fix file paths in the database
 * This can be used if the file paths don't match the actual files in storage
 * @param id ID of the ebook to update
 * @param fileUrl New file URL
 * @param coverUrl New cover URL
 * @returns Object with success status and message
 */
export const updateEbookFilePaths = async (
  id: string,
  fileUrl: string | null,
  coverUrl: string | null
): Promise<{ success: boolean; message: string }> => {
  try {
    const { error } = await supabase
      .from('ebooks')
      .update({
        file_url: fileUrl,
        cover_url: coverUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
    
    if (error) {
      return { success: false, message: `Error updating ebook: ${error.message}` };
    }
    
    return { success: true, message: 'Ebook file paths updated successfully' };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, message: `Error updating ebook file paths: ${errorMessage}` };
  }
};
