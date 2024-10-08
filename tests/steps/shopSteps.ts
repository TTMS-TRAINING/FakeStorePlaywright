import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { getPage, getShopPage } from '../hooks/testHook';

Given('Go to Shop page', async () => {
  const page = getPage();
  const shopPage = getShopPage(page);
  await shopPage.navigateTo('https://fakestore.testelka.pl/shop/');
});

When(`Click on {string}`, async (category: string) => {
  const page = getPage();
  const shopPage = getShopPage(page);

  switch (category) {
    case 'Windsurfing':
      await shopPage.goToWindsurfing();
      break;
    case 'Wspinaczka':
      await shopPage.goToClimbing();
      break;
    case 'Yoga i pilates':
      await shopPage.goToYoga();
      break;
    case 'Żeglarstwo':
      await shopPage.goToSailing();
      break;
    default:
      throw new Error(`Category ${category} is not recognized`);
  }
});

Then(`Should be rediredt to {string}`, async (url: string) => {
  const page = getPage();
  await expect(page.url()).toBe(`${url}`);
});

Then(`Then Category title {string} should be displayed`, async (categoryTitle: string) => {
  const page = getPage();
  await expect(page.getByRole('heading')).toBe(categoryTitle);
});
