'use client';

import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { ChevronDownIcon } from '@navikt/aksel-icons';

import styles from './scroll-button.module.scss';

const ScrollButton = () => {
    const [hidden, setHidden] = useState(false);

    const scroll = () => {
        const banner = document.getElementById('frontpage-banner');
        if (!banner) return;

        const scrollTo = banner.offsetHeight - window.innerHeight + 200;

        if (window.scrollY < scrollTo) {
            window.scrollTo({
                top: scrollTo,
                left: 0,
                behavior: 'smooth',
            });
        }
    };

    const handleScroll = () => {
        const banner = document.getElementById('frontpage-banner');
        if (!banner) return;

        const scrollTarget = banner.offsetHeight - window.innerHeight + 200;
        const hasScrolledPastTarget = window.scrollY > scrollTarget;
        if (hasScrolledPastTarget) {
            setHidden(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button
            onClick={scroll}
            className={cn(styles.scrollButton, { [styles.hidden]: hidden })}
            aria-hidden={hidden}
            tabIndex={hidden ? -1 : undefined}
            data-color-scheme='dark'
        >
            <ChevronDownIcon
                aria-hidden
                className={styles.arrow}
            />
            <span>Scroll</span>
        </button>
    );
};

export default ScrollButton;
