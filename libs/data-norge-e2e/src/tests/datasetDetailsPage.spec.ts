import { test } from '../fixtures/basePage';

test.describe.configure({ mode: 'serial' });
test.describe('overview tab', () => {
    test('should not have any automatically detectable accessibility issues', async ({ datasetDetailsPage }) => {
        await datasetDetailsPage.checkAccessibility();
    });
});

test.describe('distributions tab', () => {
    test('should not have any automatically detectable accessibility issues', async ({ datasetDetailsPage }) => {
        await datasetDetailsPage.checkAccessibility('distributions');
    });
});
   
test.describe('details tab', () => {
    test('should not have any automatically detectable accessibility issues', async ({ datasetDetailsPage }) => {
        await datasetDetailsPage.checkAccessibility('details');
    });
});

test.describe('community tab', () => {
    test('should not have any automatically detectable accessibility issues', async ({ datasetDetailsPage }) => {
        await datasetDetailsPage.checkAccessibility('community');
    });
});

test.describe('rdf tab', () => {
    test('should not have any automatically detectable accessibility issues', async ({ datasetDetailsPage }) => {
        await datasetDetailsPage.checkAccessibility('rdf');
    });
});
