'use client';

import { ToggleGroup, Badge } from '@digdir/designsystemet-react';
import { SparklesFillIcon } from '@navikt/aksel-icons';
import { type ReactNode } from 'react';
import styles from './styles.module.scss';

/** KI has no URL segment; other values match the path segment. */
export type SearchTabsValue =
  | 'ki'
  | 'datasets'
  | 'data-services'
  | 'concepts'
  | 'information-models'
  | 'services-and-events'
  | 'docs';

export type SearchTabsProps = {
  /** Controlled value (current set from URL). Use 'ki' when no segment. */
  value?: SearchTabsValue;
  defaultValue?: SearchTabsValue;
  onChange?: (value: SearchTabsValue) => void;
  /** Badge counts per tab value (from search results). */
  badgeCounts?: Record<string, number>;
};

export type SearchTabItem = {
  value: SearchTabsValue;
  label: string;
  icon?: ReactNode;
  badgeCount?: number;
};

// TODO: localization remains to be implemented
export const searchTabItems: SearchTabItem[] = [
  {
    value: 'ki',
    label: 'KI',
    icon: <SparklesFillIcon />,
    badgeCount: 0,
  },
  {
    value: 'datasets',
    label: 'Datasett',
    badgeCount: 0,
  },
  {
    value: 'data-services',
    label: 'API',
    badgeCount: 0,
  },
  {
    value: 'concepts',
    label: 'Begrep',
    badgeCount: 0,
  },
  {
    value: 'information-models',
    label: <>Informasjons&shy;modeller</>,
    badgeCount: 0,
  },
  {
    value: 'services-and-events',
    label: 'Tjenester og hendelser',
    badgeCount: 0,
  },
  {
    value: 'docs',
    label: 'Dokumentasjon',
    badgeCount: 0,
  },
];

const SearchTabs = ({
  value,
  defaultValue = 'ki',
  onChange,
  badgeCounts = {},
}: SearchTabsProps) => {
  const isControlled = value !== undefined;
  const toggleValue = isControlled ? value : defaultValue;

  return (
    <ToggleGroup
      value={toggleValue}
      defaultValue={defaultValue}
      onChange={(v) => onChange?.(v as SearchTabsValue)}
      className={styles.tabs}
      variant="secondary"
    >
      {searchTabItems.map((item) => {
        const count = badgeCounts[item.value] ?? item.badgeCount ?? 0;
        return (
          <ToggleGroup.Item key={item.value} value={item.value}>
            {item.icon}
            {item.label}
            <Badge count={count} variant="tinted" />
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup>
  );
};

export default SearchTabs;
export { SearchTabs };
