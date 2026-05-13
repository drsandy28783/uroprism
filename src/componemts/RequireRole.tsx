import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "@tanstack/react-router";
import type { UserRole } from "@/types";

// Route protection placeholder. FUTURE: replace with TanStack Router beforeLoad guard
// reading the real session from server context.
export function RequireRole({ role, children }: { role: UserRole; children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/login" />;
  return <>{children}</>;
}
