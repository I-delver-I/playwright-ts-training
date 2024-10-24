import {Locator, Page} from "@playwright/test";

export default class ButtonsPage {
    page: Page;
    buttons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttons = page.locator('//a[contains(@class, "et_pb_button_")]');
    }

    async clickButton(buttonIndex: number) {
        const button = this.buttons.nth(buttonIndex);
        await button.click();
    }
}