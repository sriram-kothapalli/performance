import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 0,
  workers:2,
  fullyParallel: true,
  projects: [
    {
      name: 'chromium',
      use: {
        testDir: './tests',
        contextOptions: { ignoreHTTPSErrors: true },
        viewport: { width: 1366, height: 700 },
        browserName: 'chromium',
        launchOptions: { headless: false },
        trace: 'off',
      },
    },
  ],
});
