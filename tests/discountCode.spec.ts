import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from './hooks/testHook'; // Import hooków dla page i browser
import { CartPage } from './pages/CartPage';  // Import klasy CartPage

let cartPage: CartPage;

Given('użytkownik jest na stronie koszyka', async () => {
  const page = getPage();
  cartPage = new CartPage(page);
  await cartPage.goto(); // Przejście na stronę koszyka
});

When('użytkownik wpisuje kod rabatowy {string}', async (discountCode: string) => {
  await cartPage.applyDiscountCode(discountCode); // Wprowadzenie kodu rabatowego
});

When('użytkownik nie wpisuje kodu rabatowego', async () => {
  await cartPage.applyEmptyDiscountCode(); // Kliknięcie przycisku "Zastosuj" bez kodu
});

Then('rabat powinien zostać naliczony', async () => {
  const discountApplied = await cartPage.isDiscountApplied(); // Sprawdzenie, czy rabat został zastosowany
  expect(discountApplied).toBe(true); // Asercja dla poprawnego zastosowania rabatu
});

Then('powinna zostać wyświetlona wiadomość o błędzie', async () => {
  const errorMessage = await cartPage.getDiscountErrorMessage(); // Pobranie wiadomości błędu
  expect(errorMessage).toContain('Kupon, który wprowadziłeś, jest nieprawidłowy'); // Asercja na wiadomość błędu
});

Then('rabat nie powinien zostać naliczony', async () => {
  const discountApplied = await cartPage.isDiscountApplied(); // Sprawdzenie, czy rabat nie został naliczony
  expect(discountApplied).toBe(false); // Asercja, że rabat nie został naliczony
});
