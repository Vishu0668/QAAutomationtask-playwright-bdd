@regression
Feature: Login

  Background:
    Given I am on the SauceDemo login page

  @smoke
  Scenario: Login page loads with correct URL and title
    Then the login page should have the correct URL and title

  @smoke
  Scenario: Standard user can log in successfully
    When I login with valid standard user credentials
    Then I should land on the Inventory page

  @regression
  Scenario: Submitting empty form shows username required error
    When I login with username "" and password ""
    Then I should see an error message containing "Username is required"

  @regression
  Scenario: Submitting without password shows password required error
    When I login with username "standard_user" and password ""
    Then I should see an error message containing "Password is required"

  @regression
  Scenario: Invalid credentials show mismatch error
    When I login with username "invalid_user" and password "wrong_pass"
    Then I should see an error message containing "Username and password do not match"

  @regression
  Scenario: Locked out user sees appropriate error
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see an error message containing "Sorry, this user has been locked out."

  @regression
  Scenario: Whitespace only credentials are rejected
    When I login with username " " and password " "
    Then I should see an error message containing "Username is required"

  @regression
  Scenario: Error message disappears when dismissed
    When I login with username "" and password ""
    Then I should see an error message containing "Username is required"
    When I dismiss the error
    Then the error message should not be visible