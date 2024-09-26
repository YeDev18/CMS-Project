import tailwind from 'eslint-plugin-tailwindcss';
import globals from 'globals';
// import { default as ts, default as tseslint } from 'typescript-eslint';

export default [
  ...tailwind.configs['flat/recommended'],
  {
    files: ['**/*.{js, mjs,cjs,ts, tsx, jsx}'],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  // ...tseslint.configs.recommended,
  // ...ts.configs.recommended,
  ...tailwind.configs['flat/recommended'],
];

// export default [
//  ...tailwind.configs["flat/recommended"],
//   {files: ["**/*.{js,mjs,cjs,ts}"]},
//   {languageOptions: { globals: globals.browser }},
//   ...tseslint.configs.recommended,
//    ...ts.configs.recommended,
//   ...tailwind.configs["flat/recommended"],
// ];
