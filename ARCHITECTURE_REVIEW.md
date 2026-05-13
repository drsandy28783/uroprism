# Healthcare MVP Architecture Review
**StoneCare Renal Stone Prevention System**

Date: 2026-05-13
Status: MVP → Production Preparation
Compliance Target: HIPAA, GDPR, DPDP (India)

---

## Executive Summary

**Current State**: Well-architected React TypeScript MVP with clean separation of concerns, modern stack, and excellent code quality.

**Critical Gap**: Security and compliance features are mocked/missing. Not production-ready for real PHI.

**Grade**:
- Architecture: **B+** (excellent structure, needs security layers)
- Code Quality: **A-** (type-safe, maintainable, well-organized)
- Security: **D** (MVP-acceptable, production-blocking gaps)
- Compliance Readiness: **F** (requires substantial work)

**Recommendation**: 7 minimal refactors now + clear FastAPI integration path.

---

## Part 1: Current Architecture Assessment

### Strengths ✓

1. **Clean Folder Structure**
   - Logical separation: components, services, types, routes
   - UI components properly isolated (46 shadcn/ui components)
   - Service layer abstraction ready for backend swap

2. **Type Safety**
   - Strict TypeScript enabled
   - Comprehensive domain models (Patient, AuditLogEntry, Consent, etc.)
   - No `any` abuse

3. **Modern Stack**
   - TanStack Router (type-safe, file-based)
   - TanStack Query ready (imported but underutilized)
   - React 19, Tailwind CSS v4
   - Cloudflare Workers deployment ready

4. **Good Patterns**
   - Promise-based service layer (easy backend swap)
   - Component composition (RequireRole, StatCard)
   - Error boundaries in place
   - Responsive design considerations

### Critical Issues ⚠️

#### 1. Authentication (BLOCKING)
**Current**: In-memory mock with no persistence
```typescript
// src/services/api.ts - Line ~25
let currentUser: AuthUser | null = null;
authService.loginAs(role) // No password, no token, lost on refresh
```

**Issues**:
- No session tokens (JWT/cookies)
- State lost on page refresh
- Client-side only (bypassable via console)
- No session expiry

#### 2. Authorization (BLOCKING)
**Current**: Component-level only via `RequireRole.tsx`
```typescript
// Checked AFTER component renders
if (!user) return <Navigate to="/login" />;
if (user.role !== role) return <Navigate to="/login" />;
```

**Issues**:
- No `beforeLoad` guards in TanStack Router
- No server-side validation
- No resource-level permissions (patient can theoretically access any patient ID)
- Race condition: component may fetch before redirect

#### 3. PHI Security (HIPAA VIOLATION)
**Current**: Unencrypted PHI in plain JavaScript objects
```typescript
// src/data/mockPatients.ts - All PHI exposed
{
  name: "Asha Verma",  // PII
  age: 42,
  phoneMasked: "•••• •• 4821",  // Still contains digits
  comorbidities: ["diabetes", "obesity"],  // PHI
  medications: [...],  // PHI
  investigations: [...]  // Lab results - PHI
}
```

**Issues**:
- No encryption at rest or in transit
- Full patient objects sent to client (no field filtering)
- PHI visible in React DevTools
- No row-level security (patient ID hardcoded: `currentPatientId = "p-1001"`)

#### 4. Audit Logging (COMPLIANCE VIOLATION)
**Current**: Mock array in `mockPatients.ts`
```typescript
export const mockAuditLogs: AuditLogEntry[] = [
  { id, at, actor, action, target }
  // Missing: IP, user agent, request ID, tamper-evident hash
]
```

**Issues**:
- Not append-only
- Missing critical fields for compliance
- No 6-year retention (HIPAA requirement)
- No tamper-evident signing

#### 5. Consent Management (COMPLIANCE VIOLATION)
**Current**: In-memory only (`consentService` in api.ts)
```typescript
let currentConsent: ConsentState = { ... };
consentService.update(partial) // Lost on refresh, no history
```

**Issues**:
- No persistence
- No versioning (consent forms change over time)
- No immutable history
- No timestamp/IP capture for legal proof
- No digital signature

#### 6. Data Access Patterns
**Current**: No pagination, no server-side filtering
```typescript
// src/services/api.ts
patientService.list() // Returns ALL patients - no pagination
patientService.get(id) // No permission check
```

**Issues**:
- Scalability problem (10,000+ patients?)
- No caching strategy
- No request cancellation (AbortController)
- No retry logic

---

## Part 2: Recommended Architecture

### Target Architecture: Three-Layer Model

```
┌─────────────────────────────────────────────────────────────┐
│  PRESENTATION LAYER (React - Current)                       │
│  • Components (UI logic only)                               │
│  • Routes (navigation + guards)                             │
│  • Hooks (UI state management)                              │
└─────────────────────────────────────────────────────────────┘
                           ↓ ↑
                    TanStack Query
                  (caching, optimistic updates)
                           ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│  API CLIENT LAYER (React - Minimal Refactor)                │
│  • services/api/ (typed API clients)                        │
│  • services/auth/ (token management, session)               │
│  • services/storage/ (encrypted local state if needed)      │
│  • types/api.ts (API request/response types)                │
└─────────────────────────────────────────────────────────────┘
                           ↓ ↑
                      HTTPS + JWT
                           ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│  BACKEND LAYER (FastAPI - Future)                           │
│  • /api/auth (OAuth2, JWT issuer)                           │
│  • /api/patients (PHI endpoints + RBAC)                     │
│  • /api/audit (append-only log)                             │
│  • /api/consent (versioned consent)                         │
│  • /api/uploads (signed URLs + virus scan)                  │
│  • Middleware: auth, RBAC, audit, rate limiting, CSP        │
└─────────────────────────────────────────────────────────────┘
                           ↓ ↑
                      Encrypted Storage
                           ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│  DATA LAYER (Future)                                        │
│  • PostgreSQL (row-level security, encrypted columns)       │
│  • Redis (session store, rate limiting)                     │
│  • S3-compatible (encrypted file storage)                   │
│  • Audit log (append-only table or WORM storage)            │
└─────────────────────────────────────────────────────────────┘
```

