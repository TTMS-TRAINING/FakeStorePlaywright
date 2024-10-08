import { test, expect } from '@playwright/test';
import { StorePage } from './pages/StorePage';
import { BasketPage } from './pages/BasketPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { checkoutData } from './testData/CheckoutPageData';
import { AccountPage } from './pages/AccountPage';
import { AccountTestData } from './testData/AccountTestData';
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
    const wishlistPage = new WishlistPage(page);
  });

  test('Pomyslne przejście zamówienia', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const wishlistPage = new WishlistPage(page);
    const basketPage = new BasketPage(page);
    await page.goto(productURL);

    await wishlistPage.fillWishlist();
    await wishlistPage.addProductToCart(0); // Dodajemy produkt z wishlisty do koszyka
    await basketPage.clickProceedToCheckout();

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
    await checkoutPage.AssertOrder();
    //await page.waitForSelector('h1:has-text("Zamówienie otrzymane")', { timeout: 10000 });
    //await expect(page.locator('h1')).toContainText('Zamówienie otrzymane');
  });
});
test.describe.serial('Testy strony wishlist po zalogowaniu na konto', () => {
  test.setTimeout(60000);
  let accountPage: AccountPage;
  const basketURL = 'https://fakestore.testelka.pl/koszyk/';
  const shopURL = 'https://fakestore.testelka.pl/shop/';
  const productURL = 'https://fakestore.testelka.pl/product/grecja-limnos/';

  test.beforeEach(async ({ page }) => {
    accountPage = new AccountPage(page);
    const storePage = new StorePage(page);
    await page.goto('https://fakestore.testelka.pl/moje-konto/');
    await accountPage.login(AccountTestData.TestUserWishlist);
    await page.goto('https://fakestore.testelka.pl/wishlist/');
  });

  test('Pomyslne przejście zamówienia', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const wishlistPage = new WishlistPage(page);
    const basketPage = new BasketPage(page);
    await page.goto(productURL);

    await wishlistPage.fillWishlist();
    await wishlistPage.addProductToCart(0); // Dodajemy produkt z wishlisty do koszyka
    await basketPage.clickProceedToCheckout();

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
