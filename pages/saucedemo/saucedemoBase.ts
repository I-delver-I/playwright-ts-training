import {Page} from "@playwright/test";
import LoginPage from "./loginPage";
import AuthUserHeaderPage from "./common/authUserHeaderPage";

export default class SaucedemoBase {
    page: Page;
    authUserHeaderPage: AuthUserHeaderPage;
    loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.authUserHeaderPage = new AuthUserHeaderPage(page);
    }

    async logout() {
        await this.authUserHeaderPage.logout();
    }

    async login() {
        await this.loginPage.login();
    }
}