---

## Part 3: Minimal Refactoring (Do Now)

### Changes Overview
**Goal**: Prepare frontend for FastAPI backend without overengineering
**Effort**: 2-4 hours
**Files Modified**: ~8 files
**New Files**: ~5 files

---

### Change 1: Restructure Service Layer

**Current**: Single `services/api.ts` (92 lines, mixed concerns)

**New Structure**:
```
src/services/
├── api/
│   ├── auth.api.ts       # Authentication endpoints
│   ├── patients.api.ts   # Patient CRUD
│   ├── audit.api.ts      # Audit log queries
│   ├── consent.api.ts    # Consent management
│   └── index.ts          # Re-export all
├── mock/
│   └── mockData.ts       # Move mockPatients.ts here
├── lib/
│   ├── apiClient.ts      # Base fetch wrapper (ready for JWT injection)
│   └── storage.ts        # LocalStorage wrapper (encrypted if needed)
└── index.ts              # Public API surface
```

**Benefits**:
- Clear separation for backend swap
- Each service maps to one FastAPI router
- Easy to add request interceptors (auth tokens)
- Testable in isolation

**Migration Path**:
```typescript
// OLD: services/api.ts
export const patientService = { list, get };

// NEW: services/api/patients.api.ts
export const patientsApi = {
  list: (params?: PaginationParams) => apiClient.get('/patients', { params }),
  get: (id: string) => apiClient.get(`/patients/${id}`),
  update: (id: string, data: Partial<Patient>) => apiClient.patch(`/patients/${id}`, data)
};

// For now, apiClient.ts uses mock delay, but structure is ready:
// return import.meta.env.PROD ? realFetch() : mockFetch()
```

---

### Change 2: Add TanStack Query Integration

**Current**: Direct service calls in components
```typescript
// Current: src/routes/doctor.patients.index.tsx
const [patients, setPatients] = useState<Patient[]>([]);
useEffect(() => {
  patientService.list().then(setPatients);
}, []);
```

**New**: Use TanStack Query for all data fetching
```typescript
// New
const { data: patients, isLoading } = useQuery({
  queryKey: ['patients', filters],
  queryFn: () => patientsApi.list(filters)
});
```

**Benefits**:
- Built-in caching (reduce backend load)
- Automatic background refetching
- Optimistic updates ready
- Request deduplication
- Easy loading/error states

**Create**: `src/hooks/queries/` folder
```
src/hooks/queries/
├── usePatients.ts    # useQuery for patient list
├── usePatient.ts     # useQuery for single patient
├── useAuditLogs.ts   # useQuery for audit logs
└── index.ts
```

---

### Change 3: Improve Type Structure

**Current**: Single `types/index.ts` (mixed API and domain types)

**New Structure**:
```
src/types/
├── domain/
│   ├── patient.types.ts     # Patient, StoneEpisode, Investigation
│   ├── user.types.ts         # AuthUser, UserRole
│   ├── audit.types.ts        # AuditLogEntry
│   └── consent.types.ts      # ConsentState, ConsentVersion
├── api/
│   ├── requests.ts           # API request DTOs
│   ├── responses.ts          # API response DTOs
│   └── pagination.ts         # PaginationParams, PaginatedResponse
└── index.ts                  # Re-export all
```

**Why**:
- Separate **domain models** (what the app thinks about) from **API contracts** (what the wire sends)
- Backend may send different field names (snake_case vs camelCase)
- Easier to add API versioning later
- Clear what needs encryption (domain types) vs what's sent over wire (API types)

**Example**:
```typescript
// types/domain/patient.types.ts
export interface Patient {
  id: string;
  name: string;  // Frontend uses this
  age: number;
  // ...
}

// types/api/responses.ts
export interface PatientResponse {
  id: string;
  full_name: string;  // Backend sends this (snake_case)
  age: number;
  created_at: string; // ISO string from backend
  // ...
}

// services/api/patients.api.ts
import { mapPatientResponse } from './mappers';

get: async (id: string): Promise<Patient> => {
  const response = await apiClient.get<PatientResponse>(`/patients/${id}`);
  return mapPatientResponse(response); // Convert snake_case to camelCase
}
```

---

### Change 4: Add beforeLoad Guards (TanStack Router)

**Current**: Component-level protection (too late)
```typescript
component: () => (
  <RequireRole role="doctor">
    <DoctorDashboard />
  </RequireRole>
)
```

**New**: Route-level protection (before component renders)
```typescript
// src/routes/doctor.index.tsx
export const Route = createFileRoute('/doctor/')({
  beforeLoad: async ({ context, location }) => {
    const user = context.auth.getCurrentUser();

    if (!user) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname }
      });
    }

    if (user.role !== 'doctor') {
      throw redirect({ to: '/login' });
    }

    // FUTURE: Server-side session validation
    // await context.auth.validateSession();
  },
  component: DoctorDashboard,
});
```

**Benefits**:
- No component render before auth check
- No race condition with data fetching
- Redirect with return URL
- Ready for server-side session validation

**Note**: Keep `RequireRole` component as fallback, but guards are primary defense.

---

### Change 5: Abstract Authentication Context

**Current**: `useAuth()` hook tightly coupled to in-memory implementation

**New**: Auth provider with swappable implementation
```
src/services/auth/
├── AuthContext.tsx        # React context + provider
├── authService.ts         # Auth interface definition
├── mockAuthService.ts     # Current implementation
├── jwtAuthService.ts      # FUTURE: Real auth with JWT
└── index.ts
```

**Interface**:
```typescript
// authService.ts
export interface AuthService {
  login(credentials: LoginCredentials): Promise<AuthUser>;
  logout(): Promise<void>;
  getCurrentUser(): AuthUser | null;
  refreshToken(): Promise<void>;
  subscribe(listener: () => void): () => void;
}

// AuthContext.tsx
const AuthContext = createContext<AuthService | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Toggle based on env
  const authService = import.meta.env.DEV
    ? mockAuthService
    : jwtAuthService;

  return <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>;
}
```

**Benefits**:
- Easy swap: change one line to enable real auth
- Testable with mock
- Interface enforces consistent API

---

