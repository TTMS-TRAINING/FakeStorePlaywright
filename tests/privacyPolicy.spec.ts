import { test, expect } from '@playwright/test';
import { AccountTestData } from './testData/AccountTestData'; 
import { MainPage } from './pages/MainPage'; 
import { AccountPage } from './pages/AccountPage'; 

test.describe('Check privacy policy page', () => {
    let accountPage: AccountPage;

    test.beforeEach(async ({ page }) => {
        accountPage = new AccountPage(page);
        await accountPage.navigateTo('https://fakestore.testelka.pl/moje-konto/');
    });
    
    test('Click and Check', async ({ page }) => {

        await accountPage.register(AccountTestData.CorrectEmailLogin);
        await accountPage.privacyPolicy.click();

        await expect(page).toHaveURL('https://fakestore.testelka.pl/polityka-prywatnosci/');
        await expect(page.getByText('Jakie dane osobiste zbieramy i dlaczego je zbieramy')).toBeVisible();

    });
});
