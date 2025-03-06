
import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUserToAdmin } = useAuth();
  const navigate = useNavigate();

  // Only authenticated users can access this page
  if (!user) {
    return <Navigate to="/auth" />;
  }

  const handleMakeAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateUserToAdmin(email);
      // If successful, navigate to home
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
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

        <Card>
          <CardHeader>
            <CardTitle>Grant Admin Access</CardTitle>
            <CardDescription>
              Enter the email address of the user you wish to make an admin.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleMakeAdmin}>
            <CardContent className="space-y-4">
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
            <CardFooter>
              <Button 
                className="w-full bg-amber-500 hover:bg-amber-600" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Make Admin'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
