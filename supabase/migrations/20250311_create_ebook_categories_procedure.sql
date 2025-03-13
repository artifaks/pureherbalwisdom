-- Create a stored procedure to create the ebook_categories table and related tables
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

  -- Create RLS policies for ebook_categories if they don't exist
  -- Everyone can view categories
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'ebook_categories' AND policyname = 'Anyone can view ebook categories'
  ) THEN
    CREATE POLICY "Anyone can view ebook categories" 
    ON public.ebook_categories FOR SELECT 
    USING (true);
  END IF;

  -- Only admins can insert/update/delete categories
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'ebook_categories' AND policyname = 'Only admins can insert ebook categories'
  ) THEN
    CREATE POLICY "Only admins can insert ebook categories" 
    ON public.ebook_categories FOR INSERT 
    WITH CHECK (auth.role() = 'authenticated' AND EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
    ));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'ebook_categories' AND policyname = 'Only admins can update ebook categories'
  ) THEN
    CREATE POLICY "Only admins can update ebook categories" 
    ON public.ebook_categories FOR UPDATE 
    USING (auth.role() = 'authenticated' AND EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
    ));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'ebook_categories' AND policyname = 'Only admins can delete ebook categories'
  ) THEN
    CREATE POLICY "Only admins can delete ebook categories" 
    ON public.ebook_categories FOR DELETE 
    USING (auth.role() = 'authenticated' AND EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
    ));
  END IF;

  -- Create junction table for many-to-many relationship between ebooks and categories if it doesn't exist
  CREATE TABLE IF NOT EXISTS public.ebook_category_junction (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      ebook_id UUID REFERENCES public.ebooks(id) ON DELETE CASCADE,
      category_id UUID REFERENCES public.ebook_categories(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(ebook_id, category_id)
  );

  -- Enable RLS on junction table
  ALTER TABLE public.ebook_category_junction ENABLE ROW LEVEL SECURITY;

  -- Create RLS policies for junction table if they don't exist
  -- Anyone can view the junction table
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'ebook_category_junction' AND policyname = 'Anyone can view ebook category junction'
  ) THEN
    CREATE POLICY "Anyone can view ebook category junction" 
    ON public.ebook_category_junction FOR SELECT 
    USING (true);
  END IF;

  -- Only admins can insert/update/delete junction entries
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'ebook_category_junction' AND policyname = 'Only admins can insert ebook category junction'
  ) THEN
    CREATE POLICY "Only admins can insert ebook category junction" 
    ON public.ebook_category_junction FOR INSERT 
    WITH CHECK (auth.role() = 'authenticated' AND EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
    ));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'ebook_category_junction' AND policyname = 'Only admins can update ebook category junction'
  ) THEN
    CREATE POLICY "Only admins can update ebook category junction" 
    ON public.ebook_category_junction FOR UPDATE 
    USING (auth.role() = 'authenticated' AND EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
    ));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'ebook_category_junction' AND policyname = 'Only admins can delete ebook category junction'
  ) THEN
    CREATE POLICY "Only admins can delete ebook category junction" 
    ON public.ebook_category_junction FOR DELETE 
    USING (auth.role() = 'authenticated' AND EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
    ));
  END IF;
END;
$$;
