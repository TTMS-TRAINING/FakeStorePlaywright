import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyAccountPage extends BasePage {
  private billingAddressDetails!: Locator;
  private shippingAddressDetails!: Locator;
  private firstNameField!: Locator;
  private lastNameField!: Locator;
  private displayNameField!: Locator;
  private companyField!: Locator;
  private countryField!: Locator;
  private addressField!: Locator;
  private address2Field!: Locator;
  private postcodeField!: Locator;
  private cityField!: Locator;
  private phoneField: Locator;
  private emailField: Locator;

  // Dodane pola dla płatności Stripe
  private stripeCardNumberField!: Locator;
  private stripeCardExpiryField!: Locator;
  private stripeCardCVCField!: Locator;
  private stripePaymentMethod!: Locator;

  // Dodajemy lokalizator dla checkboxa
  private saveButton!: Locator;
  private saveAddressButton!: Locator;
  private saveChangesButton!: Locator;

  //private placeOrderButton!: Locator;
  private errorList!: Locator;
  private messageList!: Locator;


  constructor(page: Page) {
    super(page);
    this.billingAddressDetails = this.page.locator('address').first()
    this.shippingAddressDetails = this.page.locator('address').nth(1)
    this.firstNameField = this.page.locator('#billing_first_name, #shipping_first_name, #account_first_name');
    this.lastNameField = this.page.locator('#billing_last_name, #shipping_last_name, #account_last_name');
    this.displayNameField = this.page.locator('#account_display_name');
    this.companyField = this.page.locator('#billing_company, #shipping_company');
    this.countryField = this.page.locator('#billing_country, #shipping_country');
    this.addressField = this.page.locator('#billing_address_1, #shipping_address_1');
    this.address2Field = this.page.locator('#billing_address_2, #shipping_address_2');
    this.postcodeField = this.page.locator('#billing_postcode, #shipping_postcode');
    this.cityField = this.page.locator('#billing_city, #shipping_city');
    this.phoneField = this.page.locator('#billing_phone');
    this.emailField = this.page.locator('#billing_email, #account_email');
    //this.orderCommentsField = this.page.locator('#order_comments');

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
    // Inicjalizujemy lokalizator dla przycicku "Zapisz adres"
    this.saveAddressButton = this.page.getByRole('button', { name: 'Zapisz adres' });
    // Inicjalizujemy lokalizator dla przycicku "Zapisz zmiany"
    this.saveChangesButton = this.page.getByRole('button', { name: 'Zapisz zmiany' });
    //this.placeOrderButton = this.page.locator('#place_order');
    this.saveButton = this.saveAddressButton, this.saveChangesButton;
    this.errorList = this.page.locator('.woocommerce-error');
    this.messageList = this.page.locator('.woocommerce-message');

  }

  // Przykładowe metody do wypełniania formularza
  async fillAccountDetails(
    firstName: string,
    lastName: string,
    company: string,
    country: string,
    address: string,
    address2: string,
    postcode: string,
    city: string,
    phone: string,
    email: string
  ) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.companyField.fill(company);
    await this.countryField.selectOption(country);
    await this.addressField.fill(address);
    await this.address2Field.fill(address2);
    await this.postcodeField.fill(postcode);
    await this.cityField.fill(city);
    if (await this.phoneField.isVisible()) {
      await this.phoneField.fill(phone)
    }
    if (await this.emailField.isVisible()) {
      await this.emailField.fill(email)
    }
  }

  // Sprawdzanie wprowadzonych danych
  async checkBillingAddress(
    firstName: string,
    lastName: string,
    company: string,
    country: string,
    address: string,
    address2: string,
    postcode: string,
    city: string,
  ) {
    await expect(this.billingAddressDetails).toContainText(firstName);
    await expect(this.billingAddressDetails).toContainText(lastName);
    await expect(this.billingAddressDetails).toContainText(company);
    await expect(this.billingAddressDetails).toContainText(address);
    await expect(this.billingAddressDetails).toContainText(address2);
    await expect(this.billingAddressDetails).toContainText(postcode);
    await expect(this.billingAddressDetails).toContainText(city);
  }

  async checkShippingAddress(
    firstName: string,
    lastName: string,
    company: string,
    country: string,
    address: string,
    address2: string,
    postcode: string,
    city: string,
  ) {
    await expect(this.shippingAddressDetails).toContainText(firstName);
    await expect(this.shippingAddressDetails).toContainText(lastName);
    await expect(this.shippingAddressDetails).toContainText(company);
    await expect(this.shippingAddressDetails).toContainText(address);
    await expect(this.shippingAddressDetails).toContainText(address2);
    await expect(this.shippingAddressDetails).toContainText(postcode);
    await expect(this.shippingAddressDetails).toContainText(city);
  }

  // Przykładowe metody do wypełniania formularza
  async fillAccountEditDetails(
    firstName: string,
    lastName: string,
    displayName: string,
    email: string

  ) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.displayNameField.fill(displayName);
    await this.emailField.fill(email)
  }

  async selectCountry(countryName: string) {
    const countryDropdown = this.page.locator('#select2-billing_country-container');
    await countryDropdown.click();
    const option = this.page.locator(`li[id*="select2-billing_country-result-"]:has-text("${countryName}")`);
    await option.click();
  }

  async clickSaveAddress() {
    await this.saveAddressButton.click();
    await expect(this.messageList).toHaveText(/Adres został zmieniony./);
  }

  async clickSaveChanges() {
    await this.saveChangesButton.click();
    await expect(this.messageList).toHaveText(/Zmieniono szczegóły konta./);
  }

  async assertFirstNameRequired() {
    await this.firstNameField.fill('');
    if (await this.saveAddressButton.isVisible()) {
      await this.saveAddressButton.click()
    }
    else
      this.saveChangesButton.click();
    const errorMessage = this.errorList.locator('li[data-id="billing_first_name"], li[data-id="shipping_first_name"], li[data-id="account_first_name"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/Imię jest wymaganym polem/);
  }
  async assertLastNameRequired() {
    await this.lastNameField.fill('');
    if (await this.saveAddressButton.isVisible()) {
      await this.saveAddressButton.click()
    }
    else
      this.saveChangesButton.click();
    const errorMessage = this.errorList.locator('li[data-id="billing_last_name"], li[data-id="shipping_last_name"], li[data-id="account_last_name"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/Nazwisko jest wymaganym polem/);
  }

  async assertDisplayNameRequired() {
    await this.displayNameField.fill('');
    await this.saveChangesButton.click();
    const errorMessage = this.errorList.locator('li[data-id="account_display_name"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/Nazwa wyświetlana jest wymaganym polem/);
  }
  async assertAdressRequired() {
    await this.addressField.fill('');
    await this.saveAddressButton.click();
    const errorMessage = this.errorList.locator('li[data-id="billing_address_1"], li[data-id="shipping_address_1"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/Ulica jest wymaganym polem/);
  }
  async assertPostalCodeFormat() {
    await this.postcodeField.fill('asdf');
    await this.saveAddressButton.click();
    const errorMessage = this.errorList.getByText('Proszę podać poprawny kod pocztowy');//brak id
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/Proszę podać poprawny kod pocztowy/);
  }
  async assertCityFieldRequired() {
    await this.cityField.fill('');
    await this.saveAddressButton.click();
    const errorMessage = this.errorList.locator('li[data-id="billing_city"], li[data-id="shipping_city"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/Miasto jest wymaganym polem/);
  }

  async assertEmailRequired() {
    await this.emailField.fill('');
    if (await this.saveAddressButton.isVisible()) {
      await this.saveAddressButton.click()
    }
    else
      this.saveChangesButton.click();
    const errorMessage = this.errorList.locator('li[data-id="account_email"], li[data-id="shipping_last_name"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/Adres email jest wymaganym polem/);
  }

  async assertPhoneNumberFormat() {
    await this.phoneField.fill('abcd');
    await this.saveAddressButton.click();
    const errorMessage = this.errorList.getByText('Telefon nie jest poprawnym numerem telefonu');//brak id
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(/Telefon nie jest poprawnym numerem telefonu/);
  }

  async assertEmailFormat() {
    await this.emailField.fill('jankowalski@com');
    if (await this.saveAddressButton.isVisible()) {
      await this.saveAddressButton.click()
    }
    else
      this.saveChangesButton.click();
    const errorMessage = this.errorList.locator(':has-text("Adres email nie jest poprawnym adresem e-mail"), :has-text("Podaj poprawny adres e-mail")');//brak id, dlatego "has-text"
    await expect(errorMessage).toBeVisible();
  }
}
