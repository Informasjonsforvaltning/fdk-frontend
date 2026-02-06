'use client';

import { Input, Button } from '@digdir/designsystemet-react';
import { HStack } from '@fellesdatakatalog/ui';

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
        <HStack className={className}>
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={styles.input}
                placeholder={placeholder}
            />
            <Button
                type='submit'
                data-size='sm'
                className={styles.btn}
            >
                {searchLabel}
            </Button>
        </HStack>
    );
};

export default SearchInput;
