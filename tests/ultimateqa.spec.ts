import test, {expect} from "@playwright/test";
import NavigationSection from "../pages/ultimateqa/navigationSection";
import Form from "../pages/ultimateqa/form";

const appUrl = 'https://ultimateqa.com/complicated-page';

test('Hiding/showing navigation sections works correctly', async ({page}) => {
    await page.goto(appUrl);

    const navigationSections = await page.locator('//div[@class="lwptoc_i"]').all();

    for (const navigationSection of navigationSections) {
        const section = new NavigationSection(page, navigationSection)
        const navigationItems = navigationSection.locator(section.navigationItems);

        await section.hide();
        await expect(navigationItems).toBeHidden();

        await section.show();
        await expect(navigationItems).toBeVisible();
    }
});

test.describe('Parameterized form tests', () => {
    const testCases = [
        {name: 'Hans', email: 'hans@gmail.com', message: 'I am Hans'},
        {name: 'Greta', email: 'greta@gmail.com', message: 'I am Greta'},
        {name: 'John', email: 'john@gmail.com', message: 'I am John'},
    ];

    testCases.forEach(({name, email, message}) => {
        test(`Data name: "${name}", email: "${email}", message: "${message}" successfully submits in forms`,
            async ({page}) => {
                await page.goto(appUrl);
                const formContainers =
                    await page.locator('//div[contains(@id, \'et_pb_contact_form_\')]').all();

                for (const formContainer of formContainers) {
                    const form = new Form(page, formContainer);

                    await form.fill(name, email, message);
                    await form.submit();
                    const successMessage = formContainer.locator(form.successMessage);
                    await successMessage.waitFor({state: 'visible'});
                    expect(await successMessage.innerText()).toBe('Thanks for contacting us');
                }
            });
    });
});

test.skip('Social media buttons are visible and have correct URLs', async ({page}) => {
    await page.goto(appUrl);

    const socialMediaButtons = [
        {selector: 'a#facebook-follow', expectedUrl: 'https://www.facebook.com/', title: 'Follow on Facebook'},
        {selector: 'a#twitter-follow', expectedUrl: 'https://twitter.com/', title: 'Follow on Twitter'},
    ];

    const socialMediaSection = '//div[contains(@class,"et_pb_row et_pb_row_4")]';
    const xButtons = await page.locator(`${socialMediaSection}//a[@title="Follow on Twitter"]`).all();
    expect(xButtons.length).toBe(5);

    const fbButtons = await page.locator(`${socialMediaSection}//a[@title="Follow on Facebook"]`).all();
    expect(fbButtons.length).toBe(5);

    for (const xButton of xButtons) {
        expect(await xButton.isVisible()).toBeTruthy();
        const xUrl = await xButton.getAttribute('href');
        await xButton.click();
        await page.waitForURL(xUrl);
        expect(page.url()).toBe(xUrl);
        await page.goBack();
    }
});

test('All buttons in section refresh page when clicked', async ({page}) => {
    await page.goto(appUrl)

    const buttons = await page.locator('//a[contains(@class, "et_pb_button_")]').all();

    for (const button of buttons) {
        const initialUrl = page.url();
        await button.click();
        await page.waitForURL(appUrl);
        const newUrl = page.url();
        expect(newUrl).toBe(initialUrl);
    }
});