import {Locator, Page} from "@playwright/test";

export default class CategoriesDropdownPage {
    page: Page;
    categoriesDropdown: Locator;
    homeAppliancesDropdown: Locator;

    constructor (page: Page) {
        this.page = page;
        this.categoriesDropdown = page.locator('//*[contains(@class, "Categoey--categoryLeft--")]');
        this.homeAppliancesDropdown = page.locator('//*[contains(@data, "home_appliances")]');
    }

    async clickCategory(categoryName: string) {
        await this.categoriesDropdown.hover();
        await this.homeAppliancesDropdown.hover();

        const category = this.categoriesDropdown.getByRole('link', {name: categoryName});
        await category.click();
    }
}