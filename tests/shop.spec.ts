import { test, expect } from '@playwright/test';
import { ShopPage } from './pages/ShopPage';
import { ProductCategoryUrls } from './testData/CategoryURL';

test.describe('Shop Page Tests', () => {
  let shopPage: ShopPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    await shopPage.navigateTo('https://fakestore.testelka.pl/shop/');
  });

  test('Check if `Windsurfing` redirect to correct URL', async ({ page }) => {
    await shopPage.goToWindsurfing();
    await expect(page.url()).toBe(ProductCategoryUrls.windsurfing);
  });

  test('Check if `Wspinaczka` redirect to correct URL', async ({ page }) => {
    await shopPage.goToClimbing();
    await expect(page.url()).toBe(ProductCategoryUrls.wspinaczka);
  });

  test('Check if `Yoga i pilates` redirect to correct URL', async ({ page }) => {
    await shopPage.goToYoga();
    await expect(page.url()).toBe(ProductCategoryUrls.yogaPilates);
  });

  test('Check if `Żeglarstwo` redirect to correct URL', async ({ page }) => {
    await shopPage.goToSailing();
    await expect(page.url()).toBe(ProductCategoryUrls.zeglarstwo);
  });
});
