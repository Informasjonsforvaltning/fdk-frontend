import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/forms/data-hunter');

  // Expect h1 to contain a substring.
  expect(await page.title()).toBe('Forms');
});
