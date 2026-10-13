# VersaEmerge

Single-page React site for VersaEmerge, exported from the Figma Make project
[Versaemerge](https://www.figma.com/make/CRyzM4evGEjn52wHVDg0oT/Versaemerge).

Stack: React 18, TypeScript, Vite 6, Tailwind CSS 4, Motion, Lucide icons.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build into dist/
npm run typecheck  # TypeScript check
```

## Where things live

| What | Where |
| --- | --- |
| Entry point | `src/main.tsx` |
| Routing (`/` and `/tours`) | `src/app/App.tsx` |
| Homepage | `src/app/components/VersaEmergePremium.tsx` |
| Tours page | `src/app/components/VersaEmergeTours.tsx` |
| Global styles | `src/styles/` |
| Homepage images | `src/imports/` |
| Tours streaming icons | `public/assets/versaemerge-tours/` |
