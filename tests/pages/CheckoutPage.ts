import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private firstNameField!: Locator;
  private lastNameField!: Locator;
  private companyField!: Locator;
  private countryField!: Locator;
  private addressField!: Locator;
  private address2Field!: Locator;
  private postcodeField!: Locator;
  private cityField!: Locator;
  private phoneField!: Locator;
  private emailField!: Locator;
  private orderCommentsField!: Locator;

  // Dodane pola dla płatności Stripe
  private stripeCardNumberField!: Locator;
  private stripeCardExpiryField!: Locator;
  private stripeCardCVCField!: Locator;
  private stripePaymentMethod!: Locator;

  // Dodajemy lokalizator dla checkboxa
  private savePaymentInfoCheckbox!: Locator;

  private placeOrderButton!: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameField = this.page.locator('#billing_first_name');
    this.lastNameField = this.page.locator('#billing_last_name');
    this.companyField = this.page.locator('#billing_company');
    this.countryField = this.page.locator('#billing_country');
    this.addressField = this.page.locator('#billing_address_1');
    this.address2Field = this.page.locator('#billing_address_2');
    this.postcodeField = this.page.locator('#billing_postcode');
    this.cityField = this.page.locator('#billing_city');
    this.phoneField = this.page.locator('#billing_phone');
    this.emailField = this.page.locator('#billing_email');
    this.orderCommentsField = this.page.locator('#order_comments');

    // Lokalizator dla wyboru metody płatności Stripe
    this.stripePaymentMethod = this.page.locator('#payment_method_stripe');

    // Inicjalizujemy lokalizatory dla elementów Stripe, precyzyjnie wybierając właściwe iframe
    this.stripeCardNumberField = this.page
      .frameLocator('iframe[name*="__privateStripeFrame"][src*="componentName=cardNumber"]')
      .locator('input[name="cardnumber"]');
    this.stripeCardExpiryField = this.page
      .frameLocator('iframe[name*="__privateStripeFrame"][src*="componentName=cardExpiry"]')
      .locator('input[name="exp-date"]');
    this.stripeCardCVCField = this.page
      .frameLocator('iframe[name*="__privateStripeFrame"][src*="componentName=cardCvc"]')
      .locator('input[name="cvc"]');
    // Inicjalizujemy lokalizator dla checkboxa
    this.savePaymentInfoCheckbox = this.page.locator('#terms');

    this.placeOrderButton = this.page.locator('#place_order');
  }

  // Przykładowe metody do wypełniania formularza
  async fillBillingDetails(
    firstName: string,
    lastName: string,
    company: string,
    country: string,
    address: string,
    address2: string,
    postcode: string,
    city: string,
    phone: string,
    email: string,
    orderComments?: string // Dodajemy parametr dla order_comments jako opcjonalny
  ) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.companyField.fill(company);
    await this.countryField.selectOption(country);
    await this.addressField.fill(address);
    await this.address2Field.fill(address2);
    await this.postcodeField.fill(postcode);
    await this.cityField.fill(city);
    await this.phoneField.fill(phone);
    await this.emailField.fill(email);

    if (orderComments) {
      await this.orderCommentsField.fill(orderComments);
    }
  }
  async selectCountry(countryName: string) {
    //metoda do rozbudowania selectCountry, potrzebna gdzie będzie testowane więcej ilości country niż Polska które wygenerują dodatkowe pola
    // Wybieramy element Select2
    const countryDropdown = this.page.locator('#select2-billing_country-container');

    // Klikamy, aby otworzyć listę opcji
    await countryDropdown.click();

    // Szukamy opcji o nazwie kraju w wynikach Select2
    const option = this.page.locator(`li[id*="select2-billing_country-result-"]:has-text("${countryName}")`);

    // Czekamy, aż opcja stanie się widoczna, i wybieramy ją
    await option.click();
  }

  // Metoda do wypełniania danych karty płatniczej Stripe
  async fillStripeCardDetails(cardNumber: string, cardExpiry: string, cardCVC: string) {
    // Upewniamy się, że metoda płatności Stripe jest wybrana
    await this.stripePaymentMethod.check();

    // Wypełniamy pole numeru karty
    await this.stripeCardNumberField.fill(cardNumber);

    // Wypełniamy pole daty wygaśnięcia
    await this.stripeCardExpiryField.fill(cardExpiry);

    // Wypełniamy pole CVC
    await this.stripeCardCVCField.fill(cardCVC);
  }

  async checkSavePaymentInfo() {
    // Zaznacz checkbox
    await this.savePaymentInfoCheckbox.check();

    // Asercja, że checkbox został zaznaczony
    await expect(this.savePaymentInfoCheckbox).toBeChecked();
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.waitFor({ state: 'visible' }); // Czekamy, aż przycisk będzie widoczny

    await this.placeOrderButton.click();
  }
}
