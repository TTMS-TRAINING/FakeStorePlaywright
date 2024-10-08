import { test, expect } from '@playwright/test';
import { MainPage } from './pages/MainPage';

test.describe('Testy strony głównej', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('https://fakestore.testelka.pl/');
    mainPage = new MainPage(page);
  });

  test('Sprawdzenie kliknięcia w Strona główna', async () => {
    await mainPage.clickHome();
  });

  test('Sprawdzenie kliknięcia w Sklep', async () => {
    await mainPage.clickShop();
  });

  test('Sprawdzenie wyszukiwania Yoga', async ({ page }) => {
    await mainPage.searchForItem('Yoga');
    await expect(page).toHaveURL(/.*s=Yoga/); // Sprawdza, czy URL zawiera parametr wyszukiwania
  });

  test('Sprawdzenie wyszukiwania Pilates', async ({ page }) => {
    await mainPage.searchForItem('Pilates');
    await expect(page).toHaveURL(/.*s=Pilates/); // Sprawdza, czy URL zawiera parametr wyszukiwania
  });

  test('Sprawdzenie czy wishlist otworzy się w nowej karcie', async () => {
    await mainPage.verifyWishlistOpensInNewTab();
    await mainPage.clickWishlist();
  });

  test('Sprawdzanie kliknięcia w moje konto', async () => {
    await mainPage.clickAccount();
  });

  test('Sprawdzanie kliknięcia w koszyk', async () => {
    await mainPage.clickCart();
  });
});
