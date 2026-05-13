# StoneCare Prototype Demo Guide

**For Urologists reviewing the prototype**

---

## ⚠️ Important Notice

This is a **clickable prototype** with mock data only.

- **Do NOT enter real patient data**
- All patients shown are synthetic test cases
- No data is saved to a database
- Authentication is simulated for demo purposes only

---

## Getting Started

### 1. Access the Application

```bash
# Start the development server
npm run dev
```

Then open your browser to `http://localhost:5173`

### 2. Demo Accounts

The prototype has two login modes:

1. **Doctor View** — Full patient management interface
2. **Patient View** — Patient-facing dashboard and education

No passwords required (mock authentication).

---

## Doctor Workflow Test Scenarios

### Scenario 1: Dashboard Overview

**Goal**: Understand your patient population at a glance

1. Click **"Sign in"** on homepage
2. Select **"Login as Doctor"**
3. **Observe Dashboard** showing:
   - Total enrolled patients (7)
   - Patients due for follow-up in next 30 days
   - Patients due for ultrasound
   - High-risk patient count
   - Active subscriptions

**Look for**:
- Clear metrics presentation
- Recent patient list
- Recent investigations panel

---

### Scenario 2: Browse Patient List

**Goal**: Filter and find patients efficiently

1. From dashboard, click **"Patients"** in navigation
2. **Try each filter**:
   - Search by name (try "Asha")
   - Filter by stone type (calcium oxalate, uric acid, etc.)
   - Filter by risk level (high, moderate, low)
   - Toggle "Due for follow-up only"
3. Observe **7 diverse patient cases**:
   - Asha Verma — High risk, multiple calcium oxalate stones
   - Rahul Mehta — Moderate risk, uric acid stone
   - Priya Nair — High risk, struvite (post-PCNL)
   - Sandeep Iyer — Moderate risk, mixed stones with hyperparathyroidism
   - Meera Joshi — High risk, cystine stones (genetic)
   - Vikram Singh — Low risk, single stone, excellent compliance
   - Anjali Desai — High risk, recent recurrence, needs urgent attention

**Look for**:
- Clear presentation of risk level, stone type, subscription tier
- Easy-to-use filters
- Quick access to patient details

---

### Scenario 3: View Patient Detail (High Risk Case)

**Goal**: Review complete patient history and plan follow-up

1. Click on **"Anjali Desai"** (or any high-risk patient)
2. **Review each section**:

   **Profile Header**:
   - Name, age, gender, phone
   - Risk level badge
   - Subscription tier

   **Stone History Timeline**:
   - Multiple stone episodes with dates
   - Stone type, size, location
   - Procedures performed (ESWL, URS, PCNL, etc.)
   - Clinical notes

   **Investigations**:
   - Imaging results (USG, CT, X-ray)
   - Lab values (creatinine, calcium, uric acid)
   - 24-hour urine analysis
   - Stone composition analysis

   **Medical Background**:
   - Comorbidities (diabetes, obesity, gout, etc.)
   - Current medications
   - Family history
   - Diet risk factors
   - Hydration level

   **Follow-up Schedule**:
   - Next clinic visit date
   - Next ultrasound date
   - Next blood test date
   - Next urine test date
   - Doctor's notes
   - Reminder status

   **Subscription Details**:
   - Current tier
   - Free investigations remaining
   - Subscription start date

3. **Note the "Upload Report" button** (placeholder for future feature)

**Look for**:
- Complete clinical picture at a glance
- Clear timeline of stone history
- Easy identification of due dates
- Doctor notes visibility

---

### Scenario 4: Compare Low Risk vs High Risk

**Goal**: Understand risk stratification

1. View **Vikram Singh** (low risk):
   - Single stone episode, passed spontaneously
   - No comorbidities
   - Excellent hydration (3.0L/day)
   - Long interval until next follow-up
   - "Continue current regimen" notes

2. View **Anjali Desai** (high risk):
   - Multiple stone episodes
   - Recent recurrence (2 weeks ago)
   - Poor hydration (1.2L/day)
   - Comorbidities (diabetes, obesity)
   - **URGENT** doctor notes
   - Near-term follow-up scheduled

**Look for**:
- Risk level clearly reflects clinical situation
- Follow-up frequency appropriate to risk
- Doctor notes reflect urgency

---

### Scenario 5: Audit Log Review

**Goal**: Track PHI access for compliance

1. Click **"Audit"** in navigation
2. Review recent activity log showing:
   - Who accessed what patient
   - When investigations were added
   - When follow-ups were updated
   - Patient consent changes
   - Subscription modifications

**Note**: This is mock data. Real system will have:
- Tamper-evident hash chain
- IP addresses and user agents
- Request IDs for correlation
- 6-year retention policy

---