### Change 6: Add Environment-Based Configuration

**Current**: Hardcoded values scattered across codebase

**New**: Centralized config
```typescript
// src/config/env.ts
export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    timeout: 30000,
  },
  auth: {
    tokenKey: 'stoneCare_auth_token',
    refreshThreshold: 5 * 60 * 1000, // 5 minutes
  },
  features: {
    useMockData: import.meta.env.DEV,
    enableAuditLogging: true,
    fileUploadEnabled: false, // Toggle when ready
  },
  compliance: {
    consentVersion: '1.0.0',
    dataRetentionDays: 2555, // 7 years (HIPAA minimum 6 years)
  }
} as const;

// Usage
import { config } from '@/config/env';
const response = await fetch(`${config.api.baseUrl}/patients`);
```

**Benefits**:
- Single source of truth
- Easy to toggle features for staging/prod
- Clear compliance settings

**Create**: `.env.example`
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000

# Feature Flags
VITE_USE_MOCK_DATA=true
VITE_FILE_UPLOAD_ENABLED=false

# Compliance
VITE_CONSENT_VERSION=1.0.0
```

---

### Change 7: Add API Client Base Layer

**Current**: Direct fetch (not used yet, still mock)

**New**: Centralized API client with interceptors ready
```typescript
// src/services/lib/apiClient.ts
import { config } from '@/config/env';

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.api.baseUrl;
  }

  // Request interceptor (add JWT token)
  private async getHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // FUTURE: Inject JWT from authService
    const token = localStorage.getItem(config.auth.tokenKey);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Response interceptor (handle 401, refresh token)
  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 401) {
      // FUTURE: Trigger token refresh or logout
      // await authService.refreshToken();
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new ApiError(response.status, error.message);
    }

    return response.json();
  }

  async get<T>(path: string, options?: RequestInit): Promise<T> {
    // For now, use mock data
    if (config.features.useMockData) {
      return this.getMock<T>(path);
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      method: 'GET',
      headers: await this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  // Similar for post, patch, delete...

  private async getMock<T>(path: string): Promise<T> {
    // Import mock data based on path
    const { mockPatients, mockAuditLogs } = await import('../mock/mockData');

    // Simple routing
    if (path.startsWith('/patients/')) {
      const id = path.split('/')[2];
      return mockPatients.find(p => p.id === id) as T;
    }
    if (path === '/patients') return mockPatients as T;
    if (path === '/audit') return mockAuditLogs as T;

    throw new Error(`Mock not implemented for ${path}`);
  }
}

export const apiClient = new ApiClient();

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}
```

**Benefits**:
- Single place to add JWT injection
- Automatic token refresh on 401
- Easy to add retry logic, rate limiting detection
- Mock data routing in one place
- Error handling consistency

---

## Part 4: Security Improvements (Minimal for Now)

### 1. Add CSP Meta Tag

**File**: `index.html`
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline';
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;
               connect-src 'self' http://localhost:8000;">
```

**Future**: Move to HTTP header when backend is ready.

---

### 2. Add Input Validation (Form Level)

**Current**: Forms exist but no validation

**Add**: Zod schemas for form validation
```
src/schemas/
├── patient.schema.ts
├── consent.schema.ts
└── index.ts
```

**Example**:
```typescript
// src/schemas/consent.schema.ts
import { z } from 'zod';

export const consentSchema = z.object({
  dataStorage: z.boolean(),
  reminders: z.boolean(),
  shareReportsWithDoctor: z.boolean(),
  // Add IP capture (from request header in future)
  ipAddress: z.string().ip().optional(),
  timestamp: z.string().datetime(),
});

export type ConsentFormData = z.infer<typeof consentSchema>;
```

**Usage** (already supported by existing react-hook-form):
```typescript
const form = useForm<ConsentFormData>({
  resolver: zodResolver(consentSchema),
});
```

---

### 3. Add PHI Masking Utilities

**Create**: `src/lib/phi-utils.ts`
```typescript
/**
 * PHI masking utilities for display
 * NOTE: This is display-only. Server must do real masking.
 */

export function maskPhone(phone: string): string {
  // Input: "9876543210" or "+91-9876543210"
  // Output: "•••• •• 3210"
  const digits = phone.replace(/\D/g, '');
  const lastFour = digits.slice(-4);
  return `•••• •• ${lastFour}`;
}

export function maskName(name: string, role: 'doctor' | 'patient', viewingSelf: boolean): string {
  // Patients can see own full name, doctors can see all
  if (role === 'doctor' || viewingSelf) return name;

  // Other patients see initials only
  const parts = name.split(' ');
  return parts.map(p => `${p[0]}.`).join(' ');
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  const maskedLocal = local.slice(0, 2) + '***' + local.slice(-1);
  return `${maskedLocal}@${domain}`;
}

// FUTURE: When backend sends encrypted fields
export async function decryptField(encrypted: string, key: CryptoKey): Promise<string> {
  // Decrypt using Web Crypto API
  throw new Error('Not implemented - backend will send decrypted data via TLS');
}
```

**Usage**: Replace hardcoded `phoneMasked` field with dynamic masking.

---

## Part 5: Future Backend Integration (FastAPI)

### Backend Architecture (For Reference)

```
backend/
├── app/
│   ├── main.py                 # FastAPI app + middleware
│   ├── config.py               # Settings (env vars)
│   ├── dependencies.py         # Dependency injection (DB, auth)
│   ├── middleware/
│   │   ├── audit.py            # Audit logging middleware
│   │   ├── auth.py             # JWT validation
│   │   └── rbac.py             # Role-based access control
│   ├── routers/
│   │   ├── auth.py             # /api/auth/login, /logout, /refresh
│   │   ├── patients.py         # /api/patients (CRUD with RBAC)
│   │   ├── audit.py            # /api/audit (read-only)
│   │   ├── consent.py          # /api/consent (versioned)
│   │   └── uploads.py          # /api/uploads (signed URLs)
│   ├── models/
│   │   ├── patient.py          # SQLAlchemy ORM models
│   │   ├── user.py
│   │   ├── audit_log.py        # Append-only table
│   │   └── consent.py          # Versioned consent history
│   ├── schemas/
│   │   ├── patient.py          # Pydantic models (request/response)
│   │   ├── user.py
│   │   └── audit.py
│   ├── services/
│   │   ├── auth_service.py     # JWT issuer, password hashing
│   │   ├── patient_service.py  # Business logic
│   │   ├── audit_service.py    # Append-only logging
│   │   └── encryption.py       # Field-level encryption (Fernet)
│   ├── db/
│   │   ├── base.py             # SQLAlchemy base
│   │   ├── session.py          # DB connection
│   │   └── migrations/         # Alembic migrations
│   └── utils/
│       ├── security.py         # Password hashing, token generation
│       └── phi_masking.py      # Role-based field filtering
├── tests/
├── alembic.ini
├── requirements.txt
├── .env.example
└── README.md
```

