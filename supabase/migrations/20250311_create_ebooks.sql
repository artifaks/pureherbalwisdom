-- Create ebooks table
CREATE TABLE IF NOT EXISTS public.ebooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    author TEXT,
    cover_image_url TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER,
    is_premium BOOLEAN DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies for ebooks
ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;

-- Policy for public access (anyone can view non-premium ebooks)
CREATE POLICY "Public can view non-premium ebooks" 
ON public.ebooks 
FOR SELECT 
USING (is_premium = false);

-- Policy for authenticated users to view premium ebooks
CREATE POLICY "Authenticated users can view premium ebooks" 
ON public.ebooks 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Policy for admin users to manage all ebooks
CREATE POLICY "Admin users can manage all ebooks" 
ON public.ebooks 
FOR ALL 
USING (auth.jwt() ->> 'email' = 'artifaks7@gmail.com');

-- Create ebook_categories table
CREATE TABLE IF NOT EXISTS public.ebook_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create junction table for ebooks and categories
CREATE TABLE IF NOT EXISTS public.ebook_category_junction (
    ebook_id UUID REFERENCES public.ebooks(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.ebook_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (ebook_id, category_id)
);

-- Add RLS policies for categories
ALTER TABLE public.ebook_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ebook_category_junction ENABLE ROW LEVEL SECURITY;

-- Everyone can view categories
CREATE POLICY "Public can view categories" 
ON public.ebook_categories 
FOR SELECT 
TO PUBLIC;

-- Everyone can view category junctions
CREATE POLICY "Public can view category junctions" 
ON public.ebook_category_junction 
FOR SELECT 
TO PUBLIC;

-- Only admin can manage categories
CREATE POLICY "Admin users can manage categories" 
ON public.ebook_categories 
FOR ALL 
USING (auth.jwt() ->> 'email' = 'artifaks7@gmail.com');

CREATE POLICY "Admin users can manage category junctions" 
ON public.ebook_category_junction 
FOR ALL 
USING (auth.jwt() ->> 'email' = 'artifaks7@gmail.com');

-- Insert some sample categories
INSERT INTO public.ebook_categories (name, description)
VALUES 
('Herbal Medicine', 'Books about using herbs for medicinal purposes'),
('Cooking with Herbs', 'Recipe books and guides for cooking with herbs'),
('Herb Gardening', 'Guides for growing and maintaining herb gardens'),
('Aromatherapy', 'Books about using herbs for aromatherapy'),
('Herbal Remedies', 'Specific remedies and treatments using herbs')
ON CONFLICT (name) DO NOTHING;

-- Create storage bucket for ebooks if it doesn't exist
DO $$
BEGIN
    -- This will be executed by the Supabase migration system
    -- Note: In a real migration, you'd need to use the Supabase API or dashboard to create the bucket
    RAISE NOTICE 'Remember to create a storage bucket named "ebooks" in the Supabase dashboard';
END
$$;
