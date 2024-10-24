import {Locator, Page} from "@playwright/test";

export default class AuthUserHeaderPage {
    page: Page;
    menuButton: Locator;
    logoutButton: Locator;
    shoppingCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuButton = this.page.locator('//*[@id=\'react-burger-menu-btn\']')
        this.logoutButton = this.page.locator('//*[@id=\'logout_sidebar_link\']');
        this.shoppingCartButton = this.page.locator('//a[@class="shopping_cart_link"]');
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutButton.click();
    }

    async clickShoppingCart() {
        await this.shoppingCartButton.click();
    }
}