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
# Production build
npm run build

# Preview production build locally
npm run preview
```

**Output**: `dist/server/` (SSR server bundle) + `dist/client/` (static assets)

## Deployment

This is a **Server-Side Rendered (SSR)** application ready for public deployment as a safe prototype.

### Quick Deploy Options

- **Cloudflare Pages** (Recommended): Best for edge computing with TanStack Start
- **Vercel**: Zero-config deployment with automatic previews
- **Netlify**: JAMstack-friendly with edge functions
- **Render**: Traditional Node.js hosting

### Deployment Configuration

```
Build command:       npm run build
Output directory:    dist/server
Node version:        20.x
```

📖 **See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed step-by-step instructions** for all platforms, including:
- Platform-specific configuration
- Custom domain setup
- Environment variables
- Troubleshooting guide
- Cost estimates

### Safe for Public Deployment

✅ This prototype is safe to deploy publicly because:
- No database (all data is mock/in-memory)
- No real authentication
- No file uploads or storage
- No payment processing
- Visible warning banner on every page
- All sensitive features are mocked

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

## Documentation

- **README.md** (this file) - Project overview and quick start
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Comprehensive deployment guide for Cloudflare, Vercel, Netlify, and Render
- **[DEMO_GUIDE.md](./DEMO_GUIDE.md)** - Step-by-step demo scenarios for urologist review
- **[ARCHITECTURE_REVIEW.md](./ARCHITECTURE_REVIEW.md)** - Detailed technical architecture analysis and production roadmap
- **[ARCHITECTURE_MAP.md](./ARCHITECTURE_MAP.md)** - Quick reference guide to codebase structure

## Future Development

See `ARCHITECTURE_REVIEW.md` for detailed plans on implementing:
- Real authentication with JWT
- Backend API (FastAPI)
- Data encryption
- Audit logging
- HIPAA/GDPR/DPDP compliance features
- File upload with virus scanning
- And more...

## Development Workflow

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

[Your License Here]

## Contact

[Your Contact Information Here]
