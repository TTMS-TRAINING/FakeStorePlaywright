import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { getPage } from '../hooks/testHook';  // Pobieranie strony
import { CartPage } from '../pages/CartPage'; // Page Object do koszyka

let cartPage: CartPage;

Given('użytkownik jest na stronie koszyka', async () => {
  const page = getPage();
  cartPage = new CartPage(page);
  await cartPage.goto(); // Przejście na stronę koszyka
});


When('użytkownik wpisuje kod rabatowy {string}', async (discountCode: string) => {
  await cartPage.applyDiscountCode(discountCode);
});

When('użytkownik nie wpisuje kodu rabatowego', async () => {
  // Celowo nie wypełniamy pola rabatowego, ale klikamy przycisk aplikacji kodu
  await cartPage.applyEmptyDiscountCode();
});

Then('rabat powinien zostać naliczony', async () => {
  const discountApplied = await cartPage.isDiscountApplied();
  expect(discountApplied).toBe(true);
});

Then('powinna zostać wyświetlona wiadomość o błędzie', async () => {
  const errorMessage = await cartPage.getDiscountErrorMessage();
  expect(errorMessage).toContain('Kupon, który wprowadziłeś, jest nieprawidłowy');
});

Then('rabat nie powinien zostać naliczony', async () => {
  const discountApplied = await cartPage.isDiscountApplied();
  expect(discountApplied).toBe(false);
});
