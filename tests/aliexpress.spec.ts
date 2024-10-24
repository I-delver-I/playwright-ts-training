import {expect} from "@playwright/test";
import {test} from '../fixtures/custom/aliexpress-pages-fixture';
import SignInModalPage from "../pages/aliexpress/common/signInModalPage";
import * as fs from "node:fs";
import CategoriesDropdownPage from "../pages/aliexpress/categoriesDropdownPage";

const appUrl = 'https://www.aliexpress.com/';

test('Search by category works correctly', async ({page, searchBarPage}) => {
    await page.goto(appUrl);
    const categoriesDropdownPage = new CategoriesDropdownPage(page);
    await categoriesDropdownPage.closePushNotificationWindow();

    const categoryName = 'Induction Cookers';
    await categoriesDropdownPage.clickCategory(categoryName);

    const searchValue = await searchBarPage.getInputQuery();
    expect(searchValue).toBe(categoryName);
});

test.skip('Sign in works correctly', async ({page}) => {
    const appUrl = 'https://www.aliexpress.com/';
    await page.goto(appUrl);

    const menuDropdown = page.locator('//*[contains(@class, "my-account--menuItem--")]');
    await menuDropdown.hover();
    const signInButton = page.locator('//*[contains(@class, "my-account--signin--")]');
    await signInButton.click();

    const signInModal = new SignInModalPage(page);
    const userCredentials = JSON.parse(fs.readFileSync('playwright/.auth/aliexpressUser.json', 'utf-8'));
    const {email, password} = userCredentials;

    await signInModal.enterCredentials(email, password);
    await signInModal.clickSignInButton();

    const passwordInput = page.locator('//input[@type="password"]');
    await passwordInput.fill('password');
});

test('Price filter displays error text when passed negative value', async ({page, searchBarPage, productsFilterPage}) => {
    await page.goto(appUrl);

    const searchValue = 'pants';
    await searchBarPage.fillInput(searchValue);
    await searchBarPage.clickSearchButton();

    await productsFilterPage.filterContainer.waitFor({state: 'visible'});
    const minPrice = -1;
    const maxPrice = 777;
    await productsFilterPage.fillPriceRange(minPrice, maxPrice);

    const errorText = await productsFilterPage.getErrorText();
    const expectedErrorText = 'Please enter valid numbers into the price range';
    expect(errorText).toBe(expectedErrorText);
});

test('Price filter applies correctly when passed correct values',
    async ({page, productItemsPage, productsFilterPage, searchBarPage}) => {
        await page.goto(appUrl);

        const searchValue = 'pants';
        await searchBarPage.fillInput(searchValue);
        await searchBarPage.clickSearchButton();

        await productsFilterPage.filterContainer.waitFor({state: 'visible'});
        const minPrice = 0;
        const maxPrice = 333;
        await productsFilterPage.fillPriceRange(minPrice, maxPrice);
        await productsFilterPage.applyFilter();

        const productsPrices = await productItemsPage.getProductsPrices();
        expect(productsPrices.every(price =>
            price >= minPrice && price <= maxPrice)).toBeTruthy();
});

test('Products have correct titles', async ({page, productItemsPage, searchBarPage}) => {
    await page.goto(appUrl);

    const searchQuery = 'pants';
    await searchBarPage.fillInput(searchQuery);
    await searchBarPage.clickSearchButton();

    await productItemsPage.productsList.waitFor({state: 'visible'});
    const productTitles = await productItemsPage.getProductTitles();
    expect(productTitles.every(title =>
        title.match(/pants?/i))).toBeTruthy();
});