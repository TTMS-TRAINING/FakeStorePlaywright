Feature: Account Page Login

  Scenario: Login with correct email
    Given I am on the account login Page
    When I login with correct email credentials
    Then I should see the dashboard welcome message
