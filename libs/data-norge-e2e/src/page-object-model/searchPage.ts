import { getLocalization, type Localization } from "@fdk-frontend/localization";
import { expect, Page, BrowserContext } from "@playwright/test";
import type AxeBuilder from "@axe-core/playwright";

const dictionary = getLocalization("nb").searchPage;

export default class SearchPage {
  url: string;
  page: Page;
  context: BrowserContext;
  dictionary: Localization;
  accessibilityBuilder?: AxeBuilder;

  constructor(page: Page, context: BrowserContext, accessibilityBuilder?: AxeBuilder) {
    this.url = "/nb/search";
    this.dictionary = dictionary;
    this.page = page;
    this.context = context;
    this.accessibilityBuilder = accessibilityBuilder;
  }

  public async goto(url: string = this.url) {
    const summaryLoaded = this.page.waitForResponse((response) => response.url().includes("/api/search/summary"));
    await this.page.goto(url);
    const summary = await summaryLoaded;
    expect(summary.ok()).toBeTruthy();

    // /search lists all catalog hits. /search/ai shows the KI promo when there is no query.
    // The skeleton reuses the result list markup.
    const settledHeading = this.page.getByRole("heading", { level: 1, name: this.dictionary.heading.label });
    const settledContent = this.page
      .getByText(this.dictionary.aiPromoSplash.suggestionsLegend)
      .or(this.page.locator(".fdk-box-list"))
      .or(this.page.getByText(this.dictionary.entitySearch.noResults));

    await expect(settledHeading).toBeVisible();
    await expect(settledContent.first()).toBeVisible();
  }

  public async checkAccessibility() {
    if (!this.accessibilityBuilder) {
      return;
    }
    const result = await this.accessibilityBuilder.analyze();
    expect.soft(result.violations).toEqual([]);
  }
}
