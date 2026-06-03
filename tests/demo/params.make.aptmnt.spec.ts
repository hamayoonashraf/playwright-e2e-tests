import { test, expect } from "@playwright/test";
import TestData from "../../data/test-data";

//import TestData from "../data/test-data";

const makeApptTestData = TestData.makeAppointmentTestData();

//Access the data

for (const apptData of makeApptTestData) {
  test.describe("Make Appointment", () => {
    test.beforeEach("Login with valid creds", async ({ page }) => {
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

      // Get Login Cookies and set it to global variable
      const loginCookies = await page.context().cookies();
      process.env.LOGIN_COOKIES = JSON.stringify(loginCookies);

      // Assert a text
      await expect(page.locator("h2")).toContainText("Make Appointment");
    });

    // test goes here
    test(`${apptData.testId}: should make an appointment with non-default values`, async ({
      page,
    }) => {

      // access the login cookies
      console.log(`>> login cookies: ${process.env.LOGIN_COOKIES}`);


      //dropdown
      await page
        .getByLabel("Facility")
        .selectOption(apptData.facility);

      //checkbox
      await page
        .getByRole("checkbox", { name: "Apply for hospital readmission" })
        .check();
      // radio button
      await page.getByText(apptData.hcp).click();
      await page.locator("span").click();

      // date field
      await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
      await page.getByRole("textbox", { name: "Visit Date (Required)" }).fill(apptData.visitDt);
      await page.getByRole("textbox", { name: "Visit Date (Required)" }).press("Enter");

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
  });
}
