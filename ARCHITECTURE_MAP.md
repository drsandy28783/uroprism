# StoneCare MVP Architecture Map

**Quick Reference Guide** — Current structure, routes, components, and development path.

---

## 1. Folder Structure

```
F:\Urology MVP\
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # 46 shadcn/ui components (Button, Card, Dialog, etc.)
│   │   ├── AppHeader.tsx   # Navigation header with role-based links
│   │   ├── RequireRole.tsx # Route protection wrapper (client-side only)
│   │   └── StatCard.tsx    # Metric display card with icon
│   ├── config/
│   │   └── env.ts          # Environment configuration and feature flags
│   ├── data/
│   │   └── mockPatients.ts # Mock patient data and audit logs
│   ├── hooks/
│   │   ├── useAuth.ts      # Mock authentication hook
│   │   └── use-mobile.tsx  # Mobile detection utility
│   ├── lib/
│   │   ├── utils.ts        # General utilities (cn, etc.)
│   │   ├── error-capture.ts
│   │   └── error-page.ts
│   ├── routes/             # TanStack Router file-based routes
│   │   ├── __root.tsx      # Root layout with QueryClient
│   │   ├── index.tsx       # Landing page
│   │   ├── login.tsx       # Mock login page (role selector)
│   │   ├── doctor.index.tsx           # Doctor dashboard
│   │   ├── doctor.patients.index.tsx  # Patient list
│   │   ├── doctor.patients.$patientId.tsx  # Patient detail
│   │   ├── doctor.audit.tsx           # Audit log viewer
│   │   ├── patient.index.tsx          # Patient dashboard
│   │   ├── patient.education.tsx      # Education content
│   │   ├── patient.consent.tsx        # Consent management
│   │   └── subscriptions.tsx          # Subscription info page
│   ├── services/
│   │   └── api.ts          # Mock service layer (auth, patients, audit, consent)
│   ├── types/
│   │   └── index.ts        # TypeScript domain types
│   ├── utils/
│   │   └── labels.ts       # UI label utilities
│   ├── router.tsx          # Router configuration
│   ├── routeTree.gen.ts    # Auto-generated route tree
│   ├── server.ts           # TanStack Start server entry
│   ├── start.ts            # TanStack Start client entry
│   └── styles.css          # Global styles (Tailwind)
├── .env.example            # Environment variable template
├── README.md               # Project documentation with warnings
├── ARCHITECTURE_REVIEW.md  # Detailed architecture analysis and roadmap
└── ARCHITECTURE_MAP.md     # This file

```

---

## 2. Main Routes/Pages

### Public Routes
- **/** — Landing page with product overview
- **/login** — Mock login (select Doctor or Patient role, no password)
- **/subscriptions** — Subscription tier information

### Doctor Routes (Protected)
- **/doctor** — Dashboard with metrics (total patients, follow-ups due, high-risk count)
- **/doctor/patients** — Patient list with filtering (risk level, stone type, follow-up status)
- **/doctor/patients/:patientId** — Patient detail view
  - Stone history with timeline
  - Investigations (USG, blood tests, urine analysis)
  - Comorbidities and medications
  - Follow-up schedule
  - Subscription status
- **/doctor/audit** — Audit log viewer (who accessed what, when)

### Patient Routes (Protected)
- **/patient** — Personal dashboard
  - Risk level and stone profile
  - Next appointments (visit, USG, tests)
  - Hydration tracking
  - Diet risk factors
  - Subscription benefits
- **/patient/education** — Stone prevention education content
- **/patient/consent** — Consent preferences management
  - Data storage consent
  - Reminder preferences
  - Report sharing
  - Lab coordination

---

## 3. Main Components

### Custom Components
| Component | Location | Purpose |
|-----------|----------|---------|
| **AppHeader** | `components/AppHeader.tsx` | Navigation bar with role-based menu, user info, sign out |
| **RequireRole** | `components/RequireRole.tsx` | Route protection wrapper (redirects if role mismatch) |
| **StatCard** | `components/StatCard.tsx` | Metric display card with icon, value, and hint text |

### UI Components (shadcn/ui)
46 reusable components in `components/ui/`:
- **Forms**: Button, Input, Textarea, Select, Checkbox, Switch, Radio Group, Form
- **Layout**: Card, Separator, Tabs, Accordion, Collapsible, Sidebar
- **Feedback**: Alert, Dialog, Sheet, Drawer, Toast (Sonner), Skeleton, Progress
- **Data Display**: Table, Badge, Avatar, Calendar, Chart
- **Overlays**: Popover, Dropdown Menu, Context Menu, Tooltip, Hover Card
- **Navigation**: Breadcrumb, Menubar, Navigation Menu, Pagination
- **And more**: Command, Carousel, Slider, Resizable, Scroll Area, etc.

