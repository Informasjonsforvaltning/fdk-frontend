import { test } from '../fixtures/basePage';

test('should not have any automatically detectable accessibility issues', async ({ docsPage }) => {
    await docsPage.checkAccessibility();
});
