import { W as jsxRuntimeExports } from "./server-CTLgJICr.js";
import { L as Link } from "./router-B_pJZuA3.js";
import { d as createLucideIcon, A as AppHeader, B as Button, C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BB6cUHwn.js";
import { S as ShieldCheck, C as CalendarCheck } from "./shield-check-DxXIqRUp.js";
import { S as Stethoscope } from "./stethoscope-qJmPo8iA.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$2 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
];
const FlaskConical = createLucideIcon("flask-conical", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ],
  ["path", { d: "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27", key: "auskq0" }]
];
const HeartPulse = createLucideIcon("heart-pulse", __iconNode);
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-br from-secondary via-background to-background" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
          " Urologist-supervised program"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-4xl md:text-6xl font-semibold tracking-tight text-foreground", children: "Stop kidney stones from coming back." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-muted-foreground max-w-2xl", children: "StoneCare is a long-term renal stone prevention and follow-up program. Personalised reminders, scheduled imaging and labs, and a urologist who actually knows your stone history." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Get started" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/subscriptions", children: "View plans" }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold tracking-tight", children: "Why recurrence prevention matters" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-muted-foreground", children: [
          "Up to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "50% of stone formers" }),
          " will develop another stone within 5–10 years without structured follow-up. Most recurrences are preventable with hydration, diet correction, the right medication, and timely imaging."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: [{
        icon: HeartPulse,
        t: "Lower recurrence",
        d: "Structured follow-up reduces repeat episodes."
      }, {
        icon: CalendarCheck,
        t: "Never miss a scan",
        d: "Automated USG and lab reminders."
      }, {
        icon: FlaskConical,
        t: "Targeted prevention",
        d: "Plan based on your stone composition."
      }, {
        icon: Stethoscope,
        t: "Doctor-led care",
        d: "Reviewed by your urologist, not an algorithm."
      }].map(({
        icon: Icon,
        t,
        d
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-md bg-secondary text-secondary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base mt-2", children: t })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-sm text-muted-foreground", children: d })
      ] }, t)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/40 border-y", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold tracking-tight", children: "What the program includes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid md:grid-cols-3 gap-4", children: [{
        t: "Stone history & investigations",
        d: "All your scans, labs and stone analyses in one timeline."
      }, {
        t: "Personalised prevention plan",
        d: "Diet, hydration and medication tuned to your stone type."
      }, {
        t: "Follow-up reminders",
        d: "USG, blood, and 24-h urine reminders before they're due."
      }, {
        t: "Discounted labs & radiology",
        d: "Subscription perks for ongoing tests."
      }, {
        t: "Doctor review",
        d: "Periodic clinical review by your urologist."
      }, {
        t: "Red-flag guidance",
        d: "Know exactly when to seek urgent care."
      }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: f.t }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-sm text-muted-foreground", children: f.d })
      ] }, f.t)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold tracking-tight", children: "Doctor-supervised, not just an app" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Every plan is reviewed by a urologist. We coordinate your imaging, labs and medication adjustments — and flag when you need to be seen in person." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-3 text-sm", children: ["Stone-type-specific prevention", "Imaging cadence adjusted to your risk", "Clinical notes you can share with any doctor"].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-primary" }),
          " ",
          x
        ] }, x)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gradient-to-br from-primary/10 to-accent/20 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Subscription starting at" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-4xl font-semibold tracking-tight", children: [
          "₹499",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-normal text-muted-foreground", children: "/month" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Includes follow-up reminders, free USG quota, lab discounts and doctor review." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/subscriptions", children: "Compare plans" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 text-xs text-muted-foreground flex flex-wrap justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " StoneCare — MVP prototype. Mock data only."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Not a substitute for emergency care." })
    ] }) })
  ] });
}
export {
  Landing as component
};
