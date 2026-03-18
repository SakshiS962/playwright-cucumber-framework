Feature: Login functionality

  Scenario: Successful login
    When user enters valid credentials
    Then user should be logged in

  Scenario: Invalid login
    When user enters invalid credentials
    Then error message should be displayed
