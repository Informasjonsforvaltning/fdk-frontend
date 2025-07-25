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
nx run data-norge:dev
```

Go to http://localhost:3000
