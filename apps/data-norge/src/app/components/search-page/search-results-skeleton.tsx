import { type LocaleCodes } from "@fdk-frontend/localization";
import { EntityTeaser } from "@fdk-frontend/ui";
import { Heading } from "@digdir/designsystemet-react";

import styles from "./search-page.module.scss";

export type SearchResultsSkeletonDictionary = {
  heading: {
    loading: string;
  };
};

export type SearchResultsSkeletonProps = {
  locale: LocaleCodes;
  dictionary: SearchResultsSkeletonDictionary;
};

const SearchResultsSkeleton = ({ locale, dictionary }: SearchResultsSkeletonProps) => (
  <>
    <Heading
      data-size="sm"
      className={styles.sectionHeading}
    >
      {dictionary.heading.loading}
    </Heading>
    <ul className="fdk-box-list">
      <li>
        <EntityTeaser locale={locale} />
      </li>
      <li>
        <EntityTeaser locale={locale} />
      </li>
      <li>
        <EntityTeaser locale={locale} />
      </li>
    </ul>
  </>
);

export default SearchResultsSkeleton;
