import {Locator, Page} from "@playwright/test";

export default class ProductsFilterPage {
    page: Page;
    filterMinimalPrice: Locator;
    filterMaximalPrice: Locator;
    applyButton: Locator;
    errorInput: Locator;
    filterContainer: Locator;

    constructor (page: Page) {
        this.page = page;
        this.filterContainer = page.locator('//div[@class=\'refine2023--refine--3SE-006\']');
        this.filterMinimalPrice = this.filterContainer.locator('//*[@name="minPrice"]')
        this.filterMaximalPrice = this.filterContainer.locator('//*[@name="maxPrice"]')
        this.applyButton = this.filterContainer.locator('//*[contains(@class, "price--ok--")]');
        this.errorInput = this.filterContainer.locator('//*[contains(@class, "price--errorInput--")]');
    }

    async getErrorText(): Promise<string> {
        try {
            return await this.errorInput.innerText();
        } catch (error) {
            console.error(`Failed to get error input:`, error);
            return '';
        }
    }

    async getMinimalPrice(): Promise<number> {
        try {
            return Number(await this.filterMinimalPrice.inputValue());
        } catch (error) {
            console.error(`Failed to get minimal price:`, error);
            return 0;
        }
    }

    async getMaximalPrice(): Promise<number> {
        try {
            return Number(await this.filterMaximalPrice.inputValue());
        } catch (error) {
            console.error(`Failed to get maximal price:`, error);
            return 0;
        }
    }

    async applyFilter() {
        try {
            await this.applyButton.click();
        } catch (error) {
            console.error(`Failed to apply filter:`, error);
        }
    }

    async setMinimalPrice(price: number) {
        try {
            await this.filterMinimalPrice.fill(String(price));
        } catch (error) {
            console.error(`Failed to set minimal price "${price}":`, error);
        }
    }

    async setMaximalPrice(price: number) {
        try {
            await this.filterMaximalPrice.fill(String(price));
        } catch (error) {
            console.error(`Failed to set maximal price "${price}":`, error);
        }
    }

    async fillPriceRange(minPrice: number, maxPrice: number) {
        try {
            await this.setMinimalPrice(minPrice);
            await this.setMaximalPrice(maxPrice);
        } catch (error) {
            console.error(`Failed to fill price range:`, error);
        }
    }
}