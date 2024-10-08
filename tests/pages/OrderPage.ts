import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { PersonalData, CardData } from '../models/PaymentData';
import { PaymentTestData } from '../testData/PaymentTestData';

export class OrderPage extends BasePage {
  private clickToLogin!: Locator;
  private addCoupons!: Locator;
  private couponsField!: Locator;
  private applyCoupon!: Locator;
  private name!: Locator;
  private surname!: Locator;
  private companyName!: Locator;
  //public country!: Locator;
  private street_1!: Locator;
  private street_2!: Locator;
  private postalCode!: Locator;
  private city!: Locator;
  private phoneNumber!: Locator;
  private email!: Locator;
  //private createAcc!: Locator;
  private orderNotes!: Locator;
  private cardNumber!: Locator;
  private cardExpirationDate!: Locator;
  private cardCVC!: Locator;
  private savePaymentsData!: Locator;
  private acceptStatute!: Locator;
  private buyAndPay!: Locator;

  constructor(page: Page) {
    super(page);
    this.initFields();
  }
  async initFields() {
    //Login
    this.clickToLogin = this.page.locator('.showlogin');
    //Coupons
    this.addCoupons = this.page.locator('.showcoupon');
    this.couponsField = this.page.locator('#coupon_code');
    this.applyCoupon = this.page.getByText('Zastosuj kupon');
    //Personal data
    this.name = this.page.locator('#billing_first_name');
    this.surname = this.page.locator('#billing_last_name');
    this.companyName = this.page.locator('#billing_company');
    //this.country = this.page.locator('#select2-billing_country-container');
    this.street_1 = this.page.locator('#billing_address_1');
    this.street_2 = this.page.locator('#billing_address_2');
    this.postalCode = this.page.locator('#billing_postcode');
    this.city = this.page.locator('#billing_city');
    this.phoneNumber = this.page.locator('#billing_phone');
    this.email = this.page.locator('#billing_email');
    //this.createAcc = this.page.locator('#createaccount');
    this.orderNotes = this.page.locator('#order_comments');
    //Card data
    this.cardNumber = this.page.locator('#stripe-card-element');
    this.cardExpirationDate = this.page.locator('#stripe-exp-element');
    this.cardCVC = this.page.locator('#stripe-cvc-element');
    this.savePaymentsData = this.page.locator('#wc-stripe-new-payment-method');
    //Buy
    this.acceptStatute = this.page.locator('#terms');
    this.buyAndPay = this.page.locator('#place_order');
  }

  async AddCoupons(coupon: string) {
    await this.addCoupons.click();
    await this.couponsField.fill(coupon);
    await this.applyCoupon.click();
    //Check documentation at page to get coupons info
  }

  async FillPersonalData(personalData: PersonalData) {
    await this.name.fill(personalData.name);
    await this.surname.fill(personalData.surname);
    await this.companyName.fill(personalData.companyName);
    //await this.country.selectOption({label: personalData.country});
    await this.street_1.fill(personalData.street_1);
    await this.street_2.fill(personalData.street_2);
    await this.postalCode.fill(personalData.postalCode);
    await this.city.fill(personalData.city);
    await this.phoneNumber.fill(personalData.phoneNumber);
    await this.email.fill(personalData.email);
    //await this.createAcc.check();
    await this.orderNotes.fill(personalData.orderNotes);
  }

  async FillCardData(cardData: CardData) {
    await this.cardNumber.fill(cardData.cardNumber);
    await this.cardExpirationDate.fill(cardData.cardExpirationDate);
    await this.cardCVC.fill(cardData.cardNumber);
    //await this.savePaymentsData.check();
  }

  async AcceptRegulationAndBuy() {
    await this.acceptStatute.check();
    await this.buyAndPay.click();
  }
}
