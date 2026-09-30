# Udyog Setu — Industrial Approval & Compliance Intelligence Platform

**SIH 2026 · Problem Statement ID: 26130 · Government of Maharashtra**

> A unified, intelligent Single Window approval and compliance management platform for industrial entrepreneurs, competent authority officers, and MAITRI nodal coordinators — built under the **Maharashtra Industry, Trade and Investment Facilitation (MAITRI) Act 2023** & **MAITRI Rules 2025** statutory framework.

---

## Tech Stack

| Layer | Technology | Description / Details |
|---|---|---|
| **Frontend Framework** | Next.js 14 (App Router) | React 18, Server & Client Components, TypeScript |
| **Styling & UI Components** | Tailwind CSS · shadcn/ui | Modern, responsive responsive dark/light styling with Lucide icons |
| **Data Visualization & Graphs** | React Flow · Recharts | Dynamic interactive DAG rendering and scrutiny analytics charts |
| **Backend Framework** | Node.js · Express · TypeScript | REST API architecture with modular route and domain service architecture |
| **Database** | Supabase PostgreSQL | 22 PostgreSQL tables, HTTPS REST API via `@supabase/supabase-js` |
| **Authentication & AuthZ** | Custom JWT · bcrypt | Express middleware role-based access control (RBAC) across 6 roles |
| **Storage & Media** | Supabase Storage | Private `documents` bucket, 50 MB limit, PDF streaming |
| **Document Processing** | `pdf-parse` (Local Node Engine) | Local extraction with 18 regex pattern extractors (zero external API keys) |
| **Test Runner** | Node.js native (`tsx --test`) | 37 test files (4 unit + 33 integration), 45 test suites, 220+ tests |

**Default Ports:** Backend `:4000` · Frontend `:3000`

---

## Quick Start Guide

### Workspace Setup (Recommended)
```bash
# 1. Install root workspace dependencies
npm install

# 2. Run both Backend (:4000) & Frontend (:3000) concurrently
npm run dev

# 3. Execute Complete Test Suite
npm test                 # All 220+ tests across 45 suites (37 test files)
npm run test:unit        # Unit tests only (Rule Engine, DAG, SLA, DB Matcher)
npm run test:integration # Integration tests (Live DB, Auth, Workflow, Scrutiny, Guidance)
```

### Manual Component Setup

#### 1. Backend Setup (`/backend`)
```bash
cd backend
cp .env.example .env

# Verify environment variables in backend/.env:
# PORT=4000
# NODE_ENV=development
# SUPABASE_URL=https://<ref>.supabase.co
# SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
# SUPABASE_SECRET_KEY=sb_secret_...
# JWT_SECRET=your-jwt-secret-key-min-32-chars

npm install

# Initialize database schema (if setting up fresh Supabase project)
# SQL script available at backend/supabase_schema.sql

# Seed all demo accounts, projects, master rules, SLA policies, and documents:
npm run seed

# Run backend development server
npm run dev              # Listening on http://localhost:4000
```

#### 2. Frontend Setup (`/frontend`)
```bash
cd frontend
cp .env.example .env.local

# Verify environment variables in frontend/.env.local:
# NEXT_PUBLIC_API_URL=http://localhost:4000/api

npm install

# Run frontend development server
npm run dev              # Accessible at http://localhost:3000
```

---

## Pre-Configured Demo Accounts

All accounts use the default password: **`Demo@123`** (bcrypt-hashed in seed data).

| Email | Internal Role | Official MAITRI Role | Department Scope | Target Portal Route |
|---|---|---|---|---|
| `entrepreneur@demo.local` | `ENTREPRENEUR` | **Applicant / Investor** | — | `/app/dashboard` |
| `manager@demo.local` | `MANAGER` | **Authorized Representative** | — (ABC Foods Pvt Ltd) | `/app/dashboard` |
| `officer@demo.local` | `OFFICER` | **Competent Authority Officer** | MIDC | `/government/work-queue` |
| `pcb.officer@demo.local` | `OFFICER` | **Competent Authority Officer** | MPCB | `/government/work-queue` |
| `nodal@demo.local` | `NODAL` | **MAITRI Nodal Officer** | MAITRI (Statewide) | `/government/work-queue` |
| `inspector@demo.local` | `INSPECTOR` | **Designated Inspection Officer** | Joint Inspection | `/government/work-queue` |
| `admin@demo.local` | `ADMIN` | **System Administrator** | Governance | `/admin/approval-types` |

> **Self-Registration:** New applicant accounts can also be created via the "Create Applicant / Entrepreneur Account" option on the main login screen.

