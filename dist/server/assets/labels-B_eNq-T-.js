const stoneTypeLabel = {
  calcium_oxalate: "Calcium oxalate",
  uric_acid: "Uric acid",
  struvite: "Struvite",
  cystine: "Cystine",
  mixed: "Mixed"
};
const procedureLabel = {
  URS: "URS",
  PCNL: "PCNL",
  ESWL: "ESWL",
  stenting: "Stenting",
  conservative: "Conservative"
};
const riskColor = {
  low: "bg-emerald-100 text-emerald-800",
  moderate: "bg-amber-100 text-amber-800",
  high: "bg-rose-100 text-rose-800"
};
const tierLabel = {
  basic: "Basic",
  prevention_plus: "Prevention Plus",
  premium: "Premium StoneCare"
};
function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(void 0, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
const investigationLabel = {
  USG_KUB: "USG KUB",
  CT_KUB: "CT KUB",
  XRAY_KUB: "X-ray KUB",
  S_CREATININE: "Serum creatinine",
  S_CALCIUM: "Serum calcium",
  URIC_ACID: "Uric acid",
  URINE_ROUTINE: "Urine routine",
  URINE_24H: "24h urine analysis",
  STONE_ANALYSIS: "Stone analysis"
};
export {
  formatDate as f,
  investigationLabel as i,
  procedureLabel as p,
  riskColor as r,
  stoneTypeLabel as s,
  tierLabel as t
};
