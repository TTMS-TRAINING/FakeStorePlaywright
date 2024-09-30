import { test, expect } from '@playwright/test';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import { AccountTestData } from './testData/AccountTestData';

test.describe('Testy strony wishlist bez zalogowania na konto', () => {
  let wishlistPage: WishlistPage;

  test.beforeEach(async ({ page }) => {
    wishlistPage = new WishlistPage(page);
    await page.goto('https://fakestore.testelka.pl/wishlist/');
  });

  test('Wypełnianie listy', async () => {
    await wishlistPage.fillWishlist();
  });

  test('Usuwanie pierwszego produktu z listy', async () => {
    await wishlistPage.fillWishlist();
    await wishlistPage.removeProduct(0);
  });

  test('Sprawdzanie ilości produktów na liście przed i po usunięciu', async () => {
    await wishlistPage.fillWishlist();
    const productCountBefore = await wishlistPage.getProductCount();
    await wishlistPage.removeProduct(0);
    const productCountAfter = await wishlistPage.getProductCount();
    expect(productCountBefore).toBe(productCountAfter + 1);
  });

  test('Usunięcie całej listy', async () => {
    await wishlistPage.fillWishlist();
    await wishlistPage.clearWishlist();
  });

  test('Dodanie produktu z listy do koszyka', async () => {
    await wishlistPage.fillWishlist();
    await wishlistPage.addProductToCart(0);
  });
});

test.describe.serial('Testy strony wishlist po zalogowaniu na konto', () => {
  let wishlistPage: WishlistPage;
  let accountPage: AccountPage;

  test.beforeEach(async ({ page }) => {
    accountPage = new AccountPage(page);
    wishlistPage = new WishlistPage(page);
    await page.goto('https://fakestore.testelka.pl/moje-konto/');
    await accountPage.login(AccountTestData.TestUserWishlist);
    await page.goto('https://fakestore.testelka.pl/wishlist/');
  });

  test('Wypełnianie listy', async () => {
    await wishlistPage.fillWishlist();
  });

  test('Zmiana nazwy wishlist', async () => {
    await wishlistPage.changeWishlistName('Nowa nazwa listy');
  });
});
