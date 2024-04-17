# fdk-frontend

## Dependencies

Make sure you have the following dependencies installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
  - preferred installation method: [nvm](https://github.com/nvm-sh/nvm)
- [Yarn](https://yarnpkg.com/getting-started/install)
- Make sure you have an `.env` file at the root of the project like `.env.example` with the correct values

## Start the application

Run `yarn nx dev contact-form` to start the development server. Happy coding!

## Build for production

Run `yarn nx build contact-form` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

### Examples
#### create a new component
```bash
yarn nx g component my-component --project=ui --export
```
#### create a new library
```bash
yarn nx g lib my-lib --project=ui --export
```

## Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)
