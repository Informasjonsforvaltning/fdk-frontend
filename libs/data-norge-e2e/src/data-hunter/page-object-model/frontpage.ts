import { Dictionary } from '@fdk-frontend/dictionaries';
import { expect, Page, BrowserContext } from '@playwright/test';
import * as mockData from '../data/inputData.json';
import type AxeBuilder from '@axe-core/playwright';
import dictionary from '@fdk-frontend/libs/dictionaries/src/lib/dictionaries/en/data-hunter-page.json';

export default class Frontpage {
    dataHunterPageUrl = '/nb';
    page: Page;
    context: BrowserContext;
    dictionary: Dictionary;
    accessibilityBuilder;

    constructor(page: Page, context: BrowserContext, accessibilityBuilder?: AxeBuilder) {
        this.dictionary = dictionary;
        this.page = page;
        this.context = context;
        this.accessibilityBuilder = accessibilityBuilder;
    }

    // Locators
    pageTitle = () => this.page.getByRole('heading', { name: this.dictionary.aiBanner.title });
    aiSearchInput = () => this.page.getByLabel(this.dictionary.aiBanner.prompt.label);
    submitButton = () => this.page.getByRole('button', { name: this.dictionary.aiBanner.prompt.button });
    form = () => this.page.locator('[id="data-hunter-form"]');

    // Helpers
    public async goto(url: string = this.dataHunterPageUrl) {
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
