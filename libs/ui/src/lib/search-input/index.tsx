'use client';
import { useRouter, usePathname } from 'next/navigation';
import cn from 'classnames';
import { Input, Button } from '@digdir/designsystemet-react';
import { SparklesFillIcon } from '@navikt/aksel-icons';
import { type LocaleCodes, i18n } from '@fdk-frontend/dictionaries';

import styles from './search-input.module.scss';

export type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    searchLabel?: string;
    placeholder?: string;
    className?: string;
    locale?: LocaleCodes;
};

const SearchInput = ({ value, onChange, searchLabel = 'Søk', placeholder = 'Hva leter du etter?', className, locale }: SearchInputProps) => {
    const router = useRouter();
    const pathname = usePathname();
    
    // Extract locale from pathname if not provided
    const currentLocale = locale || (pathname.split('/')[1] as LocaleCodes) || i18n.defaultLocale;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value.trim()) {
            const searchUrl = `/${currentLocale}/search?query=${encodeURIComponent(value.trim())}`;
            router.push(searchUrl);
        }
    };

    return (
        <form 
            className={cn(styles.container, className)}
            onSubmit={handleSubmit}
        >
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
        </form>
    );
};

export default SearchInput;
