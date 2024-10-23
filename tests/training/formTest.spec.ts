import {expect} from "@playwright/test";
import {test} from '../../fixtures/custom/aliexpress-pages-fixture';

test("Form test", async ({page}) => {
    const appUrl = 'https://demoqa.com/automation-practice-form';

    // await formPage.navigate(appUrl);
    // await formPage.enterFirstName(data.firstName);
    // await formPage.enterLastName(data.lastName);

    expect(page.url()).toBe(appUrl);
});