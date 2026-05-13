import { W as jsxRuntimeExports } from "./server-CTLgJICr.js";
import { L as Link } from "./router-B_pJZuA3.js";
import { A as AppHeader, C as Card, a as CardHeader, b as CardTitle, c as CardContent, B as Button } from "./card-BB6cUHwn.js";
import { C as Check } from "./check-BnSiz0RJ.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const plans = [{
  id: "basic",
  name: "Basic",
  price: "₹499",
  tagline: "For low-risk single-stone formers.",
  features: ["Annual follow-up reminder", "1 USG / year reminder", "Educational content", "Basic prevention plan"],
  highlight: false
}, {
  id: "prevention_plus",
  name: "Prevention Plus",
  price: "₹999",
  tagline: "Most-recommended for recurrent stone formers.",
  features: ["Quarterly follow-up reminders", "2 free USG / year", "20% off lab tests", "Personalised diet & hydration plan", "Doctor review (twice a year)"],
  highlight: true
}, {
  id: "premium",
  name: "Premium StoneCare",
  price: "₹1,899",
  tagline: "Comprehensive care for high-risk patients.",
  features: ["Monthly check-ins & reminders", "4 free USG / year", "40% off all labs & radiology", "Priority doctor appointments", "24h urine analysis included", "Coordinated procedure follow-up"],
  highlight: false
}];
function Subscriptions() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-12 space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-semibold tracking-tight", children: "Choose your StoneCare plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "All plans include doctor-supervised follow-up. Upgrade or change anytime." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: plans.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: p.highlight ? "border-primary shadow-lg shadow-primary/10 relative" : "", children: [
        p.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground", children: "Most popular" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: p.tagline }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-3xl font-semibold tracking-tight", children: [
            p.price,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "/month" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: p.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }),
            " ",
            f
          ] }, f)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: p.highlight ? "default" : "outline", className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", children: [
            "Get ",
            p.name
          ] }) })
        ] })
      ] }, p.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "Mock pricing. Real billing will be added later." })
    ] })
  ] });
}
export {
  Subscriptions as component
};
