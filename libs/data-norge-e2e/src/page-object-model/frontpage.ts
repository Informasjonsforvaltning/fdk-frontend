import { getLocalization, type Localization } from '@fdk-frontend/localization';
import { expect, Page, BrowserContext } from '@playwright/test';
import type AxeBuilder from '@axe-core/playwright';

const dictionary = getLocalization('en').frontpage;

export default class Frontpage {
    page: Page;
    context: BrowserContext;
    dictionary: Localization;
    accessibilityBuilder;

    constructor(page: Page, context: BrowserContext, accessibilityBuilder?: AxeBuilder) {
        this.url = '/nb';
        this.dictionary = dictionary;
        this.page = page;
        this.context = context;
        this.accessibilityBuilder = accessibilityBuilder;
    }

    // Locators
    pageTitle = () => this.page.getByRole('heading', { name: this.dictionary.aiBanner.title });
    aiSearchInput = () => this.page.getByLabel(this.dictionary.aiBanner.prompt.label);
    submitButton = () => this.page.getByRole('button', { name: this.dictionary.aiBanner.prompt.button });

    // Helpers
    public async goto(url: string = this.url) {
        await this.page.goto(url);
    }

    public async checkAccessibility() {
        if (!this.accessibilityBuilder) {
            return;
        }
        const result = await this.accessibilityBuilder.analyze();
        expect.soft(result.violations).toEqual([]);
    }
}
