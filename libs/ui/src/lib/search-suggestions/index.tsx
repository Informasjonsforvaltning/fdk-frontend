import { Heading } from "@digdir/designsystemet-react";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import NavLinkList from "../nav-link-list";

import styles from "./search-suggestions.module.scss";

// TODO: hardcoded Norwegian for every locale. Move these into the dictionaries.
const EXAMPLE_SUGGESTIONS = [
  { label: "Trafikkdata", query: "trafikkdata" },
  { label: "Værdata", query: "værdata" },
  { label: "Befolkning", query: "befolkning" },
  { label: "Kartdata", query: "kartdata" },
  { label: "Åpne data", query: "åpne data" },
] as const;

export type SearchSuggestionsProps = {
  lang: LocaleCodes;
};

const SearchSuggestions = ({ lang }: SearchSuggestionsProps) => {
  const heading = getLocalization(lang).searchPage.searchSuggestions.heading;

  return (
    <div>
      <Heading
        className={styles.heading}
        level={3}
        data-size="xs"
      >
        {heading}
      </Heading>
      <NavLinkList
        items={EXAMPLE_SUGGESTIONS.map((suggestion) => ({
          id: suggestion.query,
          href: `/${lang}/search?q=${encodeURIComponent(suggestion.query)}`,
          label: suggestion.label,
        }))}
      />
    </div>
  );
};

export default SearchSuggestions;
