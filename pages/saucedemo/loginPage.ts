import {Locator, Page} from "@playwright/test";

export default class LoginPage {
    page: Page;
    loginButton: Locator;
    userName: Locator;
    password: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.locator('#login-button');
        this.userName = page.locator('#user-name');
        this.password = page.locator('#password');
    }

    async login() {
        const username = process.env.SAUCEDEMO_USERNAME;
        const password = process.env.SAUCEDEMO_PASSWORD;

        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}