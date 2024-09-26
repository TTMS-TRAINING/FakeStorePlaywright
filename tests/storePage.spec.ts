import { test, expect } from '@playwright/test';
import { StorePage } from './pages/StorePage';
import { TIMEOUT } from 'dns';


test.describe("Store Page Tests", () => {

    test.beforeEach(async ({ page }) => {
        const storePage = new StorePage(page);

        // Wyczyszczenie cookies przed każdym testem
        await page.context().clearCookies();


        await storePage.navigateTo('https://fakestore.testelka.pl/shop/');
        expect(page).toHaveURL('https://fakestore.testelka.pl/shop/');
    });

    const basketURL = 'https://fakestore.testelka.pl/koszyk/';
    const shopURL = 'https://fakestore.testelka.pl/shop/';

    test('Windsurfing category add greece', async ({ page }) => {
        const storePage = new StorePage(page);

        await storePage.windsurfingClick();
        await storePage.greeceAdd();
        await storePage.greeceBasket();
        await expect(page).toHaveURL(basketURL);


    });

    test('Climbing category tests', async ({ page }) => {
        const storePage = new StorePage(page);

        await storePage.climbingClick();
        await storePage.islandPeekAdd();
        await storePage.islandPeekBasket();
        await expect(page).toHaveURL(basketURL);
    });

    test('Yoga & pilates category tests', async ({ page }) => {
        const storePage = new StorePage(page);

        await storePage.yogaClick();
        await storePage.toskaniiAdd();
        await storePage.toskaniiBasket();
        await expect(page).toHaveURL(basketURL)
    });

    test('Sailing category tests', async ({ page }) => {
        const storePage = new StorePage(page);

        await storePage.sailingClick();
        await storePage.sailingCourseAdd();
        await storePage.sailingCourseBasket();
        await expect(page).toHaveURL(basketURL);
    });

    test('Adding various items to basket', async ({ page }) => {
        const storePage = new StorePage(page);

        const veryfingGrecceAmount = page.locator('xpath=//*[@id="post-6"]/div/div/form/table/tbody/tr[1]/td[5]/div/input');
        const veryfingislandPeekAmount = page.locator('xpath=//*[@id="post-6"]/div/div/form/table/tbody/tr[2]/td[5]/div/input');
        const veryfingSailingCourseAmount = page.locator('xpath=//*[@id="post-6"]/div/div/form/table/tbody/tr[3]/td[5]/div/input');

        await storePage.windsurfingClick();
        await storePage.greeceAdd();
        await storePage.navigateTo(shopURL);
        await storePage.climbingClick();
        await storePage.islandPeekAdd();
        await storePage.navigateTo(shopURL);
        await storePage.sailingClick();
        await storePage.sailingCourseAdd();
        await storePage.navigateTo(shopURL);
        await storePage.navigateTo(basketURL);
        await expect(veryfingGrecceAmount).toHaveValue('1');
        await expect(veryfingislandPeekAmount).toHaveValue('1');
        await expect(veryfingSailingCourseAmount).toHaveValue('1')


    });


})