import { W as jsxRuntimeExports, r as reactExports } from "./server-CTLgJICr.js";
import { R as Route, L as Link } from "./router-B_pJZuA3.js";
import { d as createLucideIcon, p as patientService, A as AppHeader, C as Card, a as CardHeader, b as CardTitle, c as CardContent, B as Button } from "./card-BB6cUHwn.js";
import { R as RequireRole } from "./RequireRole-COv1paqh.js";
import { B as Badge } from "./badge-DZBtqxX0.js";
import { f as formatDate, r as riskColor, t as tierLabel, s as stoneTypeLabel, p as procedureLabel, i as investigationLabel } from "./labels-B_eNq-T-.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function PatientProfile() {
  const {
    patientId
  } = Route.useParams();
  const [patient, setPatient] = reactExports.useState(null);
  reactExports.useEffect(() => {
    patientService.get(patientId).then(setPatient);
  }, [patientId]);
  if (!patient) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 text-muted-foreground", children: "Loading…" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/doctor/patients", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to patients"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: patient.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            patient.age,
            " · ",
            patient.gender,
            " · ",
            patient.phoneMasked,
            " · Enrolled ",
            formatDate(patient.enrolledAt)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: riskColor[patient.riskLevel], variant: "secondary", children: [
            patient.riskLevel,
            " risk"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: tierLabel[patient.subscription.tier] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Profile" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Co-morbidities", value: patient.comorbidities.join(", ") || "None recorded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Medications", value: patient.medications.join(", ") || "None" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Family history", value: patient.familyHistory }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Diet risk factors", value: patient.dietRiskFactors.join(", ") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hydration", value: `${patient.hydrationLitresPerDay} L/day` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Stone history" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: patient.stoneHistory.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border p-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
                stoneTypeLabel[s.stoneType],
                " · ",
                s.sizeMm,
                " mm · ",
                s.laterality
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(s.date) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: s.location }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mt-1", children: [
              "Procedure: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: procedureLabel[s.procedure] })
            ] }),
            s.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 italic", children: s.notes })
          ] }, s.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Investigation timeline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", disabled: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-1" }),
            " Upload (mock)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "relative border-l ml-2 space-y-4", children: patient.investigations.map((inv) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "ml-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: investigationLabel[inv.type] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              formatDate(inv.date),
              " ",
              inv.result ? `· ${inv.result}` : ""
            ] })
          ] }, inv.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-muted-foreground", children: "File upload is mocked. Real uploads will use signed URLs with server-side scanning." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Follow-up planner" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-3 sm:grid-cols-2 md:grid-cols-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Next visit", value: formatDate(patient.followUp.nextVisit) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Next USG", value: formatDate(patient.followUp.nextUsg) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Next blood test", value: formatDate(patient.followUp.nextBloodTest) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Next urine test", value: formatDate(patient.followUp.nextUrineTest) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Procedure follow-up", value: formatDate(patient.followUp.procedureFollowUp) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Reminder", value: patient.followUp.reminderSent ? "Sent" : "Pending" }),
          patient.followUp.doctorNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 md:col-span-3 rounded-md bg-secondary/40 p-3 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Doctor notes: " }),
            patient.followUp.doctorNotes
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Subscription" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-3 sm:grid-cols-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Plan", value: tierLabel[patient.subscription.tier] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Free USG remaining", value: String(patient.subscription.freeUsgRemaining) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Free labs remaining", value: String(patient.subscription.freeLabRemaining) })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: value })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(RequireRole, { role: "doctor", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PatientProfile, {}) });
export {
  SplitComponent as component
};
