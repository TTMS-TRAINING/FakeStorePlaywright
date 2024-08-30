/*
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
//import { AccountData } from '../models/AccountData';

export class MainPage extends BasePage {



    constructor(page: Page) {
        super(page);
    }


//  await page.goto('https://fakestore.testelka.pl/');
  //a[@href='https://fakestore.testelka.pl'])[1]
  // await expect(page.locator('#menu-item-197')).toContainText('Strona główna');
  await page.getByRole('heading', { name: 'Wybierz podróż dla siebie!' }).click();
  await page.getByRole('heading', { name: 'Wybierz podróż dla siebie!' }).click();
  // await expect(page.locator('h1')).toContainText('Wybierz podróż dla siebie!');
  await page.getByText('Windsurfing, kolarstwo czy ż').click();
  // await expect(page.locator('#post-12')).toContainText('Windsurfing, kolarstwo czy żeglarstwo? Wybierz kategorię lub przeglądaj wszystkie oferty,');
  await page.getByRole('link', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Previous' }).click();
  await page.getByRole('link', { name: 'Previous' }).click();
  await page.getByRole('link', { name: 'Previous' }).click();
  await page.getByRole('link', { name: 'Wspinaczka Via Ferraty', exact: true }).click({
    button: 'right'
  });
  // await expect(page.locator('#metaslider_231')).toContainText('Next');
  await page.getByRole('link', { name: 'Previous' }).click();
  // await expect(page.getByLabel('Kategorie produktów')).toContainText('Kupuj wg kategorii');
  // await expect(page.getByLabel('Przejdź do kategorii produktu Windsurfing').getByRole('heading')).toContainText('Windsurfing (6)');
  // await expect(page.getByLabel('Przejdź do kategorii produktu Windsurfing')).toContainText('Windsurfing (6)');
  // await expect(page.getByLabel('Przejdź do kategorii produktu Wspinaczka')).toContainText('Wspinaczka (3)');
  await page.getByLabel('Przejdź do kategorii produktu Yoga i pilates').click();
  // await expect(page.getByLabel('Przejdź do kategorii produktu Yoga i pilates')).toContainText('Yoga i pilates (5)');
  // await expect(page.getByLabel('Najnowsze Produkty')).toContainText('Nowości');
  // await expect(page.getByLabel('Popularne produkty')).toContainText('Popularne');
  // await expect(page.getByLabel('Produkty w promocji')).toContainText('W promocji');
  // await expect(page.getByLabel('Bestsellery')).toContainText('Bestsellery');
  // await expect(page.getByLabel('Bestsellery')).toContainText('Bestsellery');
  // await expect(page.locator('#doc')).toContainText('Dokumentacja');
  // await expect(page.locator('#colophon')).toContainText('Polityka prywatności');
  // await expect(page.locator('#colophon')).toContainText('Stworzone z WooCommerce');

  // ---------------------
  await context.close();
  await browser.close();
})();
    /*
    private username: Locator;
    private password: Locator;
    private email: Locator;
    private registerPassword: Locator;
    private loginButton: Locator;
    private registerButton: Locator;
    private rememberMe: Locator;
    private lostPassword: Locator;

    constructor(page: Page) {
        super(page);
    }
    async initFields() {
        this.username = this.page.locator('#username');
        this.password = this.page.locator('#password');
        this.email = this.page.locator('#reg_email');
        this.registerPassword = this.page.locator('#reg_password');
        this.loginButton = this.page.getByRole('button', { name:'Zaloguj się'});
        this.registerButton = this.page.getByRole('button', { name:'Zarejestruj się'});
        this.rememberMe = this.page.locator('#rememberme');
        this.lostPassword = this.page.getByRole('link', { name: 'Nie pamiętasz hasła?' });
    }

    async login(account: AccountData) {
        this.initFields();
        await this.username.fill(account.username);
        await this.password.fill(account.password);
        await this.rememberMe.check();
        await this.loginButton.click();
    };

    */
//}