import { r as reactExports, W as jsxRuntimeExports } from "./server-CTLgJICr.js";
import { L as Link } from "./router-B_pJZuA3.js";
import { d as createLucideIcon, f as cn, p as patientService, A as AppHeader, C as Card, c as CardContent } from "./card-BB6cUHwn.js";
import { R as RequireRole } from "./RequireRole-COv1paqh.js";
import { B as Badge } from "./badge-DZBtqxX0.js";
import { s as stoneTypeLabel, f as formatDate, r as riskColor, t as tierLabel } from "./labels-B_eNq-T-.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
function PatientList() {
  const [patients, setPatients] = reactExports.useState([]);
  const [q, setQ] = reactExports.useState("");
  const [stoneFilter, setStoneFilter] = reactExports.useState("all");
  const [riskFilter, setRiskFilter] = reactExports.useState("all");
  const [dueOnly, setDueOnly] = reactExports.useState(false);
  reactExports.useEffect(() => {
    patientService.list().then(setPatients);
  }, []);
  const filtered = reactExports.useMemo(() => {
    const today = /* @__PURE__ */ new Date();
    return patients.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      const t = p.stoneHistory[0]?.stoneType;
      if (stoneFilter !== "all" && t !== stoneFilter) return false;
      if (riskFilter !== "all" && p.riskLevel !== riskFilter) return false;
      if (dueOnly) {
        const next = p.followUp.nextVisit ? new Date(p.followUp.nextVisit) : null;
        if (!next || (next.getTime() - today.getTime()) / 864e5 > 30) return false;
      }
      return true;
    });
  }, [patients, q, stoneFilter, riskFilter, dueOnly]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between gap-4 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Patients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          filtered.length,
          " of ",
          patients.length
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search by name", className: "pl-9" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "rounded-md border bg-background px-3 py-2 text-sm", value: stoneFilter, onChange: (e) => setStoneFilter(e.target.value), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All stone types" }),
          Object.keys(stoneTypeLabel).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: stoneTypeLabel[t] }, t))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "flex-1 rounded-md border bg-background px-3 py-2 text-sm", value: riskFilter, onChange: (e) => setRiskFilter(e.target.value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All risk" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Low" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "moderate", children: "Moderate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "High" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: dueOnly, onChange: (e) => setDueOnly(e.target.checked) }),
            "Due ≤30d"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-md border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/50 text-left text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Patient" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Age" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Stone type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Last visit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Next follow-up" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Risk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Subscription" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t hover:bg-secondary/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/doctor/patients/$patientId", params: {
              patientId: p.id
            }, className: "font-medium text-primary hover:underline", children: p.name }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: p.age }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: stoneTypeLabel[p.stoneHistory[0]?.stoneType ?? "mixed"] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatDate(p.lastVisit) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatDate(p.followUp.nextVisit) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: riskColor[p.riskLevel], variant: "secondary", children: p.riskLevel }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: tierLabel[p.subscription.tier] }) })
          ] }, p.id)),
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-4 py-12 text-center text-muted-foreground", children: "No patients match your filters." }) })
        ] })
      ] }) })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(RequireRole, { role: "doctor", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PatientList, {}) });
export {
  SplitComponent as component
};
