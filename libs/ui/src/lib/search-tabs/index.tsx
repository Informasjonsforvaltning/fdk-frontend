'use client';

import { ToggleGroup, Badge, Link } from '@digdir/designsystemet-react';
import { SparklesFillIcon } from '@navikt/aksel-icons';

export type SearchTabsValue = 'ki' | 'datasett' | 'api' | 'begrep' | 'infomodels' | 'tjenester' | 'docs';

export type SearchTabsProps = {
    defaultValue?: SearchTabsValue;
    onChange?: (value: SearchTabsValue) => void;
};

const SearchTabs = ({ defaultValue = 'ki', onChange }: SearchTabsProps) => (
    <ToggleGroup
        defaultValue={defaultValue}
        onChange={(value) => onChange?.(value as SearchTabsValue)}
        // data-size='sm'
    >
        <ToggleGroup.Item value='ki'>
            <SparklesFillIcon />
            KI-søk
            <Badge count={6} />
        </ToggleGroup.Item>
        {/* <ToggleGroup.Item value='all'>
            Alle ressurser
            <Badge count={1252} />
        </ToggleGroup.Item> */}
        <ToggleGroup.Item value='datasett'>
            Datasett
            <Badge count={614} />
        </ToggleGroup.Item>
        <ToggleGroup.Item value='api'>
            API-er
            <Badge count={19} />
        </ToggleGroup.Item>
        <ToggleGroup.Item value='begrep'>
            Begreper
            <Badge count={588} />
        </ToggleGroup.Item>
        <ToggleGroup.Item value='infomodels'>
            Informasjonsmodeller
            <Badge count={0} />
        </ToggleGroup.Item>
        <ToggleGroup.Item value='tjenester'>
            Tjenester og hendelser
            <Badge count={31} />
        </ToggleGroup.Item>
        <ToggleGroup.Item value='docs'>
            Dokumentasjon
            <Badge count={4} />
        </ToggleGroup.Item>
    </ToggleGroup>
);

export default SearchTabs;
export { SearchTabs };
