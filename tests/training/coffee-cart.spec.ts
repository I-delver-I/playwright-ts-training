import test, { expect } from "@playwright/test";

test.skip("Coffee Cart test", async ({ page }) => {
    const appUrl = 'https://coffee-cart.app/';
    await page.goto(appUrl);

    const getGoodHeader = async (goodName: string) => {
        return page.locator(`//*[@id="app"]/div[2]/ul/li/h4`, { hasText: goodName });
    };

    const getGoodBody = async (goodName: string) => {
        return page.locator(`.cup-body[aria-label='${goodName}']`);
    }

    let goodHeader = await getGoodHeader('Espresso $10.00');
    let goodBody = await getGoodBody('Espresso');
    let menuTab = page.locator('#app > ul > li:nth-child(1)');
    let cartTab = page.locator('#app > ul > li:nth-child(2)');
    let githubTab = page.locator('#app > ul > li:nth-child(3)');

    // navigation
    await cartTab.click();
    await page.pause();
    await menuTab.click();

    // click on element
    await goodBody.click();

    // double click on element
    await goodHeader.dblclick();
    await page.pause();

    // dbclick on element
    await expect(goodHeader).toHaveText('Espresso $10.00');
    await page.pause();

    // right click on element
    await goodHeader.click({ button: 'right' });
    await page.pause();

    await goodHeader.click({ modifiers: ['Shift'] });
    await page.pause();

    await goodHeader.click({ position: { x: 0, y: 0 } });
    await page.pause();
});