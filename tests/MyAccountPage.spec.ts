import { test, expect } from '@playwright/test';
import { StorePage } from './pages/StorePage';
import { MyAccountPage } from './pages/MyAccountPage';
import { myAccountData } from './testData/MyAccountData';
import { AccountPage } from './pages/AccountPage';
import { AccountTestData } from './testData/AccountTestData';

const myAccountURL = 'https://fakestore.testelka.pl/moje-konto/';
const billingAddressURL = 'https://fakestore.testelka.pl/moje-konto/edytuj-adres/rozliczeniowy/';
const editAccountURL = 'https://fakestore.testelka.pl/moje-konto/edytuj-konto/'
const shippingAddressURL = 'https://fakestore.testelka.pl/moje-konto/edytuj-adres/przesylki/';

test.describe('Tworzenie konta', () => {
  test.setTimeout(60000);

  test('Tworzenie konta', async ({ page }) => {
    let accountPage: AccountPage;
    accountPage = new AccountPage(page);
    await page.goto(myAccountURL);
    await accountPage.register(AccountTestData.TestUserMyAccount);
  });

  /*   test('Sprawdzanie formatu pól', async ({ page }) => {
      const myAccountPage = new MyAccountPage(page);
      await myAccountPage.assertEmailFormat();
      //await myAccountPage.assertPasswordRequired(); - add pass field check?
    }); */
});

test.describe('Adres rozliczeniowy', () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    let accountPage: AccountPage;
    accountPage = new AccountPage(page);
    await page.goto(myAccountURL);
    await accountPage.login(AccountTestData.TestUserMyAccount);
    await page.goto(billingAddressURL);
  });

  test('Pomyslne wypełnienie danych konta', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);

    // Wypełniamy prawidłowo dane konta korzystając z danych z pliku MyAccountData
    await myAccountPage.fillAccountDetails(
      myAccountData.accountDetailsValid.firstName,
      myAccountData.accountDetailsValid.lastName,
      myAccountData.accountDetailsValid.company,
      myAccountData.accountDetailsValid.country,
      myAccountData.accountDetailsValid.address,
      myAccountData.accountDetailsValid.address2,
      myAccountData.accountDetailsValid.postcode,
      myAccountData.accountDetailsValid.city,
      myAccountData.accountDetailsValid.phone,
      myAccountData.accountDetailsValid.email,
    );
    await myAccountPage.clickSaveAddress();

    await myAccountPage.checkBillingAddress(
      myAccountData.accountDetailsValid.firstName,
      myAccountData.accountDetailsValid.lastName,
      myAccountData.accountDetailsValid.company,
      myAccountData.accountDetailsValid.country,
      myAccountData.accountDetailsValid.address,
      myAccountData.accountDetailsValid.address2,
      myAccountData.accountDetailsValid.postcode,
      myAccountData.accountDetailsValid.city,
    );

  });

  // assert that entered data is there

  test('Sprawdzanie pustych pól', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.assertFirstNameRequired();
    await myAccountPage.assertLastNameRequired();
    await myAccountPage.assertAdressRequired();
    await myAccountPage.assertCityFieldRequired();
    //await myAccountPage.assertEmailRequired();

  });

  test('Sprawdzanie formatu pól', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.assertPostalCodeFormat();
    await myAccountPage.assertPhoneNumberFormat();
    await myAccountPage.assertEmailFormat();
  });
});

test.describe('Adres do wysyłki', () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    let accountPage: AccountPage;
    accountPage = new AccountPage(page);
    //const storePage = new StorePage(page);
    await page.goto(myAccountURL);
    await accountPage.login(AccountTestData.TestUserMyAccount);
    await page.goto(shippingAddressURL);
    await expect(page).toHaveURL(shippingAddressURL);
  });

  test('Pomyslne wypełnienie danych konta', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);

    // Wypełniamy prawidłowo dane konta korzystając z danych z pliku MyAccountData
    await myAccountPage.fillAccountDetails(
      myAccountData.accountDetailsValid.firstName,
      myAccountData.accountDetailsValid.lastName,
      myAccountData.accountDetailsValid.company,
      myAccountData.accountDetailsValid.country,
      myAccountData.accountDetailsValid.address,
      myAccountData.accountDetailsValid.address2,
      myAccountData.accountDetailsValid.postcode,
      myAccountData.accountDetailsValid.city,
      myAccountData.accountDetailsValid.phone,
      myAccountData.accountDetailsValid.email,
    );
    await myAccountPage.clickSaveAddress();

    await myAccountPage.checkShippingAddress(
      myAccountData.accountDetailsValid.firstName,
      myAccountData.accountDetailsValid.lastName,
      myAccountData.accountDetailsValid.company,
      myAccountData.accountDetailsValid.country,
      myAccountData.accountDetailsValid.address,
      myAccountData.accountDetailsValid.address2,
      myAccountData.accountDetailsValid.postcode,
      myAccountData.accountDetailsValid.city,
    );

  });

  // assert that entered data is there:
  // https://fakestore.testelka.pl/moje-konto/edytuj-adres/

  test('Sprawdzanie pustych pól', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.assertFirstNameRequired();
    await myAccountPage.assertLastNameRequired();
    await myAccountPage.assertAdressRequired();
    await myAccountPage.assertCityFieldRequired();
  });

  test('Sprawdzanie formatu pól', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.assertPostalCodeFormat();
  });
});

test.describe('Edycja konta', () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    let accountPage: AccountPage;
    accountPage = new AccountPage(page);
    await page.goto(myAccountURL);
    await accountPage.login(AccountTestData.TestUserMyAccount);
    await accountPage.navigateTo(editAccountURL);
    await expect(page).toHaveURL(editAccountURL);
  });

  test('Pomyslne wypełnienie danych konta', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);

    // Wypełniamy prawidłowo dane konta korzystając z danych z pliku MyAccountData
    await myAccountPage.fillAccountEditDetails(
      myAccountData.accountDetailsValid.firstName,
      myAccountData.accountDetailsValid.lastName,
      myAccountData.accountDetailsValid.displayName,
      myAccountData.accountDetailsValid.email
    );
    await myAccountPage.clickSaveChanges();
  });

  test('Sprawdzenie nazwy użytkownika', async ({ page }) => {
    const displayNameWelcome = page.locator('p').getByText('Witaj');
    const displayNameField = page.locator('#account_display_name');
    await expect(displayNameField).toHaveValue(myAccountData.accountDetailsValid.displayName);// nie wiem czemu zwraca puste pole displayNameField
    await page.goto(myAccountURL);
    await expect(displayNameWelcome).toContainText(myAccountData.accountDetailsValid.displayName);
  });

  test('Sprawdzanie pustych pól', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.assertFirstNameRequired();
    await myAccountPage.assertLastNameRequired();
    await myAccountPage.assertDisplayNameRequired();
    await myAccountPage.assertEmailRequired();
  });
  test('Sprawdzanie formatu pól', async ({ page }) => {
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.assertEmailFormat();
  });
});

test.describe('Usuwanie konta', () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    let accountPage: AccountPage;
    accountPage = new AccountPage(page);
    await page.goto(myAccountURL);
    await accountPage.login(AccountTestData.TestUserMyAccount);
  });

  test('Usuwanie konta', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept());
    await page.locator('.delete-me').click();
  });
});