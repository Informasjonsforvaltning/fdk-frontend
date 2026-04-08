import { getLocalization, type Localization } from '@fdk-frontend/localization';
import { expect, Page, BrowserContext } from '@playwright/test';
import type AxeBuilder from '@axe-core/playwright';

const dictionary = getLocalization('en').detailsPage;

export default class DatasetDetailsPage {
    url: string;
    page: Page;
    context: BrowserContext;
    dictionary: Localization;
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
        await this.page.goto(url, {
            waitUntil: 'load',
            timeout: 30000,
        });
        await this.page.waitForFunction(
            () => {
                // eslint-disable-next-line no-undef
                const urlObj = new URL(window.location.href);
                return urlObj.pathname.includes('/datasets/') && urlObj.pathname.split('/').length >= 4;
            },
            { timeout: 10000 },
        );
    }

    public async checkAccessibility(tab?: string) {
        if (tab) await this.goto(`${this.url}?tab=${tab}`);
        if (!this.accessibilityBuilder) {
            return;
        }
        // The Distributions/APIs lists render <u-details> accordions that are
        // collapsed by default. Collapsed children give axe-core a wrong picture:
        // - color-contrast walks past the zero-rect dt/dd up to the body bg
        //   (#0c1117 navy from --fdk-color-navy-dark) and false-positives.
        // - target-size sees overlapping bounding boxes from the unlayouted
        //   content and false-positives partiallyObscured.
        // Expanding via .click() (not just setAttribute('open')) is required —
        // u-details is a custom element from u-elements that only relayouts
        // its content on the click handler, not on attribute mutation.
        const summaries = this.page.locator('u-summary');
        const count = await summaries.count();
        for (let i = 0; i < count; i++) {
            const summary = summaries.nth(i);
            if (await summary.isVisible()) {
                const details = summary.locator('xpath=ancestor::u-details[1]');
                if ((await details.getAttribute('open')) === null) {
                    await summary.click();
                }
            }
        }
        const result = await this.accessibilityBuilder.analyze();
        expect.soft(result.violations).toEqual([]);
    }
}
