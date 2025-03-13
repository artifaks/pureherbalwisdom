-- Create admin_users table if it doesn't exist (needed for RLS policies)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert your admin email if it doesn't exist
INSERT INTO public.admin_users (email)
VALUES ('your-admin-email@example.com')
ON CONFLICT (email) DO NOTHING;

-- Create ebooks table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.ebooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    author TEXT,
    is_premium BOOLEAN DEFAULT false,
    price DECIMAL(10, 2) DEFAULT NULL,
    cover_url TEXT,
    file_url TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
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

-- Add comments for documentation
COMMENT ON TABLE public.ebooks IS 'Table storing ebook information';
COMMENT ON COLUMN public.ebooks.price IS 'Price of the ebook in USD';
COMMENT ON COLUMN public.ebooks.is_premium IS 'Whether the ebook is premium content requiring authentication';
