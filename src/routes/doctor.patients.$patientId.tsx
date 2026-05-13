import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { RequireRole } from "@/components/RequireRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { patientService } from "@/services/api";
import type { Patient } from "@/types";
import { formatDate, investigationLabel, procedureLabel, riskColor, stoneTypeLabel, tierLabel } from "@/utils/labels";
import { ArrowLeft, Upload } from "lucide-react";

export const Route = createFileRoute("/doctor/patients/$patientId")({
  component: () => (
    <RequireRole role="doctor">
      <PatientProfile />
    </RequireRole>
  ),
});

function PatientProfile() {
  const { patientId } = Route.useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    patientService.get(patientId).then(setPatient);
    // FUTURE: write audit log entry "patient_viewed" server-side.
  }, [patientId]);

  if (!patient) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container mx-auto px-4 py-8 text-muted-foreground">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 py-8 space-y-6">
        <Link to="/doctor/patients" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to patients
        </Link>

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{patient.name}</h1>
            <p className="text-sm text-muted-foreground">
              {patient.age} · {patient.gender} · {patient.phoneMasked} · Enrolled {formatDate(patient.enrolledAt)}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge className={riskColor[patient.riskLevel]} variant="secondary">{patient.riskLevel} risk</Badge>
            <Badge variant="outline">{tierLabel[patient.subscription.tier]}</Badge>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Demographics & risk factors */}
          <Card>
            <CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Field label="Co-morbidities" value={patient.comorbidities.join(", ") || "None recorded"} />
              <Field label="Medications" value={patient.medications.join(", ") || "None"} />
              <Field label="Family history" value={patient.familyHistory} />
              <Field label="Diet risk factors" value={patient.dietRiskFactors.join(", ")} />
              <Field label="Hydration" value={`${patient.hydrationLitresPerDay} L/day`} />
            </CardContent>
          </Card>

          {/* Stone history */}
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="text-base">Stone history</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {patient.stoneHistory.map((s) => (
                <div key={s.id} className="rounded-md border p-3 text-sm">
                  <div className="flex justify-between">
                    <p className="font-medium">{stoneTypeLabel[s.stoneType]} · {s.sizeMm} mm · {s.laterality}</p>
                    <span className="text-xs text-muted-foreground">{formatDate(s.date)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{s.location}</p>
                  <p className="text-xs mt-1">Procedure: <span className="font-medium">{procedureLabel[s.procedure]}</span></p>
                  {s.notes && <p className="text-xs text-muted-foreground mt-1 italic">{s.notes}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Investigation timeline */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Investigation timeline</CardTitle>
            <Button variant="outline" size="sm" disabled>
              <Upload className="h-4 w-4 mr-1" /> Upload (mock)
            </Button>
          </CardHeader>
          <CardContent>
            <ol className="relative border-l ml-2 space-y-4">
              {patient.investigations.map((inv) => (
                <li key={inv.id} className="ml-4">
                  <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-primary" />
                  <p className="text-sm font-medium">{investigationLabel[inv.type]}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(inv.date)} {inv.result ? `· ${inv.result}` : ""}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-muted-foreground">
              {/* FUTURE: signed file uploads, server-side virus scan, encrypted storage. */}
              File upload is mocked. Real uploads will use signed URLs with server-side scanning.
            </p>
          </CardContent>
        </Card>

        {/* Follow-up planner */}
        <Card>
          <CardHeader><CardTitle className="text-base">Follow-up planner</CardTitle></CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 text-sm">
            <Field label="Next visit" value={formatDate(patient.followUp.nextVisit)} />
            <Field label="Next USG" value={formatDate(patient.followUp.nextUsg)} />
            <Field label="Next blood test" value={formatDate(patient.followUp.nextBloodTest)} />
            <Field label="Next urine test" value={formatDate(patient.followUp.nextUrineTest)} />
            <Field label="Procedure follow-up" value={formatDate(patient.followUp.procedureFollowUp)} />
            <Field label="Reminder" value={patient.followUp.reminderSent ? "Sent" : "Pending"} />
            {patient.followUp.doctorNotes && (
              <div className="sm:col-span-2 md:col-span-3 rounded-md bg-secondary/40 p-3 text-xs">
                <span className="font-medium">Doctor notes: </span>{patient.followUp.doctorNotes}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader><CardTitle className="text-base">Subscription</CardTitle></CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3 text-sm">
            <Field label="Plan" value={tierLabel[patient.subscription.tier]} />
            <Field label="Free USG remaining" value={String(patient.subscription.freeUsgRemaining)} />
            <Field label="Free labs remaining" value={String(patient.subscription.freeLabRemaining)} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
