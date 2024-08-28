Feature: Account Page Login

  Scenario: Login with correct email
    Given I am on the account login page
    When I login with correct email credentials
    Then I should see the dashboard welcome message

  Scenario: Login with wrong email
    Given I am on the account login page
    When I login with incorrect email credentials
    Then I should see an error message for incorrect email login

  Scenario: Login with not registered email
    Given I am on the account login page
    When I try to login with a non-registered email
    Then I should see an error message for non-registered email

  Scenario: Login with correct username
    Given I am on the account login page
    When I login with correct username credentials
    Then I should see the dashboard welcome message

  Scenario: Login with wrong username
    Given I am on the account login page
    When I login with incorrect username credentials
    Then I should see an error message for incorrect username login

  Scenario: Login with not registered username
    Given I am on the account login page
    When I try to login with a non-registered username
    Then I should see an error message for non-registered username