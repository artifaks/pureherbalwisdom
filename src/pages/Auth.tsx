
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { BookOpen, Loader2, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import GoogleLoginButton from '@/components/auth/GoogleLoginButton';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [signupMessage, setSignupMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const { user, signIn, signUp, signOut, signInWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/resources';
  const purchaseIntent = searchParams.get('purchaseIntent') === 'true';
  const ebookId = searchParams.get('ebookId');

  useEffect(() => {
    // If user is already logged in, redirect to the specified path after a short delay
    if (user) {
      const timer = setTimeout(() => {
        navigate(redirectTo);
        
        // If there was a purchase intent, show a helpful message
        if (purchaseIntent) {
          toast({
            title: 'Ready to complete your purchase',
            description: 'You can now continue with your ebook purchase.',
            variant: 'default'
          });
        }
      }, 1500); // Reduced delay for better UX
      return () => clearTimeout(timer);
    }
  }, [user, navigate, redirectTo, purchaseIntent, toast]);

  // If user is already logged in, show resources link option
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <BookOpen className="h-10 w-10 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold">You're already logged in</h1>
            <p className="text-gray-600 mt-2">You'll be redirected automatically, or you can access these pages:</p>
          </div>
          
          <div className="space-y-4">
            <Link to="/resources">
              <Button className="w-full bg-amber-500 hover:bg-amber-600">
                Go to Resources
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={async () => {
                try {
                  await signOut();
                } catch (error) {
                  console.error("Error signing out:", error);
                }
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      
      // Navigate to the redirect URL (will happen in useEffect)
      // If there was a purchase intent, the useEffect will show a toast
      
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        title: 'Sign in failed',
        description: 'Please check your email and password and try again.',
        variant: 'destructive'
      });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSignupMessage(null);
      // Always pass false for isAdmin parameter - no users can sign up as admin
      await signUp(email, password, username, false);
      
      setSignupMessage({ 
        type: 'success', 
        message: purchaseIntent
          ? 'Account created successfully! Check your email to confirm your account, then sign in to complete your purchase.'
          : 'Account created successfully! Check your email to confirm your account.'
      });
      
      // Clear form
      setEmail('');
      setPassword('');
      setUsername('');
    } catch (error: any) {
      console.error('Error signing up:', error);
      setSignupMessage({ 
        type: 'error', 
        message: error.message || 'An error occurred during signup.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <BookOpen className="h-10 w-10 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold">Herbal E-Books & Resources</h1>
          <p className="text-gray-600 mt-2">
            {purchaseIntent 
              ? 'Sign in to complete your purchase' 
              : 'Sign in to access premium herbal resources'}
          </p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="border-amber-100 shadow-md">
              <CardHeader className="bg-amber-50 rounded-t-lg">
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-amber-200 focus-visible:ring-amber-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-amber-200 focus-visible:ring-amber-400"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600" 
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : 'Sign In'}
                  </Button>
                  
                  <div className="relative w-full flex items-center justify-center my-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-amber-200 dark:border-amber-700/40"></span>
                    </div>
                    <div className="relative bg-white dark:bg-[#1f1a14] px-4 text-sm text-gray-500 dark:text-amber-100/70">
                      or continue with
                    </div>
                  </div>
                  
                  <GoogleLoginButton className="border-amber-200 text-gray-700 hover:bg-amber-50 dark:border-amber-700/40 dark:text-amber-300 dark:hover:bg-amber-800/20" />
                  
                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertDescription className="text-amber-800 text-sm">
                      If you encounter a "provider not enabled" error, make sure Google authentication is enabled in your Supabase project. See the documentation for setup instructions.
                    </AlertDescription>
                  </Alert>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="border-amber-100 shadow-md">
              <CardHeader className="bg-amber-50 rounded-t-lg">
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                  Sign up to access premium herbal resources.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4 pt-6">
                  {signupMessage && (
                    <Alert className={signupMessage.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                      <AlertDescription>
                        {signupMessage.message}
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-amber-200 focus-visible:ring-amber-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <Input
                      id="signup-username"
                      type="text"
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="border-amber-200 focus-visible:ring-amber-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-amber-200 focus-visible:ring-amber-400"
                    />
                    <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600" 
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : 'Create Account'}
                  </Button>
                  
                  <div className="relative w-full flex items-center justify-center my-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-amber-200 dark:border-amber-700/40"></span>
                    </div>
                    <div className="relative bg-white dark:bg-[#1f1a14] px-4 text-sm text-gray-500 dark:text-amber-100/70">
                      or continue with
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full border-amber-200 text-gray-700 hover:bg-amber-50 dark:border-amber-700/40 dark:text-amber-300 dark:hover:bg-amber-800/20"
                    onClick={() => signInWithGoogle()}
                    disabled={isLoading}
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
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
                    Sign up with Google
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
