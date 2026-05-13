import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Droplet } from "lucide-react";

export function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b bg-card/80 backdrop-blur sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Droplet className="h-4 w-4" />
          </span>
          <span>StoneCare</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <Link to="/subscriptions" className="px-3 py-2 text-muted-foreground hover:text-foreground">
            Subscriptions
          </Link>
          {user?.role === "doctor" && (
            <>
              <Link to="/doctor" className="px-3 py-2 text-muted-foreground hover:text-foreground">Dashboard</Link>
              <Link to="/doctor/patients" className="px-3 py-2 text-muted-foreground hover:text-foreground">Patients</Link>
              <Link to="/doctor/audit" className="px-3 py-2 text-muted-foreground hover:text-foreground">Audit</Link>
            </>
          )}
          {user?.role === "patient" && (
            <>
              <Link to="/patient" className="px-3 py-2 text-muted-foreground hover:text-foreground">My Care</Link>
              <Link to="/patient/education" className="px-3 py-2 text-muted-foreground hover:text-foreground">Education</Link>
              <Link to="/patient/consent" className="px-3 py-2 text-muted-foreground hover:text-foreground">Consent</Link>
            </>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:inline text-xs text-muted-foreground">
                {user.name} · <span className="capitalize">{user.role}</span>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout();
                  navigate({ to: "/" });
                }}
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => navigate({ to: "/login" })}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
