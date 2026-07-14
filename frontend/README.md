# Organizational Knowledge Gap Intelligence Platform

Welcome to the frontend repository for the OrgKnow Platform! This repository contains the React/Vite SPA used by Employees, Managers, HR, and Admins to track, analyze, and close knowledge gaps across the organization.

## Architecture Decisions
- **Vite**: Chosen over CRA or Webpack for blazing-fast HMR and minimal configuration out of the box. We are heavily utilizing `terser` and `esbuild` to lock down production builds and prevent source map leaks.
- **Framer Motion**: We rely heavily on this for our 21st.dev-inspired fluid animations, stagger lists, and scroll-linked parallax effects. Keep an eye on performance when adding new layout components.
- **Recharts**: For gap analytics and heatmap visualizations.

## Setup Instructions
1. `npm install`
2. `npm run dev` (Runs locally on `http://localhost:5173`)
3. `npm run build` (For strict production testing. NOTE: React DevTools are disabled in the compiled build for security reasons).

## Developer Notes (TODO)
- **API Integration**: Currently, the platform relies heavily on context-injected mock data. We need to hook up the `AuthContext` and `Search` components to the real REST endpoints once the backend team finishes the `v1/api/search` and `v1/api/auth` routes.
- **Rate Limiting**: I've implemented a local `useDebounce` hook to protect the API from spam, and added a 30s lockout mechanism to the login page for brute-force deterrence. We still need server-side rate-limiting applied.

---
*Maintained by Vineet & The OrgKnow Team*
