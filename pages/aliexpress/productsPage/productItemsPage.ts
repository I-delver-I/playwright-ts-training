import {Page} from "@playwright/test";
import {sanitizeProductPrice} from "../../../utils/productUtils";

export default class ProductItemsPage {
    page: Page;
    products = '.search-card-item';
    productsPrices = '//*[contains(@class, "multi--price-sale--")]';
    productsTitle = '//*[contains(@class, "multi--titleText--")]';

    allProductsLoaded = false;

    constructor (page: Page) {
        this.page = page;
    }

    async getProductsPrices(): Promise<number[]> {
        try {
            await this.loadAllProducts();
            const prices = await this.page.locator(this.productsPrices).allInnerTexts();
            return prices.map(price => sanitizeProductPrice(price));
        } catch (error) {
            console.error(`Failed to get product prices:`, error);
            return [];
        }
    }

    async getProductTitles(): Promise<string[]> {
        try {
            await this.loadAllProducts();
            return await this.page.locator(this.productsTitle).allInnerTexts();
        } catch (error) {
            console.error(`Failed to get product titles:`, error);
            return [];
        }
    }

    async getProductsCount(): Promise<number> {
        try {
            await this.loadAllProducts();
            return this.page.locator(this.products).count();
        } catch (error) {
            console.error(`Failed to get products:`, error);
            return 0;
        }
    }

    private async loadAllProducts(): Promise<void> {
        if (this.allProductsLoaded) {
            return;
        }

        let previousCount = 0;
        let currentCount = await this.page.locator(this.productsPrices).count();

        while (currentCount > previousCount) {
            previousCount = currentCount;

            await this.page.evaluate(async () => {
                const distance = 100;

                while (document.documentElement.scrollTop + window.innerHeight
                < document.documentElement.scrollHeight) {
                    window.scrollBy(0, distance);
                    await new Promise(resolve => {
                        const scrollDelay = 100;
                        setTimeout(resolve, scrollDelay)
                    });
                }
            });

            currentCount = await this.page.locator(this.productsPrices).count();

            if (currentCount === previousCount) {
                break;
            }
        }

        this.allProductsLoaded = true;
    }
}