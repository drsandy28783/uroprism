# StoneCare Prototype Deployment Guide

**Deployment Type**: Server-Side Rendered (SSR) Application
**Framework**: TanStack Start
**Status**: Safe Public Prototype (Mock Data Only)

---

## ⚠️ Important: Prototype Deployment Safety

This deployment guide is for the **prototype only**. The application:

✅ **Safe to deploy publicly** because:
- No database connection
- No real authentication
- Mock data only (lost on server restart)
- No file uploads
- No payment processing
- Visible warning banner on every page

❌ **NOT production-ready** - Missing:
- Real backend API
- Database persistence
- User authentication
- Data encryption
- HIPAA/GDPR/DPDP compliance

---

## Deployment Type: SSR (Server-Side Rendering)

This application is built with **TanStack Start**, which requires server-side rendering.

**Why SSR and not static?**
- Uses TanStack Router with server context
- Builds to `dist/server` (server bundle) + `dist/client` (static assets)
- Requires a runtime environment (Cloudflare Workers, Vercel Edge, Netlify Functions, or Node.js)

**Build Output**:
```
dist/
├── client/          # Static assets (JS, CSS, images)
│   ├── assets/
│   └── .assetsignore
└── server/          # SSR server bundle
    ├── assets/
    ├── .vite/
    ├── index.js
    └── wrangler.json
```

---

## Build Configuration

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

### Build Outputs

| Output | Location | Description |
|--------|----------|-------------|
| **Client Assets** | `dist/client/` | Static files (JS, CSS) served to browser |
| **Server Bundle** | `dist/server/` | SSR server code (Cloudflare Workers format) |
| **Manifest** | `dist/server/.vite/manifest.json` | Asset mapping for SSR |

---

## Option 1: Cloudflare Pages (Recommended)

**Best for**: TanStack Start native support, edge computing, free tier

### Prerequisites

- Cloudflare account (free tier available)
- Git repository (GitHub, GitLab, or Bitbucket)

### Deployment Steps

#### A. Via Cloudflare Dashboard (Easiest)

1. **Push code to Git repository**
   ```bash
   git add .
   git commit -m "Prepare for Cloudflare deployment"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Pages** → **Create a project**
   - Select **Connect to Git**
   - Choose your repository

3. **Configure Build Settings**
   ```
   Build command:       npm run build
   Build output dir:    dist/server
   Root directory:      (leave empty or /)
   Node version:        20
   ```

4. **Environment Variables** (Optional)
   - Go to **Settings** → **Environment variables**
   - Add any custom variables from `.env.example`
   - For prototype, defaults are fine

5. **Deploy**
   - Click **Save and Deploy**
   - Wait ~2-3 minutes for build
   - Your app will be live at `https://your-project.pages.dev`

#### B. Via Wrangler CLI (Advanced)

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   wrangler pages deploy dist/server --project-name=stonecare-prototype
   ```

4. **Custom Domain** (Optional)
   ```bash
   wrangler pages domain add stonecare.your-domain.com
   ```

### Cloudflare Configuration Files

The project includes `dist/server/wrangler.json` (auto-generated):
```json
{
  "main": "index.js",
  "compatibility_date": "2024-01-01",
  "compatibility_flags": ["nodejs_compat"]
}
```

### Cloudflare Advantages
✅ Native TanStack Start support
✅ Edge computing (fast worldwide)
✅ Free SSL certificates
✅ Generous free tier
✅ Automatic deployments from Git

---

## Option 2: Vercel

**Best for**: Easy deployment, automatic previews, integrated analytics

### Prerequisites

- Vercel account (free tier available)
- Git repository

### Deployment Steps

#### A. Via Vercel Dashboard (Easiest)

1. **Push code to Git**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Click **Import Git Repository**
   - Select your repository

3. **Configure Project**
   ```
   Framework Preset:    Other
   Build Command:       npm run build
   Output Directory:    dist/server
   Install Command:     npm install
   Node.js Version:     20.x
   ```

4. **Environment Variables** (Optional)
   - Click **Environment Variables**
   - Add variables from `.env.example` if needed
   - For prototype, defaults work

5. **Deploy**
   - Click **Deploy**
   - Wait ~2-3 minutes
   - Live at `https://your-project.vercel.app`

#### B. Via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login and Deploy**
   ```bash
   vercel login
   vercel
   ```

3. **Follow prompts**:
   - Setup and build: Yes
   - Which scope: [Your account]
   - Link to existing project: No
   - Project name: stonecare-prototype
   - Directory: ./
   - Override settings: No

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Vercel Configuration File

Create `vercel.json` (optional, for custom settings):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/server",
  "framework": "tanstack-start",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### Vercel Advantages
✅ Zero-config deployments
✅ Automatic preview URLs for PRs
✅ Built-in analytics
✅ Generous free tier
✅ Excellent DX

---

## Option 3: Netlify

**Best for**: JAMstack experience, form handling, identity service

### Prerequisites

- Netlify account (free tier available)
- Git repository

### Deployment Steps

#### A. Via Netlify Dashboard

