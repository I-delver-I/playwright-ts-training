import {Page} from "@playwright/test";

export default class CategoriesDropdownPage {
    page: Page;
    pushNotificationWindow = '//*[@class="_24EHh"]';
    pushNotificationCloseButton = '//*[@class="_24EHh"]';
    categoriesDropdown = '//*[contains(@class, "Categoey--categoryLeft--")]';
    subcategoryDropdown = '//*[contains(@data, "home_appliances")]';

    constructor (page: Page) {
        this.page = page;
    }

    async closePushNotificationWindow() {
        try {
            await this.page.waitForSelector(this.pushNotificationWindow, {timeout: 50000});
            const closeButton = this.page.locator(this.pushNotificationCloseButton);
            await closeButton.click();
        } catch (error) {
            console.error(`Failed to close push notification window:`, error);
        }
    }

    async clickCategory(categoryName: string) {
        const categoriesDropdown = this.page.locator(this.categoriesDropdown);
        await categoriesDropdown.hover();
        const subcategoryDropdown = this.page.locator(this.subcategoryDropdown);
        await subcategoryDropdown.hover();

        const category = categoriesDropdown.getByRole('link', {name: categoryName});
        await category.click();
    }
}