"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { User } from "@supabase/supabase-js";



interface UserContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  role: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get session on mount
    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user || null;
      setUser(sessionUser);

      if (sessionUser) {
        // Fetch profile to get role
        supabase
          .from("profiles")
          .select("role")
          .eq("user_id", sessionUser.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error("Error fetching profile role:", error);
              setRole(null);
            } else {
              setRole(data?.role || null);
            }
            setLoading(false);
          });
      } else {
        setRole(null);
        setLoading(false);
      }
    });

    // Subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user || null;
      setUser(sessionUser);

      if (sessionUser) {
        supabase
          .from("profiles")
          .select("role")
          .eq("user_id", sessionUser.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error("Error fetching profile role:", error);
              setRole(null);
            } else {
              setRole(data?.role || null);
            }
          });
      } else {
        setRole(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, role, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
