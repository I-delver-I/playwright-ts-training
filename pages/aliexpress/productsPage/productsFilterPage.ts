import {Page} from "@playwright/test";

export default class ProductsFilterPage {
    page: Page;
    filterMinimalPrice = '//*[@name="minPrice"]';
    filterMaximalPrice = '//*[@name="maxPrice"]';
    applyButton = '//*[contains(@class, "price--ok--")]';
    errorInput = '//*[contains(@class, "price--errorInput--")]';

    constructor (page: Page) {
        this.page = page;
    }

    async getErrorInput(): Promise<string> {
        try {
            return await this.page.locator(this.errorInput).innerText();
        } catch (error) {
            console.error(`Failed to get error input:`, error);
            return '';
        }
    }

    async getMinimalPrice(): Promise<number> {
        try {
            return Number(await this.page.locator(this.filterMinimalPrice).inputValue());
        } catch (error) {
            console.error(`Failed to get minimal price:`, error);
            return 0;
        }
    }

    async getMaximalPrice(): Promise<number> {
        try {
            return Number(await this.page.locator(this.filterMaximalPrice).inputValue());
        } catch (error) {
            console.error(`Failed to get maximal price:`, error);
            return 0;
        }
    }

    async applyFilter() {
        try {
            await this.page.locator(this.applyButton).click();
        } catch (error) {
            console.error(`Failed to apply filter:`, error);
        }
    }

    async setMinimalPrice(price: number) {
        try {
            await this.page.locator(this.filterMinimalPrice).fill(String(price));
        } catch (error) {
            console.error(`Failed to set minimal price "${price}":`, error);
        }
    }

    async setMaximalPrice(price: number) {
        try {
            await this.page.locator(this.filterMaximalPrice).fill(String(price));
        } catch (error) {
            console.error(`Failed to set maximal price "${price}":`, error);
        }
    }
}