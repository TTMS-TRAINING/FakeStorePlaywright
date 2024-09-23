import { test, expect } from '@playwright/test';
import { WishlistPage } from './pages/WishlistPage';

test.describe('Testy strony wishlist', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://fakestore.testelka.pl/wishlist');
    });

    test('Wejście na stronę Whishlist', async ({ page }) => {
        const wishlistPage = new WishlistPage(page);
        await wishlistPage.clickWishlist();
        await expect(page).toHaveURL('https://fakestore.testelka.pl/wishlist/');
    });


});