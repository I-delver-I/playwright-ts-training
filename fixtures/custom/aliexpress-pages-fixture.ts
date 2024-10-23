// extend the existing test method
// return our require formPage
// page
// export

import { test as base } from "@playwright/test";
import ProductItemsPage from "../../pages/aliexpress/productsPage/productItemsPage";
import ProductsFilterPage from "../../pages/aliexpress/productsPage/productsFilterPage";
import SearchBarPage from "../../pages/aliexpress/common/searchBarPage";

type UIPages = {
    productItems: ProductItemsPage;
    productsFilter: ProductsFilterPage;
    searchBar: SearchBarPage;
}

export const test = base.extend<UIPages>({
    productItems: async ({ page }, use) => {
        const product = new ProductItemsPage(page);
        await use(product);
    },
    productsFilter: async ({ page }, use) => {
        const filter = new ProductsFilterPage(page);
        await use(filter);
    },
    searchBar: async ({ page }, use) => {
        const search = new SearchBarPage(page);
        await use(search);
    },
});