import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { AccountData } from '../models/AccountData';

export class AccountPage extends BasePage {
    private username!: Locator;
    private password!: Locator;
    private email!: Locator;
    private registerPassword!: Locator;
    private loginButton!: Locator;
    private registerButton!: Locator;
    private rememberMe!: Locator;
    private lostPassword!: Locator;

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

}