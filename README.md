# SauceDemo Automation Framework

Playwright + Cucumber BDD + Allure — JavaScript

> https://www.saucedemo.com




## Installation
```
npm install
npm run install:playwright
```

Copy`.env` and update if needed:
```
BASE_URL=https://www.saucedemo.com
HEADLESS=true
STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
```



## Running Tests
bash
npm run bdd              # run all tests
npm run bdd:headed       # run with browser visible
npm run bdd:smoke        # smoke tests only
npm run bdd:regression   # regression tests only




## Allure Report
bash
npm run allure:generate  # generate report
npm run allure:open      # open in browser
npm run allure:serve     # generate + open in one step




## Structure

features/
  login.feature
  cart.feature
  step-definitions/
    steps.js          # login steps
    cart-steps.js     # cart steps
  support/
    world.js          # browser setup + session reuse
    hooks.js          # before/after + screenshot on fail
pages/
  BasePage.js
  LoginPage.js
  InventoryPage.js
  CartPage.js
ui/
  selectors.js        # all locators in one place
scripts/              # test and allure runner scripts
.env                  # local config 