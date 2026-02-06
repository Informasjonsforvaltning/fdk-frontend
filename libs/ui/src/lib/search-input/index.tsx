'use client';
import cn from 'classnames';
import { Input, Button } from '@digdir/designsystemet-react';
import { HStack } from '@fellesdatakatalog/ui';
import { MagnifyingGlassIcon, SparklesFillIcon } from '@navikt/aksel-icons';

import styles from './search-input.module.scss';

export type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    searchLabel?: string;
    placeholder?: string;
    className?: string;
};

const SearchInput = ({ value, onChange, searchLabel = 'Søk', placeholder = 'Hva leter du etter?', className }: SearchInputProps) => {
    return (
        <HStack className={cn(styles.container, className)}>
            <SparklesFillIcon
                className={styles.searchIcon}
            />
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={styles.input}
                placeholder={placeholder}
                // data-size='lg'
            />
            {/* <Button
                type='submit'
                data-size='sm'
                className={styles.btn}
                variant='tertiary'
            >
                {searchLabel}
            </Button> */}
        </HStack>
    );
};

export default SearchInput;
