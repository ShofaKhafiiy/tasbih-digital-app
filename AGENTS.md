This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Project Architecture & Coding Rules (MANDATORY)

Before creating, editing, or refactoring any file in `src/`, you **MUST** read `ARCHITECTURE.md` and follow every rule below strictly. Do **NOT** vibecode quick hacks that mix layers or bypass these rules.

### 1. Strict Layering (Separation of Concerns & Dependency Direction)
- Follow one-way dependencies:
  `src/app/` -> `src/components/` + `src/hooks/` + `src/context/` -> `src/services/` -> `src/utils/` + `src/data/` + `src/types/` + `src/constants/` + `src/styles/`.
- **NEVER** call `fetch()`, `AsyncStorage`, or `expo-notifications` directly inside `src/app/` or `src/components/`. Wrap external I/O in `src/services/` and expose state/effects via `src/hooks/` or `src/context/`.
- **NEVER** put React hooks, UI components, or side effects inside `src/utils/` (pure functions only).
- **NEVER** import UI components or React Context inside `src/services/`.
- **ALWAYS** route `AsyncStorage` reads/writes through `getStorageJson` and `setStorageJson` in `src/services/storageService.ts` with a `sanitize` validator.

### 2. Modularity, Naming & Contracts (SRP, POLA, Explicit Types)
- Keep files focused on a single responsibility. Split screen logic into `src/utils/` (pure logic), `src/hooks/` (state/effects), and `src/components/<feature>/` (UI).
- Follow exact naming conventions:
  - Hooks: `use...ts` in `src/hooks/`
  - Services: `...Service.ts` in `src/services/`
  - Contexts: `...Context.tsx` in `src/context/`
- Define shared domain interfaces/types in `src/types/` and re-export from `src/types/index.ts`. **NEVER** use `any`.
- Put static app datasets in `src/data/`.

### 3. Configuration & Styling Discipline
- **NEVER** hardcode storage keys, limits, debounce/delay durations, API URLs, default locations, or notification tags inside screens, hooks, contexts, or services. Put them in `src/constants/config.ts` (`STORAGE_KEYS`, `SESSION_CONFIG`, `PRAYER_CONFIG`).
- Use design tokens from `src/constants/` and `useAppStyles()` from `src/styles/`.
- Add new component styles to the matching feature file in `src/styles/components/<feature>.ts` (`home.ts`, `tasbih.ts`, `navigation.ts`, `screens.ts`) and aggregate them in `src/styles/components.ts`. **NEVER** create a single bloated stylesheet file.

### 4. Fail Fast, Defensive Checks & Explicit Logging
- Validate external API responses and parsed storage data before using them.
- **NEVER** write empty `catch {}` or silent `.catch(() => undefined)` blocks. Every `catch` **MUST** log with a clear module prefix:
  `console.error("[ModuleName.functionName]", error)` (or `console.warn` for non-fatal issues).

### 5. Mandatory JSDoc Standard
- Every `.ts` and `.tsx` file under `src/` **MUST** start with a file-level JSDoc header in Indonesian:
  ```ts
  /**
   * @file Ringkasan singkat tanggung jawab file ini.
   * @layer <NamaLayer>
   */
  ```
- Every exported component, hook, context provider, service function, utility function, constant group, and domain type **MUST** have a concise Indonesian JSDoc comment (including `@param`, `@returns`, `@throws` where applicable).

### 6. Mandatory Verification Gate
- Before declaring any task complete, run BOTH `npx tsc --noEmit` and `npm run lint` (`expo lint`) and verify **0 errors**.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md


## Active Sprint & Team Workflow (`sprint/`)

- Before starting feature work for a practicum module, **ALWAYS** check `sprint/README.md` to see which module sprint is currently **ACTIVE (`[ ]`)** vs completed (`[x]`).
- Currently, the active sprint is **`sprint/pembagian-modul-4.md`** (paired with `sprint/sprint-modul-4.md`). Future modules will follow the same naming pattern (`sprint/sprint-modul-<N>.md` and `sprint/pembagian-modul-<N>.md`).
- When the user begins or asks about the active sprint, read the active `sprint/pembagian-modul-<N>.md` and **ask the user first** whether they want to activate the mentor skill `.agents/skills/mobile-mental-mentor/SKILL.md` for **Anggota A** or **Anggota B**, as noted in that file.
