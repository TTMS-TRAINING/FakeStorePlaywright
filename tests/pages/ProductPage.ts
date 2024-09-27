// ProductPage.ts
import { Page, Locator } from "@playwright/test";

export class ProductPage {
  private page: Page;
  private productItems: Locator;
  private searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productItems = this.page.locator("ul.products li.product"); // Lokator dla wszystkich produktów
    this.searchInput = this.page.getByRole("searchbox", { name: "Szukaj:" }); // Lokator dla pola wyszukiwania
  }

  // Metoda do sprawdzania liczby produktów
  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  // Metoda do uzyskiwania informacji o produkcie na podstawie indeksu
  async getProductInfo(index: number) {
    const product = this.productItems.nth(index);
    const name = await product
      .locator(".woocommerce-loop-product__title")
      .innerText();
    const price = await product.locator(".price").innerText();
    const link = await product
      .locator("a.woocommerce-LoopProduct-link")
      .getAttribute("href");

    return {
      name: name.trim(),
      price: price.trim(),
      link: link,
    };
  }

  // Metoda do wyszukiwania produktów
  async searchForProduct(query: string): Promise<boolean> {
    await this.searchInput.fill(query); // Wypełnij pole wyszukiwania
    await this.page.keyboard.press("Enter"); // Naciśnij Enter, aby rozpocząć wyszukiwanie

    // Czekaj na załadowanie wyników
    //await this.page.waitForTimeout(1000); // Możesz dostosować czas w zależności od ładowania strony
    await this.page.waitForSelector("h1.woocommerce-products-header__title", {
      state: "visible",
    });
    const productCount = await this.getProductCount(); // Sprawdź liczbę produktów

    if (productCount === 0) {
      console.warn(`Brak produktów odpowiadających zapytaniu: "${query}".`); // Wypisz komunikat, jeśli nie znaleziono żadnych produktów
      return false; // Zwróć false, jeśli nie znaleziono produktów
    }

    console.log(`Liczba produktów znalezionych: ${productCount}`); // Wypisz liczbę znalezionych produktów
    return true; // Zwróć true, jeśli znaleziono produkty
  }
  // Metoda do sprawdzania, czy wyniki wyszukiwania zawierają zapytanie
  async verifySearchResultsContain(query: string): Promise<boolean> {
    await this.searchForProduct(query); // Wyszukaj produkt

    const productCount = await this.getProductCount();

    if (productCount === 0) {
      console.warn(`Brak produktów odpowiadających zapytaniu: "${query}".`);
      return false; // Nie znaleziono żadnych produktów
    }

    console.log(`Liczba produktów znalezionych: ${productCount}`); // Wypisz liczbę znalezionych produktów

    let allContainQuery = true;

    for (let i = 0; i < productCount; i++) {
      const productInfo = await this.getProductInfo(i);
      if (!productInfo.name.toLowerCase().includes(query.toLowerCase())) {
        allContainQuery = false;
        console.warn(
          `Produkt "${productInfo.name}" nie zawiera frazy "${query}".`
        );
      }
    }

    if (allContainQuery) {
      console.log(
        `Wszystkie ${productCount} produkty zawierają wyszukiwaną frazę: "${query}".`
      );
    }

    return allContainQuery;
  }
}
