import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { BookOpen } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [signupMessage, setSignupMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

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
            <p className="text-gray-600 mt-2">You can access these pages:</p>
          </div>
          
          <div className="space-y-4">
            <Link to="/resources">
              <Button className="w-full bg-amber-500 hover:bg-amber-600">
                Go to Resources
              </Button>
            </Link>
            
            <Link to="/">
              <Button variant="outline" className="w-full">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await signIn(email, password);
      navigate('/resources');
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setSignupMessage(null);
      // Always pass false for isAdmin parameter - no users can sign up as admin
      await signUp(email, password, username, false);
      
      setSignupMessage({ 
        type: 'success', 
        message: 'Account created successfully! Check your email to confirm your account.' 
      });
    } catch (error: any) {
      console.error('Error signing up:', error);
      setSignupMessage({ 
        type: 'error', 
        message: error.message || 'An error occurred during signup.'
      });
    } finally {
      setIsLoading(false);
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
          <p className="text-gray-600 mt-2">Sign in to access premium herbal resources</p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
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
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600" 
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                  Sign up to access premium herbal resources.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4">
                  {signupMessage && (
                    <Alert className={signupMessage.type === 'success' ? 'bg-green-50' : 'bg-red-50'}>
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
                    />
                    <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600" 
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
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
