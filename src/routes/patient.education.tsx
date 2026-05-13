import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { PrototypeBanner } from "@/components/PrototypeBanner";
import { RequireRole } from "@/components/RequireRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { patientService } from "@/services/api";
import { currentPatientId } from "@/data/mockPatients";
import type { Patient, StoneType } from "@/types";
import { stoneTypeLabel } from "@/utils/labels";

export const Route = createFileRoute("/patient/education")({
  component: () => (
    <RequireRole role="patient">
      <Education />
    </RequireRole>
  ),
});

const tipsByStoneType: Record<StoneType, string[]> = {
  calcium_oxalate: [
    "Drink 2.5–3L of fluid daily, mostly water.",
    "Limit high-oxalate foods: spinach, beetroot, nuts, chocolate.",
    "Don't cut dietary calcium — take it with meals to bind oxalate in the gut.",
    "Reduce salt and animal protein.",
    "Consider potassium citrate if prescribed.",
  ],
  uric_acid: [
    "Maintain urine pH above 6 with citrate or bicarbonate as advised.",
    "Reduce purine-rich foods: organ meat, shellfish, red meat, beer.",
    "Hydrate aggressively, especially in hot weather.",
    "Treat hyperuricemia with allopurinol if prescribed.",
  ],
  struvite: [
    "Treat urinary tract infections promptly and completely.",
    "Complete clearance is essential — fragments harbour infection.",
    "Follow imaging schedule strictly to detect regrowth.",
    "Maintain good hydration and post-void hygiene.",
  ],
  cystine: [
    "Very high fluid intake: 3–4L daily, including overnight.",
    "Alkalinise urine to pH 7–7.5 (potassium citrate).",
    "Reduce sodium and methionine-rich foods.",
    "Tiopronin or D-penicillamine may be prescribed.",
  ],
  mixed: [
    "Follow all general prevention rules: hydration, low salt, balanced calcium.",
    "Stone analysis after each episode helps fine-tune your plan.",
    "Adhere to the imaging and lab schedule from your urologist.",
  ],
};

const generalTips = [
  { t: "Hydration", d: "2.5–3L of fluid per day; aim for pale-yellow urine." },
  { t: "Salt", d: "Keep sodium under 5g/day — reduces calcium in urine." },
  { t: "Protein", d: "Moderate animal protein; balance with plant sources." },
  { t: "Citrate", d: "Lemon water and citrus help raise urinary citrate." },
  { t: "Calcium", d: "Don't restrict dietary calcium; take it with meals." },
  { t: "Urgent care", d: "Fever + flank pain, no urine output, or uncontrolled vomiting need ER care." },
];

function Education() {
  const [p, setP] = useState<Patient | null>(null);
  useEffect(() => {
    patientService.get(currentPatientId).then(setP);
  }, []);
  const myStone = p?.stoneHistory[p.stoneHistory.length - 1]?.stoneType ?? "mixed";

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <PrototypeBanner />
      <main className="container mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Education & prevention</h1>
          <p className="text-sm text-muted-foreground">Personalised tips based on your stone type, plus general guidance.</p>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader><CardTitle className="text-base">For your stone type: {stoneTypeLabel[myStone]}</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm list-disc pl-5">
              {tipsByStoneType[myStone].map((t) => <li key={t}>{t}</li>)}
            </ul>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-lg font-medium tracking-tight mb-3">General guidance</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {generalTips.map((g) => (
              <Card key={g.t}>
                <CardHeader><CardTitle className="text-base">{g.t}</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground">{g.d}</CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium tracking-tight mb-3">All stone types</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {(Object.keys(tipsByStoneType) as StoneType[]).map((t) => (
              <Card key={t}>
                <CardHeader><CardTitle className="text-base">{stoneTypeLabel[t]}</CardTitle></CardHeader>
                <CardContent>
                  <ul className="text-sm list-disc pl-5 space-y-1 text-muted-foreground">
                    {tipsByStoneType[t].map((tip) => <li key={tip}>{tip}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
