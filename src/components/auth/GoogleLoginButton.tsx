import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface GoogleLoginButtonProps {
  className?: string;
  redirectParams?: boolean; // Whether to pass redirect parameters to the signInWithGoogle function
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ className = '', redirectParams = true }) => {
  const { signInWithGoogle, isLoading } = useAuth();
  const [localLoading, setLocalLoading] = React.useState(false);
  const [searchParams] = useSearchParams();
  
  // Get redirect parameters from URL if they exist
  const redirectTo = searchParams.get('redirectTo');
  const purchaseIntent = searchParams.get('purchaseIntent') === 'true';
  const ebookId = searchParams.get('ebookId');

  const handleGoogleLogin = async () => {
    try {
      setLocalLoading(true);
      
      // Only pass redirect parameters if redirectParams is true
      if (redirectParams && (redirectTo || purchaseIntent)) {
        // Build redirect URL with purchase intent parameters if they exist
        let redirectUrl = redirectTo || '/resources';
        
        // Add purchase intent parameters to the callback URL
        const callbackParams = new URLSearchParams();
        if (redirectTo) callbackParams.append('redirectTo', redirectTo);
        if (purchaseIntent) callbackParams.append('purchaseIntent', 'true');
        if (ebookId) callbackParams.append('ebookId', ebookId);
        
        await signInWithGoogle(callbackParams.toString());
      } else {
        await signInWithGoogle();
      }
    } catch (error) {
      console.error('Google login error:', error);
      setLocalLoading(false); // Reset loading state on error
    }
    // Note: We don't set localLoading to false on success because the page will redirect
  };

  return (
    <Button
      type="button"
      variant="outline"
      className={`w-full flex items-center justify-center gap-2 ${className}`}
      onClick={handleGoogleLogin}
      disabled={isLoading || localLoading}
    >
      {isLoading || localLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
      )}
      {isLoading || localLoading ? 'Signing in...' : 'Sign in with Google'}
    </Button>
  );
};

export default GoogleLoginButton;
