import { test, expect } from '../fixtures/basePage';

test.describe('Validator Page Tests', () => {
    test.beforeEach(async ({ page, context }) => {
        // Clear any existing state and ensure clean start
        await page.goto('about:blank');
        // Clear cookies and storage for better isolation
        await context.clearCookies();
        // Add a small delay to ensure clean state
        await page.waitForTimeout(100);
    });

    test.describe('Maintenance Message Tests', () => {
        test('should display maintenance message in Norwegian Bokmål', async ({ page }) => {
            const response = await page.goto('/nb/validator');
            expect(response?.status()).toBe(200);

            // Check for the maintenance alert
            await expect(page.getByText('OBS:')).toBeVisible();
            await expect(page.getByText('Validatoren er tatt ned på grunn av nødvendig vedlikehold')).toBeVisible();
            await expect(page.getByText('Mer informasjon kommer')).toBeVisible();

            // Check for contact link
            await expect(page.locator('a[href="/contact"]')).toBeVisible();
            // Use more specific selector to target only the contact link in the alert
            await expect(page.locator('a[href="/contact"]').filter({ hasText: 'Ta kontakt med oss' })).toBeVisible();
        });
    });

    test.describe('Page Structure Tests', () => {
        test('should have proper page structure and metadata', async ({ page }) => {
            const response = await page.goto('/nb/validator');
            expect(response?.status()).toBe(200);

            // Check page title
            await expect(page).toHaveTitle(/Valideringsverktøy/);

            // Check for main heading
            await expect(page.locator('h1')).toContainText('Valideringsverktøy');

            // Check for ingress text
            await expect(page.getByText('Validerer datasettbeskrivelser')).toBeVisible();

            // Check for alert component
            await expect(page.getByText('OBS:')).toBeVisible();
        });

        test('should have proper heading structure', async ({ page }) => {
            const response = await page.goto('/nb/validator');
            expect(response?.status()).toBe(200);

            // Check for proper heading structure
            const h1 = page.locator('h1');
            await expect(h1).toBeVisible();
            await expect(h1).toContainText('Valideringsverktøy');

            // Check that page is accessible
            await expect(page.locator('main, [role="main"]')).toBeVisible();
        });
    });

    test.describe('Content Validation Tests', () => {
        test('should display correct content for Norwegian Bokmål', async ({ page }) => {
            const response = await page.goto('/nb/validator');
            expect(response?.status()).toBe(200);

            // Check page title
            await expect(page).toHaveTitle(/Valideringsverktøy/);

            // Check main heading
            await expect(page.locator('h1')).toContainText('Valideringsverktøy');

            // Check description text
            await expect(page.getByText('Validerer datasettbeskrivelser')).toBeVisible();
        });

        test('should have working contact links', async ({ page }) => {
            const response = await page.goto('/nb/validator');
            expect(response?.status()).toBe(200);

            // Check contact link is present and clickable
            const contactLink = page.locator('a[href="/contact"]').filter({ hasText: 'Ta kontakt med oss' });
            await expect(contactLink).toBeVisible();
            await expect(contactLink).toContainText('Ta kontakt med oss');

            // Verify link href is correct
            await expect(contactLink).toHaveAttribute('href', '/contact');
        });
    });

    test.describe('Alert Component Tests', () => {
        test('should display alert with correct styling', async ({ page }) => {
            const response = await page.goto('/nb/validator');
            expect(response?.status()).toBe(200);

            // Check alert component exists
            const alert = page.locator('[data-testid="alert"], .alert, [role="alert"], [class*="alert"]').first();
            await expect(alert).toBeVisible();

            // Check alert contains maintenance message
            await expect(alert).toContainText('OBS:');
            await expect(alert).toContainText('Validatoren er tatt ned på grunn av nødvendig vedlikehold');
        });

        test('should have proper alert styling for Norwegian Bokmål', async ({ page }) => {
            const response = await page.goto('/nb/validator');
            expect(response?.status()).toBe(200);

            // Check alert is present
            const alert = page.locator('[data-testid="alert"], .alert, [role="alert"], [class*="alert"]').first();
            await expect(alert).toBeVisible();

            // Check alert has warning severity styling
            await expect(alert).toHaveClass(/warning|alert/);
        });
    });
});
