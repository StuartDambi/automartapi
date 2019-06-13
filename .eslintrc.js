module.exports = {
    env: {
        browser: true,
        mocha: true,
        es6: true,
    },
    extends: 'airbnb-base',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'no-console': 'off',
        'linebreak-style': ["error", "windows"],
    },
};
