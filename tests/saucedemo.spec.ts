import {expect, Page} from "@playwright/test";
import {test} from "../fixtures/custom/saucedemo-pages-fixture";
import SaucedemoBase from "../pages/saucedemo/saucedemoBase";
import '../setupEnv';
import InventoryPage from "../pages/saucedemo/inventoryPage";
import CartPage from "../pages/saucedemo/cartPage";
import {arraysHaveSameElements} from "../utils/arraysUtils";

const appUrl = 'https://www.saucedemo.com/';

test.beforeEach(async ({page}) => {
    await page.goto(appUrl);
});

test('Items add to cart successfully', async ({page, basePage}) => {
    const cartPage = new CartPage(page);
    const inventoryPage = new InventoryPage(page);

    await basePage.login();

    const inventoryItemNames = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    await inventoryPage.addItemsToCart(inventoryItemNames);
    await basePage.authUserHeaderPage.clickShoppingCart();
    const cartItemNames = await cartPage.getItemNames();

    expect(arraysHaveSameElements(inventoryItemNames, cartItemNames)).toBe(true);
});

test('Login occurs successfully', async ({page, basePage}) => {
    await basePage.login();
    await verifyLoginSuccess(page, basePage);

    await basePage.logout();
    await verifyLogoutSuccess(page, basePage);
});

async function verifyLogoutSuccess(page: Page, basePage: SaucedemoBase) {
    expect(page.url()).not.toMatch(/inventory/);
    expect(await basePage.loginPage.loginButton.isVisible()).toBe(true);
}

async function verifyLoginSuccess(page: Page, basePage: SaucedemoBase) {
    await basePage.authUserHeaderPage.shoppingCartButton.waitFor({state: 'visible'});
    expect(page.url()).toMatch(/inventory/);
    expect(await basePage.authUserHeaderPage.shoppingCartButton.isVisible()).toBe(true);
}