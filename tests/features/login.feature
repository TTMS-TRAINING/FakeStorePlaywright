Feature: Account Page Login

  Scenario: Login with different email or password
    Given I am on the account login page
    When I login with "<accountType>"
    Then I should see message containing: "<expectedResult>"
    Examples:
      | accountType        | expectedResult                                                                                                                                    |
      | CorrectEmailLogin  | Witaj kamilakrystyna                                                                                                                              |
      | WrongEmailLogin    | Błąd: dla adresu e-mail kamilakrystyna@gmail.com podano nieprawidłowe hasło. Nie pamiętasz hasła?                                                 |
      | NotRegisteredEmail | Nieznany adres e-mail. Proszę sprawdzić ponownie lub wypróbować swoją nazwę użytkownika.                                                          |
      | CorrectLogin       | Witaj kamila.socha                                                                                                                                |
      | WrongLogin         | Błąd: wpisano niepoprawne hasło dla użytkownika kamila.socha. Nie pamiętasz hasła?                                                                |
      | NotRegistered      | Błąd: brak kamila.testowa123 wśród zarejestrowanych w witrynie użytkowników. Jeśli nie masz pewności co do nazwy użytkownika, użyj adresu e-mail. |

    Scenario: Show password button
    Given Go to login page
    When Login with "<accountType>"
    Then I see password: "<passwordValue>"
    Examples:
      | accountType        | passwordValue                                                                                                                                    |
      | CorrectEmailLogin  | AccountTest1234!@                                                                                                                                 |
      | WrongEmailLogin    | Test1234                                                                                                                                          |