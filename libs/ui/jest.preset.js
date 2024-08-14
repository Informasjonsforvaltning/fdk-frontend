const nxPreset = require('@nx/jest/preset').default;

module.exports = {
    ...nxPreset,
    moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'html'],
    transform: {
        '^.+\\.(tsx?|js|html)$': [
            'ts-jest',
            {
                tsconfig: './tsconfig.json',
            },
        ],
    },
};
