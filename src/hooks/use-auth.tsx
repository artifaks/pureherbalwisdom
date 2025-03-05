
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type User = {
  id: string;
  email?: string;
} | null;

type AuthContextType = {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({
        title: "Sign In Successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          // For development, you can disable email confirmation
          // emailRedirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
      
      // Check if email confirmation is required
      const needsEmailConfirmation = !data.session;
      
      if (needsEmailConfirmation) {
        toast({
          title: "Sign Up Successful",
          description: "Please check your email for verification. If you don't see it, check your spam folder.",
        });
        return {
          success: true,
          message: "Please check your email for verification. If you don't see it, check your spam folder."
        };
      } else {
        toast({
          title: "Sign Up Successful",
          description: "You are now logged in!",
        });
        return { success: true, message: "You are now logged in!" };
      }
    } catch (error: any) {
      // Handle existing user error gracefully
      if (error.message.includes("User already registered")) {
        toast({
          title: "Account Exists",
          description: "This email is already registered. Try signing in instead.",
          variant: "destructive",
        });
        return { 
          success: false, 
          message: "This email is already registered. Try signing in instead." 
        };
      }
      
      toast({
        title: "Sign Up Failed",
        description: error.message || "Failed to sign up",
        variant: "destructive",
      });
      return { success: false, message: error.message || "Failed to sign up" };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Sign Out Failed",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
