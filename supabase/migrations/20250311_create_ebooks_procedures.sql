-- Create a stored procedure to create the ebooks table
CREATE OR REPLACE FUNCTION public.create_ebooks_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create ebooks table if it doesn't exist
  CREATE TABLE IF NOT EXISTS public.ebooks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      description TEXT,
      author TEXT,
      cover_image_url TEXT,
      file_url TEXT NOT NULL,
      file_type TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      is_premium BOOLEAN DEFAULT false,
      price DECIMAL(10, 2) DEFAULT NULL,
      tags TEXT[] DEFAULT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Enable RLS on ebooks table
  ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;

  -- Create RLS policies for ebooks
  -- Public users can view non-premium ebooks
  CREATE POLICY IF NOT EXISTS "Public users can view non-premium ebooks" 
  ON public.ebooks FOR SELECT 
  USING (is_premium = false);

  -- Authenticated users can view premium ebooks
  CREATE POLICY IF NOT EXISTS "Authenticated users can view premium ebooks" 
  ON public.ebooks FOR SELECT 
  USING (auth.role() = 'authenticated' OR is_premium = false);

  -- Only admins can insert ebooks
  CREATE POLICY IF NOT EXISTS "Only admins can insert ebooks" 
  ON public.ebooks FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
  ));

  -- Only admins can update ebooks
  CREATE POLICY IF NOT EXISTS "Only admins can update ebooks" 
  ON public.ebooks FOR UPDATE 
  USING (auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
  ));

  -- Only admins can delete ebooks
  CREATE POLICY IF NOT EXISTS "Only admins can delete ebooks" 
  ON public.ebooks FOR DELETE 
  USING (auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
  ));
END;
$$;

-- Create a stored procedure to create the ebook_categories table
CREATE OR REPLACE FUNCTION public.create_ebook_categories_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create ebook_categories table if it doesn't exist
  CREATE TABLE IF NOT EXISTS public.ebook_categories (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Enable RLS on ebook_categories
  ALTER TABLE public.ebook_categories ENABLE ROW LEVEL SECURITY;

  -- Create RLS policies for ebook_categories
  -- Everyone can view categories
  CREATE POLICY IF NOT EXISTS "Anyone can view ebook categories" 
  ON public.ebook_categories FOR SELECT 
  USING (true);

  -- Only admins can insert categories
  CREATE POLICY IF NOT EXISTS "Only admins can insert ebook categories" 
  ON public.ebook_categories FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
  ));

  -- Only admins can update categories
  CREATE POLICY IF NOT EXISTS "Only admins can update ebook categories" 
  ON public.ebook_categories FOR UPDATE 
  USING (auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
  ));

  -- Only admins can delete categories
  CREATE POLICY IF NOT EXISTS "Only admins can delete ebook categories" 
  ON public.ebook_categories FOR DELETE 
  USING (auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
  ));
END;
$$;

-- Create a stored procedure to create the ebook_category_junction table
CREATE OR REPLACE FUNCTION public.create_ebook_category_junction_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create junction table for many-to-many relationship between ebooks and categories
  CREATE TABLE IF NOT EXISTS public.ebook_category_junction (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      ebook_id UUID REFERENCES public.ebooks(id) ON DELETE CASCADE,
      category_id UUID REFERENCES public.ebook_categories(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(ebook_id, category_id)
  );

  -- Enable RLS on junction table
  ALTER TABLE public.ebook_category_junction ENABLE ROW LEVEL SECURITY;

  -- Create RLS policies for junction table
  -- Anyone can view the junction table
  CREATE POLICY IF NOT EXISTS "Anyone can view ebook category junction" 
  ON public.ebook_category_junction FOR SELECT 
  USING (true);

  -- Only admins can insert junction entries
  CREATE POLICY IF NOT EXISTS "Only admins can insert ebook category junction" 
  ON public.ebook_category_junction FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
  ));

  -- Only admins can update junction entries
  CREATE POLICY IF NOT EXISTS "Only admins can update ebook category junction" 
  ON public.ebook_category_junction FOR UPDATE 
  USING (auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
  ));

  -- Only admins can delete junction entries
  CREATE POLICY IF NOT EXISTS "Only admins can delete ebook category junction" 
  ON public.ebook_category_junction FOR DELETE 
  USING (auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
  ));
END;
$$;
