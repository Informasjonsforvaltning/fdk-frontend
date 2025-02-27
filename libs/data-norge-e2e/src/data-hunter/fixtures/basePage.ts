import { test as base } from '@playwright/test';
import FormPage from '../page-object-model/formPage';
import Frontpage from '../page-object-model/frontpage';
import DocsPage from '../page-object-model/docsPage';
import { generateAccessibilityBuilder } from '../utils/helpers';

export const test = base.extend({
    dataHunterFormPage: async ({ page, context }, use) => {
        const accessibilityBuilder = await generateAccessibilityBuilder(page);
        const dataHunterFormPage = new FormPage(page, context, accessibilityBuilder);
        await dataHunterFormPage.goto();
        await use(dataHunterFormPage);
    },
    frontpage: async ({ page, context }, use) => {
        const accessibilityBuilder = await generateAccessibilityBuilder(page);
        const frontpage = new Frontpage(page, context, accessibilityBuilder);
        await frontpage.goto();
        await use(frontpage);
    },
    docsPage: async ({ page, context }, use) => {
        const accessibilityBuilder = await generateAccessibilityBuilder(page);
        const docsPage = new DocsPage(page, context, accessibilityBuilder);
        await docsPage.goto();
        await use(docsPage);
    },
});

export { expect } from '@playwright/test';
