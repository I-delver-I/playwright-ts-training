import test, {expect} from "@playwright/test";
import NavSectionsPage from "../pages/ultimateqa/navSectionsPage";
import FormPage from "../pages/ultimateqa/formPage";
import ButtonsPage from "../pages/ultimateqa/buttonsPage";

const appUrl = 'https://ultimateqa.com/complicated-page';

test.beforeEach(async ({page}) => {
    await page.goto(appUrl);
});

test('Hiding/showing navigation sections works correctly', async ({page}) => {
    const navSectionsPage = new NavSectionsPage(page);

    const navSectionsCount = await navSectionsPage.navSections.count();

    for (let navSectionIndex = 0; navSectionIndex < navSectionsCount; navSectionIndex++) {
        await navSectionsPage.hide(navSectionIndex);
        await expect(await navSectionsPage.getNavItemsWrap(navSectionIndex)).toBeHidden();

        await navSectionsPage.show(navSectionIndex);
        await expect(await navSectionsPage.getNavItemsWrap(navSectionIndex)).toBeVisible();
    }
});

test.describe('Parameterized form tests', () => {
    const testCases = [
        {name: 'Hans', email: 'hans@gmail.com', message: 'I am Hans'},
        {name: 'Greta', email: 'greta@gmail.com', message: 'I am Greta'},
        {name: 'John', email: 'john@gmail.com', message: 'I am John'},
    ];

    test('Successfully submits all forms', async ({page}) => {
        const formsPage = new FormPage(page);

        for (let i = 0; i < testCases.length; i++) {
            const {name, email, message} = testCases[i];

            await formsPage.fillAndSubmitForm(i, name, email, message);
            const successMessage = await formsPage.getSuccessMessage(i);
            await expect(successMessage).toBeVisible();
            await expect(successMessage).toHaveText('Thanks for contacting us');
        }
    });
});

test.skip('Social media buttons are visible and have correct URLs', async ({page}) => {
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
    const buttonsPage = new ButtonsPage(page);

    const buttonsCount = await buttonsPage.buttons.count();
    const initialUrl = page.url();

    for (let buttonIndex = 0; buttonIndex < buttonsCount; buttonIndex++) {
        await buttonsPage.clickButton(buttonIndex);
        await page.waitForURL(appUrl);
        const newUrl = page.url();
        expect(newUrl).toBe(initialUrl);
    }
});