import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

/**
 * Organizes existing files in the ebooks bucket into the proper folder structure
 * - Moves non-cover files to the 'files' folder
 * - Moves cover images to the 'covers' folder
 */
export const organizeStorageFiles = async (): Promise<void> => {
  try {
    // Step 1: Create folders if they don't exist
    await createFolders();
    
    // Step 2: List all files in the root of the bucket
    const { data: files, error } = await supabase.storage
      .from('ebooks')
      .list('');
    
    if (error) {
      console.error('Error listing files:', error);
      toast({
        title: 'Error',
        description: 'Failed to list files in storage bucket',
        variant: 'destructive'
      });
      return;
    }
    
    if (!files || files.length === 0) {
      toast({
        title: 'No Files Found',
        description: 'No files found in the root of the storage bucket',
        variant: 'default'
      });
      return;
    }
    
    console.log('Found files:', files);
    
    // Step 3: Process each file
    let successCount = 0;
    let errorCount = 0;
    
    for (const file of files) {
      // Skip folders
      if (file.id === null) continue;
      
      const fileName = file.name;
      
      // Determine target folder
      const targetFolder = fileName.startsWith('cover_') ? 'covers' : 'files';
      
      try {
        // Step 3.1: Copy the file to the new location
        const { error: copyError } = await supabase.storage
          .from('ebooks')
          .copy(fileName, `${targetFolder}/${fileName}`);
        
        if (copyError) {
          console.error(`Error copying ${fileName}:`, copyError);
          errorCount++;
          continue;
        }
        
        // Step 3.2: Delete the original file
        const { error: deleteError } = await supabase.storage
          .from('ebooks')
          .remove([fileName]);
        
        if (deleteError) {
          console.error(`Error deleting ${fileName}:`, deleteError);
          errorCount++;
          continue;
        }
        
        console.log(`Successfully moved ${fileName} to ${targetFolder}/`);
        successCount++;
      } catch (err) {
        console.error(`Error processing ${fileName}:`, err);
        errorCount++;
      }
    }
    
    // Step 4: Show results
    if (successCount > 0) {
      toast({
        title: 'Files Organized',
        description: `Successfully moved ${successCount} files to the proper folders`,
        variant: 'default'
      });
    }
    
    if (errorCount > 0) {
      toast({
        title: 'Some Errors Occurred',
        description: `Failed to move ${errorCount} files. Check console for details.`,
        variant: 'destructive'
      });
    }
  } catch (error) {
    console.error('Error organizing files:', error);
    toast({
      title: 'Error',
      description: 'An unexpected error occurred while organizing files',
      variant: 'destructive'
    });
  }
};

/**
 * Creates the necessary folders in the ebooks bucket
 */
const createFolders = async (): Promise<void> => {
  try {
    // Check if folders already exist
    const { data: folders, error } = await supabase.storage
      .from('ebooks')
      .list('');
    
    if (error) {
      console.error('Error checking folders:', error);
      return;
    }
    
    const filesFolder = folders?.find(f => f.name === 'files' && f.id === null);
    const coversFolder = folders?.find(f => f.name === 'covers' && f.id === null);
    
    // Create 'files' folder if it doesn't exist
    if (!filesFolder) {
      const { error: createFilesError } = await supabase.storage
        .from('ebooks')
        .upload('files/.keep', new Blob(['']));
      
      if (createFilesError) {
        console.error('Error creating files folder:', createFilesError);
      } else {
        console.log('Created files folder');
      }
    }
    
    // Create 'covers' folder if it doesn't exist
    if (!coversFolder) {
      const { error: createCoversError } = await supabase.storage
        .from('ebooks')
        .upload('covers/.keep', new Blob(['']));
      
      if (createCoversError) {
        console.error('Error creating covers folder:', createCoversError);
      } else {
        console.log('Created covers folder');
      }
    }
  } catch (error) {
    console.error('Error creating folders:', error);
  }
};