---

### FastAPI Endpoints (Planned)

#### Authentication
```python
# POST /api/auth/login
{
  "username": "doctor@example.com",
  "password": "***"
}
Response: {
  "access_token": "eyJ...",
  "refresh_token": "...",
  "token_type": "bearer",
  "user": { "id": "u-1", "name": "Dr. Smith", "role": "doctor" }
}

# POST /api/auth/refresh
Authorization: Bearer {refresh_token}
Response: { "access_token": "eyJ..." }

# POST /api/auth/logout
Authorization: Bearer {access_token}
Response: { "message": "Logged out" }
```

#### Patients (RBAC Applied)
```python
# GET /api/patients?page=1&limit=20&risk_level=high
Authorization: Bearer {access_token}
Role: doctor (full access) | patient (only own data)

Response: {
  "items": [
    {
      "id": "p-1001",
      "name": "Asha Verma",  # Masked if not authorized
      "age": 42,
      "risk_level": "high",
      # ... (PHI fields filtered by role)
    }
  ],
  "total": 156,
  "page": 1,
  "pages": 8
}

# GET /api/patients/{id}
Authorization: Bearer {access_token}
RBAC: Check user can access this patient

# PATCH /api/patients/{id}
Authorization: Bearer {access_token}
Role: doctor only
Body: { "doctor_notes": "..." }
+ Audit log entry created automatically

# DELETE /api/patients/{id}
Role: admin only
+ Soft delete (retain for audit)
```

#### Audit Logs
```python
# GET /api/audit?patient_id={id}&start_date={iso}&end_date={iso}
Authorization: Bearer {access_token}
Role: doctor (can see logs for their patients) | admin (can see all)

Response: {
  "items": [
    {
      "id": "a-1",
      "timestamp": "2026-05-13T10:30:00Z",
      "user_id": "u-1",
      "user_name": "Dr. Smith",
      "action": "viewed_patient",
      "resource_type": "patient",
      "resource_id": "p-1001",
      "ip_address": "192.168.1.100",
      "user_agent": "Mozilla/5.0...",
      "request_id": "req-abc123"
    }
  ]
}
```

#### Consent
```python
# GET /api/consent/current
Authorization: Bearer {access_token}
Response: {
  "version": "1.0.0",
  "preferences": { ... },
  "signed_at": "2026-01-15T09:00:00Z",
  "ip_address": "192.168.1.100"
}

# POST /api/consent/sign
Authorization: Bearer {access_token}
Body: {
  "version": "1.0.0",
  "preferences": { "data_storage": true, ... }
}
Response: {
  "consent_id": "c-1",
  "pdf_url": "https://storage/consents/c-1.pdf"  # Signed URL, 1-hour expiry
}

# GET /api/consent/history
Authorization: Bearer {access_token}
Response: [ /* All historical consents, immutable */ ]
```

#### File Uploads (Future)
```python
# POST /api/uploads/presign
Authorization: Bearer {access_token}
Body: {
  "filename": "ultrasound-2026-05-13.jpg",
  "content_type": "image/jpeg",
  "patient_id": "p-1001"
}
Response: {
  "upload_url": "https://s3.../upload?signature=...",  # 15-min expiry
  "file_id": "f-123",
  "expires_at": "2026-05-13T11:00:00Z"
}

# Frontend uploads directly to S3 using presigned URL
# Backend receives webhook when upload completes
# Virus scan runs asynchronously
# File marked as "available" or "quarantined"

# GET /api/uploads/{file_id}
Authorization: Bearer {access_token}
Response: {
  "download_url": "https://s3.../download?signature=...",  # 1-hour expiry
  "filename": "ultrasound-2026-05-13.jpg",
  "status": "available",
  "uploaded_at": "2026-05-13T10:45:00Z"
}
```

---

### Middleware Stack (FastAPI)

```python
# app/main.py
from fastapi import FastAPI
from app.middleware.audit import AuditMiddleware
from app.middleware.auth import JWTAuthMiddleware
from app.middleware.rbac import RBACMiddleware

app = FastAPI()

# Order matters (executed bottom to top)
app.add_middleware(AuditMiddleware)        # Log all requests (innermost)
app.add_middleware(RBACMiddleware)         # Check permissions
app.add_middleware(JWTAuthMiddleware)      # Validate JWT token
app.add_middleware(CORSMiddleware, ...)    # CORS (outermost)

# Audit middleware example
class AuditMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Before request
        request_id = str(uuid.uuid4())
        request.state.request_id = request_id

        response = await call_next(request)

        # After request (log to append-only table)
        if request.state.user:  # If authenticated
            await audit_service.log(
                user_id=request.state.user.id,
                action=self._infer_action(request),
                resource_type=self._infer_resource(request.url.path),
                resource_id=self._extract_resource_id(request.url.path),
                ip_address=request.client.host,
                user_agent=request.headers.get("user-agent"),
                request_id=request_id,
                status_code=response.status_code
            )

        return response
```

---

### Database Schema (PostgreSQL)

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,  -- bcrypt
  role VARCHAR(50) NOT NULL CHECK (role IN ('doctor', 'patient', 'admin')),
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Patients table (encrypted PHI)
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),  -- Link to user account

  -- PII (encrypted at rest using pgcrypto or application-level Fernet)
  name_encrypted BYTEA NOT NULL,
  phone_encrypted BYTEA NOT NULL,

  -- Non-sensitive fields (plaintext for query performance)
  age INTEGER,
  gender VARCHAR(50),
  risk_level VARCHAR(50),

  -- JSONB for flexible schema (encrypted)
  medical_data_encrypted JSONB,  -- { comorbidities, medications, etc. }

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP  -- Soft delete
);

