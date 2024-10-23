import {Locator, Page} from "@playwright/test";

export default class NavigationSection {
    page: Page;
    navigationSection: Locator;
    hideButton = 'a:has-text("hide")';
    showButton = 'a:has-text("show")';
    navigationItems = '//div[contains(@class,"lwptoc_items")]';

    constructor(page: Page, navigationSection: Locator) {
        this.page = page;
        this.navigationSection = navigationSection;
    }

    async hide() {
        const hideButton = this.navigationSection.locator(this.hideButton);
        await hideButton.click();
    }

    async show() {
        const showButton = this.navigationSection.locator(this.showButton);
        await showButton.click();
    }
}