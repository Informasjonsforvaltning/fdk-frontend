import playwrightPlugin from 'eslint-plugin-playwright';
import baseConfig from '../../eslint.config.js';

export default [
    ...baseConfig,
    playwrightPlugin.configs['flat/recommended'],
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {},
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {},
    },
    {
        files: ['**/*.js', '**/*.jsx'],
        rules: {},
    },
];
