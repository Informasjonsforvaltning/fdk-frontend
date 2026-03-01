'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import cn from 'classnames';
import { Input, Button, Tag } from '@digdir/designsystemet-react';
import { SparklesFillIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { type LocaleCodes, i18n } from '@fdk-frontend/localization';

import styles from './search-input.module.scss';

export type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    searchLabel?: string;
    placeholder?: string;
    className?: string;
    locale?: LocaleCodes;
};

const SearchInput = ({
    value,
    onChange,
    searchLabel = 'Søk',
    placeholder = 'Hva leter du etter?',
    className,
    locale,
}: SearchInputProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isMac, setIsMac] = useState(false);

    // Extract locale from pathname if not provided
    const currentLocale = locale || (pathname.split('/')[1] as LocaleCodes) || i18n.defaultLocale;

    useEffect(() => {
        setIsMac(
            typeof navigator !== 'undefined' &&
                /Mac|iPod|iPhone|iPad/.test(navigator.platform)
        );
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value.trim()) return;
        const q = encodeURIComponent(value.trim());
        const segments = pathname.split('/').filter(Boolean);
        const isOnSearchPage =
            segments.length >= 2 &&
            segments[0] === currentLocale &&
            segments[1] === 'search';
        if (isOnSearchPage) {
            const path = pathname.split('?')[0];
            router.push(`${path}?q=${q}`);
        } else {
            router.push(`/${currentLocale}/search?q=${q}`);
        }
    };

    return (
        <form
            className={cn(styles.container, className)}
            onSubmit={handleSubmit}
        >
            <MagnifyingGlassIcon className={styles.searchIcon} />
            <Input
                ref={inputRef}
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
            <Tag
                className={styles.hotkeyTag}
                data-size='sm'
                data-color='neutral'
            >
                {isMac ? '⌘ + K' : 'Ctrl + K'}
            </Tag>
        </form>
    );
};

export default SearchInput;