---

## 4. Mock Data Files

### `src/data/mockPatients.ts`
Contains:
- **`mockPatients: Patient[]`** — Array of synthetic patient records
  - Personal info (name, age, gender, phone)
  - Stone history (type, size, location, procedures)
  - Investigations (USG, blood tests, urine analysis)
  - Follow-up schedule
  - Subscription details
  - Comorbidities, medications, diet factors
- **`mockAuditLogs: AuditLogEntry[]`** — Sample audit trail
  - User actions (viewed patient, updated consent, downloaded report)
  - Timestamps, actor names, resource IDs
- **`currentPatientId`** — Hardcoded ID for mock patient login

**⚠️ WARNING**: All data is synthetic. Do NOT add real patient information.

---

## 5. Mock Services

### `src/services/api.ts`

All services return **Promises** to simulate async behavior (ready for API swap).

| Service | Methods | Description |
|---------|---------|-------------|
| **authService** | `loginAs(role)`, `logout()`, `getCurrentUser()`, `subscribe()` | In-memory mock auth (no tokens, no persistence) |
| **patientService** | `list()`, `get(id)` | Returns mock patient data |
| **auditService** | `list()` | Returns mock audit log entries |
| **consentService** | `get()`, `update(partial)` | In-memory consent state (lost on refresh) |

**Helper**: `computeDoctorMetrics(patients)` — Derives dashboard stats (due follow-ups, high-risk count, etc.)

### What's NOT Real
- ❌ No HTTP requests (all in-memory)
- ❌ No backend API
- ❌ No database
- ❌ No authentication tokens (JWT/OAuth)
- ❌ No session persistence (state lost on refresh)
- ❌ No data encryption
- ❌ No server-side validation
- ❌ No audit log persistence

---

## 6. Role Flow: Doctor vs Patient

### Doctor Flow
1. **Login** → Select "Doctor" role
2. **Dashboard** (`/doctor`)
   - See metrics: total patients, follow-ups due, high-risk count
3. **Patients List** (`/doctor/patients`)
   - Filter by risk level, stone type, subscription status
   - Click patient to view details
4. **Patient Detail** (`/doctor/patients/:id`)
   - View complete medical history
   - See investigations and stone episodes
   - Check follow-up schedule
   - Monitor subscription status
5. **Audit Log** (`/doctor/audit`)
   - See who accessed PHI and when
   - (Currently mock data only)

**Permissions**: Doctor can view ALL patients (no row-level security yet)

### Patient Flow
1. **Login** → Select "Patient" role
2. **Dashboard** (`/patient`)
   - View own stone profile and risk level
   - See next appointments (visit, USG, tests)
   - Check hydration target
   - Review diet risk factors
   - See subscription benefits
3. **Education** (`/patient/education`)
   - Read stone prevention tips
   - Learn about hydration, diet, medication compliance
4. **Consent** (`/patient/consent`)
   - Manage data sharing preferences
   - Toggle reminders and educational messages
   - Control lab coordination consent

**Permissions**: Patient can only view their own data (hardcoded ID: `p-1001`)

### Authentication Flow (Mock)
```
User clicks "Sign in"
  → Redirected to /login
  → Selects "Doctor" or "Patient" (no password)
  → authService.loginAs(role) sets currentUser in memory
  → Redirected to role-specific dashboard
  → Header shows user name and role
  → Navigation menu changes based on role

Sign out:
  → authService.logout() clears currentUser
  → Redirected to landing page
```

**⚠️ CRITICAL**: Auth is 100% client-side and bypassable via browser console.

---

## 7. What Is Still Mock/Prototype Only

### 🔴 BLOCKING for Production

| Feature | Current Status | Production Requirement |
|---------|----------------|----------------------|
| **Authentication** | In-memory mock, no tokens | JWT/OAuth with backend validation |
| **Authorization** | Client-side only, no RBAC | Server-side role checks + row-level security |
| **Data Persistence** | None (lost on refresh) | PostgreSQL with encrypted columns |
| **PHI Security** | Plaintext in browser | Field-level encryption, masked in UI |
| **Audit Logging** | Mock array in memory | Append-only table, tamper-evident hash chain |
| **Consent Management** | In-memory, no history | Immutable versioned consent with digital signature |
| **File Uploads** | Not implemented | Signed URLs, virus scan, encrypted storage |
| **Session Management** | None | Token refresh, timeout, revocation |
| **API Layer** | None | FastAPI backend with middleware (auth, RBAC, audit) |

