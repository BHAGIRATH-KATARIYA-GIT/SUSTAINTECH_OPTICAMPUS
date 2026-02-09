# OptiCampus – Project Overview

This document lists all files and folders and explains how the app works and **where to change things**.

---

## 1. Full File & Folder Structure

```
OPTICAMPUS/
├── .gitignore
├── bun.lockb
├── components.json          # shadcn/ui component config
├── eslint.config.js
├── index.html               # HTML entry (root div, loads main.tsx)
├── package-lock.json
├── package.json             # scripts, dependencies
├── postcss.config.js
├── tailwind.config.ts       # Tailwind + theme (colors, fonts, animations)
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts           # Vite + @ alias, dev server port 8080
├── vitest.config.ts
├── README.md
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
└── src/
    ├── main.tsx             # App entry – mounts React into #root
    ├── App.tsx               # Routes + providers (React Query, Router, Toasts)
    ├── App.css
    ├── index.css             # Global styles + CSS variables (theme)
    ├── vite-env.d.ts
    ├── lib/
    │   └── utils.ts          # cn() for merging Tailwind classes
    ├── hooks/
    │   ├── use-mobile.tsx    # Mobile breakpoint hook
    │   └── use-toast.ts      # Toast notifications
    ├── components/
    │   ├── NavLink.tsx       # Reusable nav link
    │   ├── dashboard/
    │   │   └── DashboardLayout.tsx   # Sidebar + top bar for all dashboards
    │   ├── landing/
    │   │   ├── Header.tsx
    │   │   ├── HeroSection.tsx
    │   │   ├── FeaturesSection.tsx
    │   │   ├── FlowsSection.tsx
    │   │   ├── CTASection.tsx
    │   │   └── Footer.tsx
    │   └── ui/               # shadcn/ui components (buttons, cards, dialogs, etc.)
    │       ├── accordion.tsx, alert-dialog.tsx, alert.tsx, aspect-ratio.tsx,
    │       ├── avatar.tsx, badge.tsx, breadcrumb.tsx, button.tsx, calendar.tsx,
    │       ├── card.tsx, carousel.tsx, chart.tsx, checkbox.tsx, collapsible.tsx,
    │       ├── command.tsx, context-menu.tsx, dialog.tsx, drawer.tsx,
    │       ├── dropdown-menu.tsx, form.tsx, hover-card.tsx, input-otp.tsx,
    │       ├── input.tsx, label.tsx, menubar.tsx, navigation-menu.tsx,
    │       ├── pagination.tsx, popover.tsx, progress.tsx, radio-group.tsx,
    │       ├── resizable.tsx, scroll-area.tsx, select.tsx, separator.tsx,
    │       ├── sheet.tsx, sidebar.tsx, skeleton.tsx, slider.tsx, sonner.tsx,
    │       ├── switch.tsx, table.tsx, tabs.tsx, textarea.tsx, toast.tsx,
    │       ├── toaster.tsx, toggle-group.tsx, toggle.tsx, tooltip.tsx,
    │       └── use-toast.ts
    ├── pages/
    │   ├── Index.tsx              # Landing page (public)
    │   ├── Login.tsx
    │   ├── Register.tsx
    │   ├── NotFound.tsx           # 404
    │   └── dashboard/
    │       ├── StudentDashboard.tsx
    │       ├── AdminDashboard.tsx
    │       ├── MaintenanceDashboard.tsx
    │       ├── EventRequestPage.tsx      # Student: request event
    │       └── MaintenanceReportPage.tsx # Student: report maintenance
    └── test/A
        ├── setup.ts
        └── example.test.ts
```

---

## 2. How the App Works (Flow)

1. **Entry**
   - `index.html` has `<div id="root">` and loads `/src/main.tsx`.
   - `main.tsx` imports `App.tsx` and `index.css`, then renders `<App />` into `#root`.

