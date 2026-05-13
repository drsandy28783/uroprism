import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { PrototypeBanner } from "@/components/PrototypeBanner";
import { RequireRole } from "@/components/RequireRole";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { patientService } from "@/services/api";
import type { Patient, RiskLevel, StoneType } from "@/types";
import { formatDate, riskColor, stoneTypeLabel, tierLabel } from "@/utils/labels";
import { Search } from "lucide-react";

export const Route = createFileRoute("/doctor/patients/")({
  component: () => (
    <RequireRole role="doctor">
      <PatientList />
    </RequireRole>
  ),
});

function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [q, setQ] = useState("");
  const [stoneFilter, setStoneFilter] = useState<StoneType | "all">("all");
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");
  const [dueOnly, setDueOnly] = useState(false);

  useEffect(() => {
    patientService.list().then(setPatients);
  }, []);

  const filtered = useMemo(() => {
    const today = new Date();
    return patients.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      const t = p.stoneHistory[0]?.stoneType;
      if (stoneFilter !== "all" && t !== stoneFilter) return false;
      if (riskFilter !== "all" && p.riskLevel !== riskFilter) return false;
      if (dueOnly) {
        const next = p.followUp.nextVisit ? new Date(p.followUp.nextVisit) : null;
        if (!next || (next.getTime() - today.getTime()) / 86400000 > 30) return false;
      }
      return true;
    });
  }, [patients, q, stoneFilter, riskFilter, dueOnly]);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <PrototypeBanner />
      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Patients</h1>
            <p className="text-sm text-muted-foreground">{filtered.length} of {patients.length}</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-4 grid gap-3 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name" className="pl-9" />
            </div>
            <select
              className="rounded-md border bg-background px-3 py-2 text-sm"
              value={stoneFilter}
              onChange={(e) => setStoneFilter(e.target.value as StoneType | "all")}
            >
              <option value="all">All stone types</option>
              {(Object.keys(stoneTypeLabel) as StoneType[]).map((t) => (
                <option key={t} value={t}>{stoneTypeLabel[t]}</option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <select
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value as RiskLevel | "all")}
              >
                <option value="all">All risk</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
              <label className="flex items-center gap-1 text-xs text-muted-foreground">
                <input type="checkbox" checked={dueOnly} onChange={(e) => setDueOnly(e.target.checked)} />
                Due ≤30d
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="overflow-hidden rounded-md border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Stone type</th>
                <th className="px-4 py-3">Last visit</th>
                <th className="px-4 py-3">Next follow-up</th>
                <th className="px-4 py-3">Risk</th>
                <th className="px-4 py-3">Subscription</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    <Link to="/doctor/patients/$patientId" params={{ patientId: p.id }} className="font-medium text-primary hover:underline">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{p.age}</td>
                  <td className="px-4 py-3">{stoneTypeLabel[p.stoneHistory[0]?.stoneType ?? "mixed"]}</td>
                  <td className="px-4 py-3">{formatDate(p.lastVisit)}</td>
                  <td className="px-4 py-3">{formatDate(p.followUp.nextVisit)}</td>
                  <td className="px-4 py-3"><Badge className={riskColor[p.riskLevel]} variant="secondary">{p.riskLevel}</Badge></td>
                  <td className="px-4 py-3"><Badge variant="outline">{tierLabel[p.subscription.tier]}</Badge></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">No patients match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
