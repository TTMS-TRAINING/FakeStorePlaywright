import { test, expect } from '@playwright/test';
import { MainPage } from './pages/MainPage'; 
test.describe('Testy strony głównej', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://fakestore.testelka.pl/');
    });

    test('Sprawdzenie kliknięcia w Strona główna', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.clickHome();
        await expect(page).toHaveURL('https://fakestore.testelka.pl/');
    });

    test('Sprawdzenie kliknięcia w Sklep', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.clickShop();
        await expect(page).toHaveURL('https://fakestore.testelka.pl/shop/');
    });

    test('Sprawdzenie wyszukiwania Yoga', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.searchForItem('Yoga');
        await expect(page).toHaveURL(/.*s=Yoga/); // Sprawdza, czy URL zawiera parametr wyszukiwania
    });

    test('Sprawdzenie wyszukiwania Pilates', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.searchForItem('Pilates');
        await expect(page).toHaveURL(/.*s=Pilates/); // Sprawdza, czy URL zawiera parametr wyszukiwania
    });

});
