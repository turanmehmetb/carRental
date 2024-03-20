const {pathsToModuleNameMapper} = require('ts-jest');
const {compilerOptions} = require('../../tsconfig.base.json'); // Ensure this path correctly points to your tsconfig file

module.exports = {
    displayName: 'api',
    preset: '../../jest.preset.js',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'html'],

    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/../../',
    }),
    coverageDirectory: '../../coverage/apps/api',
};
