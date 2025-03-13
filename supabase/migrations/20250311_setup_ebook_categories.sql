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

-- Only admins can insert/update/delete categories
CREATE POLICY IF NOT EXISTS "Only admins can insert ebook categories" 
ON public.ebook_categories FOR INSERT 
WITH CHECK (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

CREATE POLICY IF NOT EXISTS "Only admins can update ebook categories" 
ON public.ebook_categories FOR UPDATE 
USING (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

CREATE POLICY IF NOT EXISTS "Only admins can delete ebook categories" 
ON public.ebook_categories FOR DELETE 
USING (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

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

-- Create RLS policies for junction table

-- Anyone can view the junction table
CREATE POLICY IF NOT EXISTS "Anyone can view ebook category junction" 
ON public.ebook_category_junction FOR SELECT 
USING (true);

-- Only admins can insert/update/delete junction entries
CREATE POLICY IF NOT EXISTS "Only admins can insert ebook category junction" 
ON public.ebook_category_junction FOR INSERT 
WITH CHECK (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

CREATE POLICY IF NOT EXISTS "Only admins can update ebook category junction" 
ON public.ebook_category_junction FOR UPDATE 
USING (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

CREATE POLICY IF NOT EXISTS "Only admins can delete ebook category junction" 
ON public.ebook_category_junction FOR DELETE 
USING (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

-- Insert some sample categories if they don't exist
INSERT INTO public.ebook_categories (name, description)
VALUES 
('Medicinal Herbs', 'Books about herbs with medicinal properties'),
('Culinary Herbs', 'Books about herbs used in cooking'),
('Herbal Remedies', 'Books about making herbal remedies at home'),
('Herb Gardening', 'Books about growing and maintaining herb gardens'),
('Herbal History', 'Books about the historical uses of herbs')
ON CONFLICT (name) DO NOTHING;
