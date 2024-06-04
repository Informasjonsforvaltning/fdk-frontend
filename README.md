# fdk-frontend

## Dependencies

Make sure you have the following dependencies installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
  - preferred installation method: [nvm](https://github.com/nvm-sh/nvm)
- [Yarn](https://yarnpkg.com/getting-started/install)
- Make sure you have an `.env` file at the root of the project like `.env.example` with the correct values

## Start the application

Run `yarn nx dev <application name>` to start the development server.
Example: `yarn nx dev forms`

## Build for production

Run `yarn nx build forms` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Examples

#### Create a new component

```bash
yarn nx g @nx/next:component my-component --project=ui --export
```

#### Create a new library

```bash
yarn nx g @nx/next:lib my-lib --project=ui --export
```

For more information visit [Nx Next.js plugin](https://nx.dev/nx-api/next)

## Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

## Editing text files

You can find the text files used in the project in the `libs/dictionaries/src/lib/dictionaries` folder.

## Notes

`mail-sender-service` in `forms/data-hunter` cannot be tested in staging and demo. It is only available in production.
