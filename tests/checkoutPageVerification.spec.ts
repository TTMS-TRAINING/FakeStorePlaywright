import { test, expect, Page } from '@playwright/test';
import { StorePage } from './pages/StorePage';
import { BasketPage } from './pages/BasketPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { checkoutData } from './testData/CheckoutPageData';
import { WishlistPage } from './pages/WishlistPage';

test.describe('Store Page Tests', () => {
  test.setTimeout(60000);
  const basketURL = 'https://fakestore.testelka.pl/koszyk/';
  const shopURL = 'https://fakestore.testelka.pl/shop/';
  const productURL = 'https://fakestore.testelka.pl/product/grecja-limnos/';

  test.beforeEach(async ({ page }) => {
    const storePage = new StorePage(page);
    await storePage.navigateTo(shopURL);
    await expect(page).toHaveURL(shopURL);
  });

  async function completeCheckout(
    page: Page,
    billingDetails: {
      firstName: any;
      lastName: any;
      company: any;
      country: any;
      address: any;
      address2: any;
      postcode: any;
      city: any;
      phone: any;
      email: any;
      orderComments: any;
    }
  ) {
    const checkoutPage = new CheckoutPage(page);
    const wishlistPage = new WishlistPage(page);
    const basketPage = new BasketPage(page);

    await page.goto(productURL);
    await wishlistPage.fillWishlist();
    await wishlistPage.addProductToCart(0);
    await basketPage.clickProceedToCheckout();

    await checkoutPage.fillBillingDetails(
      billingDetails.firstName,
      billingDetails.lastName,
      billingDetails.company,
      billingDetails.country,
      billingDetails.address,
      billingDetails.address2,
      billingDetails.postcode,
      billingDetails.city,
      billingDetails.phone,
      billingDetails.email,
      billingDetails.orderComments
    );

    await checkoutPage.fillStripeCardDetails(
      checkoutData.cardDetails.cardNumber,
      checkoutData.cardDetails.cardExpiry,
      checkoutData.cardDetails.cardCVC
    );

    await checkoutPage.checkSavePaymentInfo();
  }

  test('Sprawdzanie poprawności danych z polem imię', async ({ page }) => {
    await completeCheckout(page, checkoutData.billingDetails);
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.assertFirstNameRequired();
  });

  test('Sprawdzanie poprawności danych z polem Naziwsko', async ({ page }) => {
    await completeCheckout(page, checkoutData.billingDetails);
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.assertLastNameRequired();
  });
  test('Sprawdzanie poprawności danych z polem Ulica', async ({ page }) => {
    await completeCheckout(page, checkoutData.billingDetails);
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.assertAdressRequired();
  });
  test('Sprawdzanie poprawności danych z polem Kod Pocztowy', async ({ page }) => {
    await completeCheckout(page, checkoutData.billingDetails);
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.assertPostalCodeFormat();
  });
  test('Sprawdzanie poprawności danych z polem Miasto', async ({ page }) => {
    await completeCheckout(page, checkoutData.billingDetails);
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.assertCityFieldRequired();
  });
});
