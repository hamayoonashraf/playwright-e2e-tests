import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config.ts";
import { EnvConfig } from "../tests/helpers/config-fixtures.ts";
import path from "path";

console.log('--> RUNNING TEST IN DEV ENVIRONMENT 🚀');

export default defineConfig<EnvConfig>({
  ...baseConfig, // loads all existing config from base and we can override or add new config here
  testDir: path.resolve(process.cwd(), "./tests"),

  use: {
    ...baseConfig.use, // loads all existing config from base and we can override or add new config here

    envName: "dev",
    // API base URL for REST tests. Prefer setting via environment variable `API_URL`.
    apiURL: process.env.API_URL ?? "https://reqres.in/api",
    appURL: "https://www.google.com",
    dbConfig: {
      server: "",
      dbname: "",
      connectionStr: "",
    },
  },
});
