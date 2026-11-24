import { getTreeSearchState, matchesFilterSearch, mergeVisibleSelection } from "./matching";

describe("matchesFilterSearch", () => {
  it("matches everything for an empty query", () => {
    expect(matchesFilterSearch("Oslo", "")).toBe(true);
    expect(matchesFilterSearch("Oslo", "   ")).toBe(true);
  });

  it("matches case-insensitive substrings", () => {
    expect(matchesFilterSearch("Skatteetaten", "ETAT")).toBe(true);
    expect(matchesFilterSearch("Bærum kommune", " bær ")).toBe(true);
    expect(matchesFilterSearch("Oslo", "bergen")).toBe(false);
  });
});

describe("mergeVisibleSelection", () => {
  it("keeps hidden selected values when a visible value changes", () => {
    expect(mergeVisibleSelection(["a", "b"], ["b", "c"], ["b", "c"])).toEqual(["a", "b", "c"]);
  });

  it("removes a visible value that was unchecked", () => {
    expect(mergeVisibleSelection(["a", "b"], ["b", "c"], [])).toEqual(["a"]);
  });
});

describe("getTreeSearchState", () => {
  const labels: Record<string, string> = {
    naring: "Næring",
    "naring/landbruk": "Landbruk",
    "naring/fiske": "Fiske",
    helse: "Helse",
    "helse/sykehus": "Sykehus",
  };
  const keys = Object.keys(labels);
  const getLabel = (key: string) => labels[key] ?? key;
  const getParent = (key: string) => (key.includes("/") ? key.slice(0, key.lastIndexOf("/")) : undefined);

  it("returns undefined when search is inactive", () => {
    expect(getTreeSearchState(keys, " ", getLabel, getParent)).toBeUndefined();
  });

  it("shows and expands ancestors of nested matches", () => {
    const state = getTreeSearchState(keys, "land", getLabel, getParent);
    expect(state && [...state.visible].sort()).toEqual(["naring", "naring/landbruk"]);
    expect(state && [...state.expanded]).toEqual(["naring"]);
  });

  it("keeps descendants of a matching node visible without expanding it", () => {
    const state = getTreeSearchState(keys, "helse", getLabel, getParent);
    expect(state && [...state.visible].sort()).toEqual(["helse", "helse/sykehus"]);
    expect(state?.expanded.size).toBe(0);
  });
});
