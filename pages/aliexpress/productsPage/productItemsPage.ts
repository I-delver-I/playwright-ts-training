﻿import { Locator, Page } from '@playwright/test';
import { sanitizeProductPrice } from '../../../utils/productUtils';

export default class ProductItemsPage {
  page: Page;
  productsList: Locator;
  productCards: Locator;
  productPrices: Locator;
  productTitles: Locator;

  allProductsLoaded = false;

  constructor(page: Page) {
    this.page = page;
    this.productsList = page.locator("//div[@id = 'card-list']");
    this.productCards = this.productsList.locator(
      "//a[contains(@class, 'search-card-item')]"
    );
    this.productTitles = this.productCards.locator('//h4');
    this.productPrices = this.productCards.locator(
      "//div[contains(@class, 'multi--price-sale--')]"
    );
  }

  async getProductsPrices(): Promise<number[]> {
    try {
      await this.loadAllProducts();
      const prices = await this.productPrices.allInnerTexts();
      return prices.map((price) => sanitizeProductPrice(price));
    } catch (error) {
      console.error(`Failed to get product prices:`, error);
      return [];
    }
  }

  async getProductTitles(): Promise<string[]> {
    try {
      await this.loadAllProducts();
      return await this.productTitles.allInnerTexts();
    } catch (error) {
      console.error('Failed to get product titles:', error);
      return [];
    }
  }

  async getProductsCount(): Promise<number> {
    try {
      return this.productCards.count();
    } catch (error) {
      console.error('Failed to get products:', error);
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

      while (true) {
        const isAtBottom = await this.page.evaluate(() => {
          return (
            document.documentElement.scrollTop + window.innerHeight >=
            document.documentElement.scrollHeight
          );
        });

        if (isAtBottom) {
          break;
        }

        const scrollDistance = 100;
        await this.page.mouse.wheel(0, scrollDistance);        
      }

      currentCount = await this.getProductsCount();

      if (currentCount === previousCount) {
        break;
      }
    }

    this.allProductsLoaded = true;
  }
}
