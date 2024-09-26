import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { getAccountPage, getPage } from "../hooks/testHook";
import { AccountTestData } from "../testData/AccountTestData";

Given("I am on the account login page", async () => {
  const accountPage = getAccountPage();
  await accountPage.navigateTo("https://fakestore.testelka.pl/moje-konto/");
});

When("I login with {string}", async (accountType: string) => {
  const accountPage = getAccountPage();
  let accountData;

  switch (accountType) {
    case "CorrectEmailLogin":
      accountData = AccountTestData.CorrectEmailLogin;
      break;
    case "WrongEmailLogin":
      accountData = AccountTestData.WrongEmailLogin;
      break;
    case "NotRegisteredEmail":
      accountData = AccountTestData.NotRegisteredEmail;
      break;
    case "CorrectLogin":
      accountData = AccountTestData.CorrectLogin;
      break;
    case "WrongLogin":
      accountData = AccountTestData.WrongLogin;
      break;
    case "NotRegistered":
      accountData = AccountTestData.NotRegistered;
      break;
    default:
      throw new Error(`Account type ${accountType} is not recognized`);
  }
  await accountPage.login(accountData);
});

Then("I should see message containing: {string}", async (expectedResult: string) => {
  const page = getPage();
  await expect(page.getByText(`${expectedResult}`)).toBeVisible();
});