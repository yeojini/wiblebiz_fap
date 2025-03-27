import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    svgr({
      svgrOptions: {
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    env: {
      NEXT_PUBLIC_API_URL: 'http://localhost:3000',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'components/**/*.{ts,tsx}',
        'services/**/*.ts',
        'hooks/**/*.ts',
      ],
      exclude: [
        'app/**/*.{ts,tsx}',
        '**/*.test.{ts,tsx}',
        '**/*.d.ts',
        'node_modules/**',
        'dist/**',
        '**/*.config.{js,ts,mts}',
        '**/types/**',
      ],
      all: true,
    },
  },
});
