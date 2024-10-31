import {Locator, Page} from "@playwright/test";

export default class InventoryPage {
    page: Page;
    inventoryItems: Locator;
    inventoryItemNames: Locator;
    addToCartButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('//div[@class = \'inventory_item\']');
        this.inventoryItemNames = page.locator('//div[@class = "inventory_item_name "]');
        this.addToCartButtons = page.locator('//button[contains(@id, \'add-to-cart-\')]');
    }

    async addItemsToCart(itemNames: string[]) {
        const items = await this.getItems(itemNames);

        for (const item of items) {
            const addToCartButton = item.locator(this.addToCartButtons);
            await addToCartButton.click();
        }
    }

    private async getItems(itemNames: string[]): Promise<Locator[]> {
        const matchedItems: Locator[] = [];
        const itemCount = await this.inventoryItems.count();

        for (let i = 0; i < itemCount; i++) {
            const inventoryItem = this.inventoryItems.nth(i);
            const itemNameLocator = inventoryItem.locator(this.inventoryItemNames);
            const itemNameText = await itemNameLocator.innerText();

            if (itemNames.includes(itemNameText)) {
                matchedItems.push(inventoryItem);
            }
        }

        return matchedItems;
    }
}