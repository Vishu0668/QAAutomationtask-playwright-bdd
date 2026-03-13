@regression @cart
Feature: Cart

  Background:
    Given I am signed in as a standard user

  @smoke
  Scenario: Add a single product to cart and verify badge
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show 1

  @smoke
  Scenario: Add two products and verify badge count
    When I add the products "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    Then the cart badge should show 2

  @smoke
  Scenario: Navigate to cart page and validate product name and price
    When I add the products "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    And I open the cart
    Then I should be on the cart page
    And the cart should contain a product named "Sauce Labs Backpack" with price "$29.99"
    And the cart should contain a product named "Sauce Labs Bike Light" with price "$9.99"

  @regression
  Scenario: Remove one product and verify cart updates correctly
    When I add the products "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    Then the cart badge should show 2
    When I open the cart
    Then I should see the products "Sauce Labs Backpack" and "Sauce Labs Bike Light" in the cart
    When I remove "Sauce Labs Backpack" from the cart
    Then "Sauce Labs Backpack" should not be in the cart
    And the cart badge should show 1

  @regression
  Scenario: Remove all products and verify cart is empty
    When I add the products "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    And I open the cart
    When I remove "Sauce Labs Backpack" from the cart
    Then "Sauce Labs Backpack" should not be in the cart
    When I remove "Sauce Labs Bike Light" from the cart
    Then "Sauce Labs Bike Light" should not be in the cart
    And the cart should be empty
    And the cart badge should not be visible
