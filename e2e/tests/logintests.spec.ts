import { test, expect } from '@playwright/test';
import { AccountPage } from '../pages/AccountPage';
import { AccountData } from '../models/AccountData';
import { AccountTestData } from '../testData/AccountTestData';

test.describe('Account Page Tests', () => {
    let accountPage: AccountPage;

    test.beforeEach(async ({ page }) => {
        accountPage = new AccountPage(page);
        await accountPage.navigateTo('https://fakestore.testelka.pl/moje-konto/');
    });

    test('correct email login', async ({ page }) => {
        await accountPage.login(AccountTestData.CorrectEmailLogin);
        await expect(page.getByText('Witaj')).toBeVisible();
    });

    test('wrong email login', async ({ page }) => {
        await accountPage.login(AccountTestData.WrongEmailLogin);
        await expect(page.getByText('Błąd: dla adresu e-mail '+AccountTestData.WrongEmailLogin.username+' podano nieprawidłowe hasło. Nie pamiętasz hasła?')).toBeVisible();
    });
    test('not registered user email', async ({ page }) => {
        await accountPage.login(AccountTestData.NotRegisteredEmail);
        await expect(page.getByText('Nieznany adres e-mail. Proszę sprawdzić ponownie lub wypróbować swoją nazwę użytkownika.')).toBeVisible;
    });
    test('correct login', async ({ page }) => {
        await accountPage.login(AccountTestData.CorrectLogin);
        await expect(page.getByText('Witaj')).toBeVisible();
    });
    test('wrong login', async ({ page }) => {
        await accountPage.login(AccountTestData.WrongLogin);
        await expect(page.getByText('Błąd: wpisano niepoprawne hasło dla użytkownika '+AccountTestData.WrongLogin.username+'. Nie pamiętasz hasła?')).toBeVisible();
    });
    test('not registered user', async ({ page }) => {
        await accountPage.login(AccountTestData.NotRegistered);
        await expect(page.getByText('Błąd: brak '+AccountTestData.NotRegistered.username+' wśród zarejestrowanych w witrynie użytkowników. Jeśli nie masz pewności co do nazwy użytkownika, użyj adresu e-mail.')).toBeVisible;
    });
});