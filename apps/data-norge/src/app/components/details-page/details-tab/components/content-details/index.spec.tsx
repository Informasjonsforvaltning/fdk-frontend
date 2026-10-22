import React from "react";
import { render, screen } from "@testing-library/react";
import { type DatasetWithIdentifier } from "@fellesdatakatalog/types";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import { DatasetDetailsTabContext } from "../../";
import ContentDetails from ".";

// Isolate the content rows from the full details tab and unrelated UI barrel exports.
jest.mock("../../", () => ({
  DatasetDetailsTabContext: jest.requireActual<typeof import("react")>("react").createContext({ showEmptyRows: true }),
}));

jest.mock("@fdk-frontend/ui", () => ({
  Dlist: jest.requireActual<typeof import("@fdk-frontend/ui/dlist")>("@fdk-frontend/ui/dlist").default,
  Hstack: jest.requireActual<typeof import("@fdk-frontend/ui/hstack")>("@fdk-frontend/ui/hstack").default,
  SmartList: jest.requireActual<typeof import("@fdk-frontend/ui/smart-list")>("@fdk-frontend/ui/smart-list").default,
  PlaceholderText: jest.requireActual<typeof import("@fdk-frontend/ui/placeholder-text")>(
    "@fdk-frontend/ui/placeholder-text",
  ).default,
}));

jest.mock("@digdir/designsystemet-react", () => ({
  Heading: ({ children }: React.PropsWithChildren) => <h2>{children}</h2>,
  Paragraph: ({ children }: React.PropsWithChildren) => <p>{children}</p>,
}));

jest.mock("@fellesdatakatalog/ui", () => ({
  HelpText: ({ children }: React.PropsWithChildren) => <span>{children}</span>,
}));

const dataset: DatasetWithIdentifier = {
  id: "test-dataset",
  uri: "https://example.com/dataset",
  publisher: {},
  title: {},
  description: {},
  descriptionFormatted: {},
  objective: {},
  keyword: [],
  issued: "",
  modified: "",
  distribution: [],
  harvest: {},
  contactPoint: [],
  conformsTo: [],
  landingPage: [],
  qualifiedAttributions: [],
  isOpenData: false,
  isRelatedToTransportportal: false,
};

type Languages = DatasetWithIdentifier["language"];

// The resource API can return null labels, which the shared type does not model.
const invalidLanguages: Languages = JSON.parse(`[
  {"code": "EN", "prefLabel": null},
  {"code": "NN", "prefLabel": null},
  {"code": "NB", "prefLabel": null}
]`);

const renderContentDetails = (language: Languages, showEmptyRows = true, locale: LocaleCodes = "nb") => {
  render(
    <DatasetDetailsTabContext.Provider value={{ showEmptyRows }}>
      <ContentDetails
        dataset={{ ...dataset, language }}
        locale={locale}
        dictionary={getLocalization(locale).detailsPage}
      />
    </DatasetDetailsTabContext.Provider>,
  );
};

const emptyLanguages: { name: string; language: Languages }[] = [
  { name: "null labels from invalid language codes", language: invalidLanguages },
  { name: "missing labels", language: [{ code: "EN" }] },
  { name: "empty labels", language: [{ prefLabel: {} }, { prefLabel: { nb: "" } }] },
  { name: "whitespace-only labels", language: [{ prefLabel: { nb: " \t\n " } }] },
  { name: "an empty array", language: [] },
  { name: "an absent language field", language: undefined },
];

describe("ContentDetails language", () => {
  it.each(emptyLanguages)("shows Not provided for $name", ({ language }) => {
    renderContentDetails(language);

    expect(screen.getByText("Språk:").nextElementSibling?.textContent).toBe("Ikke oppgitt");
  });

  it.each(emptyLanguages)("hides $name when empty rows are hidden", ({ language }) => {
    renderContentDetails(language, false);

    expect(screen.queryByText("Språk:")).toBeNull();
  });

  it("omits unusable labels from a mixed language list", () => {
    renderContentDetails([
      { code: "EN" },
      { prefLabel: { nb: "Engelsk" } },
      { prefLabel: { nb: "   " } },
      { prefLabel: { nb: "Norsk bokmål" } },
      { prefLabel: {} },
    ]);

    expect(screen.getByText("Språk:").nextElementSibling?.textContent).toBe("Engelsk, Norsk bokmål");
  });

  it("keeps valid languages visible when empty rows are hidden", () => {
    renderContentDetails([{ prefLabel: { nb: "Engelsk" } }, { prefLabel: { nb: "Norsk bokmål" } }], false);

    expect(screen.getByText("Språk:").nextElementSibling?.textContent).toBe("Engelsk, Norsk bokmål");
  });

  it("preserves locale selection and label fallbacks", () => {
    renderContentDetails(
      [
        { prefLabel: { nb: "Engelsk", en: "English" } },
        { prefLabel: { nb: "Norsk bokmål" } },
        { prefLabel: { nn: "Nynorsk" } },
      ],
      true,
      "en",
    );

    expect(screen.getByText("Language:").nextElementSibling?.textContent).toBe("English, Norsk bokmål, Nynorsk");
  });
});
