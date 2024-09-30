import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { getAccountPage, getPage } from "../hooks/testHook";
import { AccountTestData } from "../testData/AccountTestData";

Given("Go to register page", async () => {
  const accountPage = getAccountPage();
  await accountPage.navigateTo("https://fakestore.testelka.pl/moje-konto/");
});

When("Register user using {string}", async (emailType: string) => {
  const accountPage = getAccountPage();
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

Then("Expected message should be displayed {string} {string}", async (expectedMessage: string, emailType: string) => {
  const page = getPage();
  await expect(page.getByText(`${expectedMessage}`)).toBeVisible();
  if (emailType === "NewEmail") {
    page.on('dialog', dialog => dialog.accept());
    await page.locator('.delete-me').click();
  }
});