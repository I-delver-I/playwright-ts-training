import {Page} from "@playwright/test";

export default class HomePage {
    page: Page;
    searchContainer = '.form-control';
    searchInput = 'input';
    searchButton = 'button';
    userSection = '//article[@class=\'sc-dkrFOg bHWDWn\']';
    username = 'h4';

    constructor (page: Page) {
        this.page = page;
    }

    async waitForSearchResponse() {
        await this.page.waitForResponse(response =>
            response.url().includes('/users') && response.status() === 200
        );
    }

    async getUsername(): Promise<string> {
        const userSection = this.page.locator(this.userSection);
        const username = userSection.locator(this.username);
        return await username.innerText();
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