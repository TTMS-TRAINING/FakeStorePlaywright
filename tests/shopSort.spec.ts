import { test, expect } from '@playwright/test';
import { ProductPage } from './pages/ProductPage';
import { ProductCategoryUrls } from './testData/CategoryURL';

let productPage: ProductPage;
let pageURL: string;
// Wspólne ustawienia dla wszystkich testów
test.beforeEach(async ({ page }) => {
  await page.goto('https://fakestore.testelka.pl/'); // Przejdź do strony z produktami
  productPage = new ProductPage(page);
  pageURL = ProductCategoryUrls.windsurfing;
});

// Test sprawdzania, czy produkty są posortowane rosnąco po cenie
test('Test sprawdzania sortowania produktów po cenie rosnąco z poziomu sklepu', async ({ page }) => {
  await page.goto(pageURL); // Przejdź do strony z produktami

  await productPage.sortByPriceAscending();
  // Sprawdź, czy produkty są posortowane rosnąco po cenie
  const isSortedAscending = await productPage.areProductsSortedByPrice();
  // console.log(`Produkty posortowane rosnąco: ${isSortedAscending}`); // Potrzebne do debugowania

  // Oczekuj, że produkty są posortowane rosnąco
  expect(isSortedAscending).toBe(true);
});

// Test sprawdzania, czy produkty są posortowane malejąco po cenie
test('Test sprawdzania sortowania produktów po cenie malejąco z poziomu sklepu', async ({ page }) => {
  await page.goto(pageURL); // Przejdź do strony z produktami
  // Ustaw sortowanie według ceny malejąco

  await productPage.sortByPriceDescending();

  // Sprawdź, czy produkty są posortowane malejąco po cenie
  const isSortedDescending = await productPage.areProductsSortedByPrice(true);
  // console.log(`Produkty posortowane malejąco: ${isSortedDescending}`); // Potrzebne do debugowania

  // Oczekuj, że produkty są posortowane malejąco
  expect(isSortedDescending).toBe(true);
});

test('Test sortowania według popularności z poziomu sklepu ', async ({ page }) => {
  await page.goto(pageURL); // Przejdź do strony z produktami
  const isSortedByPopularity = await productPage.sortByPopularity();
  expect(isSortedByPopularity).toBe(true); // Sprawdź, czy sortowanie według popularności zostało zastosowane
});

test('Test sortowania według średniej oceny  z poziomu sklepu', async ({ page }) => {
  await page.goto(pageURL); // Przejdź do strony z produktami
  const isSortedByRating = await productPage.sortByRating();
  expect(isSortedByRating).toBe(true); // Sprawdź, czy sortowanie według średniej oceny zostało zastosowane
});

test('Test sortowania od najnowszych  z poziomu sklepu', async ({ page }) => {
  await page.goto(pageURL); // Przejdź do strony z produktami
  const isSortedByDate = await productPage.sortByDate();
  expect(isSortedByDate).toBe(true); // Sprawdź, czy sortowanie od najnowszych zostało zastosowane
});
