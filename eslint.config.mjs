import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// NOTE: We import the flat-config array directly from eslint-config-next's
// "core-web-vitals" subpath export instead of going through
// `compat.extends("next/core-web-vitals", "next/typescript")` via @eslint/eslintrc's
// FlatCompat bridge. As of ESLint 9.x + Next.js 16, the FlatCompat bridge crashes with:
//   TypeError: Converting circular structure to JSON ... closes the circle
// because the legacy config validator can't serialize the self-referencing plugin
// configs (react-hooks, @typescript-eslint) that ship in their modern flat-config form.
// This is a confirmed, currently open upstream bug:
//   https://github.com/eslint/eslint/issues/20237
//   https://github.com/vercel/next.js/issues/85244
// Importing the package's native flat-config export sidesteps FlatCompat entirely and
// gives the same rule set (it already includes "next/typescript").
const eslintConfig = [{ ignores: [".next/**", "node_modules/**", "out/**"] }, ...nextCoreWebVitals];

export default eslintConfig;
