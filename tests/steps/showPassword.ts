import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { getAccountPage, getPage } from "../hooks/testHook";
import { AccountTestData } from "../testData/AccountTestData";

Given("Go to login page", async () => {
  const accountPage = getAccountPage();
  await accountPage.navigateTo("https://fakestore.testelka.pl/moje-konto/");
});

When("Login with {string}", async (accountType: string) => {
  const accountPage = getAccountPage();
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

Then("I see password: {string}", async (passwordValue: string) => {
  const page = getPage();
  await expect(page.locator('#password')).toHaveValue(`${passwordValue}`);
});