import {expect, Page} from "@playwright/test";
import {test} from "../fixtures/custom/saucedemo-pages-fixture";
import SaucedemoBase from "../pages/saucedemo/saucedemoBase";
import '../setupEnv';
import InventoryPage from "../pages/saucedemo/inventoryPage";
import CartPage from "../pages/saucedemo/cartPage";

const appUrl = 'https://www.saucedemo.com/';

test('Items add to cart successfully', async ({page, basePage}) => {
    await page.goto(appUrl);

    await basePage.login();
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstThreeItemsToCart();
    const firstThreeItemNames = await inventoryPage.getFirstThreeItemNames();

    const cartPage = new CartPage(page);
    await basePage.authUserHeaderPage.clickShoppingCart();
    const cartItemNames = await cartPage.getCartItemNames();

    for (let i = 0; i < firstThreeItemNames.length; i++) {
        expect(await cartItemNames[i].innerText()).toContain(await firstThreeItemNames[i].innerText());
    }
});

test('Login occurs successfully', async ({page, basePage}) => {
    await page.goto(appUrl);

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
    await basePage.authUserHeaderPage.shoppingCartButton.waitFor({ state: 'visible' });
    expect(page.url()).toMatch(/inventory/);
    expect(await basePage.authUserHeaderPage.shoppingCartButton.isVisible()).toBe(true);
}