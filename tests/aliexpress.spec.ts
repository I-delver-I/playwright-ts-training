import {expect} from "@playwright/test";
import {test} from '../fixtures/custom/aliexpress-pages-fixture';
import SignInModalPage from "../pages/aliexpress/common/signInModalPage";
import * as fs from "node:fs";

const appUrl = 'https://www.aliexpress.com/';

test('Search by category works correctly', async ({page, searchBar}) => {
    await page.goto(appUrl);

    await page.waitForSelector('//*[@class="_24EHh"]');
    const closeButton = page.locator('//*[@class="_24EHh"]');
    await closeButton.click();

    const categoriesDropdown = page.locator('//*[contains(@class, "Categoey--categoryLeft--")]');
    await categoriesDropdown.hover();
    const subcategoryDropdown = page.locator('//*[contains(@data, "home_appliances")]');
    await subcategoryDropdown.hover();

    const categoryName = 'Induction Cookers';
    const category = categoriesDropdown.getByRole('link', {name: categoryName});
    await category.click();

    const searchValue = await searchBar.getInputQuery();
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

test('Price filter displays error when passed negative values',
    async ({page, searchBar, productsFilter}) => {
        await page.goto(appUrl);

        const searchValue = 'pants';
        await searchBar.enterQuery(searchValue);
        await searchBar.clickSearchButton();

        const minimalPrice = -1;
        const maximalPrice = 777;

        await page.waitForTimeout(2000);
        await productsFilter.setMinimalPrice(minimalPrice);
        await productsFilter.setMaximalPrice(maximalPrice);

        const errorText = await productsFilter.getErrorInput();
        expect(errorText).toBe('Please enter valid numbers into the price range');
    });

test('Price filter applies correctly when passed correct values',
    async ({page, productItems, productsFilter, searchBar}) => {
        await page.goto(appUrl);

        const searchValue = 'pants';
        await searchBar.enterQuery(searchValue);
        await searchBar.clickSearchButton();

        // Working but complex scroll displaying all 60 items
        // await loadAllProducts(page);

        // Simple but non-properly working scroll displaying 22 items
        // let paginator = page.locator('//ul[contains(@class, "comet-pagination")]');
        // await paginator.scrollIntoViewIfNeeded();
        //
        // await page.waitForTimeout(2000);

        const minimalPrice = 0;
        const maximalPrice = 333;

        await page.waitForSelector(productsFilter.filterMinimalPrice);
        await productsFilter.setMinimalPrice(minimalPrice);
        await productsFilter.setMaximalPrice(maximalPrice);
        await productsFilter.applyFilter();

        const productsPrices = await productItems.getProductsPrices();
        expect(productsPrices.every(price =>
            price >= minimalPrice && price <= maximalPrice)).toBeTruthy();
    });

test('Products have correct titles', async ({page, productItems, searchBar}) => {
    await page.goto(appUrl);

    const searchQuery = 'pants';
    await searchBar.enterQuery(searchQuery);
    await searchBar.clickSearchButton();

    const productTitles = await productItems.getProductTitles();

    expect(productTitles.every(title => title.toLowerCase().match(/pants?/)))
        .toBeTruthy();
});