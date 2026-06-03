import { test, expect } from "@playwright/test";

test.describe("Make Appointment", () => {
  test.beforeEach("Login with valid creds", async ({ page }) => {
    // 1. launch url and assert title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");





    // 2. click on make appointment
    //await page.getByRole("link", { name: "Make Appointment" }).click();
    //await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
    //await page.getByRole("link", { name: "Make Appointment" }).dblclick();
    //await page.getByRole("link", { name: "Make Appointment" }).click({button:"right"});
    //await page.getByRole("link", { name: "Make Appointment" }).hover();
    await page.getByRole("link", { name: "Make Appointment" }).click({timeout:10_000})


    //await expect(page.getByText("Please login to make")).toBeVisible();
    await expect(page.getByText("Please login to make")).toBeVisible();

    // Success Login
    //await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Username").clear();
    //await page.getByLabel("Username").fill("John Doe");
    
    //Press sequentiatially to type slow
    await page.getByLabel("Username").pressSequentially("John Doe", {delay:300});
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  // test goes here
  test("should make an appointment with non-default values", async ({
    page,
  }) => {
    
    
    //dropdown
    
       // assert the default option
    await expect(page.getByLabel("Facility")).toHaveValue('Tokyo CURA Healthcare Center');
    await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center");
    
    
    // select with label or index
    await page.getByLabel("Facility").selectOption({label:"Seoul CURA Healthcare Center"});
    await page.getByLabel("Facility").selectOption({index:0});

    // assert the count
    let drpdwnOptionsEle = page.getByLabel("Facility").locator("option");
    await expect(drpdwnOptionsEle).toHaveCount(3);

    //get all dropdown values
    let listOfDrpdwnElems = await page.getByLabel("Facility").all();

    // for.. of loop
    let listOfOptions = []

    for(let ele of listOfDrpdwnElems){

      let eleTxt = await ele.textContent()
      if (eleTxt){

        listOfOptions.push(eleTxt)
      }

    }

    console.log(`>> list of options: ${listOfOptions}`);
   
   
    //checkbox
    //await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).check();
    await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).check();
    await page.getByRole("checkbox", { name: "Apply for hospital readmission" }).uncheck();
    
    
      // radio button

      // assert the default option - to be checked/ unchecked
    await expect(page.getByText("Medicare")).toBeChecked();

    await page.getByText("Medicaid").click();

await expect(page.getByText("Medicare")).not.toBeChecked();

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
