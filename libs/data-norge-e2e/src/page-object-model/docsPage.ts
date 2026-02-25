import { getLocalization, type Localization } from '@fdk-frontend/localization';
import { expect, Page, BrowserContext } from '@playwright/test';
import type AxeBuilder from '@axe-core/playwright';

const dictionary = getLocalization('en').docs;

export default class DocsPage {
    page: Page;
    context: BrowserContext;
    dictionary: Localization;
    accessibilityBuilder;

    constructor(page: Page, context: BrowserContext, accessibilityBuilder?: AxeBuilder) {
        this.url = '/nb/docs';
        this.dictionary = dictionary;
        this.page = page;
        this.context = context;
        this.accessibilityBuilder = accessibilityBuilder;
    }

    // Locators

    // Helpers
    public async goto(url: string = this.url) {
        await this.page.goto(url);
    }

    public async checkAccessibility() {
        if (!this.accessibilityBuilder) {
            return;
        }
        const result = await this.accessibilityBuilder.disableRules(['landmark-unique']).analyze();
        expect.soft(result.violations).toEqual([]);
    }
}
