import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { AccountPage } from "../pages/AccountPage";
import { AccountTestData } from "../testData/AccountTestData";
import { Page, Browser, chromium } from "playwright";

let page: Page;
let accountPage: AccountPage;
let browser: Browser;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  accountPage = new AccountPage(page);
});

After(async function () {
  await browser.close(); 
});

Given("Go to login page", async function () {
  await accountPage.navigateTo("https://fakestore.testelka.pl/moje-konto/");
});

When("Login with {string}", async function (accountType: string) {
  let accountData;

  switch (accountType) {
    case "CorrectEmailLogin":
      accountData = AccountTestData.CorrectEmailLogin;
      break;
    case "WrongEmailLogin":
      accountData = AccountTestData.WrongEmailLogin;
      break;
    default:
      throw new Error(`Account type ${accountType} is not recognized`);
  }
  await accountPage.showUserPassword(accountData);
});

Then( "I see password: {string}",
  async function (passwordValue: string) {
    await expect(page.locator('#password')).toHaveValue(`${passwordValue}`);
  }
);