### 🟡 Future Enhancements

- TanStack Query integration (imported but not used)
- Pagination for patient list (currently loads all)
- Search and advanced filtering
- Real-time notifications
- Mobile app (React Native)
- Telemedicine integration
- Lab integration API
- Payment processing (subscription billing)
- SMS/email reminders
- Multi-language support (Hindi, regional languages)

---

## 8. Recommended Next 3 Development Steps

### Step 1: Backend Foundation (1-2 weeks)
**Goal**: Working FastAPI backend with real auth and data persistence

**Tasks**:
- [ ] Setup FastAPI project structure
- [ ] Add PostgreSQL database with Alembic migrations
- [ ] Implement JWT authentication (login, logout, refresh)
- [ ] Create Patient CRUD endpoints with RBAC
- [ ] Add audit logging middleware (automatic for all endpoints)
- [ ] Implement field-level encryption for PHI (Fernet)
- [ ] Add role-based field filtering (patients see masked data)
- [ ] Write unit tests (pytest) and integration tests
- [ ] Generate API documentation (FastAPI auto-docs)

**Deliverable**: Frontend can call real API endpoints instead of mock services

**File Changes**:
- Replace `src/services/api.ts` mock implementations with real `fetch()` calls
- Point `config/env.ts` to backend URL
- Update `authService` to store JWT in localStorage
- Add API error handling and retry logic

---

### Step 2: Compliance Features (1-2 weeks)
**Goal**: Meet HIPAA/GDPR/DPDP core requirements

**Tasks**:
- [ ] Implement consent versioning system
  - Immutable consent history table
  - Digital signature for each consent record
  - PDF generation with timestamp and IP
- [ ] Add tamper-evident audit logs
  - Hash chain (each entry references previous hash)
  - Store IP address, user agent, request ID
  - Enforce 6-year retention policy
- [ ] Implement data export API (GDPR data portability)
- [ ] Add right to erasure workflow (GDPR compliance)
  - Mark account for deletion
  - Purge PHI after grace period
  - Retain audit logs (legal requirement)
- [ ] Create breach notification system (skeleton)
- [ ] Draft privacy policy and terms of service
- [ ] Prepare HIPAA BAA templates for vendors

**Deliverable**: System ready for legal/compliance review

**File Changes**:
- Update `consentService` to call versioned consent API
- Add consent history viewer in patient dashboard
- Update audit log viewer to show tamper-evident fields
- Add data export button in patient settings

---

### Step 3: Security Hardening (1 week)
**Goal**: Production-grade security for real PHI

**Tasks**:
- [ ] Implement file upload with signed URLs
  - Presigned S3 POST URLs (15-minute expiry)
  - Virus scanning (ClamAV or VirusTotal API)
  - File metadata encryption
  - Download audit logging
- [ ] Add rate limiting (Redis-backed)
- [ ] Implement CSRF protection
- [ ] Add Content Security Policy headers
- [ ] Configure httpOnly cookies for tokens (more secure than localStorage)
- [ ] Add XSS prevention (input sanitization, output encoding)
- [ ] Run penetration testing
- [ ] Conduct security audit (external if possible)
- [ ] Setup monitoring and alerting
  - PHI access anomaly detection
  - Failed login attempt monitoring
  - Unusual data export patterns

**Deliverable**: System is secure enough for real patient data

**File Changes**:
- Add `src/services/api/uploads.api.ts` for file uploads
- Update patient detail page to show uploaded files
- Add download buttons with audit logging
- Update `apiClient.ts` to handle rate limiting (429 responses)
- Add CSRF token handling in forms

---

## Quick Links

- **Full Architecture Analysis**: See `ARCHITECTURE_REVIEW.md` for detailed security gaps, backend design, database schema, and 5-phase roadmap
- **Project README**: See `README.md` for setup instructions and warnings
- **Environment Config**: See `.env.example` for configuration variables

---

## Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript, TanStack Router, TanStack Query |
| **UI** | shadcn/ui (46 components), Tailwind CSS v4, Lucide icons |
| **Build** | Vite, TanStack Start |
| **Deployment** | Cloudflare Workers (SSR-ready) |
| **Backend** | None yet (mocks only) → FastAPI planned |
| **Database** | None yet → PostgreSQL planned |
| **Auth** | Mock → JWT with bcrypt planned |
| **Storage** | None → S3-compatible planned |

---

**Document Version**: 1.0
**Last Updated**: 2026-05-13
**Status**: MVP Prototype (NOT production-ready)
