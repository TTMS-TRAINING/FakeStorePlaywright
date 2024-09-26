Feature: Account Page Registration

  Scenario: Register using different emails
    Given Go to register page
    When Register user using "<emailType>"
    Then Expected message should be displayed "<expectedMessage>" "<emailType>"
    Examples:
      | emailType          | expectedMessage                                                                                                                                   |
      | NewEmail           | Witaj testowymail                                                                                                                                 |
      | ExistingEmail      | Błąd: Konto z Twoim adresem e-mail jest już zarejestrowane. Zaloguj się.                                                                          |
      | NotCorrectEmail    | Błąd: Podaj poprawny adres e-mail.                                                                                                                |
#      | WeakPassword       | Słabe - Proszę wpisać mocniejsze hasło.                                                                                                            |
