# StoneCare Renal Stone Prevention System

## ⚠️ IMPORTANT WARNING ⚠️

**THIS IS A PROTOTYPE/MVP APPLICATION - NOT PRODUCTION READY**

**DO NOT ENTER REAL PATIENT DATA**

This application is a development prototype and lacks critical security and compliance features required for handling Protected Health Information (PHI). It is NOT compliant with HIPAA, GDPR, or DPDP regulations.

### Missing Critical Features:
- ❌ No real authentication (mock authentication only)
- ❌ No data encryption (at rest or in transit beyond HTTPS)
- ❌ No audit logging persistence
- ❌ No consent management persistence
- ❌ Client-side only authorization (not enforced by backend)
- ❌ No session management
- ❌ No production backend

### Use Only For:
- ✓ Development and testing with mock/synthetic data
- ✓ UI/UX demonstrations
- ✓ Feature prototyping
- ✓ Architecture validation

---

## About

StoneCare is a healthcare application designed to help manage renal stone prevention and treatment. This MVP demonstrates the user interface and basic workflows for doctors and patients.

## Tech Stack

- React 19 with TypeScript
- TanStack Router (type-safe routing)
- TanStack Query (data fetching)
- Tailwind CSS v4
- shadcn/ui components
- Vite (build tool)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── AppHeader.tsx
│   ├── RequireRole.tsx
│   └── StatCard.tsx
├── config/          # Configuration files
│   └── env.ts       # Environment configuration
├── data/            # Mock data
├── hooks/           # Custom React hooks
├── routes/          # TanStack Router routes
├── services/        # API services (currently mock)
├── types/           # TypeScript type definitions
└── lib/             # Utility functions
```

## Available Routes

- `/login` - Login page (mock authentication)
- `/doctor/*` - Doctor dashboard and patient management
- `/patient/*` - Patient dashboard and health tracking
- `/admin/*` - Admin panel

## Mock Authentication

For testing purposes, use the mock login:
- Role selection: Doctor, Patient, or Admin
- No password required (this is intentional for the prototype)

## Future Development

See `ARCHITECTURE_REVIEW.md` for detailed plans on implementing:
- Real authentication with JWT
- Backend API (FastAPI)
- Data encryption
- Audit logging
- HIPAA/GDPR/DPDP compliance features
- File upload with virus scanning
- And more...

## License

[Your License Here]

## Contact

[Your Contact Information Here]
