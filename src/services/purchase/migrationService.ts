
import { Ebook } from '@/types/ebook';
import { supabase } from '@/integrations/supabase/client';

export const migrationService = {
  // Function to check if initial migration was already done
  async hasPreviouslyMigratedEbooks(): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      console.error('Error checking migration history:', error);
      return true;
    }
  },
  
  // Function to migrate initial ebooks - this will now be disabled
  async migrateInitialEbooks(initialEbooks: Ebook[]): Promise<void> {
    console.log('Migration disabled - not adding sample ebooks');
    return;
  },
  
  // Function to purge sample ebooks
  async purgeSampleEbooks(): Promise<void> {
    try {
      const sampleTitles = [
        "Medicinal Herbs Field Guide",
        "Herbal Preparations & Remedies",
        "Herbs for Heart Health",
        "Women's Herbal Wellness",
        "Digestive Healing with Herbs",
        "Seasonal Foraging Calendar"
      ];
      
      const { data, error } = await supabase
        .from('ebooks')
        .select('id, title, file_url, cover_url')
        .in('title', sampleTitles);
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        console.log(`Found ${data.length} sample ebooks to purge`);
        
        for (const ebook of data) {
          if (ebook.file_url || ebook.cover_url) {
            const filesToDelete = [];
            
            if (ebook.file_url) {
              const fileUrl = ebook.file_url.replace(/^.*\//, ''); // Extract filename from URL if needed
              filesToDelete.push(fileUrl);
            }
            
            if (ebook.cover_url) {
              const coverUrl = ebook.cover_url.replace(/^.*\//, ''); // Extract filename from URL if needed
              filesToDelete.push(coverUrl);
            }
            
            if (filesToDelete.length > 0) {
              await supabase.storage
                .from('e-books')
                .remove(filesToDelete);
            }
          }
        }
        
        const ebookIds = data.map(ebook => ebook.id);
        const { error: deleteError } = await supabase
          .from('ebooks')
          .delete()
          .in('id', ebookIds);
        
        if (deleteError) {
          throw deleteError;
        }
        
        console.log(`Successfully purged ${data.length} sample ebooks`);
      } else {
        console.log('No sample ebooks found to purge');
      }
    } catch (error) {
      console.error('Error purging sample ebooks:', error);
      throw error;
    }
  }
};
