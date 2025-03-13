# Herb Harmony Blog Admin Guide

This guide explains how to use the blog administration features in the Herb Harmony Visualizer.

## Authentication

The blog admin functionality is protected by authentication. Only authorized admin users can create, edit, and delete blog posts.

### Admin User Setup

The system is configured to recognize the following email as an admin user:
- **Admin Email**: artifaks7@gmail.com

To access admin features:
1. Navigate to the login page by clicking "Login" in the top navigation
2. Sign in with your admin credentials (artifaks7@gmail.com)
3. After successful login, you'll have access to the blog admin panel

## Blog Admin Panel

The blog admin panel is available at the top of the blog page when logged in as an admin. It provides the following functionality:

### Viewing Blog Posts
- See a list of all existing blog posts
- View post details including creation date and status

### Creating Blog Posts
1. Click the "Create Post" tab in the admin panel
2. Fill in the required fields:
   - Title (required)
   - Content (required)
   - Excerpt (optional - will be generated from content if not provided)
   - Image URL (optional)
   - Tags (optional - comma separated)
3. Click "Create Post" to publish

### Editing Blog Posts
1. Find the post you want to edit in the post list
2. Click the "Edit" button
3. Modify any fields as needed
4. Click "Update Post" to save changes

### Deleting Blog Posts
1. Find the post you want to delete in the post list
2. Click the "Delete" button
3. Confirm deletion in the dialog that appears

## Database Structure

Blog posts are stored in the `blog_posts` table in Supabase with the following fields:

- `id`: Unique identifier (UUID)
- `title`: Post title
- `content`: Post content (HTML/Markdown supported)
- `excerpt`: Short summary of the post
- `author`: Author name
- `image_url`: URL to the post's featured image
- `tags`: Array of tags associated with the post
- `featured`: Boolean indicating if the post should be featured
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update
- `user_id`: ID of the user who created the post

## Security

The blog admin functionality is secured through:

1. **Authentication**: Only logged-in users can access the admin panel
2. **Authorization**: Only users with the admin role can perform CRUD operations
3. **Row-Level Security (RLS)**: Supabase RLS policies ensure that only admin users can modify blog posts

## Troubleshooting

If you encounter issues with the blog admin functionality:

1. **Can't see admin panel**: Ensure you're logged in with the admin email (artifaks7@gmail.com)
2. **Changes not saving**: Check your network connection and Supabase connectivity
3. **Error messages**: Note any error messages that appear and check the browser console for details

For any persistent issues, please contact the development team.
