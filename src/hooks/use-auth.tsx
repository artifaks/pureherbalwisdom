
import { createContext, useContext, useState } from "react";
import { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string, isAdmin?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isAdmin: boolean;
  updateUserToAdmin: (email: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Always set user to a mock user to bypass authentication
  const [user] = useState<User | null>({
    id: 'mock-user-id',
    app_metadata: {},
    user_metadata: { isAdmin: true },
    aud: 'authenticated',
    created_at: '',
  } as User);
  
  const [isLoading] = useState(false);
  const [isAdmin] = useState(true);

  // Mock functions that do nothing
  const signIn = async () => {
    console.log('Sign in functionality has been removed');
  };

  const signUp = async () => {
    console.log('Sign up functionality has been removed');
  };

  const signOut = async () => {
    console.log('Sign out functionality has been removed');
  };

  const updateUserToAdmin = async () => {
    console.log('Update user to admin functionality has been removed');
    return true;
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
