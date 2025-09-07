// components/ProfileLoader.tsx
"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useProfileStore } from "@/store/useProfileStore";

export default function ProfileLoader() {
  const setProfile = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error loading profile:", error.message);
        return;
      }

      setProfile(data);
    };

    loadProfile();
  }, [setProfile]);

  return null;
}
