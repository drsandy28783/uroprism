import { useEffect, useState } from "react";
import { authService } from "@/services/api";
import type { AuthUser, UserRole } from "@/types";

// Mock auth hook. FUTURE: replace with real session from Lovable Cloud / Supabase.
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(authService.getCurrentUser());
  useEffect(() => authService.subscribe(() => setUser(authService.getCurrentUser())), []);
  return {
    user,
    loginAs: (role: UserRole) => authService.loginAs(role),
    logout: () => authService.logout(),
  };
}
