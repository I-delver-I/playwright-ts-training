import {Locator, Page} from "@playwright/test";

export default class NavigationSectionsPage {
    page: Page;
    navigationSections: Locator;
    hideButton = 'a:has-text("hide")';
    showButton = 'a:has-text("show")';
    navigationItems = '//div[contains(@class,"lwptoc_items")]';

    constructor(page: Page) {
        this.page = page;
        this.navigationSections = page.locator('//div[@class="lwptoc_i"]');
    }

    async getNavigationItems(navigationSectionIndex: number) {
        const navigationSection = this.navigationSections.nth(navigationSectionIndex);
        return navigationSection.locator(this.navigationItems);
    }

    async hide(navigationSectionIndex: number) {
        const navigationSection = this.navigationSections.nth(navigationSectionIndex);
        const hideButton = navigationSection.locator(this.hideButton);
        await hideButton.click();
    }

    async show(navigationSectionIndex: number) {
        const navigationSection = this.navigationSections.nth(navigationSectionIndex);
        const showButton = navigationSection.locator(this.showButton);
        await showButton.click();
    }
}