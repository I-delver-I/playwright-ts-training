import test, {expect} from "@playwright/test";
import HomePage from "../pages/gh-users-search/homePage";

const appUrl = 'https://gh-users-search.netlify.app/';

test('Search works correctly', async ({page}) => {
    await page.goto(appUrl);
    const homePage = new HomePage(page);

    const searchQuery = 'octocat';
    await homePage.enterSearchQuery(searchQuery);
    await homePage.clickSearchButton();
    await homePage.waitForSearchResponse();

    const username = await homePage.getUsername();
    expect(username.toLowerCase()).toContain(searchQuery);
});