import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts", "**/*.test.tsx"],
    exclude: ["node_modules", ".next"],
    coverage: {
      reporter: ["text", "html"],
      include: ["lib/**/*.ts"],
      exclude: ["lib/**/*.d.ts"]
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, ".")
    }
  }
});
