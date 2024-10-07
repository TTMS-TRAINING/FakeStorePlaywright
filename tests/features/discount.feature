Feature: Kod rabatowy w koszyku

  Scenario: Użytkownik wpisuje poprawny kod rabatowy
    Given użytkownik jest na stronie koszyka
    When użytkownik wpisuje kod rabatowy "RABAT10"
    Then rabat powinien zostać naliczony

  Scenario: Użytkownik wpisuje niepoprawny kod rabatowy
    Given użytkownik jest na stronie koszyka
    When użytkownik wpisuje kod rabatowy "NIEPOPRAWNYKOD"
    Then powinna zostać wyświetlona wiadomość o błędzie

  Scenario: Użytkownik nie wpisuje żadnego kodu rabatowego
    Given użytkownik jest na stronie koszyka
    When użytkownik nie wpisuje kodu rabatowego
    Then rabat nie powinien zostać naliczony
