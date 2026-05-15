import { test, expect } from "@playwright/test";

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

test.only("should demo locators", async ({ page }, testInfo) => {
  // 1. Launch URL
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // 2. Click on the Make Appointment
  let makeAppmtBtn = page.getByRole("link", { name: "Make Appointment" });
  //console.log(`>>> The type of locator: ${typeof makeAppmtBtn}, The value of the locator is: ${JSON.stringify(makeAppmtBtn)}`);

  await makeAppmtBtn.click();
  await page
    .getByRole("heading", { name: "We Care About Your Health" })
    .click();
  // await expect(page.getByText("Please login to make")).toBeVisible();
});
