-- Add price column to ebooks table
ALTER TABLE IF EXISTS public.ebooks 
ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2) DEFAULT NULL;

-- Update RLS policies to include the new price column
ALTER POLICY "Public users can view non-premium ebooks" ON public.ebooks
USING (is_premium = false);

-- Ensure authenticated users can view premium ebooks
ALTER POLICY "Authenticated users can view premium ebooks" ON public.ebooks
USING (auth.role() = 'authenticated' OR is_premium = false);

-- Ensure only admins can insert/update ebooks
ALTER POLICY "Only admins can insert ebooks" ON public.ebooks
FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND EXISTS (
  SELECT 1 FROM auth.users
  WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

ALTER POLICY "Only admins can update ebooks" ON public.ebooks
FOR UPDATE USING (auth.role() = 'authenticated' AND EXISTS (
  SELECT 1 FROM auth.users
  WHERE auth.users.id = auth.uid() AND auth.users.email IN (SELECT email FROM admin_users)
));

-- Update the Ebooks page to display prices
COMMENT ON COLUMN public.ebooks.price IS 'Price of the ebook in USD';
