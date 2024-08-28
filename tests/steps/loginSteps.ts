import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AccountPage } from '../pages/AccountPage';
import { AccountTestData } from '../testData/AccountTestData';
import { Page, Browser, chromium } from 'playwright';

let page: Page;
let accountPage: AccountPage;
let browser: Browser;

Given('I am on the account login page', async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    accountPage = new AccountPage(page);
    await accountPage.navigateTo('https://fakestore.testelka.pl/moje-konto/');
});

When('I login with correct email credentials', async function () {
    await accountPage.login(AccountTestData.CorrectEmailLogin);
});

When('I login with incorrect email credentials', async function () {
    await accountPage.login(AccountTestData.WrongEmailLogin);
});

When('I try to login with a non-registered email', async function () {
    await accountPage.login(AccountTestData.NotRegisteredEmail);
});

When('I login with correct username credentials', async function () {
    await accountPage.login(AccountTestData.CorrectLogin);
});

When('I login with incorrect username credentials', async function () {
    await accountPage.login(AccountTestData.WrongLogin);
});

When('I try to login with a non-registered username', async function () {
    await accountPage.login(AccountTestData.NotRegistered);
});

Then('I should see the dashboard welcome message', async function () {
    await expect(page.getByText('Witaj')).toBeVisible();
    await browser.close();
});

Then('I should see an error message for incorrect email login', async function () {
    const errorMessage = 'Błąd: dla adresu e-mail ' + AccountTestData.WrongEmailLogin.username + ' podano nieprawidłowe hasło. Nie pamiętasz hasła?';
    await expect(page.getByText(errorMessage)).toBeVisible();
    await browser.close();
});

Then('I should see an error message for non-registered email', async function () {
    const errorMessage = 'Nieznany adres e-mail. Proszę sprawdzić ponownie lub wypróbować swoją nazwę użytkownika.';
    await expect(page.getByText(errorMessage)).toBeVisible();
    await browser.close();
});

Then('I should see an error message for incorrect username login', async function () {
    const errorMessage = 'Błąd: wpisano niepoprawne hasło dla użytkownika ' + AccountTestData.WrongLogin.username + '. Nie pamiętasz hasła?';
    await expect(page.getByText(errorMessage)).toBeVisible();
    await browser.close();
});

Then('I should see an error message for non-registered username', async function () {
    const errorMessage = 'Błąd: brak ' + AccountTestData.NotRegistered.username + ' wśród zarejestrowanych w witrynie użytkowników. Jeśli nie masz pewności co do nazwy użytkownika, użyj adresu e-mail.';
    await expect(page.getByText(errorMessage)).toBeVisible();
    await browser.close();
});