#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")/.."

# Run the Supabase migrations
npx supabase migration up

# Create the ebooks storage bucket if it doesn't exist
echo "
To complete the setup, you need to:

1. Create an 'ebooks' storage bucket in your Supabase dashboard
2. Create 'files' and 'covers' folders inside the bucket
3. Set the bucket to public access for cover images

Then you can add ebooks through the admin interface at /ebooks/admin
"
