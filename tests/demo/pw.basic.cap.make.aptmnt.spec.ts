import { test, expect } from "@playwright/test";

test.describe(
  "Make Appointment",
  {
    annotation: {
      type: "Story",
      description: "JIRA-1234: Make appointment feature",
    },
  },
  () => {
    test.beforeEach("Login with valid creds", async ({ page }, testInfo) => {
      // 1. launch url and assert title and header
      await page.goto("https://katalon-demo-cura.herokuapp.com/");
      await expect(page).toHaveTitle("CURA Healthcare Service");
      await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

      // 2. click on make appointment
      await page.getByRole("link", { name: "Make Appointment" }).click();
      await expect(page.getByText("Please login to make")).toBeVisible();

      // Success Login
      await page.getByLabel("Username").fill("John Doe");
      await page.getByLabel("Password").fill("ThisIsNotAPassword");
      await page.getByRole("button", { name: "Login" }).click();

      /**
       *
       * Adding a custom screenshot in the middle of the page
       * @TODO: add this as a helper function
       */

      // let fullPageLoginScreenShot = await page.screenshot({ fullPage: true });
      // await testInfo.attach("login page", {
      //   body: fullPageLoginScreenShot,
      //   contentType: "image/png",
      // });

      // Assert a text
      await expect(page.locator("h2")).toContainText("Make Appointment");
    });

    // test goes here
    test("should make an appointment with non-default values", {tag:"@smoke"}, async ({
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
      await expect(page.locator("h2")).toContainText(
        "Appointment Confirmation",
      );
      await expect(
        page.getByRole("link", { name: "Go to Homepage" }),
      ).toBeVisible();
    });
  },
);
