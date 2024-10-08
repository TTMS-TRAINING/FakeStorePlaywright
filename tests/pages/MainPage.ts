import { Page, expect } from '@playwright/test';

export class MainPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Lokatory
  homeLink() {
    return this.page.locator('#menu-item-197').getByRole('link', { name: 'Strona główna' });
  }

  shopLink() {
    return this.page.locator('#menu-item-198').getByRole('link', { name: 'Sklep' });
  }

  orderLink() {
    return this.page.locator('#menu-item-199').getByRole('link', { name: 'Zamówienie' });
  }

  cartLink() {
    return this.page.locator('#menu-item-200').getByRole('link', { name: 'Koszyk' });
  }

  accountLink() {
    return this.page.locator('#menu-item-201').getByRole('link', { name: 'Moje konto' });
  }

  wishlistLink() {
    return this.page.locator('#menu-item-248').getByRole('link', { name: 'Lista życzeń' });
  }

  searchBox() {
    return this.page.getByRole('searchbox', { name: 'Szukaj:' });
  }

  // Metody interakcji
  async clickHome() {
    await this.homeLink().click();
    await this.page.waitForLoadState();
    expect(this.page.url()).toBe('https://fakestore.testelka.pl/');
  }

  async clickShop() {
    await this.shopLink().click();
    await this.page.waitForLoadState();
    await expect(this.page.url()).toBe('https://fakestore.testelka.pl/shop/');
  }

  async clickOrder() {
    await this.orderLink().click();
  }

  async clickCart() {
    await this.cartLink().click();
    await this.page.waitForLoadState();
    await expect(this.page.url()).toBe('https://fakestore.testelka.pl/koszyk/');
  }

  async clickAccount() {
    await this.accountLink().click();
    await this.page.waitForLoadState();
    await expect(this.page.url()).toBe('https://fakestore.testelka.pl/moje-konto/');
  }

  async clickWishlist() {
    // Oczekujemy na nową stronę (kartę)
    const [newPage] = await Promise.all([this.page.waitForEvent('popup'), this.wishlistLink().click()]);

    // Czekamy, aż nowa strona załaduje się w pełni
    await newPage.waitForLoadState();

    // Sprawdzamy, czy URL nowej strony jest prawidłowy
    await expect(newPage.url()).toBe('https://fakestore.testelka.pl/wishlist/');
  }

  async searchForItem(item: string) {
    await this.searchBox().fill(item);
    await this.searchBox().press('Enter');
  }
  async verifyWishlistOpensInNewTab() {
    const wishlist = this.wishlistLink();
    const targetAttribute = await wishlist.getAttribute('target');

    // Sprawdzamy, czy target ma wartość '_blank', co oznacza nową kartę
    expect(targetAttribute).toBe('_blank');
  }
}
