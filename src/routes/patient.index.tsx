import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { PrototypeBanner } from "@/components/PrototypeBanner";
import { RequireRole } from "@/components/RequireRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { patientService } from "@/services/api";
import { currentPatientId } from "@/data/mockPatients";
import type { Patient } from "@/types";
import { formatDate, riskColor, stoneTypeLabel, tierLabel } from "@/utils/labels";
import { AlertTriangle, CalendarCheck, Droplets, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/patient/")({
  component: () => (
    <RequireRole role="patient">
      <PatientDashboard />
    </RequireRole>
  ),
});

function PatientDashboard() {
  const [p, setP] = useState<Patient | null>(null);
  useEffect(() => {
    patientService.get(currentPatientId).then(setP);
  }, []);
  if (!p) return <div className="min-h-screen bg-background"><AppHeader /><PrototypeBanner /></div>;

  const hydrationGoal = 2.5;
  const hydrationPct = Math.min(100, Math.round((p.hydrationLitresPerDay / hydrationGoal) * 100));
  const stone = p.stoneHistory[p.stoneHistory.length - 1];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <PrototypeBanner />
      <main className="container mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Hi {p.name.split(" ")[0]}</h1>
          <p className="text-sm text-muted-foreground">Here's your stone-care overview.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader><CardTitle className="text-base">My stone profile</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Stone type: </span><span className="font-medium">{stoneTypeLabel[stone.stoneType]}</span></p>
              <p><span className="text-muted-foreground">Last episode: </span>{formatDate(stone.date)}</p>
              <Badge className={riskColor[p.riskLevel]} variant="secondary">{p.riskLevel} recurrence risk</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><CalendarCheck className="h-4 w-4" /> Upcoming</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Row label="Next visit" value={formatDate(p.followUp.nextVisit)} />
              <Row label="Next ultrasound" value={formatDate(p.followUp.nextUsg)} />
              <Row label="Next blood test" value={formatDate(p.followUp.nextBloodTest)} />
              <Row label="Next urine test" value={formatDate(p.followUp.nextUrineTest)} />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/30 to-secondary border-accent/30">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Droplets className="h-4 w-4" /> Hydration today</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-3xl font-semibold">{p.hydrationLitresPerDay} L</p>
              <Progress value={hydrationPct} />
              <p className="text-xs text-muted-foreground">Goal: {hydrationGoal} L. Mock tracker.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Sparkles className="h-4 w-4" /> Prevention tips for you</CardTitle></CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
                <li>Aim for 2.5–3L fluid daily, more in summer.</li>
                <li>Reduce salt to under 5g/day.</li>
                <li>Moderate animal protein.</li>
                <li>Don't restrict dietary calcium — pair it with meals.</li>
              </ul>
              <Link to="/patient/education" className="mt-3 inline-block text-sm text-primary hover:underline">See full guide →</Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> {tierLabel[p.subscription.tier]}</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Row label="Free USG remaining" value={String(p.subscription.freeUsgRemaining)} />
              <Row label="Free labs remaining" value={String(p.subscription.freeLabRemaining)} />
              <Row label="Status" value={p.subscription.active ? "Active" : "Inactive"} />
              <Link to="/subscriptions" className="text-primary hover:underline text-xs">Manage plan</Link>
            </CardContent>
          </Card>
        </div>

        <Card className="border-rose-200 bg-rose-50/60">
          <CardHeader><CardTitle className="text-base flex items-center gap-2 text-rose-700"><AlertTriangle className="h-4 w-4" /> When to seek urgent care</CardTitle></CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1 text-rose-900/80 list-disc pl-5">
              <li>Severe flank pain with fever or chills</li>
              <li>Vomiting that prevents fluid intake</li>
              <li>Visible blood in urine with pain</li>
              <li>No urine output for several hours</li>
              <li>Pain not relieved by usual medication</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
