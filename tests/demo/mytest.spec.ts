import { test, expect, devices } from "@playwright/test";
import constants from "../../data/constants.json";
import { log } from "../helpers/logger.js";

test("Should load homepage with correct title", async ({ page }) => {
  // 1. Go to home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // 2. Assert if the title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");

  // 3. Assert header text
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test("should do something", { tag: "@smoke" }, async ({ page }, testInfo) => {
  await page.locator("//h1").click();
});

test("should demo locators", async ({ page }, testInfo) => {
  // 1. Launch URL
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  
  // 2. Click on the Make Appointment
  let makeAppmtBtn = page.getByRole("link", { name: "Make Appointment" });
  //console.log(`>>> The type of locator: ${typeof makeAppmtBtn}, The value of the locator is: ${JSON.stringify(makeAppmtBtn)}`);

  await makeAppmtBtn.click();
  await page
    .getByRole("heading", { name: "We Care About Your Health" })
    .click();
   await expect(page.getByText("Please login to make appointment.")).toBeVisible();
});

test("demo config file", async ({ page }, testInfo) => {
 
  console.log(`>> config at runtime:${JSON.stringify(testInfo.config)}`);
});


test("demo fixtures", async ({ page, browserName }, testInfo) => {
 
  console.log(`>> The test runs on ${browserName}`);
});


test.only("demo devices", async ({ page }, testInfo) => {
 
  console.log(`>> the list of devices:  ${Object.keys(devices)}`);
});


test("should demo constant data", async ({ page }, testInfo) => {
 
  console.log(`>> Constantant data: ${JSON.stringify(constants.STATUSCODE)}`);

});

test.only("should demo a click action", async ({ page }, testInfo) => {
  // 1. Launch URL
  // await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // // 2. Click on the Make Appointment
  let ele = page.getByRole("link", { name: "Make-Appointment" });
  // await ele.click();

  /// base page action
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  try {
    await expect(ele).toBeVisible({ timeout: 10_000 }); // Custom timeout: Default - 5 seconds
    await ele.click();
  } catch (error) {
    await log(
      "error",
      `Failed to click element: ${ele.toString()}, original error: ${error}`,
    );
    throw error;
  }
});