import {Page} from "@playwright/test";

export default class SearchBarPage {
    page: Page;
    searchContainer = '.form-control';
    searchInput = 'input';
    searchButton = 'button';
    userSection = '//article[@class=\'sc-dkrFOg bHWDWn\']';
    username = 'h4';

    constructor (page: Page) {
        this.page = page;
    }

    async enterSearchQuery(q: string) {
        try {
            await this.page.locator(this.searchContainer).locator(this.searchInput).fill(q);
        } catch (error) {
            console.error(`Failed to enter search query "${q}":`, error);
        }
    }

    async clickSearchButton() {
        try {
            await this.page.locator(this.searchContainer).locator(this.searchButton).click();
        } catch (error) {
            console.error(`Failed to click search button:`, error);
        }
    }
}