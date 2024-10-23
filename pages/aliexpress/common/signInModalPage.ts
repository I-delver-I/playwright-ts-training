import {Page} from "@playwright/test";

export default class SignInModalPage {
    page: Page;
    passwordLabel = 'Password';
    emailOrPhoneNumberLabel = 'Email or phone number';
    continueButton = '//button[contains(@class, "cosmos-btn")]';
    signInLabel = 'Sign in';

    constructor (page: Page) {
        this.page = page;
    }

    async clickSignInButton() {
        try {
            await this.page.getByLabel(this.signInLabel).click();
        } catch (error) {
            console.error(`Failed to click sign in button:`, error);
        }
    }

    async enterCredentials(email: string, password: string) {
        try {
            await this.setEmailOrPhoneNumber(email);
            await this.clickContinueAfterEnteringEmailOrNumber();
            await this.setPassword(password);
        } catch (error) {
            console.error(`Failed to enter credentials:`, error);
        }
    }

    private async setPassword(password: string) {
        try {
            await this.page.getByLabel(this.passwordLabel).fill(password);
        } catch (error) {
            console.error(`Failed to set password "${password}":`, error);
        }
    }

    private async setEmailOrPhoneNumber(emailOrPhoneNumber: string) {
        try {
            await this.page.getByLabel(this.emailOrPhoneNumberLabel).fill(emailOrPhoneNumber);
        } catch (error) {
            console.error(`Failed to set email or phone number "${emailOrPhoneNumber}":`, error);
        }
    }

    private async clickContinueAfterEnteringEmailOrNumber() {
        try {
            await this.page.locator(this.continueButton).click();
        } catch (error) {
            console.error(`Failed to click continue button:`, error);
        }
    }
}