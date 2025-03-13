# Setting Up Google Authentication for Herb Harmony Visualizer

This guide will walk you through the process of enabling Google authentication for your Herb Harmony Visualizer project.

## Step 1: Create a Google OAuth Application

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" and select "OAuth client ID"
5. If this is your first OAuth client ID, you'll need to configure the consent screen:
   - Select "External" user type (unless you have a Google Workspace organization)
   - Fill in the required information (app name, user support email, developer contact email)
   - Add the scopes you need (typically `.../auth/userinfo.email` and `.../auth/userinfo.profile`)
   - Add test users if you're in testing mode
6. Return to the "Credentials" page and click "Create Credentials" > "OAuth client ID"
7. Set the application type to "Web application"
8. Add a name for your OAuth client
9. Add authorized JavaScript origins:
   - For local development: `http://localhost:8081`
   - For production: `https://yourdomain.com`
10. Add authorized redirect URIs:
    - For local development: `http://localhost:8081/auth/callback`
    - For production: `https://yourdomain.com/auth/callback`
11. Click "Create" and note your Client ID and Client Secret

## Step 2: Configure Supabase Authentication

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to "Authentication" > "Providers"
4. Find "Google" in the list of providers and toggle it to enable
5. Enter the Client ID and Client Secret you obtained from Google Cloud Console
6. Save your changes

## Step 3: Update Your Application Code (if needed)

In your `use-auth.tsx` file, the Google sign-in function should look like this:

```typescript
const signInWithGoogle = async () => {
  try {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback'
      }
    });
    
    if (error) throw error;
  } catch (error: any) {
    toast({
      title: "Google sign in failed",
      description: error.message || "There was an error signing in with Google",
      variant: "destructive",
    });
    throw error;
  } finally {
    setIsLoading(false);
  }
};
```

Ensure that the redirect URL matches what you configured in the Google Cloud Console.

## Step 4: Testing

After completing the setup:

1. Restart your application
2. Try signing in with Google
3. You should be redirected to Google's authentication page
4. After authenticating, you should be redirected back to your application and signed in

## Troubleshooting

If you encounter issues:

1. Check the browser console for errors
2. Verify that the Client ID and Client Secret are correct
3. Ensure the redirect URIs match exactly between Google Cloud Console and Supabase
4. Check that the Google provider is enabled in Supabase
5. Verify that your application is using the correct Supabase project URL and API key
