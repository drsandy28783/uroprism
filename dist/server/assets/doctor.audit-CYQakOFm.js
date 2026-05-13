import { W as jsxRuntimeExports, r as reactExports } from "./server-CTLgJICr.js";
import { l as auditService, A as AppHeader, C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BB6cUHwn.js";
import { R as RequireRole } from "./RequireRole-COv1paqh.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-B_pJZuA3.js";
const actionLabel = {
  patient_viewed: "Patient viewed",
  investigation_added: "Investigation added",
  followup_updated: "Follow-up updated",
  subscription_changed: "Subscription changed",
  consent_updated: "Consent updated"
};
function AuditPage() {
  const [logs, setLogs] = reactExports.useState([]);
  reactExports.useEffect(() => {
    auditService.list().then(setLogs);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Audit log" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Placeholder. ",
          "Real audit entries will be tamper-evident and exportable."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Recent activity (mock)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y", children: logs.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "py-3 flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: actionLabel[l.action] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: l.target })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: l.actor }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(l.at).toLocaleString() })
          ] })
        ] }, l.id)) }) })
      ] })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(RequireRole, { role: "doctor", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuditPage, {}) });
export {
  SplitComponent as component
};
