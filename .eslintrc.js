module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "next/core-web-vitals",
  ],
  rules: {
    // Regras TypeScript
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

    // Regras gerais
    "no-console": "warn",
    "no-debugger": "error",
    "prefer-const": "warn",

    // Regras React (se estiver usando)
    "react/react-in-jsx-scope": "off", // Next.js já cuida disso
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
