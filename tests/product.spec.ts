import { test, expect } from "@playwright/test";
import { ProductPage } from "./pages/ProductPage";

let productPage: ProductPage;
const searchQuery = "a"; // Przykładowe zapytanie

// Wspólne ustawienia dla wszystkich testów
test.beforeEach(async ({ page }) => {
  await page.goto("https://fakestore.testelka.pl/"); // Przejdź do strony z produktami
  productPage = new ProductPage(page);
});

test("Test wyszukiwania produktów, które nie powinny zwrócić wyników", async () => {
  // Wyszukiwanie produktu
  const invalidSearchQuery = "dasdasdasdasdasdasda"; // Zapytanie, które nie powinno zwrócić wyników
  await productPage.searchForProduct(invalidSearchQuery);

  // Sprawdzenie liczby produktów po wyszukiwaniu
  const productCount = await productPage.getProductCount();
  // console.log(`Liczba produktów po wyszukiwaniu '${invalidSearchQuery}': ${productCount}`); // Potrzebne do debugowania

  expect(productCount).toBe(0); // Upewnij się, że nie znaleziono żadnych produktów
});

test("Test sprawdzania wyników wyszukiwania", async () => {
  const resultsContainQuery = await productPage.verifySearchResultsContain(
    searchQuery
  );

  // Sprawdź, czy wszystkie wyniki zawierają wyszukiwaną frazę
  expect(resultsContainQuery).toBe(true);
});

// Test sprawdzania, czy produkty są posortowane rosnąco po cenie
test("Test sprawdzania sortowania produktów po cenie rosnąco", async () => {
  const resultsContainQuery = await productPage.verifySearchResultsContain(
    searchQuery
  );

  // Sprawdź, czy wszystkie wyniki zawierają wyszukiwaną frazę
  expect(resultsContainQuery).toBe(true);

  await productPage.sortByPriceAscending();
  // Sprawdź, czy produkty są posortowane rosnąco po cenie
  const isSortedAscending = await productPage.areProductsSortedByPrice();
  // console.log(`Produkty posortowane rosnąco: ${isSortedAscending}`); // Potrzebne do debugowania

  // Oczekuj, że produkty są posortowane rosnąco
  expect(isSortedAscending).toBe(true);
});

// Test sprawdzania, czy produkty są posortowane malejąco po cenie
test("Test sprawdzania sortowania produktów po cenie malejąco", async () => {
  const resultsContainQuery = await productPage.verifySearchResultsContain(
    searchQuery
  );

  // Sprawdź, czy wszystkie wyniki zawierają wyszukiwaną frazę
  expect(resultsContainQuery).toBe(true);

  // Ustaw sortowanie według ceny malejąco
  await productPage.sortByPriceDescending();

  // Sprawdź, czy produkty są posortowane malejąco po cenie
  const isSortedDescending = await productPage.areProductsSortedByPrice(true);
  // console.log(`Produkty posortowane malejąco: ${isSortedDescending}`); // Potrzebne do debugowania

  // Oczekuj, że produkty są posortowane malejąco
  expect(isSortedDescending).toBe(true);
});

test("Test sortowania według trafności", async () => {
  const resultsContainQuery = await productPage.verifySearchResultsContain(
    searchQuery
  );

  // Sprawdź, czy wszystkie wyniki zawierają wyszukiwaną frazę
  expect(resultsContainQuery).toBe(true);
  const isSortedByRelevance = await productPage.sortByRelevance();
  expect(isSortedByRelevance).toBe(true); // Sprawdź, czy sortowanie według trafności zostało zastosowane
});

test("Test sortowania według popularności", async () => {
  const resultsContainQuery = await productPage.verifySearchResultsContain(
    searchQuery
  );

  // Sprawdź, czy wszystkie wyniki zawierają wyszukiwaną frazę
  expect(resultsContainQuery).toBe(true);
  const isSortedByPopularity = await productPage.sortByPopularity();
  expect(isSortedByPopularity).toBe(true); // Sprawdź, czy sortowanie według popularności zostało zastosowane
});

test("Test sortowania według średniej oceny", async () => {
  const resultsContainQuery = await productPage.verifySearchResultsContain(
    searchQuery
  );

  // Sprawdź, czy wszystkie wyniki zawierają wyszukiwaną frazę
  expect(resultsContainQuery).toBe(true);
  const isSortedByRating = await productPage.sortByRating();
  expect(isSortedByRating).toBe(true); // Sprawdź, czy sortowanie według średniej oceny zostało zastosowane
});

test("Test sortowania od najnowszych", async () => {
  const resultsContainQuery = await productPage.verifySearchResultsContain(
    searchQuery
  );

  // Sprawdź, czy wszystkie wyniki zawierają wyszukiwaną frazę
  expect(resultsContainQuery).toBe(true);
  const isSortedByDate = await productPage.sortByDate();
  expect(isSortedByDate).toBe(true); // Sprawdź, czy sortowanie od najnowszych zostało zastosowane
});
