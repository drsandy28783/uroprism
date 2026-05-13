import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { RequireRole } from "@/components/RequireRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auditService } from "@/services/api";
import type { AuditLogEntry } from "@/types";

export const Route = createFileRoute("/doctor/audit")({
  component: () => (
    <RequireRole role="doctor">
      <AuditPage />
    </RequireRole>
  ),
});

const actionLabel: Record<AuditLogEntry["action"], string> = {
  patient_viewed: "Patient viewed",
  investigation_added: "Investigation added",
  followup_updated: "Follow-up updated",
  subscription_changed: "Subscription changed",
  consent_updated: "Consent updated",
};

function AuditPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  useEffect(() => {
    auditService.list().then(setLogs);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 space-y-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Audit log</h1>
          <p className="text-sm text-muted-foreground">
            Placeholder. {/* FUTURE: append-only signed entries with retention policy and export. */}
            Real audit entries will be tamper-evident and exportable.
          </p>
        </div>
        <Card>
          <CardHeader><CardTitle className="text-base">Recent activity (mock)</CardTitle></CardHeader>
          <CardContent>
            <ul className="divide-y">
              {logs.map((l) => (
                <li key={l.id} className="py-3 flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{actionLabel[l.action]}</p>
                    <p className="text-xs text-muted-foreground">{l.target}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs">{l.actor}</p>
                    <p className="text-xs text-muted-foreground">{new Date(l.at).toLocaleString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
