import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EntityType, type PublicService } from "@fellesdatakatalog/types";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import ServiceDetailsPage from ".";

// Keep this regression test independent of unrelated UI and RDF dependencies.
jest.mock("@fdk-frontend/utils", () => jest.requireActual("@fdk-frontend/utils/common"));
jest.mock("@fdk-frontend/ui", () => {
  const Content = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
  return {
    Badge: Content,
    Breadcrumbs: () => null,
    Markdown: Content,
    Article: Content,
    ScrollShadows: Content,
    ExpandableContent: Content,
    PlaceholderBox: jest.requireActual("@fdk-frontend/ui/placeholder-box").default,
    ExternalLink: Content,
    PlaceholderText: Content,
    Dlist: Content,
    Hstack: Content,
    InputWithCopyButton: () => null,
    SmartList: () => null,
    OrgButton: Content,
    TagList: Content,
    StatusTag: () => null,
    TagLink: Content,
  };
});
jest.mock("../details-tab/components/accordion-list", () => ({ AccordionList: () => null }));
jest.mock("../metadata-tab", () => () => null);
jest.mock("../community-tab", () => () => null);
jest.mock("../../structured-data/service-structured-data", () => () => null);

const descriptions = {
  nb: "Beskrivelse av tjenesten",
  nn: "Skildring av tenesta",
  en: "Description of the service",
};

const renderService = (locale: LocaleCodes, hasDescription = false) => {
  const localization = getLocalization(locale);
  const service: PublicService = {
    id: "service-id",
    identifier: "https://example.com/service",
    uri: "https://example.com/service",
    title: { nb: "Test service" },
    type: EntityType.PUBLIC_SERVICE,
    participatingAgents: [],
    description: descriptions,
  };
  // The API can omit description, although PublicService declares it as required.
  if (!hasDescription) Reflect.deleteProperty(service, "description");

  render(
    <ServiceDetailsPage
      baseUri="https://example.com"
      communityBaseUri="https://example.com/community"
      concepts={[]}
      producesDatasets={[]}
      defaultActiveTab="overview"
      dictionaries={{ common: localization.common, detailsPage: localization.detailsPage }}
      locale={locale}
      service={service}
    />,
  );
};

const cases: [LocaleCodes, string][] = [
  ["nb", "Denne tjenesten har ingen beskrivelse"],
  ["nn", "Denne tenesta har inga skildring"],
  ["en", "This service has no description"],
];

describe("ServiceDetailsPage overview", () => {
  it.each(cases)(
    "shows a service-specific placeholder in %s when the description is missing",
    (locale, placeholder) => {
      renderService(locale);

      expect(screen.getByText(placeholder)).toBeInTheDocument();
      expect(
        screen.queryByText(getLocalization(locale).detailsPage.overview.description.placeholder),
      ).not.toBeInTheDocument();
    },
  );

  it.each(cases)("preserves the service description in %s", (locale, placeholder) => {
    renderService(locale, true);

    expect(screen.getByText(descriptions[locale])).toBeInTheDocument();
    expect(screen.queryByText(placeholder)).not.toBeInTheDocument();
    expect(
      screen.queryByText(getLocalization(locale).detailsPage.overview.description.placeholder),
    ).not.toBeInTheDocument();
  });
});
