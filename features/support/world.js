const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { chromium, selectors } = require('playwright');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const SESSION_FILE = path.resolve(__dirname, '../../.session.json');

class PlaywrightWorld extends World {
  constructor(options) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
    this.baseURL = process.env.BASE_URL || 'https://www.saucedemo.com';
    this.headless = (process.env.HEADLESS || 'true').toLowerCase() === 'true';
    this.credentials = {
      standard: {
        username: process.env.STANDARD_USER || 'standard_user',
        password: process.env.STANDARD_PASSWORD || 'secret_sauce'
      }
    };
  }

  async init() {
    selectors.setTestIdAttribute('data-test');
    this.browser = await chromium.launch({ headless: this.headless });
    this.context = await this.browser.newContext({ baseURL: this.baseURL });
    this.page = await this.context.newPage();
  }

  // Reuse saved session (cookies + localStorage)
  // Falls back to fresh login and saves the session for next time
  async initWithSession() {
    selectors.setTestIdAttribute('data-test');
    this.browser = await chromium.launch({ headless: this.headless });

    if (fs.existsSync(SESSION_FILE)) {
      // Reuse saved session
      const storageState = JSON.parse(fs.readFileSync(SESSION_FILE, 'utf8'));
      this.context = await this.browser.newContext({
        baseURL: this.baseURL,
        storageState
      });
      this.page = await this.context.newPage();
    } else {
      // Fresh login — save session afterwards
      this.context = await this.browser.newContext({ baseURL: this.baseURL });
      this.page = await this.context.newPage();
      await this.page.goto('/');
      await this.page.getByTestId('username').fill(this.credentials.standard.username);
      await this.page.getByTestId('password').fill(this.credentials.standard.password);
      await this.page.getByTestId('login-button').click();
      await this.page.waitForURL('**/inventory.html');
      // Save session to file
      const storageState = await this.context.storageState();
      fs.writeFileSync(SESSION_FILE, JSON.stringify(storageState));
    }
  }

  async close() {
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(PlaywrightWorld);
