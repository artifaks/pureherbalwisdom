
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type AuthContextType = {
  user: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string, isAdmin?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isAdmin: boolean;
  updateUserToAdmin: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if the current user is an admin
  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      
      return data?.role === 'admin';
    } catch (error) {
      console.error('Failed to check admin status:', error);
      return false;
    }
  };

  useEffect(() => {
    // Check for session on initial load
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const isUserAdmin = await checkAdminStatus(session.user.id);
        setIsAdmin(isUserAdmin);
      } else {
        setIsAdmin(false);
      }
      
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const isUserAdmin = await checkAdminStatus(session.user.id);
        setIsAdmin(isUserAdmin);
      } else {
        setIsAdmin(false);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setUser(data.user);
      setIsAdmin(data.user?.user_metadata?.isAdmin === true);
      navigate("/");
      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      });
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, username: string, isAdmin = false) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            isAdmin,
          },
        },
      });

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setUser(data.user);
      setIsAdmin(data.user?.user_metadata?.isAdmin === true);
      navigate("/");
      toast({
        title: "Signed up successfully",
        description: "Welcome to the Herbal Guide!",
      });
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      navigate("/");
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserToAdmin = async (email: string) => {
    try {
      setIsLoading(true);
      
      // First try to find user by their email address directly in profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', email)
        .maybeSingle();
      
      if (profileError) {
        console.error('Error finding user profile:', profileError);
        toast({
          title: "Update failed",
          description: "Could not find user profile",
          variant: "destructive",
        });
        return;
      }
      
      let userId = profileData?.id;
      
      // If we couldn't find by username in profiles, try to get user from auth table
      if (!userId) {
        // Look for the user by email in the auth users
        const { data: userData, error: userError } = await supabase.auth
          .admin.listUsers();
        
        if (userError) {
          console.error('Error fetching users:', userError);
          toast({
            title: "Update failed",
            description: "Could not access user records",
            variant: "destructive",
          });
          return;
        }
        
        // Find the user with matching email
        const matchedUser = userData?.users?.find(u => u.email === email);
        
        if (!matchedUser) {
          toast({
            title: "User not found",
            description: "Could not find a user with that email address",
            variant: "destructive",
          });
          return;
        }
        
        userId = matchedUser.id;
      }
      
      if (!userId) {
        toast({
          title: "User not found",
          description: "Could not determine user ID",
          variant: "destructive",
        });
        return;
      }
      
      // Update the user's role in the profiles table
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId);
      
      if (updateError) {
        console.error('Error updating user role:', updateError);
        toast({
          title: "Update failed",
          description: "Could not update user role in profiles",
          variant: "destructive",
        });
        return;
      }
      
      // If the current user is the one being updated, update the admin state
      if (user && (user.email === email || user.id === userId)) {
        setIsAdmin(true);
      }
      
      toast({
        title: "Success",
        description: `User ${email} has been granted admin privileges`,
      });
    } catch (error: any) {
      console.error('Update error:', error);
      toast({
        title: "Update failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        isLoading,
        isAdmin,
        updateUserToAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
