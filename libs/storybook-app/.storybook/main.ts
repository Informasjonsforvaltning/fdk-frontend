import type { StorybookConfig } from '@storybook/nextjs';
import * as path from 'path';

const config: StorybookConfig = {
    stories: ['../../**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    webpack(baseConfig) {
        baseConfig.resolve = {
            ...(baseConfig.resolve ?? {}),
            alias: {
                ...(baseConfig.resolve?.alias ?? {}),
                '@opentelemetry/api': 'next/dist/compiled/@opentelemetry/api',
                '@fdk-frontend/ui/core': path.resolve(__dirname, '../../ui/src/lib/core'),
            },
        };
        return baseConfig;
    },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
