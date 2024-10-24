import {test as base} from "@playwright/test";
import SaucedemoBase from "../../pages/saucedemo/saucedemoBase";

type UIPages = {
    basePage: SaucedemoBase;
}

export const test = base.extend<UIPages>({
    basePage: async ({page}, use) => {
        const base = new SaucedemoBase(page);
        await use(base);
    },
});