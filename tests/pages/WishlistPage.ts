import { MainPage } from './MainPage';
import { Locator, Page } from '@playwright/test';

export class WishlistPage extends MainPage {
    private wishlistNameEditButton: Locator;
    private wishlistName: Locator;
    private wishlistNameInput: Locator;
    private wishlistNameInputAcceptButton: Locator;
    private wishlistNameInputCancelButton: Locator;
    private productRows: Locator;

    // Przechowuj oryginalną nazwę i nową nazwę jako stałe
    private originalName = 'Oryginalna Nazwa'; // Ustal oryginalną nazwę

    constructor(page: Page) {
        super(page);

        // Definiowanie lokatorów elementów strony
        this.wishlistNameEditButton = this.page.locator('#yith-wcwl-form > div.wishlist-title-container > div.wishlist-title.wishlist-title-with-form > a');
        this.wishlistName = this.page.locator('#yith-wcwl-form > div.wishlist-title-container > div.wishlist-title.wishlist-title-with-form > h2');
        this.wishlistNameInput = this.page.getByRole('textbox');
        this.wishlistNameInputAcceptButton = this.page.locator('#yith-wcwl-form > div.wishlist-title-container > div.hidden-title-form > div > a.save-title-form > i');
        this.wishlistNameInputCancelButton = this.page.locator('#yith-wcwl-form > div.wishlist-title-container > div.hidden-title-form > div > a.hide-title-form');
        this.productRows = this.page.locator('tbody.wishlist-items-wrapper tr'); // Lokator dla wszystkich wierszy produktów
    }

    // Metoda kliknięcia przycisku edycji nazwy listy życzeń
    async clickWishlistEditButton() {
        await this.wishlistNameEditButton.waitFor({ state: 'visible' });
        await this.wishlistNameEditButton.click();
    }

    // Metoda zmiany nazwy listy życzeń
    async changeWishlistName(newName: string) {
        console.log('Kliknięcie na element wishlistName');
        await this.wishlistName.click();
        console.log('Pole tekstowe powinno być widoczne');
        await this.wishlistNameInput.waitFor({ state: 'visible' });

        // Wypełnij nową nazwę podaną jako parametr
        console.log(`Zmiana nazwy listy życzeń na: ${newName}`);
        await this.wishlistNameInput.fill(newName);
        await this.wishlistNameInputAcceptButton.waitFor({ state: 'visible' });
        await this.wishlistNameInputAcceptButton.click();

        // Czekaj na aktualizację i sprawdź nową nazwę
        await this.wishlistName.waitFor({ state: 'visible' });
        const updatedName = await this.wishlistName.innerText();
        return updatedName.trim() === newName; // Zwraca true, jeśli nazwa została zmieniona
    }

    // Metoda anulowania zmiany nazwy listy życzeń
    async cancelWishlistNameChange() {
        this.originalName = await this.wishlistName.innerText();
        await this.wishlistName.click();
        await this.wishlistNameInput.waitFor({ state: 'visible' });

        // Wypełnij pole tekstowe nową wartością (możesz użyć innej wartości)
        await this.wishlistNameInput.fill('Temporary Name');
        await this.wishlistNameInputCancelButton.waitFor({ state: 'visible' });
        await this.wishlistNameInputCancelButton.click();

        // Sprawdź, czy nazwa pozostała niezmieniona
        await this.wishlistName.waitFor({ state: 'visible' });
        const currentName = await this.wishlistName.innerText();
        return currentName.trim() === this.originalName; // Zwraca true, jeśli nazwa pozostała niezmieniona
    }

    // Metoda do usuwania produktu z listy życzeń
    async removeProduct(index: number) {
        const productRow = this.productRows.nth(index); // Wybór konkretnego wiersza na podstawie indeksu
        const removeButton = productRow.locator('.product-remove .remove');

        await removeButton.waitFor({ state: 'visible', timeout: 60000 });
        await removeButton.click();
    }

    // Metoda do dodawania produktu do koszyka
    async addProductToCart(index: number) {
        const productRow = this.productRows.nth(index); // Wybór konkretnego wiersza na podstawie indeksu
        const addToCartButton = productRow.locator('.product-add-to-cart a.add_to_cart_button');

        await addToCartButton.waitFor({ state: 'visible' });
        await addToCartButton.click();
    }

    // Metoda do uzyskiwania informacji o produkcie
    async getProductInfo(index: number) {
        const productRow = this.productRows.nth(index);
        const productName = await productRow.locator('.product-name a').innerText();
        const productPrice = await productRow.locator('.product-price').innerText();
        const productStockStatus = await productRow.locator('.product-stock-status .wishlist-in-stock').innerText();

        return {
            name: productName.trim(),
            price: productPrice.trim(),
            stockStatus: productStockStatus.trim(),
        };
    }

    // Metoda do sprawdzania liczby produktów
    async getProductCount() {
        // Czekaj, aż elementy w tabeli będą widoczne
        await this.productRows.first().waitFor({ state: 'visible' });
        const count = await this.productRows.count();
        return count;
    }

    // Metoda wypełniania listy życzeń
    async fillWishlist() {
        const productUrls = [
            'https://fakestore.testelka.pl/product/wspinaczka-island-peak/?add_to_wishlist=42&_wpnonce=0bd29d9ee6',
            'https://fakestore.testelka.pl/product/fuerteventura-sotavento/?add_to_wishlist=393&_wpnonce=109492b68d',
            'https://fakestore.testelka.pl/product/grecja-limnos/?add_to_wishlist=391&_wpnonce=109492b68d',
        ];

        for (const url of productUrls) {
            await this.page.goto(url); // Przejdź do URL

            const addToWishlistLink = this.page.getByRole('link', { name: 'Dodaj do listy życzeń' });

            // Sprawdź, czy przycisk jest widoczny
            if (await addToWishlistLink.isVisible()) {
                await addToWishlistLink.click(); // Kliknij, jeśli widoczny
                console.log(`Dodano produkt z URL: ${url}`);
            } else {
                console.warn(`Przycisk 'Dodaj do listy życzeń' nie jest widoczny dla URL: ${url}`);
            }
        }
        await this.page.goto('https://fakestore.testelka.pl/wishlist/');
    }

    // Metoda usuwania wszystkich produktów z listy życzeń
    async clearWishlist() {
        await this.page.goto('https://fakestore.testelka.pl/wishlist/');
        const productCount = await this.getProductCount(); // Sprawdzenie liczby produktów

        for (let i = 0; i < productCount; i++) {
            await this.removeProduct(0); // Usunięcie pierwszego produktu
            // Po usunięciu produktu, liczba produktów się zmienia, więc zawsze usuwamy "0" (pierwszy)
            await this.page.waitForTimeout(1000); // Opcjonalne opóźnienie, aby upewnić się, że usunięcie się zakończyło
        }
    }
}