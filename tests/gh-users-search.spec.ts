import test, {expect} from "@playwright/test";
import SearchBarPage from "../pages/gh-users-search/searchBarPage";

const appUrl = 'https://gh-users-search.netlify.app/';

test('Search works correctly', async ({page}) => {
    await page.goto(appUrl);
    const searchBarPage = new SearchBarPage(page);

    const searchQuery = 'octocat';
    await searchBarPage.enterSearchQuery(searchQuery);
    await searchBarPage.clickSearchButton();

    const userSection = page.locator(searchBarPage.userSection);
    const usernameLocator = userSection.locator(searchBarPage.username);
    await page.waitForResponse(response =>
        response.url().includes('/users') && response.status() === 200
    );

    const username = await usernameLocator.innerText();
    expect(username.toLowerCase()).toContain(searchQuery);
});