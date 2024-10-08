import { test as base } from '@playwright/test';
import FormPage from '../page-object-model/formPage';
import { generateAccessibilityBuilder } from '../utils/helpers';

export const test = base.extend({
    dataHunterFormPage: async ({ page, context }, use) => {
        const accessibilityBuilder = await generateAccessibilityBuilder(page);
        const dataHunterFormPage = new FormPage(page, context, accessibilityBuilder);
        await dataHunterFormPage.goto();
        await use(dataHunterFormPage);
    },
});

export { expect } from '@playwright/test';
