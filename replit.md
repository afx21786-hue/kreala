# Kerala Economic Forum (KEF) Website

## Overview
A premium, modern, animated multi-page website for Kerala Economic Forum - a statewide non-profit empowering entrepreneurs, students, startups, and institutions in Kerala. Built with React, TypeScript, and Tailwind CSS featuring GSAP-inspired scroll animations, glassmorphism effects, and a startup-style premium design.

## Current State
Frontend prototype completed with all 10 pages plus authentication:
- Home (Hero, Programs, Events, Testimonials, Partners, CTA)
- About Us (Mission, Vision, Leadership)
- Programs (Filterable program grid with detail view)
- Events (Searchable, filterable event listings)
- Membership (Pricing tiers with toggle)
- Resources (Blog, Downloads, Videos tabs)
- Partners (Partner categories, benefits, partnership options)
- Contact (Form with validation)
- Startup Support (Services, Accelerator journey, FAQs)
- Campus Initiatives (Student programs, colleges, success stories)
- Login (Email/password + Google OAuth)
- Signup (Full name, email/password + Google OAuth)
- Dashboard (Protected, personalized user dashboard)

## Authentication
- **Provider**: Supabase Auth
- **Methods**: Email/password, Google OAuth
- **Features**: User metadata (full_name), session management, protected routes
- **Files**: 
  - `client/src/lib/supabaseClient.ts` - Supabase client
  - `client/src/hooks/useAuth.tsx` - Auth context and hooks
  - `client/src/pages/Login.tsx`, `Signup.tsx`, `Dashboard.tsx` - Auth pages

## Brand Colors
- Soft Red: #E46E6E (HSL: 0 72% 66%)
- Yellow/Gold: #E7D26A (HSL: 48 72% 66%)
- Aqua/Teal: #6EC9C6 (HSL: 178 45% 61%)
- Dark Charcoal for typography
- Clean white backgrounds

## Project Architecture

### Frontend (client/)
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom KEF brand colors
- **UI Components**: Shadcn/ui components
- **Routing**: Wouter for client-side navigation
- **Animations**: CSS animations + GSAP (@gsap/react)
- **State Management**: React hooks, TanStack Query

### Key Directories
```
client/src/
├── components/
│   ├── layout/        # Navbar, Footer
│   ├── sections/      # Hero, Programs, Events, etc.
│   ├── ui/            # Shadcn components
│   └── examples/      # Component examples
├── pages/             # Page components
├── hooks/             # Custom React hooks
└── lib/               # Utilities
```

### Backend (server/)
- **Framework**: Express.js
- **Database**: PostgreSQL (Drizzle ORM)
- **API**: RESTful endpoints under /api

## Recent Changes
- Created 10-page website with premium animations
- Implemented KEF brand color system
- Added scroll-triggered animations
- Created responsive navigation with mobile drawer
- Built membership pricing with yearly/monthly toggle
- Added contact form with toast notifications

## User Preferences
- Premium, futuristic, startup-style UI
- Young, energetic, bold aesthetic
- Google 2025 design language + Apple minimalism
- Smooth animations and micro-interactions

## Running the Project
The application runs with `npm run dev` which starts:
- Express backend on port 5000
- Vite dev server for frontend HMR
