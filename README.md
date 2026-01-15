# FDK Frontend

Monorepo powering the web frontend for [data.norge.no](https://data.norge.no/). Built with [NX](https://nx.dev/), it includes the main Next.js web application, resuable React UI components, a Storybook component browser, and other related libraries.

For a broader understanding of the system’s context, refer to the [architecture documentation](https://github.com/Informasjonsforvaltning/architecture-documentation) wiki. For more specific
context on this application, see the [Portal](https://github.com/Informasjonsforvaltning/architecture-documentation/wiki/Architecture-documentation#portal) subsystem section.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) >=20.11.1
- [yarn](https://yarnpkg.com/getting-started/install) >=1.22.19
- [Nx](https://nx.dev/getting-started/installation) >=15.10.0

### Running locally

Clone the repository:

```bash
git clone https://github.com/Informasjonsforvaltning/fdk-frontend.git --recurse-submodules
cd fdk-frontend
```

Create .env.local from .env.example

```bash
cp .env.example .env.local
```

Install dependencies:

```bash
corepack enable
yarn
```

Start the development server for data-norge app:

```bash
yarn nx run data-norge:dev
```

Go to http://localhost:3000

### Build

```bash
nx run data-norge:build
```

### Docker

Build the image:

```bash
docker build -f apps/data-norge/Dockerfile -t fdk-frontend .
```

Run the container:

```bash
docker run -p 8080:8080 fdk-frontend
```

## Troubleshooting

### Frontpage Hanging/Performance Issues

If the frontpage is hanging or taking an extremely long time to load (100+ seconds), this is likely due to shared dictionary reference issues between components.

#### Symptoms:

- Frontpage loads very slowly (100+ seconds) or hangs completely
- Individual components (Header, Footer) work fine when rendered alone
- About page and other pages load normally
- Console shows no obvious errors
- Server compiles successfully but requests timeout

#### Root Cause:

When multiple components (Header, Footer, CatalogsBanner) share the same dictionary object, it can cause reference conflicts or mutations that lead to performance issues or hanging.

#### Solution:

Use the `getSafeDictionary()` utility function to create isolated dictionary copies for each component:

```typescript
import { getDictionary, getSafeDictionary } from '@fdk-frontend/dictionaries';

// ❌ Problematic - shared reference
const commonDictionary = await getDictionary(params.lang, 'common');
<Header dictionary={commonDictionary} />
<Footer dictionary={commonDictionary} />

// ✅ Fixed - isolated copies
const commonDictionary = await getDictionary(params.lang, 'common');
const headerDictionary = getSafeDictionary(commonDictionary);
const footerDictionary = getSafeDictionary(commonDictionary);
<Header dictionary={headerDictionary} />
<Footer dictionary={footerDictionary} />
```

#### Alternative Solutions:

- Use `JSON.parse(JSON.stringify(dictionary))` for deep cloning
- Use `structuredClone(dictionary)` for more robust cloning
- Use shallow copy `{ ...dictionary }` if only first-level properties are accessed

#### Prevention:

Always create separate dictionary instances when passing the same dictionary to multiple components to avoid shared reference issues.
