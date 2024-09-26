import { test, expect } from '@playwright/test';
import { ProductPage } from './pages/ProductPage';


test('Test wyszukiwania produktów', async ({ page }) => {
    await page.goto('https://fakestore.testelka.pl/'); // Przejdź do strony z produktami
    const productPage = new ProductPage(page);

    // Wyszukiwanie produktu
    const searchQuery = 'dasdasdasdasdasdasda'; // Zapytanie, które nie powinno zwrócić wyników
    await productPage.searchForProduct(searchQuery);

    // Sprawdzenie liczby produktów po wyszukiwaniu
    const productCount = await productPage.getProductCount();
    console.log(`Liczba produktów po wyszukiwaniu '${searchQuery}': ${productCount}`);

    expect(productCount).toBe(0); // Upewnij się, że nie znaleziono żadnych produktów

});

test('Test sprawdzania wyników wyszukiwania', async ({ page }) => {
    await page.goto('https://fakestore.testelka.pl/'); // Przejdź do strony z produktami
    const productPage = new ProductPage(page);

    const searchQuery = 'Windsurfing'; // Przykładowe zapytanie
    const resultsContainQuery = await productPage.verifySearchResultsContain(searchQuery);

    // Sprawdź, czy wszystkie wyniki zawierają wyszukiwaną frazę
    expect(resultsContainQuery).toBe(true);
});