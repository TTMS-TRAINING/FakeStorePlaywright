import { MainPage } from './MainPage';
import { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class WishlistPage extends MainPage {
  private wishlistNameEditButton: Locator;
  private wishlistName: Locator;
  private wishlistNameInput: Locator;
  private wishlistNameInputAcceptButton: Locator;
  private wishlistNameInputCancelButton: Locator;
  private productRows: Locator;
  private emptyWishlistMessage: Locator;
  private originalName = 'Oryginalna Nazwa';

  constructor(page: Page) {
    super(page);
    // Definiowanie lokatorów elementów strony
    this.wishlistNameEditButton = this.page.locator(
      '#yith-wcwl-form > div.wishlist-title-container > div.wishlist-title.wishlist-title-with-form > a'
    );
    this.wishlistName = this.page.locator(
      '#yith-wcwl-form > div.wishlist-title-container > div.wishlist-title.wishlist-title-with-form > h2'
    );
    this.wishlistNameInput = this.page.getByRole('textbox');
    this.wishlistNameInputAcceptButton = this.page.locator(
      '#yith-wcwl-form > div.wishlist-title-container > div.hidden-title-form > div > a.save-title-form > i'
    );
    this.wishlistNameInputCancelButton = this.page.locator(
      '#yith-wcwl-form > div.wishlist-title-container > div.hidden-title-form > div > a.hide-title-form'
    );
    this.emptyWishlistMessage = this.page.locator('td.wishlist-empty');
    this.productRows = this.page.locator("tbody.wishlist-items-wrapper tr[id^='yith-wcwl-row-']");
  }

  async clickWishlistEditButton() {
    await this.wishlistNameEditButton.waitFor({ state: 'visible' });
    await this.wishlistNameEditButton.click();
  }

  async changeWishlistName(newName: string) {
    await this.wishlistName.click();
    await this.wishlistNameInput.waitFor({ state: 'visible' });
    await this.wishlistNameInput.fill(newName);
    await this.wishlistNameInputAcceptButton.waitFor({ state: 'visible' });
    await this.wishlistNameInputAcceptButton.click();

    // Czekaj na aktualizację i sprawdź nową nazwę
    await this.wishlistName.waitFor({ state: 'visible' });
    const updatedName = await this.wishlistName.innerText();
    return updatedName.trim() === newName;
  }

  async cancelWishlistNameChange() {
    this.originalName = await this.wishlistName.innerText();
    await this.wishlistName.click();
    await this.wishlistNameInput.waitFor({ state: 'visible' });
    await this.wishlistNameInput.fill('Temporary Name');
    await this.wishlistNameInputCancelButton.waitFor({ state: 'visible' });
    await this.wishlistNameInputCancelButton.click();

    // Sprawdź, czy nazwa pozostała niezmieniona
    await this.wishlistName.waitFor({ state: 'visible' });
    const currentName = await this.wishlistName.innerText();
    return currentName.trim() === this.originalName;
  }

  async removeProduct(index: number) {
    await this.page.waitForSelector('#yith-wcwl-form > table', {
      state: 'visible',
      timeout: 30000,
    });
    const productRow = this.productRows.nth(index);
    const removeButton = productRow.locator('.product-remove .remove');

    await removeButton.waitFor({ state: 'visible', timeout: 60000 });
    await removeButton.click();
    await this.page.waitForSelector('div.woocommerce-message[role="alert"]:has-text("Produkt został usunięty.")');
    await this.page.reload();
  }

  async addProductToCart(index: number) {
    const productRow = this.productRows.nth(index);
    const addToCartButton = productRow.locator('.product-add-to-cart a.add_to_cart_button');

    // Oczekiwanie na widoczność przycisku "Dodaj do koszyka" i kliknięcie
    await addToCartButton.waitFor({ state: 'visible' });
    await addToCartButton.click();

    // Sprawdzenie przekierowania na stronę koszyka
    await this.page.waitForLoadState('load'); // Czeka na pełne załadowanie strony
    await expect(this.page).toHaveURL('https://fakestore.testelka.pl/koszyk/');
    //console.log('Produkt został dodany do koszyka, a przekierowanie na stronę koszyka powiodło się.');
  }

  async getProductInfo(index: number) {
    const productRow = this.productRows.nth(index);

    // Pobierz nazwę produktu
    const productName = await productRow.locator('.product-name a').innerText();

    // Pobierz cenę produktu (sprawdź, czy jest zarówno cena oryginalna, jak i aktualna)
    let productPrice = '';
    const originalPriceElement = productRow.locator('.product-price del .woocommerce-Price-amount');
    const currentPriceElement = productRow.locator('.product-price ins .woocommerce-Price-amount');

    if ((await currentPriceElement.count()) > 0) {
      productPrice = await currentPriceElement.innerText(); // Pobierz aktualną cenę
    } else {
      productPrice = await productRow.locator('.product-price .woocommerce-Price-amount').innerText(); // Pobierz cenę (jeśli tylko jedna jest dostępna)
    }

    // Pobierz status dostępności
    const productStockStatus = await productRow.locator('.product-stock-status .wishlist-in-stock').innerText();

    return {
      name: productName.trim(),
      price: productPrice.trim(),
      stockStatus: productStockStatus.trim(),
    };
  }

  async getProductCount(): Promise<number> {
    // Sprawdź, czy lista życzeń jest pusta
    if (await this.emptyWishlistMessage.isVisible()) {
      //console.log('Lista życzeń jest pusta.'); // Wypisz informację o pustej liście
      throw new Error('Lista życzeń jest pusta.');
    }

    // Poczekaj, aż wiersze produktów staną się widoczne
    await this.productRows.first().waitFor({ state: 'visible' });

    // Zwróć liczbę wierszy z produktami
    const count = await this.productRows.count();
    //console.log(`Liczba produktów na liście życzeń: ${count}`); // Wypisz liczbę produktów do konsoli
    return count;
  }

  async fillWishlist() {
    const productUrls = [
      'https://fakestore.testelka.pl/product/wspinaczka-island-peak/?add_to_wishlist=42&_wpnonce=0bd29d9ee6',
      'https://fakestore.testelka.pl/product/fuerteventura-sotavento/?add_to_wishlist=393&_wpnonce=109492b68d',
      'https://fakestore.testelka.pl/product/grecja-limnos/?add_to_wishlist=391&_wpnonce=109492b68d',
    ];

    for (const url of productUrls) {
      await this.page.goto(url);
      const addToWishlistLink = this.page.getByRole('link', {
        name: 'Dodaj do listy życzeń',
      });

      if (await addToWishlistLink.isVisible()) {
        await addToWishlistLink.click();
        await this.page.waitForSelector('#yith-wcwl-popup-message', {
          state: 'visible',
          timeout: 10000,
        });
        //console.log(`Dodano produkt z URL: ${url}`);
      } else {
        //console.warn(`Przycisk 'Dodaj do listy życzeń' nie jest widoczny dla URL: ${url}`);
      }
    }
    await this.page.goto('https://fakestore.testelka.pl/wishlist/');
    await this.page.reload();
  }

  async clearWishlist() {
    try {
      let productCount = await this.getProductCount();
      //console.log(`Usuwanie ${productCount} produktów z listy życzeń...`);

      // Kontynuuj usuwanie produktów, dopóki lista nie będzie pusta
      while (productCount > 0) {
        // Zawsze usuwaj pierwszy produkt, ponieważ po każdym usunięciu indeksy się przesuwają
        await this.removeProduct(0);

        // Odśwież liczbę produktów po każdym usunięciu
        productCount = await this.getProductCount();
        //console.log(`Pozostało ${productCount} produktów na liście życzeń.`);
      }

      //console.log('Wszystkie produkty zostały usunięte z listy życzeń.');
      //console.log('Lista życzeń została prawidłowo wyczyszczona.');
    } catch (error) {
      //console.log('Lista życzeń jest już pusta lub wystąpił problem podczas usuwania produktów.');
    }

    // Asercja sprawdzająca, czy lista jest pusta
    await expect(this.emptyWishlistMessage).toBeVisible();
  }
}