-- Audit log table (append-only, WORM)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(100),
  resource_id UUID,
  ip_address INET NOT NULL,
  user_agent TEXT,
  request_id UUID NOT NULL,
  status_code INTEGER,

  -- Tamper-evident hash (chain previous hash)
  previous_hash VARCHAR(64),
  hash VARCHAR(64) NOT NULL,

  -- No UPDATE or DELETE allowed (database trigger enforces)
  CHECK (timestamp <= NOW())
);

-- Trigger to prevent audit log modification
CREATE TRIGGER prevent_audit_modification
  BEFORE UPDATE OR DELETE ON audit_logs
  FOR EACH ROW EXECUTE FUNCTION prevent_modification();

-- Consent history (immutable)
CREATE TABLE consent_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  version VARCHAR(50) NOT NULL,  -- e.g., "1.0.0"
  preferences JSONB NOT NULL,
  signed_at TIMESTAMP DEFAULT NOW() NOT NULL,
  ip_address INET NOT NULL,
  user_agent TEXT,

  -- Digital signature (HMAC or RSA)
  signature VARCHAR(512) NOT NULL,

  -- No UPDATE or DELETE allowed
  CHECK (signed_at <= NOW())
);

-- Row-level security (PostgreSQL RLS)
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Policy: Doctors can see all patients
CREATE POLICY doctor_access ON patients
  FOR SELECT
  TO doctor_role
  USING (deleted_at IS NULL);

-- Policy: Patients can only see their own data
CREATE POLICY patient_access ON patients
  FOR SELECT
  TO patient_role
  USING (user_id = current_user_id() AND deleted_at IS NULL);
```

---

### Encryption Strategy

#### Field-Level Encryption (Application Layer)

**Library**: `cryptography.fernet` (Python) or `crypto.subtle` (Web Crypto API)

**Flow**:
1. **At Rest (Database)**:
   - Sensitive fields stored as `BYTEA` (encrypted bytes)
   - Encryption key stored in env var (rotated regularly)
   - Fernet provides authenticated encryption (AES-128 + HMAC)

2. **In Transit (HTTPS)**:
   - TLS 1.3 enforced
   - Strong cipher suites only
   - Certificate pinning (optional for mobile)

3. **In Memory (Backend)**:
   - Decrypt only when needed
   - Clear from memory after response sent
   - Use secrets management (AWS Secrets Manager, HashiCorp Vault)

**Example** (FastAPI):
```python
# app/services/encryption.py
from cryptography.fernet import Fernet
from app.config import settings

cipher = Fernet(settings.ENCRYPTION_KEY.encode())

def encrypt_field(plaintext: str) -> bytes:
    return cipher.encrypt(plaintext.encode())

def decrypt_field(ciphertext: bytes) -> str:
    return cipher.decrypt(ciphertext).decode()

# Usage in service layer
def get_patient(patient_id: str, current_user: User) -> PatientSchema:
    patient_db = db.query(Patient).filter_by(id=patient_id).first()

    # Decrypt PHI fields
    patient_schema = PatientSchema(
        id=patient_db.id,
        name=decrypt_field(patient_db.name_encrypted),
        phone=decrypt_field(patient_db.phone_encrypted),
        # ... apply role-based masking before returning
    )

    # Role-based field filtering
    if current_user.role == 'patient' and current_user.id != patient_db.user_id:
        # Mask fields patient shouldn't see
        patient_schema.phone = mask_phone(patient_schema.phone)

    return patient_schema
