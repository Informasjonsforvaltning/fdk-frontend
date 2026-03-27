'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useRef, useEffect, useState, type FormEvent } from 'react';
import cn from 'classnames';
import { Input, Tag } from '@digdir/designsystemet-react';
import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { type LocaleCodes, i18n } from '@fdk-frontend/localization';

import SearchTrayNav from '../search-tray-nav';
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

const getInitialQFromUrl = function getInitialQFromUrl(searchParams: URLSearchParams): string {
    const q = searchParams.get('q');
    if (q === null || q === '') return '';
    try {
        return decodeURIComponent(q);
    } catch {
        return q;
    }
};

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
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isMac, setIsMac] = useState(false);
    const [isTrayVisible, setIsTrayVisible] = useState(false);
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
        ? (controlledOnChange ?? (() => undefined))
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

    useEffect(() => {
        const handlePointerDown = (e: PointerEvent) => {
            const target = e.target;
            if (!(target instanceof Node)) return;
            if (!containerRef.current?.contains(target)) {
                setIsTrayVisible(false);
            }
        };

        const handleFocusIn = (e: FocusEvent) => {
            const target = e.target;
            if (!(target instanceof Node)) return;
            if (!containerRef.current?.contains(target)) {
                setIsTrayVisible(false);
            }
        };

        document.addEventListener('pointerdown', handlePointerDown, true);
        document.addEventListener('focusin', handleFocusIn, true);
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown, true);
            document.removeEventListener('focusin', handleFocusIn, true);
        };
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = value.trim();
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
        <div
            ref={containerRef}
            className={cn(styles.container, className)}
        >
            <form
                className={styles.form}
                onSubmit={handleSubmit}
                {...rest}
            >
                <MagnifyingGlassIcon className={styles.searchIcon} />
                <Input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setIsTrayVisible(true)}
                    className={styles.input}
                    placeholder={placeholder}
                    aria-label={searchLabel}
                />
                <Tag
                    className={styles.hotkeyTag}
                    data-size='sm'
                    data-color='neutral'
                >
                    {isMac ? '⌘ + K' : 'Ctrl + K'}
                </Tag>
            </form>
            <div className={cn(styles.tray, { [styles.visible]: isTrayVisible })}>
                <div className={styles.trayContent}>
                    <SearchTrayNav />
                </div>
            </div>
        </div>
    );
};

export default SearchInput;
