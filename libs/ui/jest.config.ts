/* eslint-disable */
module.exports = {
    displayName: 'ui',
    preset: './jest.preset.js',
    coverageDirectory: '../../coverage/libs/ui',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/../../__mocks__/fileMock.js',
        '\\.module.css$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['./jest.setup.tsx'],
};
