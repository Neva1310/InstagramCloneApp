import { Session, User } from "@supabase/supabase-js";
import React from "react";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator, Text } from "react-native";
import { supabase } from "~/src/lib/supabase";

type Auth = {
  isAuthenticated: boolean;
  session: Session | null;
  user?: User;
};

const AuthContext = createContext<Auth>({
  isAuthenticated: false,
  session: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsReady(true);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!isReady) {
    return (
      <>
        <ActivityIndicator />
        <Text>Loading...</Text>
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user,
        isAuthenticated: !!session?.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
