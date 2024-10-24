import test, { expect } from "@playwright/test";

test.beforeAll(async ({ browser }) => {
    console.log(browser.version());
});

test.beforeEach(async ({ context }) => {
    await context.clearPermissions();
});

test.afterEach(async ({ context }) => {
    await context.clearCookies();
});

test.skip('test01', async ({ page }) => {
    await page.goto('https://chat.openai.com/chat');
    expect(page.url()).toContain('openai');
});

test.skip('test02', async ({ page }) => {
    await page.goto('https://playwright.dev/docs/test-fixtures')
    expect(page.url()).toContain('fixtures');
});