---

## Application Route Map

### 1. Applicant / Investor Portal (`/app/*`)

| Route | Purpose & Capabilities |
|---|---|
| `/app/dashboard` | **Project Control Centre** — Real-time readiness %, blockers, next-best-action deep links |
| `/app/projects` | **Project Directory** — Overview of active industrial undertakings and investment proposals |
| `/app/projects/new` | **Know Your Approvals (KYA)** — 5-step interactive onboarding wizard with live regulatory engine |
| `/app/projects/:id` | **Project Overview & Launcher** — Detailed project hub with parallel orchestration launcher |
| `/app/projects/:id/profile` | **Master Business & Investment Profile** — 5-tab dossier with field provenance & prefill dict |
| `/app/projects/:id/dependency-graph` | **Approval Dependency Graph** — React Flow visual DAG showing prerequisites and `can_start_now` |
| `/app/projects/:id/submission-centre` | **Parallel Submission Centre** — Orchestrates multi-department applications simultaneously |
| `/app/projects/:id/approval-tracker` | **Project Approval Tracker** — 6-stage statutory pipeline & countdown timers |
| `/app/approvals` | **Permissions & Approvals Roadmap** — Category-grouped regulatory requirements checklist |
| `/app/approval-directory` | **Approval Catalogue** — Public directory of permissions with live "Check Applicability" engine |
| `/app/applications/:id` | **Application Workspace** — 7-tab hub (CAF, documents, readiness, queries, inspections, timeline) |
| `/app/documents` | **Document Vault** — PDF preview, local field extraction, DigiLocker simulation, consistency audit |
| `/app/compliance` | **Compliance & Renewals** — 4-bucket workspace (Action Required, Due Soon, Healthy, Overdue) |
| `/app/inspections` | **Applicant Inspection Hub** — Joint site visit readiness confirmation and findings review |
| `/app/incentives` | **Incentive Discovery** — Matched fiscal subsidies, promotional schemes, and GR references |
| `/app/notifications` | **Role-Aware Feed** — Real-time unread badges, notifications, and direct navigation links |
| `/app/assistance` | **MAITRI Facilitation** — Direct contact and request portal for MAITRI Nodal Assistance |
| `/app/settings` | **Account Settings** — Profile details, organization attributes, security, and notification preferences |

### 2. Government Portal (`/government/*`)

| Route | Purpose & Capabilities |
|---|---|
| `/government/work-queue` | **Competent Authority Work Queue** — Dept-scoped application scrutiny, queries, and decision recording |
| `/government/sla-monitor` | **Specified Time Limit Monitor** — MAITRI Rules 2025 SLA tracking (ON_TRACK, AT_RISK, BREACHED) |
| `/government/inspections` | **Joint Inspection Planner** — Multi-department visit coordinator with atomic rescheduling |
| `/government/analytics` | **Scrutiny Analytics** — Real-time performance KPIs, pie charts, and departmental workload metrics |
| `/government/bottlenecks` | **Delay Intelligence** — Delay origin attribution (Applicant, Department, Inspector, Committee) |
| `/government/facilitation` | **MAITRI Nodal Panel** — Cross-window coordination notes and Section 10 statutory escalations |
| `/government/notifications` | **Government Feed** — Role-scoped alert system for SLA risks, query responses, and visit updates |

### 3. System Administrator Console (`/admin/*`)

| Route | Purpose & Capabilities |
|---|---|
| `/admin/approval-types` | **Permissions Catalogue** — Statutory approval definition CRUD, document rules, and issuing authorities |
| `/admin/rules` | **Applicability Rules Engine** — JSON condition rules manager with instant active/inactive toggle |
| `/admin/dependencies` | **Permission Dependencies** — Prerequisite DAG chain builder (Prerequisite, Parallel, Optional) |
| `/admin/sla-policies` | **Specified Time Limit Policies** — Statutory processing duration and escalation path configuration |
| `/admin/incentive-schemes` | **Incentive Master Data** — Fiscal subsidy catalog management with GR references |
| `/admin/users` | **User Provisioning** — Officer account directory and mandatory department binding setup |
| `/admin/audit-log` | **System Audit Trail** — Immutable audit log with JSON before/after state diff viewer |

---

## Directory Architecture

