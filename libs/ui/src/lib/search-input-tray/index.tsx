'use client';
import cn from 'classnames';
import { type HTMLAttributes } from 'react';
import { Spinner } from '@digdir/designsystemet-react';

import SearchTrayNav from '../search-tray-nav';
import styles from './search-input-tray.module.scss';

export type SearchInputTrayProps = HTMLAttributes<HTMLDivElement> & {
    isVisible: boolean;
    loading?: boolean;
};

const SearchInputTray = ({
    className,
    isVisible,
    loading,
    ...props
}: SearchInputTrayProps) => {
    return (
        <div
            className={cn(styles.tray, className, { [styles.visible]: isVisible })}
            {...props}
        >
            <div className={styles.trayContent}>
                {
                    loading &&
                    <div className={styles.spinnerContainer}>
                        <Spinner data-size='sm' />
                    </div>
                }
                {!loading && <SearchTrayNav />}
            </div>
        </div>
    );
};

export default SearchInputTray;
