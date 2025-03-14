-- Create purchases tables for ebooks
CREATE OR REPLACE FUNCTION create_purchases_table_if_not_exists()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create user_purchases table if it doesn't exist
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_purchases') THEN
    CREATE TABLE public.user_purchases (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      stripe_session_id TEXT,
      amount_paid DECIMAL(10, 2) NOT NULL DEFAULT 0,
      payment_status TEXT NOT NULL,
      purchase_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    );

    -- Add RLS policies
    ALTER TABLE public.user_purchases ENABLE ROW LEVEL SECURITY;

    -- Allow users to view their own purchases
    CREATE POLICY "Users can view their own purchases" 
      ON public.user_purchases 
      FOR SELECT 
      USING (auth.uid() = user_id);

    -- Allow service role to manage all purchases
    CREATE POLICY "Service role can manage all purchases" 
      ON public.user_purchases 
      USING (auth.role() = 'service_role');

    -- Create trigger for updated_at
    CREATE TRIGGER set_updated_at
      BEFORE UPDATE ON public.user_purchases
      FOR EACH ROW
      EXECUTE FUNCTION public.set_updated_at();
  END IF;

  -- Create purchase_items table if it doesn't exist
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'purchase_items') THEN
    CREATE TABLE public.purchase_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      purchase_id UUID NOT NULL REFERENCES public.user_purchases(id) ON DELETE CASCADE,
      ebook_id UUID NOT NULL REFERENCES public.ebooks(id) ON DELETE CASCADE,
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    );

    -- Add RLS policies
    ALTER TABLE public.purchase_items ENABLE ROW LEVEL SECURITY;

    -- Allow users to view their own purchased items
    CREATE POLICY "Users can view their own purchased items" 
      ON public.purchase_items 
      FOR SELECT 
      USING (auth.uid() = user_id);

    -- Allow service role to manage all purchase items
    CREATE POLICY "Service role can manage all purchase items" 
      ON public.purchase_items 
      USING (auth.role() = 'service_role');
  END IF;
END;
$$;

-- Create a function to check if a user has purchased an ebook
CREATE OR REPLACE FUNCTION has_user_purchased_ebook(p_user_id UUID, p_ebook_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  purchase_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM public.purchase_items
    WHERE user_id = p_user_id AND ebook_id = p_ebook_id
  ) INTO purchase_exists;
  
  RETURN purchase_exists;
END;
$$;
