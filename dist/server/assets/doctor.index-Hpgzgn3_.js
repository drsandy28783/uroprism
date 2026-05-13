import { W as jsxRuntimeExports, r as reactExports } from "./server-CTLgJICr.js";
import { L as Link } from "./router-B_pJZuA3.js";
import { d as createLucideIcon, C as Card, c as CardContent, p as patientService, h as computeDoctorMetrics, A as AppHeader, a as CardHeader, b as CardTitle } from "./card-BB6cUHwn.js";
import { R as RequireRole } from "./RequireRole-COv1paqh.js";
import { B as Badge } from "./badge-DZBtqxX0.js";
import { s as stoneTypeLabel, f as formatDate, r as riskColor, t as tierLabel } from "./labels-B_eNq-T-.js";
import { S as Stethoscope } from "./stethoscope-qJmPo8iA.js";
import { T as TriangleAlert } from "./triangle-alert-DRqnAnKj.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  ["path", { d: "M16 14v2.2l1.6 1", key: "fo4ql5" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
];
const CalendarClock = createLucideIcon("calendar-clock", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["circle", { cx: "10", cy: "12", r: "2", key: "737tya" }],
  ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22", key: "wt3hpn" }]
];
const FileImage = createLucideIcon("file-image", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
function StatCard({
  icon: Icon,
  label,
  value,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 place-items-center rounded-md bg-secondary text-secondary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-semibold tracking-tight", children: value }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: hint })
  ] }) });
}
function DoctorDashboard() {
  const [patients, setPatients] = reactExports.useState([]);
  reactExports.useEffect(() => {
    patientService.list().then(setPatients);
  }, []);
  const m = computeDoctorMetrics(patients);
  const recentInvestigations = patients.flatMap((p) => p.investigations.map((i) => ({
    ...i,
    patient: p
  }))).sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-8 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Doctor dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Overview of your enrolled stone-care patients." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Users, label: "Enrolled patients", value: m.total }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: CalendarClock, label: "Due for follow-up", value: m.dueFollowUp, hint: "Next 30 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Stethoscope, label: "Due for ultrasound", value: m.dueUsg, hint: "Next 30 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: TriangleAlert, label: "High-risk", value: m.highRisk }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Wallet, label: "Active subscriptions", value: m.activeSubs })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Patients due soon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/doctor/patients", className: "text-xs text-primary hover:underline", children: "View all" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: patients.slice(0, 5).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/doctor/patients/$patientId", params: {
            patientId: p.id
          }, className: "flex items-center justify-between rounded-md border bg-card px-3 py-2 hover:bg-secondary/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                stoneTypeLabel[p.stoneHistory[0]?.stoneType ?? "mixed"],
                " · Next visit ",
                formatDate(p.followUp.nextVisit)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: riskColor[p.riskLevel], variant: "secondary", children: p.riskLevel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: tierLabel[p.subscription.tier] })
            ] })
          ] }, p.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "h-4 w-4" }),
            " Recent investigations"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: recentInvestigations.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: i.patient.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              i.type.replace(/_/g, " "),
              " · ",
              formatDate(i.date)
            ] })
          ] }, i.id)) })
        ] })
      ] })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(RequireRole, { role: "doctor", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DoctorDashboard, {}) });
export {
  SplitComponent as component
};
