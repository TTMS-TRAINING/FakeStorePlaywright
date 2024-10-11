import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class StorePage extends BasePage {
  // Windsurfing
  private windsurfingCategory: Locator;
  private greeceLimnos: Locator;
  private basketGreece: Locator;

  // Climbing
  private climbingCategory: Locator;
  private islandPeek: Locator;
  private basketIslandPeek: Locator;

  // Yoga
  private yogaCategroy: Locator;
  private toskanii: Locator;
  private basketToskanii: Locator;

  // Sailing
  private sailingCategory: Locator;
  private sailingCourse: Locator;
  private basketSailingCourse: Locator;

  //Basket
  private productAmount: Locator;
  private basketActualization: Locator;
  private deleteItem: Locator;


  private mainPage: Locator;
  private insideBasket: Locator;

  constructor(page: Page) {
    super(page);
    // windsufring locators
    this.windsurfingCategory = page.getByLabel(
      "Przejdź do kategorii produktu Windsurfing"
    );
    this.greeceLimnos = page.getByLabel("Dodaj do koszyka: „Grecja -");
    this.basketGreece = page.getByRole("link", {
      name: "200,00 zł 1 Produkt ",
    });

    //climbing locators
    this.climbingCategory = page.getByLabel(
      "Przejdź do kategorii produktu Wspinaczka"
    );
    this.islandPeek = page.getByLabel(
      "Dodaj do koszyka: „Wspinaczka Island Peak”"
    );
    this.basketIslandPeek = page.getByRole("link", {
      name: "200,00 zł 1 Produkt ",
    });

    // Yoga
    this.yogaCategroy = page.getByLabel(
      "Przejdź do kategorii produktu Yoga i pilates"
    );
    this.toskanii = page.getByLabel("Dodaj do koszyka: „Wczasy");
    this.basketToskanii = page.getByRole("link", {
      name: "500,00 zł 1 Produkt ",
    });

    // Sailing
    this.sailingCategory = page.getByLabel(
      "Przejdź do kategorii produktu Żeglarstwo"
    );
    this.sailingCourse = page.getByLabel("Dodaj do koszyka: „Kurs ż");
    this.basketSailingCourse = page.getByRole("link", {
      name: "zł 1 Produkt ",
    });

    //Basket Locators
    this.deleteItem = page.getByLabel('Usuń Grecja - Limnos z koszyka');
    this.productAmount = page.getByLabel("Ilość produktu");
    this.basketActualization = page.getByRole("button", {
      name: "Zaktualizuj koszyk",
    });

    this.mainPage = page.getByRole("link", { name: "FakeStore" });
    this.insideBasket = page
      .locator("#menu-item-200")
      .getByRole("link", { name: "Koszyk" });
  }

  // windsurfing
  async windsurfingClick() {
    await this.windsurfingCategory.click();
  }
  async greeceAdd() {
    await this.greeceLimnos.click();
  }
  async greeceBasket() {
    //await this.basketGreece.hover();
    await this.insideBasket.click();
  }

  //Climbing
  async climbingClick() {
    await this.climbingCategory.click();
  }
  async islandPeekAdd() {
    await this.islandPeek.click();
  }
  async islandPeekBasket() {
    //await this.basketIslandPeek.hover();
    await this.insideBasket.click();
  }

  // Yoga

  async yogaClick() {
    await this.yogaCategroy.click();
  }
  async toskaniiAdd() {
    await this.toskanii.click();
  }
  async toskaniiBasket() {
    //await this.basketToskanii.hover();
    await this.insideBasket.click();
  }

  // Sailing
  async sailingClick() {
    await this.sailingCategory.click();
  }
  async sailingCourseAdd() {
    await this.sailingCourse.click();
  }
  async sailingCourseBasket() {

    await this.insideBasket.click();
  }

  // Basket

  async productAmountClick() {
    await this.productAmount.click();
  }

  async productAmountFill(value: string) {
    await this.productAmount.fill(value);
  }

  async actualizeBasket() {
    await this.basketActualization.click();
  }

  async backToMainPage() {
    await this.mainPage.click();
  }

  async seeInsideBasket() {
    await this.insideBasket.click();
  }

  async deletingItem(){
    await this.deleteItem.click();
  }


}
