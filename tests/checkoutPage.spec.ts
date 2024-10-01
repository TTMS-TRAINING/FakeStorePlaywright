import { test, expect } from '@playwright/test';
import { StorePage } from './pages/StorePage';
import { BasketPage } from './pages/BasketPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { checkoutData } from './testData/CheckoutPageData';

test.describe('Store Page Tests', () => {
  const basketURL = 'https://fakestore.testelka.pl/koszyk/';
  const shopURL = 'https://fakestore.testelka.pl/shop/';
  const productURL = 'https://fakestore.testelka.pl/product/grecja-limnos/';
  test.beforeEach(async ({ page }) => {
    const storePage = new StorePage(page);
    await storePage.navigateTo(shopURL);
    await expect(page).toHaveURL(shopURL);
  });

  test('Pomyslne przejście zamówienia', async ({ page }) => {
    const storePage = new StorePage(page);
    const basketPage = new BasketPage(page);
    const checkoutPage = new CheckoutPage(page);
    await page.goto(productURL);
    await page.click('button[name="add-to-cart"]');
    await page.waitForLoadState('networkidle'); // Czekamy, aż wszystkie żądania sieciowe się zakończą
    await page.goto(basketURL);
    await page.waitForLoadState('networkidle'); // Czekamy, aż wszystkie żądania sieciowe się zakończą
    await page.click('a.checkout-button'); // Przyjmujemy, że to jest selektor przycisku "Przejdź do kasy"

    // Wypełniamy dane rozliczeniowe korzystając z danych z pliku CheckoutPageData
    await checkoutPage.fillBillingDetails(
      checkoutData.billingDetails.firstName,
      checkoutData.billingDetails.lastName,
      checkoutData.billingDetails.company,
      checkoutData.billingDetails.country,
      checkoutData.billingDetails.address,
      checkoutData.billingDetails.address2,
      checkoutData.billingDetails.postcode,
      checkoutData.billingDetails.city,
      checkoutData.billingDetails.phone,
      checkoutData.billingDetails.email,
      checkoutData.billingDetails.orderComments
    );

    // Wypełniamy dane karty płatniczej korzystając z danych z pliku CheckoutPageData
    await checkoutPage.fillStripeCardDetails(
      checkoutData.cardDetails.cardNumber,
      checkoutData.cardDetails.cardExpiry,
      checkoutData.cardDetails.cardCVC
    );

    await checkoutPage.checkSavePaymentInfo();
    await checkoutPage.placeOrder();
  });
});
