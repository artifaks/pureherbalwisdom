-- Create admin role if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_roles WHERE rolname = 'admin'
    ) THEN
        CREATE ROLE admin;
    END IF;
END
$$;

-- Ensure the auth.users table has a role column
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS role TEXT;

-- Create function to set user role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Set role to 'admin' for artifaks7@gmail.com
    IF NEW.email = 'artifaks7@gmail.com' THEN
        NEW.role := 'admin';
    ELSE
        NEW.role := 'user';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically set user role on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Update existing user if they exist
UPDATE auth.users
SET role = 'admin'
WHERE email = 'artifaks7@gmail.com';

-- Create RLS policies for admin access
CREATE POLICY "Admin users can do anything" 
ON blog_posts 
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.role = 'admin'
  )
);
