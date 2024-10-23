import { Page } from "@playwright/test";

export default class SearchBarPage {
    page: Page;
    searchInput = '#search-words';
    searchButton = '//*[contains(@class, "search--submit--")]';

    constructor (page: Page) {
        this.page = page;
    }

    async getInputQuery(): Promise<string> {
        try {
            return await this.page.locator(this.searchInput).inputValue();
        } catch (error) {
            console.error(`Failed to get search input value:`, error);
            return '';
        }
    }

    async enterQuery(q: string) {
        try {
            await this.page.locator(this.searchInput).fill(q);
        } catch (error) {
            console.error(`Failed to enter search query "${q}":`, error);
        }
    }

    async clickSearchButton() {
        try {
            await this.page.locator(this.searchButton).click();
        } catch (error) {
            console.error(`Failed to click search button:`, error);
        }
    }
}