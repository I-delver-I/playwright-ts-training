import {Locator, Page} from "@playwright/test";

export default class FormsPage {
    page: Page;
    formContainers: Locator;

    captchaInput = '//input[contains(@name, \'et_pb_contact_captcha_\')]';
    captchaFirstNumber = 'data-first_digit';
    captchaSecondNumber = 'data-second_digit';
    submitButton = '//button[@type="submit"]';
    successMessage = '.et-pb-contact-message';

    constructor(page: Page) {
        this.page = page;
        this.formContainers = page.locator('//div[contains(@id, \'et_pb_contact_form_\')]');
    }

    async getSuccessMessage(formIndex: number): Promise<Locator> {
        return this.formContainers.nth(formIndex).locator(this.successMessage);
    }

    async fillAndSubmitForm(formIndex: number, name: string, email: string, message: string) {
        const form = this.formContainers.nth(formIndex);

        const nameInput = form.getByPlaceholder('Name');
        const emailInput = form.getByPlaceholder('Email Address');
        const messageInput = form.getByPlaceholder('Message');

        await nameInput.fill(name);
        await emailInput.fill(email);
        await messageInput.fill(message);

        await this.solveCaptcha(form);
        const submitButton = form.locator(this.submitButton);
        await submitButton.click();
    }

    private async solveCaptcha(form: Locator) {
        const captchaInput = form.locator(this.captchaInput);
        const captchaFirstNumber = await captchaInput.getAttribute(this.captchaFirstNumber);
        const captchaSecondNumber = await captchaInput.getAttribute(this.captchaSecondNumber);
        const captchaAnswer = parseInt(captchaFirstNumber) + parseInt(captchaSecondNumber);

        await captchaInput.fill(captchaAnswer.toString());
    }
}