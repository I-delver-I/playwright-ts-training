import {Page} from "@playwright/test";

export default class CategoriesDropdownPage {
    page: Page;
    categoriesDropdown = '//*[contains(@class, "Categoey--categoryLeft--")]';
    subcategoryDropdown = '//*[contains(@data, "home_appliances")]';

    constructor (page: Page) {
        this.page = page;
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