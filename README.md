# FDK Frontend

FDK Frontend is a monorepo for the frontend of the Felles datakatalog (FDK) also known as data.norge.no and other 
related projects. It contains several applications and libraries that are used to build the frontend of the FDK. The monorepo is
built using [Nx](https://nx.dev/) and contains several applications and libraries. The applications are built using
[Next.js](https://nextjs.org/) and the libraries are built using [React](https://reactjs.org/).

## Getting started
This section describes how to get started with the FDK Frontend monorepo. It includes instructions for setting up the
development environment, running the applications, and building the applications for production. 

### Prerequisites
- [Node.js](https://nodejs.org/en/download/) >=20.11.1
- [yarn](https://yarnpkg.com/getting-started/install) >=1.22.19
- [git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Nx](https://nx.dev/getting-started/installation) >=15.10.0

### Running locally

Clone the repository:

```bash
git clone https://github.com/Informasjonsforvaltning/fdk-frontend.git --recurse-submodules
cd fdk-frontend
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
