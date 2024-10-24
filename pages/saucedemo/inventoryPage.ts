import {Locator, Page} from "@playwright/test";

export default class InventoryPage {
    page: Page;
    inventoryItems: Locator;
    inventoryItemNames: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('//div[@class="inventory_item"]');
        this.inventoryItemNames = this.inventoryItems.locator('//div[@class="inventory_item_name"]');
    }

    async getFirstThreeItemNames() {
        const itemNames = await this.inventoryItemNames.all();
        const itemNamesText = [];

        itemNames.map(async (itemName) => {
            itemNamesText.push(await itemName.innerText());
        });

        return itemNamesText;
    }

    async addFirstThreeItemsToCart() {
        const items = await this.getFirstThreeItems();

        for (const item of items) {
            await item.click();
        }
    }

    private async getFirstThreeItems() {
        const firstItem = this.inventoryItems.nth(0);
        const secondItem = this.inventoryItems.nth(1);
        const thirdItem = this.inventoryItems.nth(2);

        return [firstItem, secondItem, thirdItem];
    }
}