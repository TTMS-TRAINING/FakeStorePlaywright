import { MainPage } from "./MainPage";
import { Locator, Page } from "@playwright/test";

export class WishlistPage extends MainPage {
  private wishlistNameEditButton: Locator;
  private wishlistName: Locator;
  private wishlistNameInput: Locator;
  private wishlistNameInputAcceptButton: Locator;
  private wishlistNameInputCancelButton: Locator;
  private productRows: Locator;

  // Przechowuj oryginalną nazwę listy życzeń
  private originalName = "Oryginalna Nazwa";

  constructor(page: Page) {
    super(page);

    // Definiowanie lokatorów elementów strony
    this.wishlistNameEditButton = this.page.locator(
      "#yith-wcwl-form > div.wishlist-title-container > div.wishlist-title.wishlist-title-with-form > a"
    );
    this.wishlistName = this.page.locator(
      "#yith-wcwl-form > div.wishlist-title-container > div.wishlist-title.wishlist-title-with-form > h2"
    );
    this.wishlistNameInput = this.page.getByRole("textbox");
    this.wishlistNameInputAcceptButton = this.page.locator(
      "#yith-wcwl-form > div.wishlist-title-container > div.hidden-title-form > div > a.save-title-form > i"
    );
    this.wishlistNameInputCancelButton = this.page.locator(
      "#yith-wcwl-form > div.wishlist-title-container > div.hidden-title-form > div > a.hide-title-form"
    );
    this.productRows = this.page.locator("tbody.wishlist-items-wrapper tr");
  }

  async clickWishlistEditButton() {
    await this.wishlistNameEditButton.waitFor({ state: "visible" });
    await this.wishlistNameEditButton.click();
  }

  async changeWishlistName(newName: string) {
    await this.wishlistName.click();
    await this.wishlistNameInput.waitFor({ state: "visible" });
    await this.wishlistNameInput.fill(newName);
    await this.wishlistNameInputAcceptButton.waitFor({ state: "visible" });
    await this.wishlistNameInputAcceptButton.click();

    // Czekaj na aktualizację i sprawdź nową nazwę
    await this.wishlistName.waitFor({ state: "visible" });
    const updatedName = await this.wishlistName.innerText();
    return updatedName.trim() === newName;
  }

  async cancelWishlistNameChange() {
    this.originalName = await this.wishlistName.innerText();
    await this.wishlistName.click();
    await this.wishlistNameInput.waitFor({ state: "visible" });
    await this.wishlistNameInput.fill("Temporary Name");
    await this.wishlistNameInputCancelButton.waitFor({ state: "visible" });
    await this.wishlistNameInputCancelButton.click();

    // Sprawdź, czy nazwa pozostała niezmieniona
    await this.wishlistName.waitFor({ state: "visible" });
    const currentName = await this.wishlistName.innerText();
    return currentName.trim() === this.originalName;
  }

  async removeProduct(index: number) {
    const productRow = this.productRows.nth(index);
    const removeButton = productRow.locator(".product-remove .remove");

    await removeButton.waitFor({ state: "visible", timeout: 60000 });
    await removeButton.click();
    await this.page.waitForSelector(
      'div.woocommerce-message[role="alert"]:has-text("Produkt został usunięty.")'
    );
  }

  async addProductToCart(index: number) {
    const productRow = this.productRows.nth(index);
    const addToCartButton = productRow.locator(
      ".product-add-to-cart a.add_to_cart_button"
    );

    await addToCartButton.waitFor({ state: "visible" });
    await addToCartButton.click();
  }

  async getProductInfo(index: number) {
    const productRow = this.productRows.nth(index);
    const productName = await productRow.locator(".product-name a").innerText();
    const productPrice = await productRow.locator(".product-price").innerText();
    const productStockStatus = await productRow
      .locator(".product-stock-status .wishlist-in-stock")
      .innerText();

    return {
      name: productName.trim(),
      price: productPrice.trim(),
      stockStatus: productStockStatus.trim(),
    };
  }

  async getProductCount() {
    await this.productRows.first().waitFor({ state: "visible" });
    return await this.productRows.count();
  }

  async fillWishlist() {
    const productUrls = [
      "https://fakestore.testelka.pl/product/wspinaczka-island-peak/?add_to_wishlist=42&_wpnonce=0bd29d9ee6",
      "https://fakestore.testelka.pl/product/fuerteventura-sotavento/?add_to_wishlist=393&_wpnonce=109492b68d",
      "https://fakestore.testelka.pl/product/grecja-limnos/?add_to_wishlist=391&_wpnonce=109492b68d",
    ];

    for (const url of productUrls) {
      await this.page.goto(url);
      const addToWishlistLink = this.page.getByRole("link", {
        name: "Dodaj do listy życzeń",
      });

      if (await addToWishlistLink.isVisible()) {
        await addToWishlistLink.click();
        //console.log(`Dodano produkt z URL: ${url}`);
      } else {
        //console.warn(`Przycisk 'Dodaj do listy życzeń' nie jest widoczny dla URL: ${url}`);
      }
    }
    await this.page.goto("https://fakestore.testelka.pl/wishlist/");
  }

  async clearWishlist() {
    await this.page.goto("https://fakestore.testelka.pl/wishlist/");
    const productCount = await this.getProductCount();

    for (let i = 0; i < productCount; i++) {
      await this.removeProduct(0);
      await this.page.waitForSelector(
        'div.woocommerce-message[role="alert"]:has-text("Produkt został usunięty.")'
      );
    }
  }
}
