import { Page } from '@playwright/test';

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
    }

    async clickShop() {
        await this.shopLink().click();
    }

    async clickOrder() {
        await this.orderLink().click();
    }

    async clickCart() {
        await this.cartLink().click();
    }

    async clickAccount() {
        await this.accountLink().click();
    }

    async clickWishlist() {
        await this.wishlistLink().click();
    }

    async searchForItem(item: string) {
        await this.searchBox().fill(item);
        await this.searchBox().press('Enter');
    }
}
