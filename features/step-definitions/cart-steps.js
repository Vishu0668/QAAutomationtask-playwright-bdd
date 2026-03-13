const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage } = require('../../pages/CartPage');

//  Cart  step 
// Session is already initialised
Given('I am signed in as a standard user', async function () {
  this.inventory = new InventoryPage(this.page);
  await this.page.goto('/inventory.html');

  // Re-login if session expired
  if (!this.page.url().includes('inventory')) {
    const { username, password } = this.credentials.standard;
    await this.page.getByTestId('username').fill(username);
    await this.page.getByTestId('password').fill(password);
    await this.page.getByTestId('login-button').click();
    await this.page.waitForURL('**/inventory.html');
  }

  await this.inventory.assertLoaded(expect);
});
//  Inventory / Add to cart steps 

When('I add {string} to the cart', async function (name) {
  await this.inventory.addProductToCartByName(name, expect);
});

When('I add the products {string} and {string} to the cart', async function (a, b) {
  await this.inventory.addProductToCartByName(a, expect);
  await this.inventory.addProductToCartByName(b, expect);
});

Then('the cart badge should show {int}', async function (n) {
  await expect.poll(async () => await this.inventory.getCartCount()).toBe(n);
});

When('I open the cart', async function () {
  this.cart = new CartPage(this.page);
  await this.inventory.openCart();
  await this.cart.assertLoaded(expect);
});

//  Cart assertion  

Then('I should be on the cart page', async function () {
  await this.cart.assertOnCartPage(expect);
});

Then('I should see the products {string} and {string} in the cart', async function (a, b) {
  const items = await this.cart.snapshotItems();
  const names = items.map(i => i.name);
  expect(names).toContain(a);
  expect(names).toContain(b);
});

Then('the cart should contain a product named {string} with price {string}', async function (name, price) {
  await this.cart.assertProductNameAndPrice(name, price, expect);
});

When('I remove {string} from the cart', async function (name) {
  await this.cart.removeByName(name, expect);
});

Then('{string} should not be in the cart', async function (name) {
  const items = await this.cart.snapshotItems();
  const names = items.map(i => i.name);
  expect(names).not.toContain(name);
});

Then('the cart should be empty', async function () {
  await this.cart.assertEmpty(expect);
});

Then('the cart badge should not be visible', async function () {
  const badge = this.page.locator('.shopping_cart_badge');
  await expect(badge).not.toBeVisible();
});
