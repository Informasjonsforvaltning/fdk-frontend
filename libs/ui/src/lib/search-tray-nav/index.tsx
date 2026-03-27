import cn from 'classnames';
import { type HTMLAttributes } from 'react';

import { Card, CardBlock, Spinner } from '@digdir/designsystemet-react';
import { searchTabItems } from '../search-tabs';
import styles from './search-tray-nav.module.scss';

export type SearchTrayNavProps = HTMLAttributes<HTMLUListElement>;

const SearchTrayNav = ({ className, ...props }: SearchTrayNavProps) => {
    return (
        <ul
            className={cn(styles.container, className)}
            {...props}
        >
            {searchTabItems.filter((item) => item.value !== 'ki').map(({ value, label, icon }) => (
                <li key={value}>
                    <Card
                        className={styles.item}
                        data-size='sm'
                        asChild
                    >
                        <a href={`/search/${value}`}>
                            <CardBlock>
                                {icon}
                                <span>{label}</span>
                            </CardBlock>
                        </a>
                    </Card>
                </li>
            ))}
        </ul>
    );
};

export default SearchTrayNav;
