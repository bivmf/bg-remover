import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: 1,
  use: { baseURL: "http://localhost:3000", trace: "on-first-retry", launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROME_PATH }, ...devices["Desktop Chrome"] },
  webServer: { command: "npm run dev", url: "http://localhost:3000/software/background-remover", reuseExistingServer: true, timeout: 180_000 },
});
