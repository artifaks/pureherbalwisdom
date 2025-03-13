-- Add new columns to blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS author TEXT;

-- Create index for faster searching
CREATE INDEX IF NOT EXISTS blog_posts_title_idx ON blog_posts USING GIN (to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS blog_posts_content_idx ON blog_posts USING GIN (to_tsvector('english', content));
CREATE INDEX IF NOT EXISTS blog_posts_tags_idx ON blog_posts USING GIN (tags);

-- Add RLS policies for blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy for reading blog posts (anyone can read)
CREATE POLICY "Anyone can read blog posts" 
ON blog_posts FOR SELECT 
USING (true);

-- Policy for inserting blog posts (only authenticated users with admin role)
CREATE POLICY "Only admins can insert blog posts" 
ON blog_posts FOR INSERT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.role = 'admin'
  )
);

-- Policy for updating blog posts (only admins or the post creator)
CREATE POLICY "Only admins or post creator can update blog posts" 
ON blog_posts FOR UPDATE 
TO authenticated
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.role = 'admin'
  )
);

-- Policy for deleting blog posts (only admins or the post creator)
CREATE POLICY "Only admins or post creator can delete blog posts" 
ON blog_posts FOR DELETE 
TO authenticated
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.role = 'admin'
  )
);
