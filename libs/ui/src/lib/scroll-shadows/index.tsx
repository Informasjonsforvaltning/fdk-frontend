'use client';

import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';

import styles from './scroll-shadows.module.scss';

const ScrollShadows = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    const scrollerRef = useRef(null);
    const [overflow, setOverflow] = useState({
        overflowLeft: false,
        overflowRight: false,
        overflowTop: false,
        overflowBottom: false,
    });

    const updateOverflow = () => {
        const container = scrollerRef.current;
        if (!container) return;

        const { scrollLeft, scrollTop, scrollWidth, scrollHeight, clientWidth, clientHeight } = container;

        setOverflow({
            overflowLeft: scrollLeft > 0,
            overflowRight: scrollLeft + clientWidth < scrollWidth,
            overflowTop: scrollTop > 0,
            overflowBottom: scrollTop + clientHeight < scrollHeight,
        });
    };

    useEffect(() => {
        const container = scrollerRef.current;
        if (!container) return;

        updateOverflow(); // Initial check
        (container as HTMLElement).addEventListener('scroll', updateOverflow);

        const resizeObserver = new ResizeObserver(updateOverflow);
        resizeObserver.observe(container);

        return () => {
            (container as HTMLElement).removeEventListener('scroll', updateOverflow);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div
            className={cn(styles.container, className, {
                [styles.shadowTop]: overflow.overflowTop,
                [styles.shadowRight]: overflow.overflowRight,
                [styles.shadowBottom]: overflow.overflowBottom,
                [styles.shadowLeft]: overflow.overflowLeft,
            })}
            data-overflows={Object.values(overflow).some((p) => p === true)}
            {...props}
        >
            <div
                ref={scrollerRef}
                className={styles.scroller}
            >
                {children}
            </div>
        </div>
    );
};

export default ScrollShadows;
