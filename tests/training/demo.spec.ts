import { test, expect } from '@playwright/test';

test.skip('My first test', async ({ page }) => {
    await page.goto('https://playwright.dev/docs/intro');

    await expect(page.url()).toContain('intro');
});