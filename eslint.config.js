import nxPlugin from '@nx/eslint-plugin';

export default [
    ...nxPlugin.configs['flat/base'],
    ...nxPlugin.configs['flat/typescript'],
    ...nxPlugin.configs['flat/javascript'],
    ...nxPlugin.configs['flat/react'],
    {
        ignores: ['**/.*', '**/node_modules/*', '**/dist/*', '**/.next/*'],
    },
    {
        plugins: {},
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
                    enforceBuildableLibDependency: true,
                    depConstraints: [
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: ['*'],
                        },
                    ],
                },
            ],
        },
    },
];
