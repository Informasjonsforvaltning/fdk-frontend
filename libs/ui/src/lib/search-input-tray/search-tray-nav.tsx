import cn from "classnames";
import { type HTMLAttributes, type ReactNode } from "react";

import { Card, CardBlock } from "@digdir/designsystemet-react";
import { SparklesFillIcon } from "@navikt/aksel-icons";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import { buildSearchSetPath, SEARCH_SETS, type SearchSetId } from "@fdk-frontend/utils";

import styles from "./search-input-tray.module.scss";

export type SearchTrayNavProps = HTMLAttributes<HTMLUListElement> & {
  locale: LocaleCodes;
};

const setIcon = (setId: SearchSetId): ReactNode => (setId === "ai" ? <SparklesFillIcon aria-hidden /> : undefined);

const SearchTrayNav = ({ className, locale, ...props }: SearchTrayNavProps) => {
  const dict = getLocalization(locale).searchPage.searchSets;
  const sets = SEARCH_SETS.filter((set) => set.id !== "ai" && set.id !== "docs");

  return (
    <ul
      className={cn(styles.nav, className)}
      {...props}
    >
      {sets.map((set) => (
        <li key={set.id}>
          <Card
            data-size="sm"
            asChild
          >
            <a href={buildSearchSetPath(locale, set.id)}>
              <CardBlock>
                {setIcon(set.id)}
                <span>{dict[set.id] ?? set.id}</span>
              </CardBlock>
            </a>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default SearchTrayNav;
