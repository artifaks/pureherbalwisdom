# Google Authentication Setup Guide for Herb Harmony Visualizer

This guide will walk you through the process of enabling Google authentication for your Herb Harmony Visualizer project. The error you're seeing (`{"code":400,"error_code":"validation_failed","msg":"Unsupported provider: provider is not enabled"}`) indicates that Google authentication is not enabled in your Supabase project.

## Step 1: Create a Google OAuth Application

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "OAuth consent screen"
   - Set User Type to "External" (unless you have a Google Workspace organization)
   - Fill in the required fields (App name, User support email, Developer contact email)
   - Add the scopes: `.../auth/userinfo.email` and `.../auth/userinfo.profile`
   - Add your email as a test user
   - Save and continue
4. Navigate to "APIs & Services" > "Credentials"
5. Click "Create Credentials" and select "OAuth client ID"
6. Set the application type to "Web application"
7. Give your application a name (e.g., "Herb Harmony Visualizer")
8. Add authorized JavaScript origins:
   - For local development: `http://localhost:8081`
   - For production: Add your production domain
9. Add authorized redirect URIs:
   - For local development: `http://localhost:8081/auth/callback`
   - For production: `https://yourdomain.com/auth/callback`
10. Click "Create" to generate your Client ID and Client Secret
11. Make note of the Client ID and Client Secret - you'll need these for Supabase

## Step 2: Configure Supabase Authentication

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to "Authentication" > "Providers" in the sidebar
4. Find "Google" in the list of providers
5. Toggle the switch to enable Google authentication
6. Enter the Client ID and Client Secret you obtained from Google Cloud Console
7. Save your changes

## Step 3: Test the Authentication

1. Restart your application if it's running
2. Try signing in with Google again
3. You should be redirected to Google's authentication page
4. After authenticating, you should be redirected back to your application

## Troubleshooting

If you continue to encounter issues:

### Check Your Supabase Configuration

- Verify that Google is enabled in your Supabase project
- Double-check that the Client ID and Client Secret are entered correctly
- Ensure that the redirect URI in Supabase matches what you configured in Google Cloud Console

### Check Your Application Code

- The `signInWithGoogle` function in your `use-auth.tsx` file should be using the correct provider name ('google')
- The redirect URL should match what you've configured in Google Cloud Console

### Check for Console Errors

- Open your browser's developer tools and check the console for any errors
- Network tab might show more details about the failed request

### Local Development vs. Production

- Remember that you need different OAuth configurations for local development and production
- Make sure you're using the correct Supabase project for your environment

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup Guide](https://developers.google.com/identity/protocols/oauth2)

If you continue to have issues after following these steps, please check the Supabase documentation or reach out to Supabase support for further assistance.
