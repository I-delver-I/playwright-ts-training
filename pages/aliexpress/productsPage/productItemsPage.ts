import {Locator, Page} from "@playwright/test";
import {sanitizeProductPrice} from "../../../utils/productUtils";

export default class ProductItemsPage {
    page: Page;
    productsList: Locator;
    productCards: Locator;
    productsPrice: Locator;
    productsTitle: Locator;

    allProductsLoaded = false;

    constructor(page: Page) {
        this.page = page;
        this.productsList = page.locator('//div[@id = \'card-list\']');
        this.productCards = this.productsList.locator('//a[contains(@class, \'search-card-item\')]');
        this.productsTitle = this.productCards.locator('//h4');
        this.productsPrice = this.productCards.locator('//div[contains(@class, \'multi--price-sale--\')]');
    }

    async getProductsPrices(): Promise<number[]> {
        try {
            await this.loadAllProducts();
            const prices = await this.productsPrice.allInnerTexts();
            return prices.map(price => sanitizeProductPrice(price));
        } catch (error) {
            console.error(`Failed to get product prices:`, error);
            return [];
        }
    }

    async getProductTitles(): Promise<string[]> {
        try {
            await this.loadAllProducts();
            return await this.productsTitle.allInnerTexts();
        } catch (error) {
            console.error(`Failed to get product titles:`, error);
            return [];
        }
    }

    async getProductsCount(): Promise<number> {
        try {
            return this.productCards.count();
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
        let currentCount = await this.getProductsCount();

        while (currentCount > previousCount) {
            previousCount = currentCount;

            await this.page.evaluate(async () => {
                const distance = 100;

                while (document.documentElement.scrollTop
                + window.innerHeight < document.documentElement.scrollHeight) {
                    window.scrollBy(0, distance);
                    await new Promise(resolve => {
                        const scrollDelay = 100;
                        setTimeout(resolve, scrollDelay)
                    });
                }
            });

            currentCount = await this.getProductsCount();

            if (currentCount === previousCount) {
                break;
            }
        }

        this.allProductsLoaded = true;
    }
}