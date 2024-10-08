@shop
Feature: Shop Page

  Scenario: Check redirect to shop "<category>" category
    Given Go to Shop page
    When Click on "<category>"
    Then Should be rediredt to "<url>"
    Then Category title "<categoryTitle>" should be displayed
    Examples:
      | category       | url                                                            | categoryTitle  |
      | Windsurfing    | https://fakestore.testelka.pl/product-category/windsurfing/    | Windsurfing    |
      | Wspinaczka     | https://fakestore.testelka.pl/product-category/wspinaczka/     | Wspinaczka     |
      | Yoga i pilates | https://fakestore.testelka.pl/product-category/yoga-i-pilates/ | Yoga i pilates |
      | Żeglarstwo     | https://fakestore.testelka.pl/product-category/zeglarstwo/     | Żeglarstwo     |
