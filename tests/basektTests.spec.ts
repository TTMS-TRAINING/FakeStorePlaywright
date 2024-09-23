import { test, expect } from '@playwright/test';
import { AccountPage } from './pages/AccountData';
import { AccountData } from './models/AccountData';
import { AccountTestData } from './testData/AccountTestData';



test.describe('Account Page Tests', () => {
    let accountPage: AccountPage;

    test.beforeEach(async ({ page }) => {
        accountPage = new AccountPage(page);
        await accountPage.navigateTo('https://fakestore.testelka.pl/moje-konto/');
    });

    test('correct email login', async ({ page }) => {
        await accountPage.login(AccountTestData.CorrectEmailLogin);
        await expect(page.getByText('Witaj')).toBeVisible();
        await page.locator('#menu-item-198').getByRole('link', { name: 'Sklep' }).click();
        await page.getByLabel('Przejdź do kategorii produktu Windsurfing').click();
        await page.getByLabel('Dodaj do koszyka: „Egipt - El').click();
        await page.locator('#menu-item-200').getByRole('link', { name: 'Koszyk' }).click();
        // await expect(page.getByRole('strong')).toContainText('3 400,00 zł');

        await expect(page.locator('xpath=//*[@id="post-6"]/div/div/form/table/tbody/tr[1]/td[5]/div/input')).toHaveValue('6');
    });

});