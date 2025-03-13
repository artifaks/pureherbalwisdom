# Setting Up Ebooks Storage in Supabase

This guide will walk you through setting up the storage buckets needed for the Ebooks feature in Herb Harmony Visualizer.

## Prerequisites

- Supabase project set up and running
- Access to the Supabase dashboard

## Steps to Set Up Ebooks Storage

1. **Access the Storage Section**
   - Log in to your Supabase dashboard
   - Navigate to the "Storage" section in the left sidebar

2. **Create the Ebooks Bucket**
   - Click "New Bucket"
   - Name the bucket `ebooks`
   - Check "Public bucket" to allow public access to cover images
   - Click "Create bucket"

3. **Create Folders Inside the Bucket**
   - Inside the `ebooks` bucket, create two folders:
     - `files` (for storing the actual ebook files)
     - `covers` (for storing cover images)

4. **Configure Access Control**
   - Navigate to "Policies" tab within the Storage section
   - For the `ebooks` bucket, create the following policies:

   **For cover images (public access):**
   ```sql
   -- Allow anyone to read cover images
   CREATE POLICY "Public can view cover images" 
   ON storage.objects FOR SELECT 
   USING (bucket_id = 'ebooks' AND path LIKE 'covers/%');
   ```

   **For ebook files (restricted access):**
   ```sql
   -- Allow authenticated users to read ebook files
   CREATE POLICY "Authenticated users can download ebooks" 
   ON storage.objects FOR SELECT 
   USING (bucket_id = 'ebooks' AND path LIKE 'files/%' AND auth.role() = 'authenticated');
   
   -- Allow admins to upload/update/delete ebook files
   CREATE POLICY "Only admins can upload ebooks" 
   ON storage.objects FOR INSERT 
   WITH CHECK (bucket_id = 'ebooks' AND EXISTS (
     SELECT 1 FROM auth.users
     JOIN public.admin_users ON auth.users.email = admin_users.email
     WHERE auth.users.id = auth.uid()
   ));
   
   CREATE POLICY "Only admins can update ebooks" 
   ON storage.objects FOR UPDATE 
   USING (bucket_id = 'ebooks' AND EXISTS (
     SELECT 1 FROM auth.users
     JOIN public.admin_users ON auth.users.email = admin_users.email
     WHERE auth.users.id = auth.uid()
   ));
   
   CREATE POLICY "Only admins can delete ebooks" 
   ON storage.objects FOR DELETE 
   USING (bucket_id = 'ebooks' AND EXISTS (
     SELECT 1 FROM auth.users
     JOIN public.admin_users ON auth.users.email = admin_users.email
     WHERE auth.users.id = auth.uid()
   ));
   ```

## Testing the Setup

After setting up the storage bucket and policies, you can test the setup by:

1. Going to the Ebooks Admin page (`/ebooks/admin`)
2. Adding a new ebook with a cover image and file
3. Verifying that the ebook appears on the Ebooks page (`/ebooks`)
4. Testing the download functionality for both free and premium ebooks

## Troubleshooting

If you encounter issues with the storage setup:

- Check that the bucket name is exactly `ebooks` (case-sensitive)
- Verify that the folders `files` and `covers` exist within the bucket
- Ensure that the RLS policies are correctly applied
- Check the browser console for any errors related to storage access
