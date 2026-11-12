import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
  {
    // `cn` must come from `@/lib/utils`, which knows the Cosmo theme tokens.
    ignores: ['lib/utils.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        { paths: [{ name: 'cn', message: "Import { cn } from '@/lib/utils' (theme-aware) instead." }] },
      ],
    },
  },
];

export default config;
