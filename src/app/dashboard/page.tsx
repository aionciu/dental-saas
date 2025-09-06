"use client";

import { ReactNode, useEffect } from "react";
import { useUser } from "../../components/AuthProvider";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
  roles?: string[];
}

export default function ProtectedRoute({ children, roles }: Props) {
  const { user, role, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (roles && !roles.includes(role || "")) {
        router.push("/unauthorized");
      }
    }
  }, [user, role, loading, router, roles]);

  if (loading || !user) return <p>Loading...</p>;
  return <>{children}</>;
}
