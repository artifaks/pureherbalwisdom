
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string, isAdmin?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isAdmin: boolean;
  updateUserToAdmin: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
      
      // Try finding the user by email directly in the auth system
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Error fetching users:', authError);
        toast({
          title: "Update failed",
          description: "Could not access user records",
          variant: "destructive",
        });
        return;
      }
      
      // Find user with the matching email - explicitly define the type
      type UserInfo = { id: string, email: string | null | undefined };
      const users = authData?.users as UserInfo[];
      
      if (!users || users.length === 0) {
        toast({
          title: "No users found",
          description: "The system contains no users",
          variant: "destructive",
        });
        return;
      }
      
      const matchedUser = users.find(u => u.email === email);
      
      if (!matchedUser || !matchedUser.id) {
        toast({
          title: "User not found",
          description: "Could not find a user with that email address",
          variant: "destructive",
        });
        return;
      }
      
      const userId = matchedUser.id;
      console.log('Found user:', userId);
      
      // Check if profile exists
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle();
        
      if (profileCheckError) {
        console.error('Error checking profile:', profileCheckError);
      }
      
      // Create profile if it doesn't exist
      if (!existingProfile) {
        console.log('Creating new profile for user', userId);
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({ id: userId, username: email });
          
        if (insertError) {
          console.error('Error creating profile:', insertError);
          toast({
            title: "Update failed",
            description: "Could not create user profile",
            variant: "destructive",
          });
          return;
        }
      }
      
      // Update the role to admin
      console.log('Updating user role to admin');
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
      
      // Update local state if the current user is the one being updated
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
