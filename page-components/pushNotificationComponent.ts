import {Locator, Page} from "@playwright/test";

export default class PushNotificationComponent {
    page: Page;
    pushNotificationWindow: Locator;
    pushNotificationCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pushNotificationWindow = page.getByAltText('aliexpress', {exact: true}).locator('xpath=../..');
        this.pushNotificationCloseButton = this.pushNotificationWindow.locator(':scope > :last-child');
    }

    async closePushNotificationWindow() {
        try {
            await this.pushNotificationWindow.waitFor({state: 'visible', timeout: 50000});
            await this.pushNotificationCloseButton.click();
        } catch (error) {
            console.error(`Failed to close push notification window:`, error);
        }
    }
}