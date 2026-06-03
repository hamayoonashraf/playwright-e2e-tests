import { test, expect } from "@playwright/test";
import {log} from "../helpers/logger";

test.describe("Make Appointment", () => {
  test.beforeEach("Login with valid creds", async ({ page }, testInfo) => {
    // 1. launch url and assert title and header
    
    // get the URL from config file
    const envConfig =testInfo.project.use as any; // Type assertion to access custom properties
    
    
    
    // custom logs 
    await log("info", `Launching the web app in: ${envConfig.envName}`);


    await page.goto(envConfig.appURL);

    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    // 2. click on make appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();

    // Success Login
    await page.getByLabel("Username").fill(process.env.TEST_USER_NAME);
    await page.getByLabel("Password").fill(process.env.TEST_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    // Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");

    await log("info", "The is successfull");
    await log("error", "The page is not loaded");

  });

  // test goes here
  test("should make an appointment with non-default values", async ({
    page,
  }) => {
    //dropdown
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");

    //checkbox
    await page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();
    // radio button
    await page.getByText("Medicaid").click();
    await page.locator("span").click();

    // date field
    await page.getByRole("cell", { name: "13" }).click();
    
    // comment multiline input box
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("This is multiline comment captured by playwright");
    //button
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(
      page.getByRole("link", { name: "Go to Homepage" }),
    ).toBeVisible();
  });
});
