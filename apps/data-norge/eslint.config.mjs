import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import baseConfig from '../../eslint.config.mjs';

const compat = new FlatCompat({
    baseDirectory: dirname(fileURLToPath(import.meta.url)),
    recommendedConfig: js.configs.recommended,
});

export default [
    {
        ignores: ['**/dist'],
    },
    ...baseConfig,
    ...compat.extends('plugin:@nx/react-typescript', 'next', 'next/core-web-vitals'),
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@next/next/no-html-link-for-pages': ['error', 'apps/docs/pages'],
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        // Override or add rules here
        rules: {},
    },
    {
        files: ['**/*.js', '**/*.jsx'],
        // Override or add rules here
        rules: {},
    },
    ...compat
        .config({
            env: {
                jest: true,
            },
        })
        .map((config) => ({
            ...config,
            files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
            rules: {
                ...config.rules,
            },
        })),
    {
        ignores: ['.next/**/*', 'next-env.d.ts'],
    },
];
