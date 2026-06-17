import { UNKNOWN_ORG_PATH_KEY } from "./types";
import { getOrgPathParent } from "./tree";

/** Drop parent paths when a more specific descendant is also selected. */
export const minimizeOrgPathSelection = (keys: string[]): string[] =>
  keys.filter((key) => !keys.some((other) => other !== key && other.startsWith(`${key}/`)));

export const isOrgPathSelected = (key: string, selected: string[]): boolean =>
  selected.includes(key) || selected.some((path) => path.startsWith(`${key}/`));

export const hasSelectedOrgPathDescendant = (key: string, selected: string[]): boolean =>
  selected.some((path) => path.startsWith(`${key}/`));

const hasSelectionUnderOrgPath = (parent: string, paths: string[]): boolean =>
  paths.some((path) => path === parent || path.startsWith(`${parent}/`));

/**
 * When unchecking a node, also remove its descendants. If no sibling remains selected
 * under the parent, re-select the parent so the filter still covers that branch.
 */
export const computeNextOrgPathSelection = (currentSelected: string[], key: string, checked: boolean): string[] => {
  if (checked) {
    return currentSelected.includes(key) ? currentSelected : [...currentSelected, key];
  }

  if (key === UNKNOWN_ORG_PATH_KEY) {
    return currentSelected.filter((path) => path !== UNKNOWN_ORG_PATH_KEY);
  }

  const next = currentSelected.filter((path) => path !== key && !path.startsWith(`${key}/`));

  const parent = getOrgPathParent(key);
  if (parent && !hasSelectionUnderOrgPath(parent, next) && !next.includes(parent)) {
    return [...next, parent];
  }

  return next;
};
