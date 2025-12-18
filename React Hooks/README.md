# React + Vite

React Hooks Mastery - Walkthrough
This application demonstrates advanced usage of standard React Hooks.

Getting Started
Run the development server:
npm run dev
Open your browser (usually http://localhost:5173).
Features
Interactive Dashboard: Navigate through all hooks via the sidebar.
Advanced Examples: Each hook page goes beyond the basics.
useState: Functional updates, complex state.
useEffect: Race condition handling, cleanup.
useContext: Performance optimization (context splitting).
Concurrent Hooks: useTransition, useDeferredValue demo with heavy lists.
CSS-in-JS: useInsertionEffect.
External Stores: useSyncExternalStore.
Key Files
App.jsx
: Main routing configuration.
Layout.jsx
: Sidebar and layout structure.
src/examples/
: Individual hook implementations.
Verification
The project has been verified with:

npm run lint: Passed (ESLint checks).
npm run build: Passed (Vite build).

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
