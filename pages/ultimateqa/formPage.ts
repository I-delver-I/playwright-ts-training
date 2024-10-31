import {Locator, Page} from "@playwright/test";

export default class FormPage {
    readonly page: Page;
    readonly formContainers: Locator;
    readonly captchaInputs: Locator;
    readonly submitButtons: Locator;
    readonly successMessages: Locator;
    readonly nameInputs: Locator;
    readonly emailInputs: Locator;
    readonly messageInputs: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formContainers = page.locator('//div[contains(@id, \'et_pb_contact_form_\')]');
        this.captchaInputs = page.locator('//input[contains(@name, "et_pb_contact_captcha_")]');
        this.submitButtons = page.locator('//button[@type="submit"]');
        this.successMessages = page.locator('.et-pb-contact-message');
        this.nameInputs = page.getByPlaceholder('Name');
        this.emailInputs = page.getByPlaceholder('Email Address');
        this.messageInputs = page.getByPlaceholder('Message');
    }

    async getSuccessMessage(formIndex: number): Promise<Locator> {
        return this.successMessages.nth(formIndex);
    }

    async fillAndSubmitForm(formIndex: number, name: string, email: string, message: string) {
        const form = this.formContainers.nth(formIndex);
        await form.locator(this.nameInputs).fill(name);
        await form.locator(this.emailInputs).fill(email);
        await form.locator(this.messageInputs).fill(message);

        await this.solveCaptcha(form);
        await this.submitButtons.nth(formIndex).click();
    }

    private async solveCaptcha(form: Locator) {
        const captchaInput = form.locator(this.captchaInputs);
        const captchaFirstNumber = await captchaInput.getAttribute('data-first_digit');
        const captchaSecondNumber = await captchaInput.getAttribute('data-second_digit');
        const captchaAnswer = parseInt(captchaFirstNumber) + parseInt(captchaSecondNumber);

        await captchaInput.fill(captchaAnswer.toString());
    }
}