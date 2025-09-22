import type { StorybookConfig } from '@storybook/react-webpack5';
import * as path from 'path';

const config: StorybookConfig = {
    stories: [
        '../src/app/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
        '../../libs/ui/src/**/*.stories.@(js|jsx|ts|tsx)',
        '../../apps/data-norge/src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@nx/react/plugins/storybook'],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    webpackFinal(baseConfig) {
        baseConfig.resolve = {
            ...(baseConfig.resolve ?? {}),
            alias: {
                ...(baseConfig.resolve?.alias ?? {}),
                '@fdk-frontend/ui/core': path.resolve(__dirname, '../../libs/ui/src/lib/core'),
            },
        };
        return baseConfig;
    },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
