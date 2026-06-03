import { test, expect } from "@playwright/test";

/**
 * Senarios
 * 1. login as standard user
 * 2. get a list of products with it's prices
 * 3. Assert that all product have non-zero dollar values
 *
 */

test.describe("Inventory feature", () => {
  test.beforeEach("Login with valid creds", async ({ page }) => {
    // launch the URL
    await page.goto("https://www.saucedemo.com/");

    //login
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    // assert to verify login
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/.*\/inventory/);
  });

  test("should confirm all prices are non-zero values", async ({ page }) => {
    // get a list of products
    let productElms = page.locator(".inventory_item");
    await expect(productElms).toHaveCount(6);

    // get product name and prices

    let totalProducts = await productElms.count();

    let priceArr = [];
    for (let i = 0; i < totalProducts; i++) {
      let eleNode = productElms.nth(i);

      // product name
      let productName = await eleNode
        .locator(".inventory_item_name")
        .innerText();

      // price
      let price = await eleNode.locator(".inventory_item_price").innerText();

      // print the results
      console.log(`Product: ${productName}, price: ${price}`);

      priceArr.push(price);
    }

    console.log(`Original price array: ${priceArr}`);

    /**
     *
     * Original price array: $29.99,$9.99,$15.99,$49.99,$7.99,$15.99
     * 1. replace all dollar with empty string
     * 2. compare the price which should be > 0
     */

    //1. replace all dollar with empty string

    let priceArrNum = priceArr.map((item) => parseFloat(item.replace("$", "")));
    console.log(`modified array: ${priceArrNum}`);

    let priceArrWithInvalidVals = priceArrNum.filter((item) => item <= 0);

    if (priceArrWithInvalidVals.length > 0) {
      console.log(`ERROR: Zero price values found, ${priceArrWithInvalidVals}`);
    } else {
      console.log(`INFO: All prices are non-zero values`);
    }

    expect(priceArrWithInvalidVals).toHaveLength(0);
  });
});
