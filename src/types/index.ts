// Domain types for the renal stone prevention MVP.
// NOTE: These types describe MOCK data only. When the real backend (FastAPI/Postgres)
// is wired in, these should mirror the persisted schema and add server-side fields
// like createdAt/updatedAt/auditMeta.

export type UserRole = "doctor" | "patient";

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  // FUTURE: replace with real session/JWT/OIDC claims from Lovable Cloud auth.
}

export type StoneType =
  | "calcium_oxalate"
  | "uric_acid"
  | "struvite"
  | "cystine"
  | "mixed";

export type Laterality = "left" | "right" | "bilateral";

export type ProcedureType = "URS" | "PCNL" | "ESWL" | "stenting" | "conservative";

export type RiskLevel = "low" | "moderate" | "high";

export type SubscriptionTier = "basic" | "prevention_plus" | "premium";

export interface StoneEpisode {
  id: string;
  date: string; // ISO
  stoneType: StoneType;
  sizeMm: number;
  location: string; // e.g. "Lower pole, left kidney"
  laterality: Laterality;
  procedure: ProcedureType;
  notes?: string;
}

export type Comorbidity =
  | "diabetes"
  | "gout"
  | "obesity"
  | "ckd"
  | "recurrent_uti"
  | "hyperparathyroidism";

export interface Investigation {
  id: string;
  date: string;
  type:
    | "USG_KUB"
    | "CT_KUB"
    | "XRAY_KUB"
    | "S_CREATININE"
    | "S_CALCIUM"
    | "URIC_ACID"
    | "URINE_ROUTINE"
    | "URINE_24H"
    | "STONE_ANALYSIS";
  result?: string;
  fileMockUrl?: string; // FUTURE: signed URL from object storage with virus scan + audit log.
}

export interface FollowUp {
  id: string;
  nextVisit?: string;
  nextUsg?: string;
  nextBloodTest?: string;
  nextUrineTest?: string;
  procedureFollowUp?: string;
  reminderSent: boolean;
  doctorNotes?: string;
}

export interface Subscription {
  tier: SubscriptionTier;
  startedAt: string;
  freeUsgRemaining: number;
  freeLabRemaining: number;
  active: boolean;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  phoneMasked: string; // FUTURE: encrypt PII at rest, mask in UI by role.
  comorbidities: Comorbidity[];
  medications: string[];
  familyHistory: string;
  dietRiskFactors: string[];
  hydrationLitresPerDay: number;
  stoneHistory: StoneEpisode[];
  investigations: Investigation[];
  followUp: FollowUp;
  subscription: Subscription;
  riskLevel: RiskLevel;
  lastVisit: string;
  enrolledAt: string;
}

export interface AuditLogEntry {
  id: string;
  at: string;
  actor: string;
  action:
    | "patient_viewed"
    | "investigation_added"
    | "followup_updated"
    | "subscription_changed"
    | "consent_updated";
  target: string;
  // FUTURE: include IP, user agent, request id, signed hash chain for tamper-evidence.
}

export interface ConsentState {
  dataStorage: boolean;
  reminders: boolean;
  educationalMessages: boolean;
  shareReportsWithDoctor: boolean;
  discountedLabCoordination: boolean;
  // FUTURE: store consent version, timestamp, IP, and immutable history per HIPAA/GDPR/DPDP.
  version: string;
  updatedAt?: string;
}
