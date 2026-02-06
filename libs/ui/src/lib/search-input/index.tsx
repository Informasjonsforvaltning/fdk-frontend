'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import cn from 'classnames';
import { Input, Button, Tag } from '@digdir/designsystemet-react';
import { SparklesFillIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { type LocaleCodes, i18n } from '@fdk-frontend/localization';

import styles from './search-input.module.scss';

export type SearchInputProps = {
    /** Controlled value. Omit to use internal state (uncontrolled). */
    value?: string;
    /** Controlled change handler. Omit when using internal state. */
    onChange?: (value: string) => void;
    searchLabel?: string;
    placeholder?: string;
    className?: string;
    locale?: LocaleCodes;
};

function getInitialQFromUrl(searchParams: URLSearchParams): string {
    const q = searchParams.get('q');
    if (q == null || q === '') return '';
    try {
        return decodeURIComponent(q);
    } catch {
        return q;
    }
}

const SearchInput = ({
    value: controlledValue,
    onChange: controlledOnChange,
    searchLabel = 'Søk',
    placeholder = 'Hva leter du etter?',
    className,
    locale,
    ...rest
}: SearchInputProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isMac, setIsMac] = useState(false);
    const [internalValue, setInternalValue] = useState(() =>
        getInitialQFromUrl(searchParams)
    );

    // Keep uncontrolled value in sync when URL q param changes (e.g. back/forward)
    useEffect(() => {
        if (controlledValue === undefined) {
            setInternalValue(getInitialQFromUrl(searchParams));
        }
    }, [searchParams, controlledValue]);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const setValue = isControlled
        ? (controlledOnChange ?? (() => {}))
        : setInternalValue;

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
        const trimmed = value.trim();
        // if (!trimmed) return;
        const q = encodeURIComponent(trimmed);
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
            {...rest}
        >
            <MagnifyingGlassIcon className={styles.searchIcon} />
            <Input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
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
