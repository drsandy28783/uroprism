import { mockPatients, mockAuditLogs, currentPatientId } from "@/data/mockPatients";
import type { AuthUser, Patient, UserRole, ConsentState } from "@/types";

// Mock service layer. ALL functions return Promises so swapping to fetch() against
// FastAPI later is a one-line change. Do NOT add real network calls or secrets here.
//
// FUTURE:
//  - Replace mock auth with Lovable Cloud / Supabase / OIDC.
//  - All mutations must write an audit log entry server-side.
//  - PII must be encrypted at rest, transmitted over TLS, masked in UI per role.
//  - File uploads must use signed URLs + server-side virus scan + audit trail.
//  - Consent must be versioned and immutable.

const delay = <T>(value: T, ms = 200): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

// --- Auth (mocked) -------------------------------------------------------
// NOTE: Stored in-memory only. No tokens, no PII. Real auth replaces this entirely.
let currentUser: AuthUser | null = null;
const listeners = new Set<() => void>();

export const authService = {
  loginAs(role: UserRole): Promise<AuthUser> {
    currentUser =
      role === "doctor"
        ? { id: "doc-1", name: "Dr. Kapoor", role: "doctor" }
        : { id: currentPatientId, name: "Asha Verma", role: "patient" };
    listeners.forEach((l) => l());
    return delay(currentUser, 100);
  },
  logout() {
    currentUser = null;
    listeners.forEach((l) => l());
  },
  getCurrentUser(): AuthUser | null {
    return currentUser;
  },
  subscribe(fn: () => void): () => void {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

// --- Patients ------------------------------------------------------------
export const patientService = {
  list: () => delay(mockPatients),
  get: (id: string) => delay(mockPatients.find((p) => p.id === id) ?? null),
  // FUTURE: paginate, filter server-side, enforce row-level security by role.
};

// --- Audit log -----------------------------------------------------------
export const auditService = {
  list: () => delay(mockAuditLogs),
  // FUTURE: append-only log, signed entries, retention policy per regulation.
};

// --- Consent (mocked, in-memory) -----------------------------------------
let consentState: ConsentState = {
  dataStorage: false,
  reminders: false,
  educationalMessages: false,
  shareReportsWithDoctor: false,
  discountedLabCoordination: false,
  version: "v0.1-draft",
};

export const consentService = {
  get: () => delay(consentState),
  update: (next: Partial<ConsentState>) => {
    consentState = { ...consentState, ...next, updatedAt: new Date().toISOString() };
    // FUTURE: append immutable consent history record + audit log entry server-side.
    return delay(consentState);
  },
};

// Helper: derived dashboard metrics for doctor view.
export function computeDoctorMetrics(patients: Patient[]) {
  const today = new Date();
  const within = (iso?: string, days = 30) => {
    if (!iso) return false;
    const diff = (new Date(iso).getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= days && diff >= -7;
  };
  return {
    total: patients.length,
    dueFollowUp: patients.filter((p) => within(p.followUp.nextVisit)).length,
    dueUsg: patients.filter((p) => within(p.followUp.nextUsg)).length,
    highRisk: patients.filter((p) => p.riskLevel === "high").length,
    activeSubs: patients.filter((p) => p.subscription.active).length,
  };
}
