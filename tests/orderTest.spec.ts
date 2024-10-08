import { test, expect } from '@playwright/test';
import { AccountTestData } from './testData/AccountTestData';
import { PaymentTestData } from './testData/PaymentTestData';
import { AccountPage } from './pages/AccountPage';
import { OrderPage } from './pages/OrderPage';
import { MainPage } from './pages/MainPage';

// Logowanie
test.beforeEach(async ({ page }) => {
  await page.goto('https://fakestore.testelka.pl/moje-konto/');
  const accountPage = new AccountPage(page);
  await accountPage.login(AccountTestData.CorrectEmailLogin);
});

test('Test order page', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.clickOrder();

  const orderPage = new OrderPage(page);
  await orderPage.FillPersonalData(PaymentTestData.CorrectPersonalData);
  //await orderPage.FillCardData(PaymentTestData.CorrectCardData);
});
