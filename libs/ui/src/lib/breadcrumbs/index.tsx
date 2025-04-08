import React from 'react';
import { ChevronRightIcon } from '@navikt/aksel-icons';
import { type Dictionary } from '@fdk-frontend/dictionaries';
import { Link } from '@digdir/designsystemet-react';

import ScrollShadows from '../scroll-shadows';

import styles from './breadcrumbs.module.scss';

export type BreadcrumbType = {
    href: string;
    text: string;
};

export type BreadcrumbsProps = {
    baseUri: string;
    breadcrumbList?: BreadcrumbType[];
    dictionary: Dictionary;
};

const BreadcrumbsContainer = ({ children }: React.PropsWithChildren) => (
    <div className={styles.container}>{children}</div>
);

const Breadcrumbs = ({ baseUri, breadcrumbList, dictionary }: BreadcrumbsProps) => (
    <div className={styles.container}>
        <ScrollShadows>
            <nav
                className={styles.breadcrumbs}
                aria-label={dictionary.breadcrumbs.label}
            >
                <Link
                    className={styles.link}
                    aria-label={dictionary.breadcrumbs.home}
                    href={'/'}
                >
                    {dictionary.breadcrumbs.home}
                </Link>
                {breadcrumbList?.map((breadcrumb, i) => (
                    <div
                        className={styles.crumb}
                        key={breadcrumb.href}
                    >
                        <ChevronRightIcon
                            className={styles.separator}
                            fontSize='1.5rem'
                            role='presentation'
                        />
                        {i === breadcrumbList.length - 1 ? (
                            <span className={styles.deactiveLink}>{breadcrumb.text}</span>
                        ) : (
                            <Link
                                className={styles.link}
                                href={breadcrumb.href}
                            >
                                {breadcrumb.text}
                            </Link>
                        )}
                    </div>
                ))}
            </nav>
        </ScrollShadows>
    </div>
);

export default Breadcrumbs;
export { BreadcrumbsContainer };