```

---

## Part 6: Compliance Integration Points

### 1. Authentication & Session Management

**HIPAA Requirement**: Unique user identification (§164.312(a)(2)(i))

**Implementation**:
```typescript
// Frontend: src/services/auth/jwtAuthService.ts (FUTURE)
export const jwtAuthService: AuthService = {
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    const response = await fetch(`${config.api.baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const { access_token, refresh_token, user } = await response.json();

    // Store tokens (httpOnly cookies preferred, but localStorage for SPA)
    localStorage.setItem(config.auth.tokenKey, access_token);
    localStorage.setItem(`${config.auth.tokenKey}_refresh`, refresh_token);

    // Start session timeout
    this.scheduleTokenRefresh();

    return user;
  },

  async refreshToken(): Promise<void> {
    const refreshToken = localStorage.getItem(`${config.auth.tokenKey}_refresh`);
    // ... refresh logic
  },

  // Session timeout (HIPAA recommends 15-30 minutes of inactivity)
  scheduleTokenRefresh() {
    setTimeout(() => this.refreshToken(), config.auth.refreshThreshold);
  }
};
```

**Backend** (FastAPI):
```python
# app/routers/auth.py
from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException
from app.services.auth_service import create_access_token, verify_password

router = APIRouter()

@router.post("/login")
async def login(credentials: LoginRequest):
    user = await user_service.get_by_email(credentials.email)

    if not user or not verify_password(credentials.password, user.password_hash):
        # Log failed attempt (audit)
        await audit_service.log_failed_login(credentials.email, request.client.host)
        raise HTTPException(401, "Invalid credentials")

    # Generate JWT tokens
    access_token = create_access_token(
        data={"sub": user.id, "role": user.role},
        expires_delta=timedelta(minutes=15)  # Short-lived
    )
    refresh_token = create_access_token(
        data={"sub": user.id, "type": "refresh"},
        expires_delta=timedelta(days=7)  # Long-lived
    )

    # Update last login
    await user_service.update_last_login(user.id)

    # Log successful login (audit)
    await audit_service.log(
        user_id=user.id,
        action="login",
        ip_address=request.client.host,
        user_agent=request.headers.get("user-agent")
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": UserSchema.from_orm(user)
    }
```

---

### 2. Audit Logging

**HIPAA Requirement**: Audit controls (§164.312(b))
**Retention**: Minimum 6 years (§164.316(b)(2))

**What to Log**:
- Login/logout events
- PHI access (view, edit, delete)
- Consent changes
- Failed authentication attempts
- System configuration changes
- Export/download of PHI

**Log Format**:
```typescript
interface AuditLogEntry {
  id: string;
  timestamp: string;          // ISO 8601 with timezone
  user_id: string;
  user_name: string;
  user_role: string;
  action: string;             // e.g., "viewed_patient", "updated_consent"
  resource_type: string;      // e.g., "patient", "consent"
  resource_id: string;
  ip_address: string;
  user_agent: string;
  request_id: string;         // Correlate with server logs
  status_code: number;        // HTTP status

  // Tamper-evident
  previous_hash: string;      // Hash of previous log entry
  hash: string;               // SHA-256(this entry + previous_hash)
}
```

**Frontend** (automatic logging via API client):
```typescript
// src/services/lib/apiClient.ts
async get<T>(path: string): Promise<T> {
  const response = await fetch(`${this.baseUrl}${path}`, {
    headers: await this.getHeaders(),
  });

  // Backend automatically logs via middleware
  // Frontend doesn't need to explicitly log (server-side responsibility)

  return this.handleResponse<T>(response);
}
```

**Backend** (automatic via middleware - shown above in Part 5)

---

### 3. Consent Management

**GDPR Requirement**: Lawful basis for processing (Article 6)
**DPDP Requirement**: Valid consent (Section 6)

**Consent Versioning**:
```typescript
// types/domain/consent.types.ts
export interface ConsentVersion {
  version: string;            // Semantic versioning (e.g., "1.0.0")
  effective_date: string;     // When this version became active
  text: string;               // Full legal text
  summary: string;            // Plain language summary
  changes: string[];          // What changed from previous version
}

export interface SignedConsent {
  id: string;
  user_id: string;
  version: string;
  preferences: ConsentPreferences;
  signed_at: string;
  ip_address: string;
  user_agent: string;
  signature: string;          // HMAC or digital signature
  pdf_url?: string;           // Signed PDF for records
}

export interface ConsentPreferences {
  data_storage: boolean;                  // Required for service
  reminders: boolean;                     // SMS/email reminders
  educational_messages: boolean;          // Marketing-like content
  share_reports_with_doctor: boolean;     // PHI sharing within platform
  discounted_lab_coordination: boolean;   // Third-party data sharing
  research_participation?: boolean;       // Future: anonymized research
}
```

**Flow**:
1. User views consent form (current version)
2. User checks boxes for granular preferences
3. User clicks "I Agree"
4. Frontend sends to backend with timestamp
5. Backend:
   - Validates consent version is current
   - Captures IP + user agent
   - Generates signature (HMAC of: user_id + version + preferences + timestamp + secret)
   - Stores immutably in `consent_history` table
   - Generates PDF with digital signature
   - Returns PDF signed URL to frontend
6. Frontend downloads PDF and shows confirmation

**Backend**:
```python
# app/routers/consent.py
@router.post("/sign")
async def sign_consent(
    consent: ConsentSignRequest,
    request: Request,
    current_user: User = Depends(get_current_user)
):
    # Verify version is current
    current_version = await consent_service.get_current_version()
    if consent.version != current_version.version:
        raise HTTPException(400, f"Outdated consent version. Current: {current_version.version}")

    # Capture metadata
    ip_address = request.client.host
    user_agent = request.headers.get("user-agent")
    timestamp = datetime.now(timezone.utc)

    # Generate tamper-evident signature
    signature = generate_consent_signature(
        user_id=current_user.id,
        version=consent.version,
        preferences=consent.preferences,
        timestamp=timestamp
    )

    # Store immutably
    signed_consent = await consent_service.create_signed_consent(
        user_id=current_user.id,
        version=consent.version,
        preferences=consent.preferences,
        ip_address=ip_address,
        user_agent=user_agent,
        timestamp=timestamp,
        signature=signature
    )

    # Generate PDF (async task)
    pdf_url = await consent_service.generate_consent_pdf(signed_consent.id)

    # Audit log
    await audit_service.log(
        user_id=current_user.id,
        action="signed_consent",
        resource_type="consent",
        resource_id=signed_consent.id,
        ip_address=ip_address,
        user_agent=user_agent
    )

    return {
        "consent_id": signed_consent.id,
        "pdf_url": pdf_url,  # Signed S3 URL, 1-hour expiry
        "message": "Consent recorded successfully"
    }
```

**Consent Updates**:
- User can change preferences anytime
- Each change creates new entry in `consent_history`
- Old entries remain immutable (audit trail)
- Current consent = latest entry

**Consent Withdrawal** (GDPR Right to Erasure):
- User can withdraw consent via UI
- Backend marks account for deletion
- PHI purged after grace period (30 days)
- Audit logs retained (legal requirement overrides GDPR erasure)

---

### 4. Signed Upload URLs (Future File Uploads)

**HIPAA Requirement**: Encryption in transit (§164.312(e)(1))

**Flow**:
1. User clicks "Upload Ultrasound Report"
2. Frontend requests presigned URL from backend
3. Backend:
   - Validates user has permission
   - Generates S3 presigned POST URL (15-min expiry)
   - Enforces file type, size limits
   - Returns URL + upload parameters
4. Frontend uploads directly to S3 (bypass backend for large files)
5. S3 triggers webhook to backend when upload completes
6. Backend:
   - Queues virus scan (ClamAV or VirusTotal API)
   - Marks file as "pending_scan"
   - Sends notification when scan completes

**Frontend**:
```typescript
// src/services/api/uploads.api.ts
export const uploadsApi = {
  async requestUploadUrl(
    filename: string,
    contentType: string,
    patientId: string
  ): Promise<PresignedUploadResponse> {
    return apiClient.post('/uploads/presign', {
      filename,
      content_type: contentType,
      patient_id: patientId
    });
  },

  async uploadFile(
    presignedUrl: string,
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<void> {
    // Upload directly to S3 using presigned URL
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress((e.loaded / e.total) * 100);
      }
    });

    return new Promise((resolve, reject) => {
      xhr.onload = () => resolve();
      xhr.onerror = () => reject(new Error('Upload failed'));
      xhr.open('PUT', presignedUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);
    });
  },

  async getDownloadUrl(fileId: string): Promise<PresignedDownloadResponse> {
    return apiClient.get(`/uploads/${fileId}`);
  }
};
```

**Backend**:
```python
# app/routers/uploads.py
from app.services.s3_service import generate_presigned_post

@router.post("/presign")
async def presign_upload(
    request: UploadRequest,
    current_user: User = Depends(get_current_user)
):
    # Validate user can upload for this patient
    if current_user.role == 'patient':
        patient = await patient_service.get_by_user_id(current_user.id)
        if request.patient_id != patient.id:
            raise HTTPException(403, "Cannot upload for other patients")

    # Validate file type (whitelist only)
    allowed_types = ['image/jpeg', 'image/png', 'application/pdf']
    if request.content_type not in allowed_types:
        raise HTTPException(400, "Invalid file type")

    # Generate file ID (before upload)
    file_id = str(uuid.uuid4())

    # Generate presigned POST URL (15 minutes)
    presigned_post = generate_presigned_post(
        bucket=settings.S3_BUCKET,
        object_key=f"uploads/{request.patient_id}/{file_id}",
        fields={
            "Content-Type": request.content_type,
            "x-amz-server-side-encryption": "AES256"
        },
        conditions=[
            {"Content-Type": request.content_type},
            ["content-length-range", 0, 10_000_000]  # 10 MB max
        ],
        expiration=900  # 15 minutes
    )

    # Save metadata (file not yet uploaded)
    await file_service.create_pending_upload(
        file_id=file_id,
        patient_id=request.patient_id,
        filename=request.filename,
        content_type=request.content_type,
        uploaded_by=current_user.id
    )

    return {
        "file_id": file_id,
        "upload_url": presigned_post['url'],
        "upload_fields": presigned_post['fields'],
        "expires_at": datetime.now() + timedelta(minutes=15)
    }

# Webhook from S3 (Lambda or SNS)
@router.post("/upload-complete")
async def upload_complete(webhook: S3UploadWebhook):
    # Mark as uploaded
    await file_service.mark_uploaded(webhook.file_id)

    # Queue virus scan
    await virus_scan_service.scan(webhook.file_id)

    return {"status": "queued_for_scan"}

# Download with presigned URL
@router.get("/{file_id}")
async def get_download_url(
    file_id: str,
    current_user: User = Depends(get_current_user)
):
    file_meta = await file_service.get(file_id)

    # RBAC: Check user can access this file
    if current_user.role == 'patient':
        patient = await patient_service.get_by_user_id(current_user.id)
        if file_meta.patient_id != patient.id:
            raise HTTPException(403)

    # Check scan status
    if file_meta.scan_status == 'infected':
        raise HTTPException(403, "File quarantined")

    # Generate presigned GET URL (1 hour)
    download_url = generate_presigned_url(
        bucket=settings.S3_BUCKET,
        object_key=file_meta.s3_key,
        expiration=3600
    )

    # Audit log
    await audit_service.log(
        user_id=current_user.id,
        action="downloaded_file",
        resource_type="file",
        resource_id=file_id
    )

    return {
        "download_url": download_url,
        "filename": file_meta.filename,
        "expires_at": datetime.now() + timedelta(hours=1)
    }
```

---

## Part 7: Implementation Roadmap

### Phase 1: Minimal Refactor (Now - 2-4 hours)
**Goal**: Prepare frontend structure for backend integration

- [ ] Restructure service layer (7 changes above)
- [ ] Add TanStack Query hooks
- [ ] Split types into domain/api
- [ ] Add `beforeLoad` route guards
- [ ] Create auth context abstraction
- [ ] Add environment config
- [ ] Create base API client
- [ ] Add input validation schemas (Zod)
- [ ] Add PHI masking utilities
- [ ] Add CSP meta tag

**Deliverable**: Frontend with clean separation, ready for real API.

---

### Phase 2: Backend Foundation (1-2 weeks)
**Goal**: Working FastAPI backend with auth + basic CRUD

- [ ] Setup FastAPI project structure
- [ ] PostgreSQL + Alembic migrations
- [ ] User authentication (JWT)
- [ ] Patient CRUD endpoints with RBAC
- [ ] Audit logging middleware
- [ ] Field-level encryption (Fernet)
- [ ] Role-based field filtering
- [ ] Unit tests (pytest)
- [ ] Integration tests
- [ ] API documentation (auto-generated from FastAPI)

**Deliverable**: Backend MVP that frontend can connect to.

---

### Phase 3: Compliance Features (1-2 weeks)
**Goal**: HIPAA/GDPR/DPDP core requirements

- [ ] Consent versioning system
- [ ] Immutable consent history
- [ ] Consent PDF generation + signing
- [ ] Tamper-evident audit logs (hash chain)
- [ ] Audit log 6-year retention policy
- [ ] Right to erasure workflow (GDPR)
- [ ] Data export API (GDPR data portability)
- [ ] Breach notification system (skeleton)
- [ ] Privacy policy + terms of service
- [ ] HIPAA BAA templates

**Deliverable**: Compliance-ready system (legal review pending).

---

### Phase 4: File Upload + Security Hardening (1 week)
**Goal**: Production-grade security

- [ ] S3 presigned upload URLs
- [ ] Virus scanning (ClamAV or VirusTotal)
- [ ] File metadata encryption
- [ ] Download audit logging
- [ ] Rate limiting (Redis)
- [ ] CSRF protection
- [ ] XSS prevention (CSP headers)
- [ ] SQL injection tests (already prevented by ORM)
- [ ] Penetration testing
- [ ] Security audit

**Deliverable**: Production-ready security.

---

### Phase 5: Monitoring + Ops (Ongoing)
**Goal**: Observability and incident response

- [ ] Logging (structured JSON logs)
- [ ] Monitoring (Prometheus + Grafana)
- [ ] Alerting (PagerDuty or OpsGenie)
- [ ] PHI access anomaly detection
- [ ] Automated backups (encrypted)
- [ ] Disaster recovery plan
- [ ] Incident response runbook
- [ ] Staff HIPAA training
- [ ] Annual risk assessment

**Deliverable**: Operational excellence.

---

## Part 8: Risk Register

### Immediate Risks (MVP)

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|-----------|
| **PHI exposure via DevTools** | CRITICAL | HIGH | Clear warning: "MVP - Do not use real PHI" |
| **Client-side auth bypass** | CRITICAL | MEDIUM | Add disclaimer, backend will enforce |
| **No audit trail** | HIGH | CERTAIN | Implement in Phase 2 (blocking for prod) |
| **Consent not persisted** | HIGH | CERTAIN | Phase 3 requirement |
| **No encryption** | CRITICAL | CERTAIN | Phase 2 requirement |

### Future Risks (Production)

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|-----------|
| **Breach notification failure** | CRITICAL | LOW | Automated workflow + legal review |
| **Inadequate audit retention** | HIGH | MEDIUM | 7-year retention enforced by DB |
| **Token theft (XSS)** | CRITICAL | MEDIUM | httpOnly cookies, CSP headers |
| **Insider threat (doctor accessing all PHI)** | HIGH | LOW | Anomaly detection, periodic audits |
| **Third-party data leak** | CRITICAL | MEDIUM | Vendor BAAs, encryption at rest |

---

## Part 9: Decision Matrix

### Authentication Options

| Option | Pros | Cons | Recommendation |
|--------|------|------|---------------|
| **Build custom (JWT + bcrypt)** | Full control, no vendor lock-in | Security burden, slow development | ✓ For learning / cost-sensitive |
| **Supabase Auth** | Fast, free tier, built-in RLS | Vendor lock-in, compliance concerns | Good for rapid prototyping |
| **Auth0 / Okta** | Enterprise-grade, compliant, SSO | Expensive, complex setup | Production-grade, HIPAA-ready |
| **AWS Cognito** | Scalable, HIPAA-eligible with BAA | AWS lock-in, steep learning curve | Best for AWS deployments |

**Recommendation for StoneCare**: Start with custom JWT (Phase 2), migrate to Auth0/Okta before launch if budget allows.

---

### Database Encryption

| Option | Pros | Cons | Recommendation |
|--------|------|------|---------------|
| **Application-level (Fernet)** | Database-agnostic, fine-grained control | Key management burden, slower queries | ✓ Recommended for PHI fields |
| **PostgreSQL pgcrypto** | Native, transparent, good performance | Postgres-specific, harder key rotation | Good for less sensitive data |
| **AWS RDS encryption** | Easy, managed, compliance-ready | AWS lock-in, coarse-grained (full DB) | Use as baseline + app-level |
| **Column-level encryption** | Granular, query-friendly | Complex implementation | Future enhancement |

**Recommendation**: Application-level Fernet for PHI fields + RDS encryption for baseline.

---

## Part 10: Conclusion

### Summary

Your **StoneCare MVP** is well-architected with:
- ✓ Clean separation of concerns
- ✓ Type-safe domain models
- ✓ Modern React stack
- ✓ Good comments documenting future work

**To reach production**, you need:
1. **7 minimal refactors** (now) to prepare frontend structure
2. **Backend implementation** with auth, encryption, RBAC (Phase 2)
3. **Compliance features** (audit, consent, erasure) (Phase 3)
4. **Security hardening** (file uploads, rate limiting, CSP) (Phase 4)

### Next Steps

1. **Review this document with your team**
2. **Prioritize Phase 1 refactors** (can do incrementally)
3. **Design backend API contracts** (use FastAPI docs as guide)
4. **Legal review of consent forms** (before implementing Phase 3)
5. **Budget for security audit** (required before handling real PHI)

### Estimated Effort

- **Phase 1 (refactor)**: 2-4 hours
- **Phase 2 (backend)**: 1-2 weeks (1 developer)
- **Phase 3 (compliance)**: 1-2 weeks (1 developer)
- **Phase 4 (security)**: 1 week (1 developer + security consultant)
- **Phase 5 (ops)**: Ongoing

**Total to production-ready**: 4-6 weeks for experienced full-stack developer.

---

## Appendix A: File Changes Checklist

**Create New Files** (5):
```
src/config/env.ts
src/services/lib/apiClient.ts
src/services/lib/storage.ts
src/lib/phi-utils.ts
src/schemas/consent.schema.ts
.env.example
```

**Restructure Existing** (Split):
```
src/services/api.ts →
  src/services/api/auth.api.ts
  src/services/api/patients.api.ts
  src/services/api/audit.api.ts
  src/services/api/consent.api.ts
  src/services/api/index.ts

src/data/mockPatients.ts → src/services/mock/mockData.ts

src/types/index.ts →
  src/types/domain/patient.types.ts
  src/types/domain/user.types.ts
  src/types/domain/audit.types.ts
  src/types/domain/consent.types.ts
  src/types/api/requests.ts
  src/types/api/responses.ts
  src/types/index.ts
```

**Modify Existing** (8):
```
src/routes/doctor.index.tsx (add beforeLoad)
src/routes/doctor.patients.index.tsx (add TanStack Query)
src/routes/doctor.patients.$patientId.tsx (add beforeLoad)
src/routes/patient.index.tsx (add beforeLoad)
src/hooks/useAuth.ts (use auth context instead of direct service)
src/components/RequireRole.tsx (keep as fallback)
index.html (add CSP meta tag)
```

---

## Appendix B: Example API Client Implementation

See `src/services/lib/apiClient.ts` design in **Change 7** above.

---

## Appendix C: References

- **HIPAA Security Rule**: https://www.hhs.gov/hipaa/for-professionals/security/index.html
- **GDPR Compliance Checklist**: https://gdpr.eu/checklist/
- **India DPDP Act 2023**: https://www.meity.gov.in/data-protection-framework
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **TanStack Query**: https://tanstack.com/query/latest
- **Fernet Encryption**: https://cryptography.io/en/latest/fernet/
- **PostgreSQL RLS**: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- **OWASP Top 10**: https://owasp.org/www-project-top-ten/

---

**Document Version**: 1.0
**Last Updated**: 2026-05-13
**Next Review**: Before Phase 2 backend implementation
