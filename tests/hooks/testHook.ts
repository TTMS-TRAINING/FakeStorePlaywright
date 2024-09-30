import { Before, After } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "playwright";
import { AccountPage } from "../pages/AccountPage";

let browser: Browser;
let page: Page;
let accountPage: AccountPage;

export const getBrowser = () => browser;
export const getPage = () => page;
export const getAccountPage = () => accountPage;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  accountPage = new AccountPage(page);
});

After(async () => {
  await browser.close();
});