import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function getAbsolutePath(value: string): string {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

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
                        replacement: resolve(__dirname, '../../libs/ui/src/lib/core'),
                    },
                    {
                        find: '@fdk-frontend/data-access/server',
                        replacement: resolve(__dirname, '../../libs/data-access/src/server.ts'),
                    },
                    {
                        find: '@fdk-frontend/data-access',
                        replacement: resolve(__dirname, '../../libs/data-access/src/index.ts'),
                    },
                    {
                        find: '@fdk-frontend/localization',
                        replacement: resolve(__dirname, '../../libs/localization/src/index.ts'),
                    },
                    {
                        find: /^@fdk-frontend\/libs\/(.+)$/,
                        replacement: resolve(__dirname, '../../libs/$1'),
                    },
                    {
                        find: '@fdk-frontend/types/server',
                        replacement: resolve(__dirname, '../../libs/types/src/server.ts'),
                    },
                    {
                        find: '@fdk-frontend/types',
                        replacement: resolve(__dirname, '../../libs/types/src/index.ts'),
                    },
                    {
                        find: /^@fdk-frontend\/ui\/(.+)$/,
                        replacement: resolve(__dirname, '../../libs/ui/src/lib/$1'),
                    },
                    {
                        find: '@fdk-frontend/ui',
                        replacement: resolve(__dirname, '../../libs/ui/src/index.ts'),
                    },
                    {
                        find: '@fdk-frontend/utils/server',
                        replacement: resolve(__dirname, '../../libs/utils/src/server.ts'),
                    },
                    {
                        find: /^@fdk-frontend\/utils\/(.+)$/,
                        replacement: resolve(__dirname, '../../libs/utils/src/lib/$1'),
                    },
                    {
                        find: '@fdk-frontend/utils',
                        replacement: resolve(__dirname, '../../libs/utils/src/index.ts'),
                    },
                    {
                        find: 'next/navigation',
                        replacement: resolve(__dirname, './mocks/next-navigation.ts'),
                    },
                ],
            },
        });
    },
};

export default config;