```
SIH_130/
├── package.json                   # Root workspace scripts & concurrently manager
├── docker-compose.yml             # Container orchestration config
├── render.yaml                    # Deployment descriptor for web services
├── README.md                      # Workspace entry guide
├── PROJECT_DOCUMENTATION.md       # Deep technical reference manual
│
├── backend/                       # Express + TypeScript Backend API (:4000)
│   ├── api/                       # Vercel serverless integration wrapper
│   ├── supabase_schema.sql        # Complete PostgreSQL 22-table schema DDL
│   ├── tsconfig.json              # TypeScript compilation rules
│   └── src/
│       ├── index.ts               # Server entry point
│       ├── app.ts                 # Express application configuration
│       ├── seed.ts                # Database seeder (synthetic scenario)
│       ├── adapters/              # External interfaces (SupabaseStorage, LocalStorage, MockGov)
│       ├── assets/                # Prescribed government PDF form binaries
│       ├── lib/                   # Database helpers, JWT, error handler, PDF generator
│       ├── middleware/            # Auth guard, RBAC role guard, audit logger, error middleware
│       ├── routes/                # 18 API route modules
│       ├── rule-engine/           # Declarative JSON condition evaluator engine
│       ├── services/              # 26 domain business logic services
│       ├── types/                 # Database interfaces and Express definitions
│       └── tests/                 # Node.js native test runner test suites
│           ├── unit/              # 4 Unit test files (Engine, Graph, SLA, DB)
│           └── integration/       # 33 Integration test files
│
└── frontend/                      # Next.js 14 App Router Frontend (:3000)
    ├── next.config.js             # Next.js optimization configuration
    ├── tailwind.config.ts         # Tailwind design system tokens
    ├── components.json            # shadcn/ui configuration
    └── src/
        ├── app/                   # App Router page tree (app, government, admin, login)
        ├── components/            # UI components (forms, applications, guidance, scrutiny)
        ├── lib/                   # API client, React Query provider, utils
        └── types/                 # Frontend state and API types
```

---

## Core System Capabilities

1. **Know Your Approvals (KYA) Engine:** 5-step wizard with live condition evaluation against project parameters (pollution category, power kVA, water KLD, land area sq.m, employee count).
2. **Master Business Profile & Data Reuse:** Single dossier pre-populating Common Application Forms (CAF) with verified provenance badges.
3. **Approval Dependency Graph (DAG):** Interactive React Flow rendering showing prerequisites, topological sorting, and parallel readiness (`can_start_now`).
4. **Parallel Application Orchestration:** Instantiates all eligible prerequisite-cleared workspaces in a single step without auto-submitting.
5. **Document Vault & Extraction:** PDF parsing using 18 regex patterns (`pdf-parse`), cross-document consistency auditing, and multi-application 1-click vault reuse.
6. **Pre-Submission Readiness Check:** Mandatory document validation, consistency checks, and issue resolution shortcuts.
7. **Joint Department Inspection Planner:** Coordinated multi-agency site visits with single-transaction atomic rescheduling.
8. **Specified Time Limit Monitor:** MAITRI Rules 2025 statutory processing duration tracking (ON_TRACK, AT_RISK, BREACHED) with automated officer warnings.
9. **Section 10 Statutory Escalation:** Nodal officer escalation of breached applications to the Empowered Committee under Section 10 of MAITRI Act 2023.
10. **Delay Origin Intelligence:** Structural delay attribution separating Applicant, Department, Inspector, and Committee bottlenecks.
11. **Deterministic Contextual Guidance Assistant:** 9 canonical intent inquiry engine grounded directly in live database state without external LLM API dependencies.
12. **DigiLocker Prototype Simulation:** Visual simulation of MCA21 and Income Tax document ingestion via API Setu with explicit prototype disclaimers.

---

## Test Suite & Verification

The repository contains an automated test suite executed via the native Node.js test runner (`tsx --test`):

```
Backend Test Execution Summary:
----------------------------------
Total Test Files:  37 files (4 unit + 33 integration)
Total Test Suites: 45 suites
Total Test Cases:  220+ tests
Pass Rate:         100%

Coverage Highlights:
  - Unit: Rule evaluation operators, DAG graph traversal, SLA engine logic, In-memory DB matcher.
  - Integration: End-to-end Auth, KYA Wizard, CAF submission, Document Vault & Extraction,
    Joint Inspections, SLA Breaches, Section 10 Escalation, Scrutiny Work Queue, Admin CRUD.
```

---

## Disclaimer

> **PROTOTYPE DEMONSTRATION DATA.** This platform is a prototype developed for **SIH 2026 Problem Statement 26130** (Government of Maharashtra). All data associated with "ABC Foods Pvt Ltd" and demo users is synthetic. External government integrations (DigiLocker API Setu, BHASHINI, external department gateways) are explicitly tagged as simulated seams in this build.