1. **Push code to Git**
   ```bash
   git push origin main
   ```

2. **Import to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click **Add new site** → **Import an existing project**
   - Connect to Git provider
   - Select repository

3. **Configure Build Settings**
   ```
   Base directory:      (leave empty)
   Build command:       npm run build
   Publish directory:   dist/client
   Functions directory: dist/server
   ```

4. **Advanced Settings**
   - Node version: 20
   - Environment variables: Add from `.env.example` if needed

5. **Deploy**
   - Click **Deploy site**
   - Wait ~3-4 minutes
   - Live at `https://random-name-123456.netlify.app`

#### B. Via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize**
   ```bash
   netlify init
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Netlify Configuration File

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist/client"
  functions = "dist/server"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/server"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Netlify Advantages
✅ Simple Git-based workflow
✅ Edge Functions support
✅ Built-in form handling
✅ Split testing
✅ Free SSL

**Note**: Netlify's support for TanStack Start is experimental. Cloudflare or Vercel are recommended for better compatibility.

---

## Option 4: Render (Node.js Web Service)

**Best for**: Traditional Node.js deployments, full control, database integration (future)

### Prerequisites

- Render account (free tier available)
- Git repository

### Deployment Steps

1. **Create Node.js Server Adapter**

   Since TanStack Start builds for Cloudflare Workers by default, we need a Node.js adapter.

   Create `server-node.js` in project root:
   ```javascript
   import { createServer } from 'http';
   import { readFileSync } from 'fs';
   import { fileURLToPath } from 'url';
   import { dirname, join } from 'path';

   const __dirname = dirname(fileURLToPath(import.meta.url));

   // Import the built server
   const serverModule = await import('./dist/server/index.js');
   const handler = serverModule.default;

   const PORT = process.env.PORT || 3000;

   const server = createServer(async (req, res) => {
     try {
       const url = new URL(req.url, `http://${req.headers.host}`);
       const request = new Request(url, {
         method: req.method,
         headers: req.headers,
       });

       const response = await handler.fetch(request, {}, {});

       res.writeHead(response.status, Object.fromEntries(response.headers));
       res.end(await response.text());
     } catch (error) {
       console.error('Server error:', error);
       res.writeHead(500);
       res.end('Internal Server Error');
     }
   });

   server.listen(PORT, () => {
     console.log(`Server running on http://localhost:${PORT}`);
   });
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "start": "node server-node.js"
     },
     "engines": {
       "node": ">=20.0.0"
     }
   }
   ```

3. **Push to Git**
   ```bash
   git add .
   git commit -m "Add Node.js server adapter for Render"
   git push origin main
   ```

4. **Deploy on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click **New** → **Web Service**
   - Connect repository
   - Configure:
     ```
     Name:            stonecare-prototype
     Environment:     Node
     Build Command:   npm install && npm run build
     Start Command:   npm start
     Instance Type:   Free
     ```

5. **Environment Variables** (Optional)
   - Add variables from `.env.example`

6. **Deploy**
   - Click **Create Web Service**
   - Wait ~5-7 minutes
   - Live at `https://stonecare-prototype.onrender.com`

### Render Configuration File

Create `render.yaml`:
```yaml
services:
  - type: web
    name: stonecare-prototype
    env: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: 20.11.0
      - key: NODE_ENV
        value: production
```

### Render Advantages
✅ Full Node.js environment
✅ Free tier with SSL
✅ Easy database integration (for future)
✅ Automatic deploys from Git
✅ Health checks & monitoring

### Render Limitations
⚠️ Free tier spins down after inactivity (cold starts)
⚠️ Requires custom Node.js adapter

---

## Custom Domain Setup

### Cloudflare Pages
1. Go to **Pages** → Your project → **Custom domains**
2. Add your domain
3. Update DNS records as instructed

### Vercel
1. Go to project **Settings** → **Domains**
2. Add domain
3. Configure DNS (Vercel provides instructions)

### Netlify
1. Go to **Domain settings**
2. Add custom domain
3. Update DNS or use Netlify DNS

### Render
1. Go to service → **Settings** → **Custom Domain**
2. Add domain
3. Configure CNAME record

---

## Environment Variables

### Required for Prototype
None - the prototype works with default values.

### Optional Configuration

Create `.env` file (already in `.gitignore`):
```bash
# API Configuration (for future backend)
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000

# Feature Flags
VITE_USE_MOCK_DATA=true
VITE_FILE_UPLOAD_ENABLED=false

# Compliance
VITE_CONSENT_VERSION=1.0.0
```

**Important**: Only `VITE_*` prefixed variables are exposed to the client.

---

## Router/SPA Fallback

TanStack Start handles routing server-side, so **no additional SPA fallback is needed**.

### What This Means:
- All routes are server-rendered
- Deep links work automatically
- No 404 issues on page refresh
- SEO-friendly (if that matters for prototype)

### If You Need Client-Side Only Routing:
This would require converting to TanStack Router (without Start), which is a major refactor. Not recommended for this prototype.

---

## Deployment Checklist

### Pre-Deployment

