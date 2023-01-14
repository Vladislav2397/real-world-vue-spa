module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "@typescript-eslint/ban-ts-comment": "off",
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)",
            ],
            env: {
                jest: true,
            },
        },
        {
            files: ["src/**/*.vue"],
            rules: {
                // "constructor-super": "off",
                // "getter-return": "off",
                // "no-const-assign": "off",
                // "no-dupe-args": "off",
                // "no-dupe-class-members": "off",
                // "no-dupe-keys": "off",
                // "no-func-assign": "off",
                // "no-import-assign": "off",
                // "no-new-symbol": "off",
                // "no-obj-calls": "off",
                // "no-redeclare": "off",
                // "no-setter-return": "off",
                // "no-this-before-super": "off",
                "no-undef": "off",
                // "no-unreachable": "off",
                // "no-unsafe-negation": "off",
                // "no-var": "error",
                // "prefer-const": "error",
                // "prefer-rest-params": "error",
                // "prefer-spread": "error",
                // "valid-typeof": "off", // ts(2367)
                "no-unused": "off",
            },
        },
    ],
}
