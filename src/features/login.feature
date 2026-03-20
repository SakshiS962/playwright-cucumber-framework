Feature: Login functionality

  Scenario: Successful login
    Given user is already logged in
    Then user should be logged in

  Scenario: Invalid login
    Given user is already logged in
    Then error message should be displayed
