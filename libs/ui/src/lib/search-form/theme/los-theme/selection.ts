import { getLosThemeParent } from "./tree";

/** Drop parent paths when a more specific descendant is also selected. */
export const minimizeLosThemeSelection = (keys: string[]): string[] =>
  keys.filter((key) => !keys.some((other) => other !== key && other.startsWith(`${key}/`)));

export const isLosThemeSelected = (key: string, selected: string[]): boolean =>
  selected.includes(key) || selected.some((path) => path.startsWith(`${key}/`));

export const hasSelectedLosThemeDescendant = (key: string, selected: string[]): boolean =>
  selected.some((path) => path.startsWith(`${key}/`));

const hasSelectionUnderLosTheme = (parent: string, paths: string[]): boolean =>
  paths.some((path) => path === parent || path.startsWith(`${parent}/`));

/**
 * When unchecking a node, also remove its descendants. If no sibling remains selected
 * under the parent, re-select the parent so the filter still covers that branch.
 */
export const computeNextLosThemeSelection = (currentSelected: string[], key: string, checked: boolean): string[] => {
  if (checked) {
    return currentSelected.includes(key) ? currentSelected : [...currentSelected, key];
  }

  const next = currentSelected.filter((path) => path !== key && !path.startsWith(`${key}/`));

  const parent = getLosThemeParent(key);
  if (parent && !hasSelectionUnderLosTheme(parent, next) && !next.includes(parent)) {
    return [...next, parent];
  }

  return next;
};
