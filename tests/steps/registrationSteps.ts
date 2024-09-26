import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { AccountPage } from "../pages/AccountPage";
import { AccountTestData } from "../testData/AccountTestData";
import { Page, Browser, chromium } from "playwright";

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

Given("Go to register page", async function () {
  await accountPage.navigateTo("https://fakestore.testelka.pl/moje-konto/");
});

When("Register user using {string}", async function (emailType: string) {
  let accountData;

  switch (emailType) {
    case "NewEmail":
      accountData = AccountTestData.NewEmail;
      break;
    case "ExistingEmail":
      accountData = AccountTestData.ExistingEmail;
      break;
    case "NotCorrectEmail":
      accountData = AccountTestData.NotCorrectEmail;
      break;
    case "WeakPassword":
      accountData = AccountTestData.WeakPassword;
      break;
    default:
      throw new Error(`Account type ${emailType} is not recognized`);
  }
  await accountPage.register(accountData);
});

Then("Expected message should be displayed {string} {string}",
  async function (expectedMessage: string, emailType: string) {
    await expect(page.getByText(`${expectedMessage}`)).toBeVisible();
    if (emailType == "NewEmail") {
      await page.on('dialog', dialog => dialog.accept());
      await page.locator('.delete-me').click();
    }
  }
);
