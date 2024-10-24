// extend the existing test method
// return our require formPage
// page
// export

import { test as base } from "@playwright/test";
import ProductItemsPage from "../../pages/aliexpress/productsPage/productItemsPage";
import ProductsFilterPage from "../../pages/aliexpress/productsPage/productsFilterPage";
import SearchBarPage from "../../pages/aliexpress/common/searchBarPage";

type UIPages = {
    productItemsPage: ProductItemsPage;
    productsFilterPage: ProductsFilterPage;
    searchBarPage: SearchBarPage;
}

export const test = base.extend<UIPages>({
    productItemsPage: async ({ page }, use) => {
        const product = new ProductItemsPage(page);
        await use(product);
    },
    productsFilterPage: async ({ page }, use) => {
        const filter = new ProductsFilterPage(page);
        await use(filter);
    },
    searchBarPage: async ({ page }, use) => {
        const search = new SearchBarPage(page);
        await use(search);
    },
});