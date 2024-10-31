import {Locator, Page} from "@playwright/test";

export default class NavSectionsPage {
    readonly page: Page;
    readonly navSections: Locator;
    readonly hideButtons: Locator;
    readonly showButtons: Locator;
    readonly navItemsWraps: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navSections = page.locator('//div[@class="lwptoc_i"]');
        this.hideButtons = page.getByText('hide');
        this.showButtons = page.getByText('show');
        this.navItemsWraps = page.locator('//div[contains(@class,"lwptoc_items")]');
    }

    async getNavItemsWrap(navigationSectionIndex: number): Promise<Locator> {
        const navigationSection = this.navSections.nth(navigationSectionIndex);
        return navigationSection.locator(this.navItemsWraps);
    }

    async hide(navigationSectionIndex: number) {
        const navigationSection = this.navSections.nth(navigationSectionIndex);
        await navigationSection.locator(this.hideButtons).click();
    }

    async show(navigationSectionIndex: number) {
        const navigationSection = this.navSections.nth(navigationSectionIndex);
        await navigationSection.locator(this.showButtons).click();
    }
}