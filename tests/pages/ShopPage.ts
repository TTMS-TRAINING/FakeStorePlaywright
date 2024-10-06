import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShopPage extends BasePage {
    static navigateTo: any;
    static goToWindsurfing() {
      throw new Error("Method not implemented.");
    }
    private categoryWindsurfing: Locator;
    private categoryClimbing: Locator;
    private categoryYoga: Locator;
    private categorySailing: Locator;
    
    constructor(page: Page){
        super(page);
        this.categoryWindsurfing = page.getByLabel('Przejdź do kategorii produktu Windsurfing');
        this.categoryClimbing = page.getByLabel('Przejdź do kategorii produktu Wspinaczka');
        this.categoryYoga = page.getByLabel('Przejdź do kategorii produktu Yoga i pilates');
        this.categorySailing = page.getByLabel('Przejdź do kategorii produktu Żeglarstwo');    
    }

    async goToWindsurfing(){
        await this.categoryWindsurfing.click();
    }
    async goToClimbing(){
        await this.categoryClimbing.click();
    }
    async goToYoga(){
        await this.categoryYoga.click();
    }
    async goToSailing(){
        await this.categorySailing.click();
    }
};