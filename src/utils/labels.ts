import type { StoneType, ProcedureType, RiskLevel, SubscriptionTier } from "@/types";

export const stoneTypeLabel: Record<StoneType, string> = {
  calcium_oxalate: "Calcium oxalate",
  uric_acid: "Uric acid",
  struvite: "Struvite",
  cystine: "Cystine",
  mixed: "Mixed",
};

export const procedureLabel: Record<ProcedureType, string> = {
  URS: "URS",
  PCNL: "PCNL",
  ESWL: "ESWL",
  stenting: "Stenting",
  conservative: "Conservative",
};

export const riskColor: Record<RiskLevel, string> = {
  low: "bg-emerald-100 text-emerald-800",
  moderate: "bg-amber-100 text-amber-800",
  high: "bg-rose-100 text-rose-800",
};

export const tierLabel: Record<SubscriptionTier, string> = {
  basic: "Basic",
  prevention_plus: "Prevention Plus",
  premium: "Premium StoneCare",
};

export function formatDate(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const investigationLabel: Record<string, string> = {
  USG_KUB: "USG KUB",
  CT_KUB: "CT KUB",
  XRAY_KUB: "X-ray KUB",
  S_CREATININE: "Serum creatinine",
  S_CALCIUM: "Serum calcium",
  URIC_ACID: "Uric acid",
  URINE_ROUTINE: "Urine routine",
  URINE_24H: "24h urine analysis",
  STONE_ANALYSIS: "Stone analysis",
};
