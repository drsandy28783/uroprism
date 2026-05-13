import { W as jsxRuntimeExports, r as reactExports } from "./server-CTLgJICr.js";
import { p as patientService, g as currentPatientId, A as AppHeader, C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BB6cUHwn.js";
import { R as RequireRole } from "./RequireRole-COv1paqh.js";
import { s as stoneTypeLabel } from "./labels-B_eNq-T-.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-B_pJZuA3.js";
const tipsByStoneType = {
  calcium_oxalate: ["Drink 2.5–3L of fluid daily, mostly water.", "Limit high-oxalate foods: spinach, beetroot, nuts, chocolate.", "Don't cut dietary calcium — take it with meals to bind oxalate in the gut.", "Reduce salt and animal protein.", "Consider potassium citrate if prescribed."],
  uric_acid: ["Maintain urine pH above 6 with citrate or bicarbonate as advised.", "Reduce purine-rich foods: organ meat, shellfish, red meat, beer.", "Hydrate aggressively, especially in hot weather.", "Treat hyperuricemia with allopurinol if prescribed."],
  struvite: ["Treat urinary tract infections promptly and completely.", "Complete clearance is essential — fragments harbour infection.", "Follow imaging schedule strictly to detect regrowth.", "Maintain good hydration and post-void hygiene."],
  cystine: ["Very high fluid intake: 3–4L daily, including overnight.", "Alkalinise urine to pH 7–7.5 (potassium citrate).", "Reduce sodium and methionine-rich foods.", "Tiopronin or D-penicillamine may be prescribed."],
  mixed: ["Follow all general prevention rules: hydration, low salt, balanced calcium.", "Stone analysis after each episode helps fine-tune your plan.", "Adhere to the imaging and lab schedule from your urologist."]
};
const generalTips = [{
  t: "Hydration",
  d: "2.5–3L of fluid per day; aim for pale-yellow urine."
}, {
  t: "Salt",
  d: "Keep sodium under 5g/day — reduces calcium in urine."
}, {
  t: "Protein",
  d: "Moderate animal protein; balance with plant sources."
}, {
  t: "Citrate",
  d: "Lemon water and citrus help raise urinary citrate."
}, {
  t: "Calcium",
  d: "Don't restrict dietary calcium; take it with meals."
}, {
  t: "Urgent care",
  d: "Fever + flank pain, no urine output, or uncontrolled vomiting need ER care."
}];
function Education() {
  const [p, setP] = reactExports.useState(null);
  reactExports.useEffect(() => {
    patientService.get(currentPatientId).then(setP);
  }, []);
  const myStone = p?.stoneHistory[p.stoneHistory.length - 1]?.stoneType ?? "mixed";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Education & prevention" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Personalised tips based on your stone type, plus general guidance." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/20 bg-primary/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base", children: [
          "For your stone type: ",
          stoneTypeLabel[myStone]
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm list-disc pl-5", children: tipsByStoneType[myStone].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t }, t)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-medium tracking-tight mb-3", children: "General guidance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-3", children: generalTips.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: g.t }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-sm text-muted-foreground", children: g.d })
        ] }, g.t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-medium tracking-tight mb-3", children: "All stone types" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: Object.keys(tipsByStoneType).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: stoneTypeLabel[t] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-sm list-disc pl-5 space-y-1 text-muted-foreground", children: tipsByStoneType[t].map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: tip }, tip)) }) })
        ] }, t)) })
      ] })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(RequireRole, { role: "patient", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Education, {}) });
export {
  SplitComponent as component
};
