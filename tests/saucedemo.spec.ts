import test, {expect} from "@playwright/test";
import LoginForm from "../pages/saucedemo/loginForm";

test('Login occurs successfully', async ({page}) => {
    const appUrl = 'https://www.saucedemo.com/';

    await page.goto(appUrl);

    const loginForm = new LoginForm(page);
    await loginForm.setUserName('standard_user');
    await loginForm.setPassword('secret_sauce');
    await loginForm.login();

    await page.waitForSelector('//a[@class="shopping_cart_link"]');
    expect(page.url()).toMatch(/inventory/);
    expect(await page.locator('//div[@class="inventory_list"]').isVisible()).toBe(true);

    const buttonReactBurgerMenu = page.locator("//*[@id='react-burger-menu-btn']")
    await buttonReactBurgerMenu.click();

    const linkLogoutSidebar = page.locator("xpath=//*[@id='logout_sidebar_link']")
    await linkLogoutSidebar.click();
    expect(page.url()).not.toMatch(/inventory/);
    expect(await page.locator('#login-button').isVisible()).toBe(true);
});