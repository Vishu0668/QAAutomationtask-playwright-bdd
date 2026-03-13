const { BasePage } = require('./BasePage');
const { loginSelectors } = require('../ui/selectors');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.username = () => loginSelectors.username(this.page);
    this.password = () => loginSelectors.password(this.page);
    this.loginButton = () => loginSelectors.loginButton(this.page);
    this.error = () => loginSelectors.error(this.page);
  }

  async open() {
    await this.goto('/');
  }

  async login(u, p) {
    await this.username().fill(u ?? '');
    await this.password().fill(p ?? '');
    await this.loginButton().click();
  }

  async assertOnLoginPage(expect) {
    await expect(this.page).toHaveURL('/');
    await expect(this.page).toHaveTitle('Swag Labs');
  }
}

module.exports = { LoginPage };
