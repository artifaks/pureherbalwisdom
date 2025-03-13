-- Create ebook_categories table
CREATE TABLE IF NOT EXISTS public.ebook_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on ebook_categories
ALTER TABLE public.ebook_categories ENABLE ROW LEVEL SECURITY;

-- Create ebooks table
CREATE TABLE IF NOT EXISTS public.ebooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    author TEXT,
    cover_image_url TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT,
    is_premium BOOLEAN DEFAULT FALSE,
    price DECIMAL(10, 2) DEFAULT NULL,
    tags TEXT[] DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on ebooks
ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;

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

-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for ebook_categories

-- Everyone can view categories
CREATE POLICY "Anyone can view ebook categories" 
ON public.ebook_categories FOR SELECT 
USING (true);

-- Only admins can insert/update/delete categories
CREATE POLICY "Only admins can insert ebook categories" 
ON public.ebook_categories FOR INSERT 
WITH CHECK (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

CREATE POLICY "Only admins can update ebook categories" 
ON public.ebook_categories FOR UPDATE 
USING (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

CREATE POLICY "Only admins can delete ebook categories" 
ON public.ebook_categories FOR DELETE 
USING (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

-- Create RLS policies for ebooks

-- Public users can view non-premium ebooks
CREATE POLICY "Public users can view non-premium ebooks" 
ON public.ebooks FOR SELECT 
USING (is_premium = false);

-- Authenticated users can view all ebooks
CREATE POLICY "Authenticated users can view premium ebooks" 
ON public.ebooks FOR SELECT 
USING (auth.role() = 'authenticated' OR is_premium = false);

-- Only admins can insert/update/delete ebooks
CREATE POLICY "Only admins can insert ebooks" 
ON public.ebooks FOR INSERT 
WITH CHECK (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

CREATE POLICY "Only admins can update ebooks" 
ON public.ebooks FOR UPDATE 
USING (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

CREATE POLICY "Only admins can delete ebooks" 
ON public.ebooks FOR DELETE 
USING (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

-- Create RLS policies for junction table

-- Anyone can view the junction table
CREATE POLICY "Anyone can view ebook category junction" 
ON public.ebook_category_junction FOR SELECT 
USING (true);

-- Only admins can insert/update/delete junction entries
CREATE POLICY "Only admins can insert ebook category junction" 
ON public.ebook_category_junction FOR INSERT 
WITH CHECK (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

CREATE POLICY "Only admins can update ebook category junction" 
ON public.ebook_category_junction FOR UPDATE 
USING (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

CREATE POLICY "Only admins can delete ebook category junction" 
ON public.ebook_category_junction FOR DELETE 
USING (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

-- Insert some sample categories
INSERT INTO public.ebook_categories (name, description)
VALUES 
('Medicinal Herbs', 'Books about herbs with medicinal properties'),
('Culinary Herbs', 'Books about herbs used in cooking'),
('Herbal Remedies', 'Books about making herbal remedies at home'),
('Herb Gardening', 'Books about growing and maintaining herb gardens'),
('Herbal History', 'Books about the historical uses of herbs')
ON CONFLICT (name) DO NOTHING;

-- Add the current user as an admin if they're not already
INSERT INTO public.admin_users (email)
SELECT auth.email()
FROM auth.users
WHERE auth.email() IS NOT NULL
ON CONFLICT (email) DO NOTHING;
