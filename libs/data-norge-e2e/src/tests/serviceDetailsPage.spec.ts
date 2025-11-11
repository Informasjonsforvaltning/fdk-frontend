import { test } from '../fixtures/basePage';

test.describe.configure({ mode: 'serial' });
test.describe('overview tab', () => {
    test('should not have any automatically detectable accessibility issues', async ({ serviceDetailsPage }) => {
        await serviceDetailsPage.checkAccessibility();
    });
});

test.describe('details tab', () => {
    test('should not have any automatically detectable accessibility issues', async ({ serviceDetailsPage }) => {
        await serviceDetailsPage.checkAccessibility('details');
    });
});

test.describe('community tab', () => {
    test('should not have any automatically detectable accessibility issues', async ({ serviceDetailsPage }) => {
        await serviceDetailsPage.checkAccessibility('community');
    });
});

test.describe('rdf tab', () => {
    test('should not have any automatically detectable accessibility issues', async ({ serviceDetailsPage }) => {
        await serviceDetailsPage.checkAccessibility('rdf');
    });
});
