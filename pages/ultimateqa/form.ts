import {Locator, Page} from "@playwright/test";

export default class Form {
    page: Page;
    formContainer: Locator;
    namePlaceholder = 'Name';
    emailPlaceholder = 'Email Address';
    messagePlaceholder = 'Message';
    captchaInput = '//input[contains(@name, \'et_pb_contact_captcha_\')]';
    captchaFirstNumber = 'data-first_digit';
    captchaSecondNumber = 'data-second_digit';
    submitButton = '//button[@type="submit"]';
    successMessage = '.et-pb-contact-message';

    constructor(page: Page, formContainer: Locator) {
        this.page = page;
        this.formContainer = formContainer
    }

    async fill(name: string, email: string, message: string) {
        const nameInput = this.formContainer.getByPlaceholder(this.namePlaceholder);
        const emailInput = this.formContainer.getByPlaceholder(this.emailPlaceholder);
        const messageInput = this.formContainer.getByPlaceholder(this.messagePlaceholder);

        await nameInput.fill(name);
        await emailInput.fill(email);
        await messageInput.fill(message);

        await this.solveCaptcha();
    }

    private async solveCaptcha() {
        const captchaInput = this.formContainer.locator(this.captchaInput);
        const captchaFirstNumber = await captchaInput.getAttribute(this.captchaFirstNumber);
        const captchaSecondNumber = await captchaInput.getAttribute(this.captchaSecondNumber);
        const captchaAnswer = parseInt(captchaFirstNumber) + parseInt(captchaSecondNumber);
        await captchaInput.fill(captchaAnswer.toString());
    }

    async submit() {
        const submitButton = this.formContainer.locator(this.submitButton);
        await submitButton.click();
    }
}