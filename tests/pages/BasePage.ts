import { Page, Locator, test, expect } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url, {
      waitUntil: 'networkidle', // Czeka na moment, w którym brak aktywności sieciowej
      timeout: 70000            // Timeout na 70 sekund 
    });
  }
}