2. **App shell**
   - `App.tsx` wraps everything in:
     - `QueryClientProvider` (TanStack React Query)
     - `TooltipProvider`
     - Toasters (shadcn + Sonner)
     - `BrowserRouter` with `<Routes>`.

3. **Routing**
   - All routes are defined in `App.tsx`:
     - `/` → Landing (`Index.tsx`)
     - `/login`, `/register` → Auth pages
     - `/dashboard/student`, `/dashboard/student/request`, `/dashboard/student/maintenance` → Student
     - `/dashboard/admin` → Admin
     - `/dashboard/maintenance` → Maintenance
     - `*` → `NotFound`

4. **Landing page**
   - `Index.tsx` composes: `Header` → `HeroSection` → `FeaturesSection` → `FlowsSection` → `CTASection` → `Footer` (all from `src/components/landing/`).

5. **Dashboards**
   - Each dashboard page (e.g. `StudentDashboard.tsx`) uses `DashboardLayout` with a `userRole` and optional `userName`.
   - `DashboardLayout.tsx` provides:
     - Sidebar with role-based nav items
     - Top bar (title, menu, notifications, settings)
     - Main content area where the page’s content is rendered as `children`.

6. **Styling**
   - Global styles and CSS variables: `src/index.css`.
   - Theme (colors, radii, fonts, animations): `tailwind.config.ts`.
   - Utility for class names: `src/lib/utils.ts` (`cn()`).

7. **UI building blocks**
   - Reusable UI: `src/components/ui/` (shadcn).
   - Shared layout: `src/components/dashboard/DashboardLayout.tsx` and `src/components/landing/*`.

---

## 3. Where to Change What

| What you want to do | Where to change |
|---------------------|-----------------|
| **Add or edit a route** | `src/App.tsx` – add/change `<Route path="..." element={...} />`. |
| **Change landing page structure** | `src/pages/Index.tsx` – add/remove/reorder landing sections. |
| **Edit landing sections** | `src/components/landing/` – e.g. `HeroSection.tsx`, `FeaturesSection.tsx`, etc. |
| **Change dashboard sidebar/top bar** | `src/components/dashboard/DashboardLayout.tsx` – nav items, logo, user block, header. |
| **Add sidebar links per role** | `DashboardLayout.tsx` – object `roleNavItems` (student, faculty, admin, maintenance). |
| **Edit a dashboard page** | `src/pages/dashboard/` – e.g. `StudentDashboard.tsx`, `AdminDashboard.tsx`, `EventRequestPage.tsx`, `MaintenanceReportPage.tsx`. |
| **Change global styles / theme colors** | `src/index.css` (CSS variables) and `tailwind.config.ts` (theme.extend.colors, etc.). |
| **Change app title** | `index.html` – `<title>...</title>`. |
| **Change dev server port** | `vite.config.ts` – `server.port`. |
| **Add shared logic** | `src/hooks/` (new or existing hooks) or `src/lib/` (e.g. `utils.ts` or new files). |
| **Use or customize UI components** | `src/components/ui/` – use as-is or edit the corresponding `.tsx` file. |
| **Add new pages** | Create under `src/pages/` (or `src/pages/dashboard/`), then add route in `App.tsx`. |

---

## 4. Tech Stack (from package.json)

- **Build:** Vite, TypeScript, React 18
- **Routing:** react-router-dom v6
- **Data:** TanStack React Query
- **UI:** Radix-based components (shadcn/ui), Tailwind CSS, Framer Motion, Lucide icons
- **Forms:** react-hook-form, zod, @hookform/resolvers
- **Other:** date-fns, recharts, sonner (toasts), qrcode.react
- **Tests:** Vitest, Testing Library

---

## 5. Quick Commands

- `npm run dev` – start dev server (default port 8080)
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run lint` – run ESLint
- `npm run test` – run tests

Use this as a map: open the files above when you want to change routing, layout, pages, or styling.
