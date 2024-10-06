import { Before, After } from '@cucumber/cucumber';
import { Browser, chromium, Page } from 'playwright';
import { AccountPage } from '../pages/AccountPage';
import { ShopPage } from '../pages/ShopPage';

let browser: Browser;
let page: Page;
let accountPage: AccountPage;
let shopPage: ShopPage;

export const getBrowser = () => browser;
export const getPage = () => page;
export const getAccountPage = () => accountPage;
export const getShopPage = (page: Page) => {
  return new ShopPage(page);
};

Before(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  accountPage = new AccountPage(page);
  shopPage = new ShopPage(page);
});

After(async () => {
  await browser.close();
});
