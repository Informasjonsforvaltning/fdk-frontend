import { Dictionary } from '@fdk-frontend/dictionaries';
import { expect, Page, BrowserContext } from '@playwright/test';
import type AxeBuilder from '@axe-core/playwright';
import dictionary from '@fdk-frontend/libs/dictionaries/src/lib/dictionaries/en/data-hunter-page.json';

export default class DatasetDetailsPage {
    page: Page;
    context: BrowserContext;
    dictionary: Dictionary;
    accessibilityBuilder;

    constructor(page: Page, context: BrowserContext, accessibilityBuilder?: AxeBuilder) {
        // eslint-disable-next-line no-undef
        this.url = `/nb/datasets/${process.env.E2E_DATASET_ID}`;
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

    public async checkAccessibility(tab: string) {
        if (tab) await this.goto(`${this.url}?tab=${tab}`);
        if (!this.accessibilityBuilder) {
            return;
        }
        const result = await this.accessibilityBuilder.analyze();
        expect.soft(result.violations).toEqual([]);
    }
}
