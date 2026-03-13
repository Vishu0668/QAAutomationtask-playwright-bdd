const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { InventoryPage } = require('../../pages/InventoryPage');

//  Login steps 

Given('I am on the SauceDemo login page', async function () {
  this.login = new LoginPage(this.page);
  await this.login.open();
});

Then('the login page should have the correct URL and title', async function () {
  await this.login.assertOnLoginPage(expect);
});

When('I login with valid standard user credentials', async function () {
  const { username, password } = this.credentials.standard;
  await this.login.login(username, password);
});

When('I login with username {string} and password {string}', async function (u, p) {
  await this.login.login(u, p);
});

Then('I should land on the Inventory page', async function () {
  this.inventory = new InventoryPage(this.page);
  await this.inventory.assertLoaded(expect);
});

Then('I should see an error message containing {string}', async function (msg) {
  await expect(this.login.error()).toBeVisible();
  await expect(this.login.error()).toContainText(msg);
});

Then('the error message should be visible', async function () {
  await expect(this.login.error()).toBeVisible();
});

When('I dismiss the error', async function () {
  await this.login.error().locator('.error-button').click();
});

Then('the error message should not be visible', async function () {
  await expect(this.login.error()).not.toBeVisible();
});
