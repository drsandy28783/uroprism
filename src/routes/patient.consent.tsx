import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { RequireRole } from "@/components/RequireRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { consentService } from "@/services/api";
import type { ConsentState } from "@/types";
import { toast } from "sonner";

export const Route = createFileRoute("/patient/consent")({
  component: () => (
    <RequireRole role="patient">
      <ConsentPage />
    </RequireRole>
  ),
});

const items: { key: keyof Omit<ConsentState, "version" | "updatedAt">; label: string; desc: string }[] = [
  { key: "dataStorage", label: "Storage of my health data", desc: "I consent to StoneCare storing my clinical and stone history for the purpose of long-term follow-up." },
  { key: "reminders", label: "Appointment & test reminders", desc: "I consent to receiving reminders for visits, ultrasound, and lab tests via SMS, email or app." },
  { key: "educationalMessages", label: "Educational messages", desc: "I consent to receiving prevention tips and educational content related to my condition." },
  { key: "shareReportsWithDoctor", label: "Share reports with my doctor", desc: "I consent to my investigations and reports being shared with my treating urologist." },
  { key: "discountedLabCoordination", label: "Discounted lab / radiology coordination", desc: "I consent to StoneCare coordinating discounted ultrasound and lab services on my behalf." },
];

function ConsentPage() {
  const [state, setState] = useState<ConsentState | null>(null);

  useEffect(() => {
    consentService.get().then(setState);
  }, []);

  if (!state) return <div className="min-h-screen bg-background"><AppHeader /></div>;

  const toggle = (key: keyof ConsentState, value: boolean) => {
    setState((s) => (s ? { ...s, [key]: value } : s));
  };

  const save = async () => {
    const updated = await consentService.update(state);
    setState(updated);
    // FUTURE: write versioned consent record + immutable audit entry server-side.
    toast.success("Consent preferences saved (mock).");
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Consent preferences</h1>
          <p className="text-sm text-muted-foreground">
            Placeholder. {/* FUTURE: legally vetted wording, versioning, immutable history per HIPAA/GDPR/DPDP. */}
            Final wording will be reviewed by counsel before launch.
          </p>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">I agree to the following</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {items.map((it) => (
              <label key={it.key} className="flex items-start gap-3 rounded-md border p-3 cursor-pointer hover:bg-secondary/30">
                <Checkbox
                  checked={Boolean(state[it.key])}
                  onCheckedChange={(v) => toggle(it.key, Boolean(v))}
                  className="mt-0.5"
                />
                <span>
                  <span className="block font-medium text-sm">{it.label}</span>
                  <span className="block text-xs text-muted-foreground">{it.desc}</span>
                </span>
              </label>
            ))}
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-muted-foreground">Version {state.version}{state.updatedAt ? ` · saved ${new Date(state.updatedAt).toLocaleString()}` : ""}</p>
              <Button onClick={save}>Save preferences</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
