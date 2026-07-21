import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: { environment: "jsdom", setupFiles: ["./tests/setup.ts"], exclude: ["e2e/**", "node_modules/**", "dist/**"], fileParallelism: false, maxWorkers: 1, pool: "threads", css: false, coverage: { reporter: ["text", "html"] } },
});
