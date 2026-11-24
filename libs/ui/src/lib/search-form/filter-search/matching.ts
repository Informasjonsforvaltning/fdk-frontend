const normalize = (text: string): string => text.trim().toLocaleLowerCase();

export const isFilterSearchActive = (query: string): boolean => normalize(query).length > 0;

export const matchesFilterSearch = (label: string, query: string): boolean => {
  const normalizedQuery = normalize(query);
  if (normalizedQuery.length === 0) return true;
  return normalize(label).includes(normalizedQuery);
};

export const mergeVisibleSelection = (
  selected: string[],
  visibleValues: string[],
  nextVisibleSelected: string[],
): string[] => {
  const visible = new Set(visibleValues);
  const hiddenSelected = selected.filter((key) => !visible.has(key));
  return [...hiddenSelected, ...nextVisibleSelected.filter((key) => !hiddenSelected.includes(key))];
};

export type TreeSearchState = {
  visible: ReadonlySet<string>;
  expanded: ReadonlySet<string>;
};

export const getTreeSearchState = (
  keys: string[],
  query: string,
  getLabel: (key: string) => string,
  getParent: (key: string) => string | undefined,
): TreeSearchState | undefined => {
  if (!isFilterSearchActive(query)) return undefined;

  const matched = new Set(keys.filter((key) => matchesFilterSearch(getLabel(key), query)));
  const visible = new Set<string>();
  const expanded = new Set<string>();

  for (const key of keys) {
    let isVisible = matched.has(key);
    let parent = getParent(key);
    while (parent !== undefined && !isVisible) {
      if (matched.has(parent)) isVisible = true;
      parent = getParent(parent);
    }
    if (isVisible) visible.add(key);
  }

  for (const key of matched) {
    let parent = getParent(key);
    while (parent !== undefined) {
      visible.add(parent);
      expanded.add(parent);
      parent = getParent(parent);
    }
  }

  return { visible, expanded };
};
