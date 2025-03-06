import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [adminStatus, setAdminStatus] = useState<'pending' | 'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const { user, isAdmin, updateUserToAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear status message after 5 seconds
    if (adminStatus) {
      const timer = setTimeout(() => {
        setAdminStatus(null);
        setStatusMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [adminStatus]);

  // Only authenticated users can access this page
  if (!user) {
    return <Navigate to="/auth" />;
  }

  const handleMakeAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    try {
      await updateUserToAdmin(email);
      setAdminStatus('success');
      setStatusMessage(`User ${email} has been granted admin privileges.`);
      
      // If the current user made themselves admin, redirect to blog
      if (user.email === email) {
        setTimeout(() => {
          navigate('/blog');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error updating user:', error);
      setAdminStatus('error');
      setStatusMessage(error.message || 'Failed to update user role.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMakeSelfAdmin = () => {
    if (user && user.email) {
      setEmail(user.email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Shield className="h-10 w-10 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold">Admin Access</h1>
          <p className="text-gray-600 mt-2">Make a user an administrator</p>
        </div>

        {isAdmin ? (
          <Card>
            <CardHeader>
              <CardTitle>Grant Admin Access</CardTitle>
              <CardDescription>
                Enter the email address of the user you wish to make an admin.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleMakeAdmin}>
              <CardContent className="space-y-4">
                {adminStatus && (
                  <Alert className={adminStatus === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                    <Info className={`h-4 w-4 ${adminStatus === 'success' ? 'text-green-600' : 'text-red-600'}`} />
                    <AlertTitle>{adminStatus === 'success' ? 'Success' : 'Error'}</AlertTitle>
                    <AlertDescription>{statusMessage}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="User email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button 
                  className="w-full bg-amber-500 hover:bg-amber-600" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Make Admin'}
                </Button>
                {user && user.email && (
                  <Button 
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleMakeSelfAdmin}
                  >
                    Use my email ({user.email})
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Request Admin Access</CardTitle>
              <CardDescription>
                Make yourself an admin to manage blog posts and resources.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleMakeAdmin}>
              <CardContent className="space-y-4">
                {adminStatus && (
                  <Alert className={adminStatus === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                    <Info className={`h-4 w-4 ${adminStatus === 'success' ? 'text-green-600' : 'text-red-600'}`} />
                    <AlertTitle>{adminStatus === 'success' ? 'Success' : 'Error'}</AlertTitle>
                    <AlertDescription>{statusMessage}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Alert className="bg-amber-50 border-amber-200">
                    <Info className="h-4 w-4 text-amber-600" />
                    <AlertTitle>Make yourself an admin</AlertTitle>
                    <AlertDescription>
                      You're currently logged in as {user.email}. Click the button below to grant yourself admin privileges.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-amber-500 hover:bg-amber-600" 
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setEmail(user.email || '');
                    setTimeout(() => handleMakeAdmin(new Event('click') as any), 100);
                  }}
                >
                  {isLoading ? 'Processing...' : 'Make Me An Admin'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;
