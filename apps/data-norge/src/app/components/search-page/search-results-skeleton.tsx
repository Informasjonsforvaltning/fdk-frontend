import { type LocaleCodes } from "@fdk-frontend/localization";
import { EntityTeaser } from "@fdk-frontend/ui";

export type SearchResultsSkeletonProps = {
  locale: LocaleCodes;
};

const SearchResultsSkeleton = ({ locale }: SearchResultsSkeletonProps) => (
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
);

export default SearchResultsSkeleton;
