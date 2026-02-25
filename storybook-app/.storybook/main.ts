import { fileURLToPath } from 'node:url';
import path from 'path';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getAbsolutePath(value: string): string {
    return path.dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

// Resolve from workspace root (storybook runs with cwd = storybook-app)
const root = path.resolve(process.cwd(), '..');

const config: StorybookConfig = {
    stories: [
        '../src/app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
        '../../libs/ui/src/**/*.stories.@(js|jsx|ts|tsx)',
        '../../apps/data-norge/src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [getAbsolutePath('@storybook/addon-docs')],
    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {},
    },
    async viteFinal(config) {
        return mergeConfig(config, {
            define: {
                'process.env': '{}',
                'process.platform': JSON.stringify('browser'),
                'process.version': JSON.stringify(''),
            },
            optimizeDeps: {
                include: ['react', 'react-dom', 'react/jsx-runtime', 'react-markdown'],
                esbuildOptions: {
                    // Handle circular dependencies
                    legalComments: 'none',
                    jsx: 'automatic',
                },
            },
            esbuild: {
                jsx: 'automatic',
                jsxImportSource: 'react',
            },
            build: {
                commonjsOptions: {
                    // Handle circular dependencies in CommonJS modules
                    transformMixedEsModules: true,
                },
            },
            resolve: {
                alias: [
                    {
                        find: '@fdk-frontend/ui/core',
                        replacement: path.join(root, 'libs/ui/src/lib/core'),
                    },
                    {
                        find: '@fdk-frontend/data-access/server',
                        replacement: path.join(root, 'libs/data-access/src/server.ts'),
                    },
                    {
                        find: '@fdk-frontend/data-access',
                        replacement: path.join(root, 'libs/data-access/src/index.ts'),
                    },
                    {
                        find: '@fdk-frontend/localization',
                        replacement: path.join(root, 'libs/localization/src/index.ts'),
                    },
                    {
                        find: /^@fdk-frontend\/libs\/(.+)$/,
                        replacement: path.join(root, 'libs/$1'),
                    },
                    {
                        find: '@fdk-frontend/types/server',
                        replacement: path.join(root, 'libs/types/src/server.ts'),
                    },
                    {
                        find: '@fdk-frontend/types',
                        replacement: path.join(root, 'libs/types/src/index.ts'),
                    },
                    {
                        find: /^@fdk-frontend\/ui\/(.+)$/,
                        replacement: path.join(root, 'libs/ui/src/lib/$1'),
                    },
                    {
                        find: '@fdk-frontend/ui',
                        replacement: path.join(root, 'libs/ui/src/index.ts'),
                    },
                    {
                        find: '@fdk-frontend/utils/server',
                        replacement: path.join(root, 'libs/utils/src/server.ts'),
                    },
                    {
                        find: /^@fdk-frontend\/utils\/(.+)$/,
                        replacement: path.join(root, 'libs/utils/src/lib/$1'),
                    },
                    {
                        find: '@fdk-frontend/utils',
                        replacement: path.join(root, 'libs/utils/src/index.ts'),
                    },
                    {
                        find: 'next/navigation',
                        replacement: path.join(process.cwd(), '.storybook', 'mocks', 'next-navigation.ts'),
                    },
                ],
            },
        });
    },
};

export default config;
