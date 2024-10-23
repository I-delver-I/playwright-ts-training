import {Page} from "@playwright/test";

export default class LoginForm {
    page: Page;
    loginButton = '#login-button';
    userName = '#user-name';
    password = '#password';

    constructor(page: Page) {
        this.page = page;
    }

    async login() {
        await this.page.locator(this.loginButton).click();
    }

    async setUserName(userName: string) {
        await this.page.locator(this.userName).fill(userName);
    }

    async setPassword(password: string) {
        await this.page.locator(this.password).fill(password);
    }
}