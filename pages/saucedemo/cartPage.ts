import {Locator, Page} from "@playwright/test";

export default class CartPage {
    page: Page;
    cartItems: Locator;
    cartItemNames: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('//div[@class = \'cart_item\']');
        this.cartItemNames = page.locator('//div[@class = \'inventory_item_name\']');
    }

    async getCartItemNames() {
        const itemNames = await this.cartItemNames.all();
        const itemNamesText = [];

        itemNames.map(async (itemName) => {
            itemNamesText.push(await itemName.innerText());
        });

        return itemNamesText;
    }

    async getCartItems() {
        return await this.cartItems.all();
    }
}