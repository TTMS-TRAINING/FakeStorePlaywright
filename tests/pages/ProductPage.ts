import { Page, Locator } from '@playwright/test';

export class ProductPage {
  private page: Page;
  private productItems: Locator;
  private searchInput: Locator;
  private sortByDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productItems = this.page.locator('ul.products li.product');
    this.searchInput = this.page.getByRole('searchbox', { name: 'Szukaj:' });
    this.sortByDropdown = this.page.getByLabel('Zamówienie').first();
  }

  // Metoda do wyboru sortowania według trafności
  async sortByRelevance() {
    await this.sortByDropdown.selectOption('relevance');
    await this.page.waitForLoadState('networkidle');
    const selectedOption = await this.sortByDropdown.inputValue();
    return selectedOption === 'relevance';
  }

  // Metoda do wyboru sortowania według popularności
  async sortByPopularity() {
    await this.sortByDropdown.selectOption('popularity');
    await this.page.waitForLoadState('networkidle');
    const selectedOption = await this.sortByDropdown.inputValue();
    return selectedOption === 'popularity';
  }

  // Metoda do wyboru sortowania według średniej oceny
  async sortByRating() {
    await this.sortByDropdown.selectOption('rating');
    await this.page.waitForLoadState('networkidle');
    const selectedOption = await this.sortByDropdown.inputValue();
    return selectedOption === 'rating';
  }

  // Metoda do wyboru sortowania od najnowszych
  async sortByDate() {
    await this.sortByDropdown.selectOption('date');
    await this.page.waitForLoadState('networkidle');
    const selectedOption = await this.sortByDropdown.inputValue();
    return selectedOption === 'date';
  }

  // Metoda do ustawienia sortowania według ceny rosnąco
  async sortByPriceAscending() {
    await this.sortByDropdown.click();
    await this.sortByDropdown.selectOption('price');
    await this.page.waitForLoadState('networkidle');

    await this.page.waitForSelector('ul.products li.product', {
      state: 'attached',
      timeout: 10000,
    });

    await this.page.waitForTimeout(2000);
  }

  // Metoda do ustawienia sortowania według ceny malejąco
  async sortByPriceDescending() {
    await this.sortByDropdown.click();
    await this.sortByDropdown.selectOption('price-desc');
    await this.page.waitForLoadState('networkidle');

    await this.page.waitForSelector('ul.products li.product', {
      state: 'attached',
      timeout: 10000,
    });

    await this.page.waitForTimeout(2000);
  }

  // Metoda do sprawdzania liczby produktów
  async getProductCount(): Promise<number> {
    await this.page.waitForLoadState('networkidle');
    return await this.productItems.count();
  }

  // Metoda do uzyskiwania informacji o produkcie na podstawie indeksu
  async getProductInfo(index: number) {
    const product = this.productItems.nth(index);
    const name = await product.locator('.woocommerce-loop-product__title').innerText();

    // Sprawdź, czy produkt jest w promocji poprzez sprawdzenie obecności elementu <span class="onsale">Promocja!</span>
    const isOnSale = await product.locator('span.onsale').isVisible();

    let price = '';
    if (isOnSale) {
      // console.log(`Produkt "${name}" jest na promocji.`); // Potrzebne do debugowania
      const priceElement = product.locator('.price ins .woocommerce-Price-amount bdi');
      price = await priceElement.first().innerText();
    } else {
      // console.log(`Produkt "${name}" nie jest na promocji.`); // Potrzebne do debugowania
      const priceElement = product.locator('.price .woocommerce-Price-amount bdi');
      price = await priceElement.first().innerText();
    }

    const link = await product.locator('a.woocommerce-LoopProduct-link').getAttribute('href');

    return {
      name: name.trim(),
      price: price.trim(),
      link: link,
    };
  }

  // Metoda do wyszukiwania produktów
  async searchForProduct(query: string): Promise<boolean> {
    await this.searchInput.fill(query);
    await this.page.keyboard.press('Enter');

    await this.page.waitForSelector('h1.woocommerce-products-header__title', {
      state: 'visible',
    });
    const productCount = await this.getProductCount();

    if (productCount === 0) {
      // console.warn(`Brak produktów odpowiadających zapytaniu: "${query}".`); // Potrzebne do debugowania
      return false;
    }

    // console.log(`Liczba produktów znalezionych: ${productCount}`); // Potrzebne do debugowania
    return true;
  }

  // Metoda do sprawdzania, czy wyniki wyszukiwania zawierają zapytanie
  async verifySearchResultsContain(query: string): Promise<boolean> {
    await this.searchForProduct(query);

    const productCount = await this.getProductCount();

    if (productCount === 0) {
      // console.warn(`Brak produktów odpowiadających zapytaniu: "${query}".`); // Potrzebne do debugowania
      return false;
    }

    // console.log(`Liczba produktów znalezionych: ${productCount}`); // Potrzebne do debugowania

    let allContainQuery = true;
    const queryLower = query.toLowerCase();

    for (let i = 0; i < productCount; i++) {
      const productInfo = await this.getProductInfo(i);
      const productNameLower = productInfo.name.toLowerCase();

      // console.log(`Sprawdzam produkt: "${productInfo.name}" (${productNameLower}) pod kątem frazy: "${query}"`); // Potrzebne do debugowania

      if (!productNameLower.includes(queryLower)) {
        allContainQuery = false;
        // console.warn(`Produkt "${productInfo.name}" nie zawiera frazy "${query}".`); // Potrzebne do debugowania
      }
    }

    if (allContainQuery) {
      // console.log(`Wszystkie ${productCount} produkty zawierają wyszukiwaną frazę: "${query}".`); // Potrzebne do debugowania
    }

    return allContainQuery;
  }

  // Metoda do sprawdzania, czy produkty są posortowane po cenie
  async areProductsSortedByPrice(descending: boolean = false): Promise<boolean> {
    const productCount = await this.getProductCount();

    if (productCount === 0) {
      // console.warn("Nie znaleziono żadnych produktów na liście."); // Potrzebne do debugowania
      return false;
    }

    const prices: number[] = [];
    for (let i = 0; i < productCount; i++) {
      const productInfo = await this.getProductInfo(i);
      const numericPrice = parseFloat(productInfo.price.replace(/[^0-9,.-]+/g, '').replace(',', '.'));
      prices.push(numericPrice);
    }

    // Sprawdź, czy lista jest posortowana, uwzględniając identyczne ceny
    for (let i = 1; i < prices.length; i++) {
      if (descending) {
        if (prices[i] > prices[i - 1]) {
          // console.warn(`Produkty nie są posortowane malejąco według ceny. Błąd przy indeksie ${i}: ${prices[i]} > ${prices[i - 1]}`); // Potrzebne do debugowania
          return false;
        }
      } else {
        if (prices[i] < prices[i - 1]) {
          // console.warn(`Produkty nie są posortowane rosnąco według ceny. Błąd przy indeksie ${i}: ${prices[i]} < ${prices[i - 1]}`); // Potrzebne do debugowania
          return false;
        }
      }
    }

    // console.log(`Produkty są posortowane ${descending ? "malejąco" : "rosnąco"} według ceny.`); // Potrzebne do debugowania
    return true;
  }
}
