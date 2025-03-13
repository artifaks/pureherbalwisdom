-- Enable Google OAuth provider in Supabase
-- This migration enables Google authentication for the project

-- First, check if the auth.providers table exists (it should in Supabase)
DO $$
BEGIN
    -- Enable Google provider if not already enabled
    UPDATE auth.providers
    SET enabled = true
    WHERE provider_id = 'google';

    -- If no rows were updated, the provider might not exist yet
    IF NOT FOUND THEN
        -- Insert the Google provider if it doesn't exist
        INSERT INTO auth.providers (provider_id, enabled)
        VALUES ('google', true)
        ON CONFLICT (provider_id) DO UPDATE
        SET enabled = true;
    END IF;

    -- For local development, we'll set some placeholder OAuth credentials
    -- In production, you should set these through the Supabase dashboard
    UPDATE auth.providers
    SET 
        client_id = COALESCE(client_id, '123456789-placeholder-client-id.apps.googleusercontent.com'),
        client_secret = COALESCE(client_secret, 'placeholder-client-secret'),
        redirect_uri = COALESCE(redirect_uri, 'http://localhost:8081/auth/callback')
    WHERE provider_id = 'google';

    RAISE NOTICE 'Google authentication provider has been enabled';
END
$$;

-- Add a comment to explain what this migration does
COMMENT ON TABLE IF EXISTS auth.providers IS 'Authentication providers supported by Supabase Auth';

-- Note: For this to work properly in production, you need to:
-- 1. Create a Google OAuth application in the Google Cloud Console
-- 2. Set the correct client_id and client_secret in the Supabase dashboard
-- 3. Configure the correct redirect_uri in both Google Cloud Console and Supabase
