import { test, expect } from '@playwright/test';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountData';
import { AccountTestData } from './testData/AccountTestData';

test.describe('Testy strony wishlist z nową kartą', () => {

    test.beforeEach(async ({ page }) => {
        // Directly navigate to the login page, since this is necessary for both tests
        await page.goto('https://fakestore.testelka.pl/moje-konto/');
    });

    test('Wejście na stronę Whishlist i przejście do nowej kart', async ({ page, context }) => {
        const accountPage = new AccountPage(page);

        // Log in to the account
        await accountPage.login(AccountTestData.TestUserWishlist);
        await expect(page.getByText('Witaj')).toBeVisible();

        // Initialize WishlistPage on the current page
        const wishlistPage = new WishlistPage(page);

        // Click on the wishlist button, assuming it opens a new tab
        const [newPage] = await Promise.all([
            context.waitForEvent('page'), // Wait for the new page (tab) to be opened
            wishlistPage.clickWishlist(), // Trigger the action that opens the new tab
        ]);

        // Wait for the new page to load
        await newPage.waitForLoadState('domcontentloaded');

        // Verify the URL of the new tab
        await expect(newPage).toHaveURL('https://fakestore.testelka.pl/wishlist/');

        // Continue actions on the new tab using a new instance of WishlistPage
        const newWishlistPage = new WishlistPage(newPage);

        // Perform further actions on the new tab
        const pageTitle = await newPage.title();
        console.log('Title of the new tab:', pageTitle);

        // Check if the wishlist title is correct
        await expect(newPage.locator('h1')).toContainText('Lista życzeń');

        // Use the method on the new page
        await newWishlistPage.clickWishlistEditButton();
    });

    test('testy lokatorów', async ({ page, context }) => {
        const accountPage = new AccountPage(page);
        const wishlistPage = new WishlistPage(page);

        await accountPage.login(AccountTestData.TestUserWishlist);
        await expect(page.getByText('Witaj')).toBeVisible();
        await wishlistPage.fillWishlist();
        await page.goto('https://fakestore.testelka.pl/wishlist/');

        // Wait for the wishlist page to fully load
        await page.waitForLoadState('domcontentloaded');



        // Zmiana nazwy listy życzeń
        //await wishlistPage.changeWishlistName();

        // Anulowanie zmiany
        //await wishlistPage.cancelWishlistNameChange();


        // Sprawdzenie liczby produktów
        const productCount = await wishlistPage.getProductCount();
        console.log(`Liczba produktów w liście: ${productCount}`);

        // Uzyskanie informacji o pierwszym produkcie
        const productInfo = await wishlistPage.getProductInfo(0);
        console.log(`Produkt: ${productInfo.name}, Cena: ${productInfo.price}, Status: ${productInfo.stockStatus}`);

        // Dodanie pierwszego produktu do koszyka
        await wishlistPage.addProductToCart(0);

        // Usunięcie drugiego produktu
        //if (productCount > 1) {
        //    await wishlistPage.removeProduct(1);
        // }



    });
    test('Usuwanie wszystkich produktów z listy życzeń', async ({ page }) => {
        const accountPage = new AccountPage(page);
        await accountPage.login(AccountTestData.TestUserWishlist);
        await expect(page.getByText('Witaj')).toBeVisible();

        const wishlistPage = new WishlistPage(page);

        // Wypełnij listę życzeń (dodaj produkty)
        await wishlistPage.fillWishlist();

        // Usuwanie wszystkich produktów
        await wishlistPage.clearWishlist();

        // Sprawdzenie, czy lista życzeń jest pusta
        const productCount = await wishlistPage.getProductCount();
        expect(productCount).toBe(0); // Oczekujemy, że lista życzeń jest pusta
    });




});