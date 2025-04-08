import { Dictionary } from '@fdk-frontend/dictionaries';
import { expect, Page, BrowserContext } from '@playwright/test';
import type AxeBuilder from '@axe-core/playwright';
import dictionary from '@fdk-frontend/libs/dictionaries/src/lib/dictionaries/en/docs.json';

export default class DocsPage {
    page: Page;
    context: BrowserContext;
    dictionary: Dictionary;
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
