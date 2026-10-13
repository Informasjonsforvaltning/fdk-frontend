import { test } from "../fixtures/basePage";

test("should not have any automatically detectable accessibility issues", async ({ searchPage }) => {
  await searchPage.checkAccessibility();
});
