import { test } from '../fixtures/basePage';
import { expect } from '@playwright/test';

test('example', async () => {
  expect(true).toBe(true);
});

/*
test('should not have any automatically detectable accessibility issues', async ({ dataHunterFormPage }) => {
  await dataHunterFormPage.checkAccessibility();
});

test('check page text', async ({ dataHunterFormPage }) => {
  await dataHunterFormPage.checkPageTitleText();
  await dataHunterFormPage.checkPageDescriptionText();
});

test('fill and submit form', async ({ dataHunterFormPage }) => {
  await dataHunterFormPage.fillForm();
  await dataHunterFormPage.submitForm();
});
*/