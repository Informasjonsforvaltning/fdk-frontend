import { render, screen } from "@testing-library/react";
import { EntityType } from "@fellesdatakatalog/types";
import { DataNorgeOriginProvider } from "./origin-context";
import InternalLink from "./index";

const transportDataset = {
  id: "123",
  uri: "https://data.norge.no/datasets/123",
  searchType: EntityType.DATASET,
  isRelatedToTransportportal: true,
};

describe("InternalLink", () => {
  it("opens shared docs on the data.norge origin from transportportal", () => {
    render(
      <DataNorgeOriginProvider origin="https://staging.fellesdatakatalog.digdir.no">
        <InternalLink
          href="/nb/docs/metadata-quality"
          profile="transportportal"
          baseUri="https://transportportal.no"
          locale="nb"
        >
          Metadata quality
        </InternalLink>
      </DataNorgeOriginProvider>,
    );

    const link = screen.getByRole("link", { name: "Metadata quality" });
    expect(link).toHaveAttribute("href", "https://staging.fellesdatakatalog.digdir.no/nb/docs/metadata-quality");
    expect(link).not.toHaveAttribute("target", "_blank");
    expect(link.getAttribute("href")).not.toContain("leaving-gateway");
  });

  it("keeps shared docs on the current site for the data.norge profile", () => {
    render(
      <InternalLink
        href="/nb/docs/metadata-quality"
        profile="data.norge"
        baseUri="https://data.norge.no"
        locale="nb"
      >
        Metadata quality
      </InternalLink>,
    );

    const link = screen.getByRole("link", { name: "Metadata quality" });
    expect(link).toHaveAttribute("href", "/nb/docs/metadata-quality");
    expect(link).not.toHaveAttribute("target", "_blank");
  });

  it("opens other resources on the data.norge origin from transportportal", () => {
    render(
      <DataNorgeOriginProvider origin="https://data.norge.no">
        <InternalLink
          href="/nb/datasets/123/example"
          profile="transportportal"
          baseUri="https://transportportal.no"
          locale="nb"
        >
          Dataset
        </InternalLink>
      </DataNorgeOriginProvider>,
    );

    const link = screen.getByRole("link", { name: "Dataset" });
    expect(link).toHaveAttribute("href", "https://data.norge.no/nb/datasets/123/example");
    expect(link).not.toHaveAttribute("target", "_blank");
    expect(link.getAttribute("href")).not.toContain("leaving-gateway");
  });

  it("keeps a transportportal resource on the current site", () => {
    render(
      <InternalLink
        href="/nb/datasets/123/example"
        entity={transportDataset}
        profile="transportportal"
        baseUri="https://transportportal.no"
        locale="nb"
      >
        Dataset
      </InternalLink>,
    );

    const link = screen.getByRole("link", { name: "Dataset" });
    expect(link).toHaveAttribute("href", "/nb/datasets/123/example");
  });
});
