import { type LocaleCodes } from "@fdk-frontend/localization";
import { EntityTeaser } from "@fdk-frontend/ui";
import { Heading } from "@digdir/designsystemet-react";

import styles from "./search-page.module.scss";

export type SearchResultsSkeletonProps = {
  locale: LocaleCodes;
};

const SearchResultsSkeleton = ({ locale }: SearchResultsSkeletonProps) => (
  <>
    <Heading
      data-size="sm"
      className={styles.sectionHeading}
    >
      {/* TODO: localization remains to be implemented */}
      Laster...
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
