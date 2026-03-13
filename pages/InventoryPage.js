const { BasePage } = require('./BasePage');
const { inventorySelectors } = require('../ui/selectors');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.container = () => inventorySelectors.container(this.page);
    this.items = () => inventorySelectors.items(this.page);
  }

  async assertLoaded(expect) {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.page).toHaveTitle('Swag Labs');
    await expect(this.container()).toBeVisible();
  }

  async addProductToCartByName(name, expect) {
    const item = this.items().filter({ hasText: name }).first();
    await expect(item).toBeVisible();
    await item.getByRole('button', { name: /add to cart/i }).click();
  }

  async getCartCount() {
    const badge = this.page.locator('.shopping_cart_badge');
    return (await badge.isVisible()) ? parseInt(await badge.textContent(), 10) : 0;
  }

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }
}

module.exports = { InventoryPage };
