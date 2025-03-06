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
      
      console.log('Attempting to update user to admin:', email);
      
      const isSelfUpdate = user && user.email === email;
      const userId = isSelfUpdate ? user.id : null;
      
      if (isSelfUpdate) {
        console.log('Self update detected, using current user ID:', userId);
        
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', userId);
        
        if (updateError) {
          console.error('Error updating user role:', updateError);
          throw new Error('Could not update user role in profiles');
        }
        
        setIsAdmin(true);
        
        toast({
          title: "Success",
          description: `You have been granted admin privileges`,
        });
        
        return;
      }
      
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', email);
      
      if (profilesError) {
        console.error('Error searching profiles:', profilesError);
        throw new Error('Could not search for user profiles');
      }
      
      if (profiles && profiles.length > 0) {
        const profileId = profiles[0].id;
        console.log('Found profile with ID:', profileId);
        
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', profileId);
        
        if (updateError) {
          console.error('Error updating user role:', updateError);
          throw new Error('Could not update user role in profiles');
        }
        
        toast({
          title: "Success",
          description: `User ${email} has been granted admin privileges`,
        });
      } else {
        console.log('No matching profile found, will create one');
        
        toast({
          title: "User not found",
          description: "The user must sign in at least once before they can be made an admin",
          variant: "destructive",
        });
      }
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
