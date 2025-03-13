import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const setupEbooksDatabase = async () => {
  try {
    // We'll use local default categories instead of trying to create tables
    // since we don't have permission to create tables directly
    
    // Just notify the user that they need to set up the database tables
    toast({
      title: 'Database Setup Required',
      description: 'The ebooks feature requires database tables to be set up. Please run the migration scripts in the supabase/migrations folder.',
      variant: 'default'
    });
    
    // Check if storage bucket exists
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets();
    
    if (bucketsError) {
      console.error('Error checking storage buckets:', bucketsError);
      toast({
        title: 'Storage Setup Required',
        description: 'Please create an "ebooks" storage bucket in Supabase with "files" and "covers" folders.',
        variant: 'default'
      });
    } else {
      const ebooksBucketExists = buckets?.some(bucket => bucket.name === 'ebooks');
      
      if (!ebooksBucketExists) {
        toast({
          title: 'Storage Setup Required',
          description: 'Please create an "ebooks" storage bucket in Supabase with "files" and "covers" folders.',
          variant: 'default'
        });
      }
    }

    return true;
  } catch (error) {
    console.error('Error checking database setup:', error);
    toast({
      title: 'Database Setup Error',
      description: 'An error occurred while checking the database setup.',
      variant: 'destructive'
    });
    return false;
  }
};
