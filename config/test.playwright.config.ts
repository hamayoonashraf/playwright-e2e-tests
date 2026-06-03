import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config.ts";
import { EnvConfig } from "../tests/helpers/config-fixtures.ts";
import path from "path";

console.log('--> RUNNING TEST IN TEST ENVIRONMENT 🚀');

export default defineConfig<EnvConfig>({
  ...baseConfig, // loads all existing config from base and we can override or add new config here
  testDir: path.resolve(process.cwd(), "./tests"),

  use: {
    ...baseConfig.use, // loads all existing config from base and we can override or add new config here

    envName: "test",
    appURL: "https://katalon-demo-cura.herokuapp.com/",
    nopCommerceWeb: "https://admin-demo.nopcommerce.com/",
    apiURL: "https://reqres.in/api",
    dbConfig: {
      server: "",
      dbname: "",
      connectionStr: "",
    },
  },
});
