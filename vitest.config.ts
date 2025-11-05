/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    globals: true,
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html'], //lcov
      include: ['src/**/*.{ts,tsx}'],
      // Exclude specific files and folders from coverage report
      exclude: [
        '**/*.js',
        '**/*.config.ts',
        '**/*.stories.tsx',
        '**/*.d.ts', // Exclude all TypeScript declaration files
        '**/types/**', // Exclude a specific directory for custom types
        '**/constants/**', // Exclude a specific directory for constant files
        '**/config/**', // Exclude a specific directory for constant files
      ],
      thresholds: {
        statements: 90,
        branches: 87,
        functions: 90,
        lines: 90,
      },
    },
  },
});
