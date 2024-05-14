import { Dictionary, getDictionary } from '@fdk-frontend/dictionaries';
import { expect, Page } from '@playwright/test';
import * as mockData from '../data/inputData.json';
import type AxeBuilder from '@axe-core/playwright';

export default class FormPage {
  dataHunterPageUrl = '/forms/en/data-hunter';
  page: Page;
  dictionary: Dictionary;
  accessibilityBuilder;

  constructor(page: Page, accessibilityBuilder?: AxeBuilder) {
    this.page = page;
    getDictionary('en').then((dict) => (this.dictionary = dict));
    this.accessibilityBuilder = accessibilityBuilder;
  }

  public async goto() {
    await this.page.goto(this.dataHunterPageUrl);
  }

  public async checkAccessibility() {
    if (!this.accessibilityBuilder) {
      return;
    }
    const result = await this.accessibilityBuilder.analyze();
    expect.soft(result.violations).toEqual([]);
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
  }
}
