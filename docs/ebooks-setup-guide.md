# Ebooks Feature Setup Guide

This guide will help you set up the Ebooks feature for the Herb Harmony Visualizer project.

## 1. Create the Database Tables

You need to create the necessary database tables in your Supabase project. There are two ways to do this:

### Option 1: Using Supabase CLI (Recommended)

If you have the Supabase CLI set up correctly, you can run:

```bash
npx supabase migration up
```

This will run all the migration scripts in the `supabase/migrations` folder, including:
- `20250311_create_ebooks_table.sql` - Creates the main ebooks table
- `20250311_setup_ebook_categories.sql` - Creates the categories and junction tables
- `20250311_add_price_to_ebooks.sql` - Adds the price column to the ebooks table

### Option 2: Using the Supabase SQL Editor

If you're having issues with the CLI, you can manually run the migration scripts:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy the contents of each migration script from the `supabase/migrations` folder
4. Paste each script into the SQL Editor and run them in order

## 2. Create Storage Buckets

You need to create a storage bucket for ebooks:

1. Go to your Supabase dashboard
2. Navigate to Storage
3. Create a new bucket named "ebooks"
4. Set the following permissions:
   - Public access: Enabled (for cover images)
5. Create two folders inside the bucket:
   - `files` (for storing the actual ebook files)
   - `covers` (for storing cover images)

## 3. Add Sample Ebooks

Once the database tables and storage bucket are set up, you can add ebooks through the admin interface:

1. Go to `/ebooks/admin` in your application
2. Log in as an admin user (the email specified in the RLS policies)
3. Use the form to add some sample ebooks

## 4. Test the Feature

After completing the setup:

1. Navigate to the `/ebooks` page
2. Verify that you can see the list of ebooks
3. Test the search and filter functionality
4. Try downloading an ebook

## Troubleshooting

If you encounter any issues:

- Check the browser console for errors
- Verify that all database tables were created correctly
- Ensure the storage bucket has the correct permissions
- Make sure you're logged in as an admin user when adding ebooks

## Google Authentication

Remember that you've also set up Google authentication using the migration script created earlier (20250311_enable_google_auth.sql). This allows users to log in with their Google accounts to access premium ebooks.

For production, you'll need to create a Google OAuth application in Google Cloud Console and configure the credentials in the Supabase dashboard.
