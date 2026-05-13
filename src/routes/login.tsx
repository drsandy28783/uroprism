import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Stethoscope, User } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const pick = async (role: "doctor" | "patient") => {
    await loginAs(role);
    navigate({ to: role === "doctor" ? "/doctor" : "/patient" });
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-2 text-muted-foreground text-sm">
            Mock login — no credentials required. Real authentication will replace this.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <Card className="hover:border-primary/40 transition">
            <CardHeader>
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Stethoscope className="h-5 w-5" />
              </div>
              <CardTitle className="mt-2">Doctor / Admin</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage patients, follow-ups, investigations and audit logs.
              </p>
              <Button className="mt-4 w-full" onClick={() => pick("doctor")}>Login as Doctor</Button>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/40 transition">
            <CardHeader>
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                <User className="h-5 w-5" />
              </div>
              <CardTitle className="mt-2">Patient</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                See your stone profile, reminders, prevention tips and consent.
              </p>
              <Button variant="outline" className="mt-4 w-full" onClick={() => pick("patient")}>Login as Patient</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
