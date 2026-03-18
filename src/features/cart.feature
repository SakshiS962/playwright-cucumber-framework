Feature: Product and Cart functionality

 @smoke @checkout
  Scenario: Add product and checkout
    When user searches for a product
    And user adds product to cart
    And user navigates to checkout
    And user adds new address
    And user selects address
    And user places order
    Then Verify order is placed successfully

  @regression
  Scenario: Add multiple products and checkout
    When user adds multiple products to cart
    And user navigates to checkout
    And user adds new address
    And user selects address
    And user places order
    Then Verify order is placed successfully