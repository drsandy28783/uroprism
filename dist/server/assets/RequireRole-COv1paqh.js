import { W as jsxRuntimeExports } from "./server-CTLgJICr.js";
import { u as useAuth } from "./card-BB6cUHwn.js";
import { N as Navigate } from "./router-B_pJZuA3.js";
function RequireRole({ role, children }) {
  const { user } = useAuth();
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  if (user.role !== role) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
export {
  RequireRole as R
};
