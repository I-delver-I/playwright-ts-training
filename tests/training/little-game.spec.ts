import test, {expect, Page} from "@playwright/test";
import ProductsFilterPage from "../../pages/little-game/productsPage/productsFilterPage";

test.skip('Brand name selection filters products correctly', async ({page}) => {
    const appUrl = 'https://www.little-game.store/';
    await page.goto(appUrl);

    const category = getCategory(page, 'Зарядні станції та генератори');
    await category.click();

    const productsFilter = new ProductsFilterPage(page);
    const brandName = 'IDEAL';
    const categoryCheckbox = productsFilter.getBrandCheckbox(brandName);
    await categoryCheckbox.click();

    await page.waitForSelector(`//*[contains(@class, "ut2-selected-product-filters")]//span[text()="${brandName}"]`);

    const productTitles = await getProductTitles(page);
    productTitles.forEach(title => {
        expect(title).toMatch(new RegExp(brandName, 'i'));
    });

    const appliedFilter = getAppliedBrandFilter(brandName);
});

function getAppliedBrandFilter(brandName: string): boolean {
    return this.page.locator
    (`//*[contains(@class, "ut2-selected-product-filters")]//span[text()="${brandName}"]`);
}

function getCategory(page: Page, categoryName: string) {
    return page.locator(`//*[contains(@id, "banner_original_")]//div[contains(text(), "${categoryName}")]`);
}

function getProductTitles(page: Page) {
    return page.locator('//*[@id="categories_view_pagination_contents"]//*[@class="product-title"]')
        .allInnerTexts();
}

