import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { AccountData } from '../models/AccountData';

export class BasketPage extends BasePage {
  private productRemove!: Locator;
  private productName!: Locator;
  private productPrice!: Locator;
  private productQuantity!: Locator;
  private productSubtotal!: Locator;
  private couponCode!: Locator;
  private applyCoupon!: Locator;
  private updateCart!: Locator;
  private checkoutButton!: Locator;
  private restoreItem!: Locator;

  constructor(page: Page) {
    super(page);
    this.productRemove = this.page.locator('.product-remove');
    this.productName = this.page.locator('product-name');
    this.productPrice = this.page.locator('product-price');
    this.productQuantity = this.page.locator('.input-text qty text');
    this.productSubtotal = this.page.locator('.woocommerce-Price-amount amount');
    this.couponCode = this.page.locator('#coupon_code');
    this.applyCoupon = this.page.getByRole('button', { name: 'apply_coupon' });
    this.updateCart = this.page.getByRole('button', { name: 'update_cart' });
    this.checkoutButton = this.page.locator('a.checkout-button.button.alt.wc-forward'); // Poprawiony lokalizator
    this.restoreItem = this.page.locator('.restore-item');
  }

  async clickProceedToCheckout() {
    await this.checkoutButton.click();
  }
}
