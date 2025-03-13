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

-- Create RLS policies if they don't exist
-- Public users can view non-premium ebooks
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'ebooks' AND policyname = 'Public users can view non-premium ebooks'
    ) THEN
        CREATE POLICY "Public users can view non-premium ebooks" 
        ON public.ebooks FOR SELECT 
        USING (is_premium = false);
    END IF;
END
$$;

-- Authenticated users can view premium ebooks
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'ebooks' AND policyname = 'Authenticated users can view premium ebooks'
    ) THEN
        CREATE POLICY "Authenticated users can view premium ebooks" 
        ON public.ebooks FOR SELECT 
        USING (auth.role() = 'authenticated' OR is_premium = false);
    END IF;
END
$$;

-- Only admins can insert ebooks
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'ebooks' AND policyname = 'Only admins can insert ebooks'
    ) THEN
        CREATE POLICY "Only admins can insert ebooks" 
        ON public.ebooks FOR INSERT 
        WITH CHECK (auth.role() = 'authenticated' AND EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
        ));
    END IF;
END
$$;

-- Only admins can update ebooks
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'ebooks' AND policyname = 'Only admins can update ebooks'
    ) THEN
        CREATE POLICY "Only admins can update ebooks" 
        ON public.ebooks FOR UPDATE 
        USING (auth.role() = 'authenticated' AND EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
        ));
    END IF;
END
$$;

-- Only admins can delete ebooks
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'ebooks' AND policyname = 'Only admins can delete ebooks'
    ) THEN
        CREATE POLICY "Only admins can delete ebooks" 
        ON public.ebooks FOR DELETE 
        USING (auth.role() = 'authenticated' AND EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
        ));
    END IF;
END
$$;

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
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'ebook_categories' AND policyname = 'Anyone can view ebook categories'
    ) THEN
        CREATE POLICY "Anyone can view ebook categories" 
        ON public.ebook_categories FOR SELECT 
        USING (true);
    END IF;
END
$$;

-- Only admins can insert/update/delete categories
DO $$
BEGIN
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
END
$$;

DO $$
BEGIN
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
END
$$;

DO $$
BEGIN
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
END
$$;

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
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'ebook_category_junction' AND policyname = 'Anyone can view ebook category junction'
    ) THEN
        CREATE POLICY "Anyone can view ebook category junction" 
        ON public.ebook_category_junction FOR SELECT 
        USING (true);
    END IF;
END
$$;

-- Only admins can insert/update/delete junction entries
DO $$
BEGIN
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
END
$$;

DO $$
BEGIN
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
END
$$;

DO $$
BEGIN
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
END
$$;

-- Insert default categories if the table is empty
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.ebook_categories LIMIT 1) THEN
        INSERT INTO public.ebook_categories (name, description)
        VALUES 
            ('Medicinal Herbs', 'Books about herbs with medicinal properties'),
            ('Culinary Herbs', 'Books about herbs used in cooking'),
            ('Herbal Remedies', 'Books about making herbal remedies at home'),
            ('Herb Gardening', 'Books about growing and maintaining herb gardens'),
            ('Herbal History', 'Books about the historical uses of herbs');
    END IF;
END
$$;
