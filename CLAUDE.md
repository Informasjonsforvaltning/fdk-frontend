# CLAUDE.md

## Overview

FDK Frontend is an NX monorepo powering [data.norge.no](https://data.norge.no/) - Norway's national data catalog. Uses Next.js 16 (App Router), React 19, TypeScript, MDX, and Sass with CSS Modules.

## Commands

```bash
# Install
corepack enable && yarn

# Development
nx run data-norge:dev                    # Dev server (Turbopack) at localhost:3000
yarn dev                                 # All apps in dev mode

# Build
nx run data-norge:build                  # Build main app
yarn build                               # Build all projects

# Lint & Test
nx run data-norge:lint                   # Lint single project
yarn lint                                # Lint all projects
nx run data-norge:test                   # Test single project
yarn test                                # All unit tests (Jest)

# E2E
nx run data-norge-e2e:e2e                # E2E tests (Playwright)
yarn e2e                                 # All e2e tests
```

## Project Structure

- **apps/data-norge**: Main Next.js app (`src/app/[lang]/` for i18n routing)
- **libs/ui**: Shared React components (60+ components)
- **libs/data-access**: API clients for FDK backend services
- **libs/dictionaries**: i18n with JSON dictionaries (nb/nn/en)
- **libs/types**: Shared TypeScript types
- **libs/utils**: Shared utilities
- **libs/data-norge-e2e**: Playwright e2e tests

## Import Aliases

Defined in `tsconfig.base.json`:

- `@fdk-frontend/ui` → UI components
- `@fdk-frontend/data-access` → Client-side data access
- `@fdk-frontend/data-access/server` → Server-side API clients
- `@fdk-frontend/dictionaries` → i18n functions and types
- `@fdk-frontend/types` → Shared types
- `@fdk-frontend/types/server` → Server-side types
- `@fdk-frontend/utils` → Utility functions
- `@fdk-frontend/utils/server` → Server-side utilities

## i18n Pattern

Routes use `[lang]` dynamic segment. Supported locales: `nb`, `nn`, `en`

```typescript
import { getDictionary, getSafeDictionary } from '@fdk-frontend/dictionaries';

const dictionary = await getDictionary(params.lang, 'common');
const headerDict = getSafeDictionary(dictionary); // For passing to multiple components
```

## Design System

Uses `@digdir/designsystemet-react` and `@fellesdatakatalog/ui`.

## TypeScript Guidelines

Hard rules (do not violate):

1. **Never use `any`** - Model types properly. Prefer generics, unions, or `unknown` + narrowing.
2. **Do not hide type errors** - Avoid `@ts-ignore`, `@ts-nocheck`, broad ESLint disables. If exception required, document _why_ and add removal condition.
3. **No unsafe type assertions** - Avoid `as SomeType` unless at a trusted boundary with justifying comment.
