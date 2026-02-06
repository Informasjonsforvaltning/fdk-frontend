'use client';

import { ToggleGroup, Badge, Link } from '@digdir/designsystemet-react';
import { SparklesFillIcon } from '@navikt/aksel-icons';
import { type ReactNode } from 'react';

export type SearchTabsValue = 'ki' | 'datasett' | 'api' | 'begrep' | 'infomodels' | 'tjenester' | 'docs';

export type SearchTabsProps = {
    defaultValue?: SearchTabsValue;
    onChange?: (value: SearchTabsValue) => void;
};

type SearchTabItem = {
    value: SearchTabsValue;
    label: string;
    icon?: ReactNode;
    badgeCount: number;
};

const searchTabItems: SearchTabItem[] = [
    {
        value: 'ki',
        label: 'KI-søk',
        icon: <SparklesFillIcon />,
        badgeCount: 6,
    },
    {
        value: 'datasett',
        label: 'Datasett',
        badgeCount: 614,
    },
    {
        value: 'api',
        label: 'API-er',
        badgeCount: 19,
    },
    {
        value: 'begrep',
        label: 'Begreper',
        badgeCount: 588,
    },
    {
        value: 'infomodels',
        label: 'Informasjonsmodeller',
        badgeCount: 0,
    },
    {
        value: 'tjenester',
        label: 'Tjenester og hendelser',
        badgeCount: 31,
    },
    {
        value: 'docs',
        label: 'Dokumentasjon',
        badgeCount: 4,
    },
];

const SearchTabs = ({ defaultValue = 'ki', onChange }: SearchTabsProps) => (
    <ToggleGroup
        defaultValue={defaultValue}
        onChange={(value) => onChange?.(value as SearchTabsValue)}
        // data-size='sm'
    >
        {searchTabItems.map((item) => (
            <ToggleGroup.Item
                key={item.value}
                value={item.value}
            >
                {item.icon}
                {item.label}
                <Badge count={item.badgeCount} variant='tinted' />
            </ToggleGroup.Item>
        ))}
    </ToggleGroup>
);

export default SearchTabs;
export { SearchTabs };
