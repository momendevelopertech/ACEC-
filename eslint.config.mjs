import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  {
    ignores: ["**/.next/**", "**/out/**", "**/build/**", "**/next-env.d.ts"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    ...(await import("eslint-config-next/core-web-vitals.js").then((m) => m.default || m)),
    ...(await import("eslint-config-next/typescript.js").then((m) => m.default || m)),
  },
]);

export default eslintConfig;
