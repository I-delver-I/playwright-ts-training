import {Locator, Page} from "@playwright/test";

export default class SearchBarPage {
    page: Page;
    searchInput: Locator;
    searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        const searchContainer = this.page.locator('//div[contains(@class,\'search--search--\')]');
        this.searchInput = searchContainer.locator('//input').first();
        this.searchButton = searchContainer.locator('//input').last();
    }

    async getInputQuery(): Promise<string> {
        try {
            return await this.searchInput.inputValue();
        } catch (error) {
            console.error(`Failed to get search input value:`, error);
            return '';
        }
    }

    async fillInput(q: string) {
        try {
            await this.searchInput.fill(q);
        } catch (error) {
            console.error(`Failed to enter search query "${q}":`, error);
        }
    }

    async clickSearchButton() {
        try {
            await this.searchButton.click();
        } catch (error) {
            console.error(`Failed to click search button:`, error);
        }
    }
}