## Patient Workflow Test Scenarios

### Scenario 6: Patient Dashboard

**Goal**: Patient sees their own health summary

1. **Sign out** (if logged in as doctor)
2. Click **"Sign in"** and select **"Login as Patient"**
3. **Review dashboard** showing:

   **Risk Overview**:
   - Current risk level with explanation
   - Most recent stone type
   - Stone history summary

   **Hydration Tracking** (mock):
   - Current hydration: 1.4L/day
   - Goal: 2.5L/day
   - Progress bar visualization

   **Upcoming Appointments**:
   - Next clinic visit
   - Next ultrasound
   - Next blood test
   - Next urine test
   - Reminder status indicators

   **Diet Risk Factors**:
   - High sodium
   - Low fluid intake
   - High oxalate vegetables

   **Subscription Benefits**:
   - Current tier (Prevention Plus)
   - Free USG remaining
   - Free lab tests remaining
   - Enrollment date

**Look for**:
- Patient-friendly language (no medical jargon)
- Clear action items (appointments)
- Visual feedback (progress bar)
- Encouragement for compliance

---

### Scenario 7: Education Content

**Goal**: Patient learns prevention strategies

1. Click **"Education"** in navigation
2. **Review personalized tips** for your stone type:
   - Calcium oxalate: Low oxalate diet, hydration, citrate
   - Uric acid: Alkalinize urine, low purine diet
   - Struvite: Treat UTIs promptly
   - Cystine: High fluid intake, alkalinization
   - Mixed: Combined approach

