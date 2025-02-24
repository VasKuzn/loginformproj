import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import { Linter } from 'eslint';

/** @type {Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  {
    files: ['src**/*.js'],
    languageOptions: { sourceType: 'script' },
  },

  pluginJs.configs.recommended,

  ...tseslint.configs.recommended,
];
