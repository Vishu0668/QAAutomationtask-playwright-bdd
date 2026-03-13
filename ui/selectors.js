const loginSelectors = {
  username: (page) => page.getByTestId('username'),
  password: (page) => page.getByTestId('password'),
  loginButton: (page) => page.getByTestId('login-button'),
  error: (page) => page.getByTestId('error'),
};

const inventorySelectors = {
  // Use data-test attribute directly to avoid strict mode violation with #inventory_container
  container: (page) => page.getByTestId('inventory-container'),
  items: (page) => page.locator('.inventory_item'),
};

const cartSelectors = {
  list: (page) => page.locator('.cart_list'),
  items: (page) => page.locator('.cart_item'),
  itemName: (item) => item.locator('.inventory_item_name'),
  itemPrice: (item) => item.locator('.inventory_item_price'),
};

module.exports = { loginSelectors, inventorySelectors, cartSelectors };
