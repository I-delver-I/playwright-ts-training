import {Locator, Page} from "@playwright/test";

export default class CartPage {
    page: Page;
    cartItemNames: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItemNames = page.locator('//div[@class = \'inventory_item_name\']');
    }

    async getItemNames() {
        const itemNames = await this.cartItemNames.all();
        const itemNamesText = [];

        for (const itemName of itemNames) {
            itemNamesText.push(await itemName.innerText());
        }

        return itemNamesText;
    }
}