3. **Review general guidance cards**:
   - Hydration goals
   - Salt reduction
   - Protein moderation
   - Citrate sources
   - Calcium intake (don't restrict!)
   - When to seek urgent care

**Look for**:
- Content tailored to patient's stone type
- Actionable, specific recommendations
- Warning signs for emergencies

---

### Scenario 8: Consent Management

**Goal**: Patient controls data sharing preferences

1. Click **"Consent"** in navigation
2. **Review consent options**:
   - Storage of health data
   - Appointment & test reminders
   - Educational messages
   - Share reports with doctor
   - Discounted lab coordination

3. Toggle some preferences and click **"Save preferences"**
4. Observe mock save confirmation

**Note**: Real system will have:
- Versioned consent forms
- Immutable audit trail
- Digital signatures
- PDF download
- Legal counsel review

---

## Test Cases for Clinical Relevance

### Test Case 1: Recurrent Stone Former (Asha Verma)

**Clinical Profile**:
- 42F with diabetes and obesity
- Mother had recurrent stones (family history)
- 2 calcium oxalate stones in 1.5 years
- Poor hydration (1.4L/day)
- High sodium, low fluid intake
- Hypocitraturia on 24h urine

**Expected Follow-up**:
- Next visit: 2026-06-01
- Emphasis on hydration increase to 2.5L
- Low-sodium diet counseling
- Continue potassium citrate

**Question for reviewer**:
- Does this follow-up plan align with your clinical practice?
- Would you add any investigations?

---

### Test Case 2: Uric Acid Stone (Rahul Mehta)

**Clinical Profile**:
- 35M with gout
- Single uric acid stone, managed conservatively
- High purine diet
- On allopurinol 100mg

**Expected Follow-up**:
- Longer interval (July 2026)
- Monitor uric acid levels
- Diet modification for purine reduction

**Question for reviewer**:
- Is conservative management appropriate?
- Adequate follow-up frequency?

---

### Test Case 3: Infection Stone (Priya Nair)

**Clinical Profile**:
- 28F with recurrent UTIs
- Struvite staghorn stone (partial)
- Status post-PCNL
- CT shows stone-free
- Persistent pyuria

**Expected Follow-up**:
- Close monitoring (May 2026)
- Treat UTIs promptly
- Repeat imaging to confirm stone-free status

**Question for reviewer**:
- Appropriate post-PCNL surveillance?
- Would you add anything to UTI prevention?

---

### Test Case 4: Metabolic Abnormality (Sandeep Iyer)

**Clinical Profile**:
- 51M with hyperparathyroidism
- Mixed stones (70% CaOx, 30% CaP)
- High serum calcium (11.2 mg/dL)
- Brother had calcium stones
- On cinacalcet

**Expected Follow-up**:
- Regular calcium monitoring
- Endocrine co-management

**Question for reviewer**:
- Should parathyroid surgery be discussed?
- Frequency of calcium monitoring appropriate?

---

### Test Case 5: Genetic Condition (Meera Joshi)

**Clinical Profile**:
- 33F with cystinuria (sister also affected)
- Cystine stone, managed with URS
- High cystine excretion (420 mg/day)
- On tiopronin
- Excellent hydration (2.6L/day)

**Expected Follow-up**:
- Regular monitoring given genetic condition
- Medication compliance crucial

**Question for reviewer**:
- Adequate tiopronin dosing assessment?
- Should genetic counseling be part of the program?

---

## Subscription Tiers Review

### Compare Plans

1. Click **"Subscriptions"** in navigation
2. **Review three tiers**:

**Basic (₹499/month)**:
- Best for: Low-risk, single-stone formers
- Annual follow-up
- 1 USG/year
- Educational content

**Prevention Plus (₹999/month)** — Most Popular:
- Best for: Recurrent stone formers
- Quarterly follow-ups
- 2 free USG/year
- 20% off labs
- Personalized diet plan
- Doctor review twice yearly

**Premium (₹1,899/month)**:
- Best for: High-risk, complex cases
- Monthly check-ins
- 4 free USG/year
- 40% off all labs/radiology
- Priority appointments
- 24h urine analysis included
- Coordinated procedure follow-up

**Question for reviewer**:
- Are these tiers clinically meaningful?
- Pricing appropriate for Indian market?
- Any services missing?

---

## Technical Notes for Review

### What Works (Prototype Features)

✅ Mock authentication (doctor/patient roles)
✅ Patient list with filtering
✅ Complete patient profile view
✅ Stone history timeline
✅ Investigation tracking
✅ Follow-up scheduling display
✅ Subscription tier system
✅ Patient dashboard
✅ Personalized education content
✅ Consent management UI
✅ Audit log display
✅ Responsive design (works on mobile)

### What's Mock/Placeholder

⚠️ Authentication (no real passwords, tokens, or sessions)
⚠️ Data persistence (lost on page refresh)
⚠️ Audit logging (not tamper-evident)
⚠️ File uploads (button shown but non-functional)
⚠️ Consent signatures (no digital signing)
⚠️ Hydration tracking (static display, no input)
⚠️ Reminders (shown but not sent)
⚠️ Payment processing (not implemented)

### What's Missing (Future Development)

❌ Real backend API (FastAPI)
❌ Database (PostgreSQL)
❌ Data encryption
❌ Row-level security
❌ Session management
❌ Email/SMS notifications
❌ Lab integration
❌ Imaging file storage
❌ Telemedicine features
❌ Mobile app

---

## Feedback Questions

After testing, please provide feedback on:

### Clinical Workflow

1. Does the doctor dashboard show the most important metrics?
2. Is the patient list filtering useful?
3. Does the patient detail view present information in a logical order?
4. Are the risk levels (low/moderate/high) clinically meaningful?
5. Is the follow-up scheduling workflow clear?
6. Do the stone history and investigation sections have the right level of detail?

### Patient Experience

7. Is the patient dashboard understandable for non-medical users?
8. Are the education tips actionable and accurate?
9. Is the consent management clear and comprehensive?
10. Would patients find the hydration tracking motivating?

### Business Model

11. Are the subscription tiers appropriate for the Indian market?
12. Do the benefits align with clinical value?
13. What pricing would you recommend?
14. Would you recommend this to your patients?

### Missing Features

15. What features are critical for launch that are currently missing?
16. What investigations or data points should be added?
17. Are there any red flags or concerns?
18. What would make this more valuable for your practice?

---

## Next Steps After Review

Based on your feedback, the development roadmap is:

**Phase 1**: Frontend refinements based on your input
**Phase 2**: Backend development (FastAPI + PostgreSQL)
**Phase 3**: Security & compliance (HIPAA/GDPR/DPDP)
**Phase 4**: Lab/imaging integration
**Phase 5**: Mobile app

---

## Contact

For questions, feedback, or detailed clinical discussions about the prototype:

[Your Contact Information Here]

---

## Appendix: Patient Case Summary Table

| Patient | Age/Sex | Stone Type | Risk | Comorbidities | Key Feature |
|---------|---------|------------|------|---------------|-------------|
| **Asha Verma** | 42F | Ca-Ox | High | DM, obesity | Recurrent, poor hydration, family hx |
| **Rahul Mehta** | 35M | Uric acid | Moderate | Gout | High purine diet, on allopurinol |
| **Priya Nair** | 28F | Struvite | High | Recurrent UTI | Post-PCNL, staghorn partial |
| **Sandeep Iyer** | 51M | Mixed | Moderate | Hyperparathyroid | High Ca++, on cinacalcet |
| **Meera Joshi** | 33F | Cystine | High | None | Genetic, on tiopronin, excellent compliance |
| **Vikram Singh** | 45M | Ca-Ox | Low | None | Single stone, passed, excellent hydration |
| **Anjali Desai** | 38F | Ca-Ox | High | DM, obesity | **Recent recurrence, needs urgent attention** |

---

**End of Demo Guide**

Thank you for reviewing the StoneCare prototype!
