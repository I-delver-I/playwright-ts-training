import {Page} from "@playwright/test";

export default class ProductsFilterPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getBrandCheckbox(brandName: string) {
        return this.page.locator(`//*[@id="ranges_91_315"]/li//span[contains(text(), "${brandName}")]`);
    }
}