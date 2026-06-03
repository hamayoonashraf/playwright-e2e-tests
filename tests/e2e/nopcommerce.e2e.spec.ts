import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger";
import HomePage from "../page-objects/nopcommerce.home.page";

test("login to nop commerce web", async ({ page }, testInfo) => {
  // Env Config
  const envConfig = testInfo.project.use as any;

  // create an page object of the home page

  const homePage = new HomePage(page);

  // login nopCommerceWeb

  await homePage.loginTonopCommerceWeb(
    envConfig.nopCommerceWeb,
    process.env.NOP_COMMERCE_TEST_USERNAME,
    process.env.NOP_COMMERCE_TEST_PASSWORD,
  )
});
