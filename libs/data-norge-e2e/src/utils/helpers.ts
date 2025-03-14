import AxeBuilder from '@axe-core/playwright';
import { Page } from '@playwright/test';

export const generateAccessibilityBuilder = async (page: Page) =>
    new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']);
