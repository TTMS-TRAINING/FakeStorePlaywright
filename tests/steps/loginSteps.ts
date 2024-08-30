import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { AccountPage } from '../pages/AccountPage';
import { AccountTestData } from "../testData/AccountTestData";
import { Page, Browser, chromium } from 'playwright';

let page: Page;
let accountPage: AccountPage;
let browser: Browser;

Before(async function () {
  browser = await chromium.launch({ headless: false }); // Uruchom przeglądarkę przed każdym testem
  page = await browser.newPage();
  accountPage = new AccountPage(page);
});

After(async function () {
  await browser.close(); // Zamknij przeglądarkę po każdym teście
});

Given('I am on the account login Page', async function () {
  await accountPage.navigateTo("https://fakestore.testelka.pl/moje-konto/");
});

When('I login with correct email credentials', async function () {
  await accountPage.login(AccountTestData.CorrectEmailLogin);
});

Then('I should see the dashboard welcome message', async function () {
  await expect(page.getByText("Witaj")).toBeVisible();
});
