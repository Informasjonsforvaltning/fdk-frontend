import { Dictionary, getDictionary } from '@fdk-frontend/i18n';
import { expect, Page, BrowserContext } from '@playwright/test';
import * as mockData from '../data/inputData.json';
import type AxeBuilder from '@axe-core/playwright';

export default class FormPage {
  dataHunterPageUrl = '/forms/en/data-hunter';
  page: Page;
  context: BrowserContext;
  dictionary: Dictionary;
  accessibilityBuilder;
  formData = {};

  constructor(page: Page, context: BrowserContext, accessibilityBuilder?: AxeBuilder) {
    getDictionary('en', 'data-hunter-page').then((dict) => (this.dictionary = dict));
    this.page = page;
    this.context = context;
    this.accessibilityBuilder = accessibilityBuilder;
    this.init();
  }

  async init() {
    getDictionary('en', 'data-hunter-page').then((dict) => (this.dictionary = dict));
    await this.addSubmitListener();
  }

  // Locators
  pageTitle = () => this.page.getByRole('heading', { name: this.dictionary.dataHunterForm.title });
  pageDescription = () => this.page.getByText(this.dictionary.dataHunterForm.description);
  datasetInput = () => this.page.getByLabel(this.dictionary.dataHunterForm.dataset.label);
  locationInput = () => this.page.getByLabel(this.dictionary.dataHunterForm.location.label);
  attemptsInput = () => this.page.getByLabel(this.dictionary.dataHunterForm.efforts.label);
  nameInput = () => this.page.getByLabel(this.dictionary.name);
  emailInput = () => this.page.getByLabel(this.dictionary.email);
  organizationNumberInput = () => this.page.getByLabel(this.dictionary.organizationNumber);
  phoneNumberInput = () => this.page.getByLabel(this.dictionary.phoneNumber);
  submitButton = () => this.page.getByRole('button', { name: this.dictionary.submitRequest });
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

  private async addSubmitListener() {
    await this.form().evaluate((node) =>
      node.addEventListener('submit', async (event) => {
        event.preventDefault();
        // eslint-disable-next-line no-undef
        const formData = Array.from(new FormData(event.target as HTMLFormElement).entries()).reduce(
          (data, [key, value]) => (!key.startsWith('$') ? { ...data, [key]: value } : data),
          {},
        );
        node.setAttribute('submitted-form-data', JSON.stringify(formData));
      }),
    );
  }

  /**
   * Validate form values after form submission, by checking the result of the new FormData()
   */
  private async validateFormSubmission() {
    const formData = await this.form().getAttribute('submitted-form-data');
    if (!formData) {
      throw new Error('Form submission failed');
    }
    this.formData = JSON.parse(formData);

    for await (const [key, value] of Object.entries(this.formData)) {
      expect(mockData[key as keyof typeof mockData]).toStrictEqual(value);
    }
  }

  // Actions
  public async checkPageTitleText() {
    await expect(this.pageTitle()).toHaveText(this.dictionary.dataHunterForm.title);
  }

  public async checkPageDescriptionText() {
    await expect(this.pageDescription()).toHaveText(this.dictionary.dataHunterForm.description);
  }

  public async fillForm() {
    await this.datasetInput().fill(mockData.dataset);
    await this.locationInput().fill(mockData.location);
    await this.attemptsInput().fill(mockData.efforts);
    await this.nameInput().fill(mockData.name);
    await this.emailInput().fill(mockData.email);
    await this.organizationNumberInput().fill(mockData.organizationNumber);
    await this.phoneNumberInput().fill(mockData.phoneNumber);
  }

  public async submitForm() {
    await this.submitButton().click();
    await this.validateFormSubmission();
  }
}
