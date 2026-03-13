const { BasePage } = require('./BasePage');
const { cartSelectors } = require('../ui/selectors');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.list = () => cartSelectors.list(this.page);
    this._items = () => cartSelectors.items(this.page);
  }

  async assertLoaded(expect) {
    await expect(this.list()).toBeVisible();
  }

  async assertOnCartPage(expect) {
    await expect(this.page).toHaveURL(/.*cart.html/);
    await expect(this.list()).toBeVisible();
  }

  async snapshotItems() {
    const n = await this._items().count();
    const res = [];
    for (let i = 0; i < n; i++) {
      const it = this._items().nth(i);
      const name = (await cartSelectors.itemName(it).textContent()).trim();
      const priceText = (await cartSelectors.itemPrice(it).textContent()).trim();
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
      res.push({ name, price, priceText });
    }
    return res;
  }

  async assertProductNameAndPrice(name, expectedPrice, expect) {
    const item = this._items().filter({ hasText: name }).first();
    await expect(item).toBeVisible();
    const priceLocator = cartSelectors.itemPrice(item);
    await expect(priceLocator).toHaveText(expectedPrice);
  }

  async assertEmpty(expect) {
    await expect(this._items()).toHaveCount(0);
  }

  async removeByName(name, expect) {
    const it = this._items().filter({ hasText: name }).first();
    await expect(it).toBeVisible();
    await it.getByRole('button', { name: /remove/i }).click();
  }
}

module.exports = { CartPage };