- [ ] Verify prototype warning banner appears on all pages
- [ ] Confirm no real patient data in code
- [ ] Check `.gitignore` includes `.env` and sensitive files
- [ ] Run `npm run build` locally to test
- [ ] Review `README.md` warnings are clear

### During Deployment

- [ ] Build completes without errors
- [ ] Output directory is correct (`dist/server`)
- [ ] Environment variables set (if any)
- [ ] SSL certificate auto-provisioned

### Post-Deployment

- [ ] Visit deployed URL
- [ ] Test as Doctor user (all pages)
- [ ] Test as Patient user (all pages)
- [ ] Verify warning banner visible
- [ ] Check all routes work (no 404s)
- [ ] Test on mobile device
- [ ] Share URL with team for review

---

## Troubleshooting

### Build Fails: "Module not found"
**Solution**: Ensure all dependencies are in `dependencies`, not `devDependencies`
```bash
npm install
npm run build
```

### Build Fails: "createFileRoute already declared"
**Solution**: Check for duplicate imports in route files
```bash
# This was already fixed in doctor.patients.index.tsx
# Search for: import.*createFileRoute.*\n.*import.*createFileRoute
```

### Deployed Site Shows White Screen
**Possible causes**:
1. Wrong output directory (should be `dist/server`)
2. Missing environment variables
3. Build failed silently

**Solution**:
- Check build logs on platform
- Verify `dist/server/index.js` exists
- Test locally with `npm run preview`

### 404 on All Routes
**Solution**: This shouldn't happen with SSR. If it does:
1. Verify output directory is `dist/server`
2. Check platform-specific routing config
3. For Netlify: ensure `netlify.toml` redirects are set

### Slow Performance on Free Tier
**Expected**: Free tiers have limitations
- Cloudflare: Edge computing is fast
- Vercel: Good performance even on free tier
- Netlify: Edge Functions may have cold starts
- Render: Spins down after inactivity (30-60s cold start)

**Solution**: Upgrade to paid tier for production

---

## Monitoring & Analytics

### Cloudflare
- Built-in analytics in Pages dashboard
- Real-time logs via Wrangler: `wrangler tail`

### Vercel
- Analytics in project dashboard
- Real-time logs in **Deployments** tab
- Optional Vercel Analytics (paid)

### Netlify
- Analytics in site dashboard
- Build logs in **Deploys** section
- Function logs available

### Render
- Logs in **Logs** tab
- Metrics in **Metrics** tab
- Email alerts for failures

---

## Cost Estimates

| Platform | Free Tier | Paid Tier (Starting) | Best For |
|----------|-----------|---------------------|----------|
| **Cloudflare Pages** | 500 builds/month, Unlimited requests | $20/month | Prototype + Production |
| **Vercel** | 100GB bandwidth, 100 builds/month | $20/month | Rapid prototyping |
| **Netlify** | 300 build minutes, 100GB bandwidth | $19/month | JAMstack projects |
| **Render** | 750 hours/month, spins down after inactivity | $7/month (always on) | Full Node.js control |

**For this prototype**: Free tier on any platform is sufficient.

---

## Security Headers (Already Configured)

The application includes basic security headers. For production, enhance in platform config:

```javascript
// Example for Vercel (vercel.json)
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" }
      ]
    }
  ]
}
```

---

## Recommended Deployment Flow

### For Prototype Review (Use Cloudflare or Vercel)

```bash
# 1. Final build test
npm run build

# 2. Commit and push
git add .
git commit -m "Ready for deployment"
git push origin main

# 3. Deploy via dashboard (easiest)
# Go to Cloudflare Pages or Vercel
# Connect repository
# Deploy

# 4. Share URL with reviewers
# Example: https://stonecare-prototype.pages.dev
```

### For Production (Future)

1. Add real backend (FastAPI)
2. Configure database (PostgreSQL)
3. Implement authentication (JWT)
4. Add encryption
5. Enable compliance features
6. Professional domain
7. Upgrade to paid tier
8. Set up monitoring
9. Configure backups
10. Legal review before launch

---

## Quick Reference

### Build Commands
```bash
npm run dev        # Local development
npm run build      # Production build
npm run preview    # Preview production build
```

### Output Directories
```
dist/client/       # Static assets
dist/server/       # SSR server bundle (use this)
```

### Platform Build Settings
```
Build command:       npm run build
Output directory:    dist/server
Node version:        20
```

### Repository Links
- Source code: [Your GitHub repo]
- Issue tracker: [Your issues page]
- Documentation: See README.md and DEMO_GUIDE.md

---

## Support & Next Steps

### Get Help
- **TanStack Start Docs**: https://tanstack.com/start
- **Cloudflare Pages**: https://developers.cloudflare.com/pages
- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Render Docs**: https://render.com/docs

### After Deployment
1. Share URL with urologists for feedback
2. Gather feature requests
3. Review ARCHITECTURE_REVIEW.md for production roadmap
4. Plan Phase 2: Backend development

---

**Last Updated**: 2026-05-13
**Version**: 1.0 (Prototype)
**Status**: Safe for public deployment with mock data
