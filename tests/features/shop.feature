@shop
Feature: Shop Page

  Scenario: Check redirect to shop "<category>" category
    Given Go to Shop page
    When Click on "<category>"
    Then Should be rediredt to "<url>"
    Examples:
      | category       | url                                                            |
      | Windsurfing    | https://fakestore.testelka.pl/product-category/windsurfing/    |
      | Wspinaczka     | https://fakestore.testelka.pl/product-category/wspinaczka/     |
      | Yoga i pilates | https://fakestore.testelka.pl/product-category/yoga-i-pilates/ |
      | Żeglarstwo     | https://fakestore.testelka.pl/product-category/zeglarstwo/     |
