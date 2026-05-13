import { W as jsxRuntimeExports } from "./server-CTLgJICr.js";
import { u as useNavigate } from "./router-B_pJZuA3.js";
import { d as createLucideIcon, u as useAuth, A as AppHeader, C as Card, a as CardHeader, b as CardTitle, c as CardContent, B as Button } from "./card-BB6cUHwn.js";
import { S as Stethoscope } from "./stethoscope-qJmPo8iA.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function LoginPage() {
  const {
    loginAs
  } = useAuth();
  const navigate = useNavigate();
  const pick = async (role) => {
    await loginAs(role);
    navigate({
      to: role === "doctor" ? "/doctor" : "/patient"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Sign in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground text-sm", children: "Mock login — no credentials required. Real authentication will replace this." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid md:grid-cols-2 gap-4 max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "hover:border-primary/40 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "mt-2", children: "Doctor / Admin" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage patients, follow-ups, investigations and audit logs." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4 w-full", onClick: () => pick("doctor"), children: "Login as Doctor" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "hover:border-primary/40 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "mt-2", children: "Patient" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "See your stone profile, reminders, prevention tips and consent." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "mt-4 w-full", onClick: () => pick("patient"), children: "Login as Patient" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  LoginPage as component
};
