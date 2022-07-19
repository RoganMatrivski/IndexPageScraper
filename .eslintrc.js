module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:prettier/recommended", // Make sure this is always the last element in the array.
    ],
    plugins: ["simple-import-sort", "prettier"],
    rules: {
        "prettier/prettier": [1, {}, { usePrettierrc: true }],
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "no-unused-vars": 1,
    },
};
