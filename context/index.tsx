import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebase-config";
import { login, logout, register } from "@/lib/firebase/service";

interface AuthContextType {
  /**
   * TODO: Create interface for User and concat with User from firebase/auth
   */
  signIn: (email: string, password: string) => Promise<User | undefined>;

  /**
   * TODO: Change the type of singUp in params, for example
   * singUp: (email, name, password, companyName...)
   **/
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<User | undefined>;
  signOut: () => Promise<void>;
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useSession(): AuthContextType {
  const value = useContext(AuthContext);
  return value;
}

export const SessionProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      return response?.user;
    } catch (error) {
      console.error("[handleSignIn error] ==>", error);
      return undefined;
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    name?: string
  ) => {
    try {
      const response = await register(email, password, name);
      return response?.user;
    } catch (error) {
      console.error("[handleSignUp error] ==>", error);
      return undefined;
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("[handleSignOut error] ==>", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        user,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
