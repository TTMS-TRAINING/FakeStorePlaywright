import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { AccountData } from '../models/AccountData';
import { AccountTestData } from '../testData/AccountTestData';

export class AccountPage extends BasePage {
    private username!: Locator;
    private password!: Locator;
    private email!: Locator;
    private registerPassword!: Locator;
    private loginButton!: Locator;
    private registerButton!: Locator;
    private rememberMe!: Locator;
    private lostPassword!: Locator;
    private showPassword!: Locator;
    public privacyPolicy!: Locator;

    constructor(page: Page) {
        super(page);
        this.initFields();
    }
    async initFields() {
        this.username = this.page.locator('#username');
        this.password = this.page.locator('#password');
        this.email = this.page.locator('#reg_email');
        this.registerPassword = this.page.locator('#reg_password');
        this.loginButton = this.page.getByRole('button', { name: 'Zaloguj się' });
        this.registerButton = this.page.getByRole('button', { name: 'Zarejestruj się' });
        this.rememberMe = this.page.locator('#rememberme');
        this.lostPassword = this.page.getByRole('link', { name: 'Nie pamiętasz hasła?' });
        this.showPassword = this.page.locator('.show-password-input').first();
        this.privacyPolicy = this.page.locator('.privacy-policy-link');
    }
    async login(account: AccountData) {
        await this.username.fill(account.username);
        await this.password.fill(account.password);
        await this.rememberMe.check();
        await this.loginButton.click();
    };

    async showUserPassword(account: AccountData) {
        await this.username.fill(account.username);
        await this.password.fill(account.password);
        await this.showPassword.click();
    };

    async register(account: AccountData) {
        await this.email.fill(account.email);
        await this.registerPassword.fill(account.registerPassword);
        await this.page.keyboard.press("Enter");
    }
};
