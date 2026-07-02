import cn from "classnames";
import { type HTMLAttributes } from "react";

import { Card, CardBlock } from "@digdir/designsystemet-react";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { getLocalizedSearchTabItems } from "../search-tabs";
import styles from "./search-tray-nav.module.scss";

export type SearchTrayNavProps = HTMLAttributes<HTMLUListElement> & {
  locale: LocaleCodes;
};

const SearchTrayNav = ({ className, locale, ...props }: SearchTrayNavProps) => {
  const localizedItems = getLocalizedSearchTabItems(locale);
  return (
    <ul
      className={cn(styles.container, className)}
      {...props}
    >
      {localizedItems
        .filter((item) => item.value !== "ki")
        .map(({ value, label, icon }) => (
          <li key={value}>
            <Card
              className={styles.item}
              data-size="sm"
              asChild
            >
              <a href={`/${locale}/search/${value}`}>
                <CardBlock>
                  {icon}
                  <span>{label}</span>
                </CardBlock>
              </a>
            </Card>
          </li>
        ))}
    </ul>
  );
};

export default SearchTrayNav;
