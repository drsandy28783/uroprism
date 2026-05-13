import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { RequireRole } from "@/components/RequireRole";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { computeDoctorMetrics, patientService } from "@/services/api";
import type { Patient } from "@/types";
import { formatDate, riskColor, stoneTypeLabel, tierLabel } from "@/utils/labels";
import { AlertTriangle, CalendarClock, FileImage, Stethoscope, Users, Wallet } from "lucide-react";

export const Route = createFileRoute("/doctor/")({
  component: () => (
    <RequireRole role="doctor">
      <DoctorDashboard />
    </RequireRole>
  ),
});

function DoctorDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  useEffect(() => {
    patientService.list().then(setPatients);
  }, []);
  const m = computeDoctorMetrics(patients);
  const recentInvestigations = patients
    .flatMap((p) => p.investigations.map((i) => ({ ...i, patient: p })))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Doctor dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your enrolled stone-care patients.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard icon={Users} label="Enrolled patients" value={m.total} />
          <StatCard icon={CalendarClock} label="Due for follow-up" value={m.dueFollowUp} hint="Next 30 days" />
          <StatCard icon={Stethoscope} label="Due for ultrasound" value={m.dueUsg} hint="Next 30 days" />
          <StatCard icon={AlertTriangle} label="High-risk" value={m.highRisk} />
          <StatCard icon={Wallet} label="Active subscriptions" value={m.activeSubs} />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Patients due soon</CardTitle>
              <Link to="/doctor/patients" className="text-xs text-primary hover:underline">View all</Link>
            </CardHeader>
            <CardContent className="space-y-2">
              {patients.slice(0, 5).map((p) => (
                <Link
                  key={p.id}
                  to="/doctor/patients/$patientId"
                  params={{ patientId: p.id }}
                  className="flex items-center justify-between rounded-md border bg-card px-3 py-2 hover:bg-secondary/40"
                >
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {stoneTypeLabel[p.stoneHistory[0]?.stoneType ?? "mixed"]} · Next visit {formatDate(p.followUp.nextVisit)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={riskColor[p.riskLevel]} variant="secondary">{p.riskLevel}</Badge>
                    <Badge variant="outline">{tierLabel[p.subscription.tier]}</Badge>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileImage className="h-4 w-4" /> Recent investigations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentInvestigations.map((i) => (
                <div key={i.id} className="rounded-md border px-3 py-2 text-sm">
                  <p className="font-medium">{i.patient.name}</p>
                  <p className="text-xs text-muted-foreground">{i.type.replace(/_/g, " ")} · {formatDate(i.date)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
