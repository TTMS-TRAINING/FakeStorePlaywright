import { test, expect } from "@playwright/test";
import { WishlistPage } from "../pages/WishlistPage";
import { AccountPage } from "../pages/AccountPage";
import { AccountTestData } from "./AccountTestData";

test.describe.serial("Testy strony wishlist z nową kartą", () => {
  test.beforeEach(async ({ page }) => {
    // Przejdź na stronę logowania i zaloguj się
    await page.goto("https://fakestore.testelka.pl/moje-konto/");
    const accountPage = new AccountPage(page);
    await accountPage.login(AccountTestData.TestUserWishlist);
    await page.goto("https://fakestore.testelka.pl/wishlist/");
  });

  test("Dodawanie produktów do listy życzeń", async ({ page }) => {
    const wishlistPage = new WishlistPage(page);

    // Wypełnij listę życzeń
    await wishlistPage.fillWishlist();

    // Sprawdź, czy produkty zostały dodane
    const productCount = await wishlistPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    console.log(`Liczba produktów dodanych do listy życzeń: ${productCount}`);
  });

  test("Uzyskiwanie informacji o produkcie na liście życzeń", async ({
    page,
  }) => {
    const wishlistPage = new WishlistPage(page);

    // Wypełnij listę życzeń
    await wishlistPage.fillWishlist();

    // Pobierz informacje o pierwszym produkcie
    const productInfo = await wishlistPage.getProductInfo(0);
    console.log(
      `Produkt: ${productInfo.name}, Cena: ${productInfo.price}, Status: ${productInfo.stockStatus}`
    );

    // Sprawdź, czy informacje o produkcie są pobrane
    expect(productInfo.name).toBeDefined();
    expect(productInfo.price).toBeDefined();
    expect(productInfo.stockStatus).toBeDefined();
  });

  test("Dodawanie produktu do koszyka z listy życzeń", async ({ page }) => {
    const wishlistPage = new WishlistPage(page);

    // Wypełnij listę życzeń
    await wishlistPage.fillWishlist();

    // Dodaj pierwszy produkt do koszyka
    await wishlistPage.addProductToCart(0);

    // Sprawdź, czy produkt został dodany do koszyka
    await expect(page).toHaveURL("https://fakestore.testelka.pl/koszyk/");
  });

  test("Usuwanie wszystkich produktów z listy życzeń", async ({ page }) => {
    const wishlistPage = new WishlistPage(page);

    // Wypełnij listę życzeń
    await wishlistPage.fillWishlist();

    // Usuwanie wszystkich produktów
    await wishlistPage.clearWishlist();

    // Sprawdzenie, czy lista życzeń jest pusta
    await page.waitForSelector("td.wishlist-empty");
    const emptyWishlistMessage = page.locator("td.wishlist-empty");
    await expect(emptyWishlistMessage).toContainText(
      "No products added to the wishlist"
    );
  });

  test("Zmiana nazwy listy życzeń", async ({ page }) => {
    const wishlistPage = new WishlistPage(page);

    // Zmień nazwę listy życzeń na 'Moja Nowa Lista'
    const isNameChanged = await wishlistPage.changeWishlistName(
      "Moja Nowa Lista"
    );
    expect(isNameChanged).toBe(true);
  });

  test("Anulowanie zmiany nazwy listy życzeń", async ({ page }) => {
    const wishlistPage = new WishlistPage(page);

    // Wypełnij listę życzeń, jeśli jest pusta
    await wishlistPage.fillWishlist();

    // Anuluj zmianę nazwy listy życzeń
    const isNameUnchanged = await wishlistPage.cancelWishlistNameChange();
    expect(isNameUnchanged).toBe(true);
    console.log("Zmiana nazwy listy życzeń została anulowana.");
  });

  test("Usuwanie produktu z listy życzeń", async ({ page }) => {
    const wishlistPage = new WishlistPage(page);

    // Wypełnij listę życzeń
    await wishlistPage.fillWishlist();

    // Odśwież stronę i poczekaj na jej pełne załadowanie
    await page.reload();

    // Pobierz liczbę produktów przed usunięciem
    const productCountBefore = await wishlistPage.getProductCount();
    console.log(`Liczba produktów przed usunięciem: ${productCountBefore}`);

    // Usuń pierwszy produkt
    await wishlistPage.removeProduct(0);

    // Pobierz liczbę produktów po usunięciu
    const productCountAfter = await wishlistPage.getProductCount();
    console.log(`Liczba produktów po usunięciu: ${productCountAfter}`);

    expect(productCountAfter).toBe(productCountBefore - 1);
  });
});
