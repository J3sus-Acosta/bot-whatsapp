module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,  // ← Habilita soporte para Node.js
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module", // O "script" si no usas `import/export`
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off"
  }
};

