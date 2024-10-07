import { Before, After } from '@cucumber/cucumber';
import { Browser, chromium, Page } from 'playwright';
import { AccountPage } from '../pages/AccountPage';  // Zmienisz na odpowiednią stronę, np. CartPage, jeśli to test koszyka

let browser: Browser;
let page: Page;
let accountPage: AccountPage;

export const getBrowser = () => browser;
export const getPage = () => page;
export const getAccountPage = () => accountPage;

Before(async () => {
  try {
    // Uruchamianie przeglądarki w trybie headless (lub zmień na headless: false, jeśli chcesz widzieć testy w akcji)
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    
    // Opcjonalnie ustaw domyślny rozmiar okna przeglądarki
    await page.setViewportSize({ width: 1280, height: 720 });

    // Inicjalizacja strony (np. CartPage lub AccountPage)
    accountPage = new AccountPage(page);
  } catch (error) {
    console.error('Błąd podczas uruchamiania przeglądarki lub strony:', error);
    throw error; // Jeśli coś poszło nie tak, rzucamy błąd, aby test został odpowiednio przerwany
  }
});

After(async () => {
  try {
    if (browser) {
      // Zamknięcie przeglądarki po każdym teście
      await browser.close();
    }
  } catch (error) {
    console.error('Błąd podczas zamykania przeglądarki:', error);
    throw error; // Rzucamy błąd, jeśli coś poszło nie tak przy zamykaniu przeglądarki
  }
});
