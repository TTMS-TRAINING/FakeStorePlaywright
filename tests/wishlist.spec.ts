import { test, expect } from '@playwright/test';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountData';
import { AccountTestData } from './testData/AccountTestData';

test.describe('Testy strony wishlist z nową kartą', () => {

    test.beforeEach(async ({ page }) => {
        // Directly navigate to the login page, since this is necessary for both tests
        await page.goto('https://fakestore.testelka.pl/moje-konto/');
        const accountPage = new AccountPage(page);
        await accountPage.login(AccountTestData.TestUserWishlist);
        await expect(page.getByText('Witaj')).toBeVisible();
        await page.goto('https://fakestore.testelka.pl/wishlist/')
    });

    test('Dodawanie produktów do listy życzeń', async ({ page }) => {
        // Utwórz instancję WishlistPage
        const wishlistPage = new WishlistPage(page);

        // Wypełnij listę życzeń (dodaj produkty)
        await wishlistPage.fillWishlist();

        // Sprawdź, czy produkty zostały dodane
        const productCount = await wishlistPage.getProductCount();
        expect(productCount).toBeGreaterThan(0); // Oczekujemy, że lista nie jest pusta
        console.log(`Liczba produktów dodanych do listy życzeń: ${productCount}`);
    });
    test('Uzyskiwanie informacji o produkcie na liście życzeń', async ({ page }) => {
        // Utwórz instancję WishlistPage
        const wishlistPage = new WishlistPage(page);

        // Wypełnij listę życzeń, aby mieć produkty do testowania
        await wishlistPage.fillWishlist();

        // Pobierz informacje o pierwszym produkcie
        const productInfo = await wishlistPage.getProductInfo(0);
        console.log(`Produkt: ${productInfo.name}, Cena: ${productInfo.price}, Status: ${productInfo.stockStatus}`);

        // Sprawdź, czy informacje o produkcie są pobrane
        expect(productInfo.name).toBeDefined();
        expect(productInfo.price).toBeDefined();
        expect(productInfo.stockStatus).toBeDefined();
    });

    test('Dodawanie produktu do koszyka z listy życzeń', async ({ page }) => {
        // Utwórz instancję WishlistPage
        const wishlistPage = new WishlistPage(page);

        // Wypełnij listę życzeń
        await wishlistPage.fillWishlist();
        const productInfo = await wishlistPage.getProductInfo(0);

        // Dodaj pierwszy produkt do koszyka
        await wishlistPage.addProductToCart(0);

        // Sprawdź, czy produkt został dodany do koszyka (weryfikacja wymaga znajomości strony, np. poprzez sprawdzenie liczby produktów w koszyku)
        // poprawne sprawdzenie będzie dodane po zaimplementowaniu metod koszyka
        await expect(page).toHaveURL('https://fakestore.testelka.pl/koszyk/');


    });



    test('Usuwanie wszystkich produktów z listy życzeń', async ({ page }) => {


        const wishlistPage = new WishlistPage(page);

        // Wypełnij listę życzeń (dodaj produkty)
        await wishlistPage.fillWishlist();

        // Usuwanie wszystkich produktów
        await wishlistPage.clearWishlist();

        // Sprawdzenie, czy lista życzeń jest pusta
        // const productCount = await wishlistPage.getProductCount();
        // expect(productCount).toBe(0); // Oczekujemy, że lista życzeń jest pusta
        await expect(page.locator('td')).toContainText('No products added to the wishlist');
    });

    test('Zmiana nazwy listy życzeń', async ({ page }) => {
        const wishlistPage = new WishlistPage(page);
        await wishlistPage.changeWishlistName('Moja Nowa Lista'); // Zmień nazwę listy życzeń na 'Moja Nowa Lista'

        const isNameChanged = await wishlistPage.changeWishlistName('Moja Nowa Lista');
        expect(isNameChanged).toBe(true); // Sprawdź, czy nazwa została zmieniona
    });
    test('Anulowanie zmiany nazwy listy życzeń', async ({ page }) => {
        // Utwórz instancję WishlistPage
        const wishlistPage = new WishlistPage(page);

        // Wypełnij listę życzeń, jeśli jest pusta
        await wishlistPage.fillWishlist();

        // Anuluj zmianę nazwy listy życzeń
        const isNameUnchanged = await wishlistPage.cancelWishlistNameChange();
        expect(isNameUnchanged).toBe(true); // Sprawdź, czy nazwa pozostała niezmieniona po anulowaniu
        console.log('Zmiana nazwy listy życzeń została anulowana.');
    });

    test('Usuwanie produktu z listy życzeń', async ({ page }) => {
        // Utwórz instancję WishlistPage
        const wishlistPage = new WishlistPage(page);

        // Wypełnij listę życzeń
        await wishlistPage.fillWishlist();

        // Pobierz liczbę produktów przed usunięciem
        const productCountBefore = await wishlistPage.getProductCount();
        console.log(`Liczba produktów przed usunięciem: ${productCountBefore}`);

        // Usuń pierwszy produkt
        await wishlistPage.removeProduct(0);
        await page.waitForTimeout(1000); // Czekaj przez 1000 ms (1 sekunda)
        // Pobierz liczbę produktów po usunięciu
        const productCountAfter = await wishlistPage.getProductCount();
        console.log(`Liczba produktów po usunięciu: ${productCountAfter}`);

        await expect(productCountAfter).toBe(productCountBefore - 1); // Oczekujemy, że lista produktów zmniejszy się o 1
    });






});