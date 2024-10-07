import { Page } from 'playwright';

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://fakestore.testelka.pl/koszyk/');
  }

  async applyDiscountCode(discountCode: string) {
    await this.page.fill('input[name="coupon_code"]', discountCode);
    await this.page.click('button[name="apply_coupon"]');
    await this.page.waitForSelector('.woocommerce-message, .woocommerce-error');  // Czekamy na wiadomość sukcesu lub błędu
  }

  async applyEmptyDiscountCode() {
    await this.page.click('button[name="apply_coupon"]');
    await this.page.waitForSelector('.woocommerce-error');  // Czekamy na wiadomość o błędzie
  }

  async isDiscountApplied(): Promise<boolean> {
    const message = await this.page.textContent('.woocommerce-message');
    return message?.includes('Kupon został pomyślnie zastosowany.') || false;
  }

  async getDiscountErrorMessage(): Promise<string | null> {
    const errorMessage = await this.page.textContent('.woocommerce-error');
    return errorMessage;
  }
}
