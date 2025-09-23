'use client';

import { Link, Heading, Card, Paragraph } from '@digdir/designsystemet-react';
import { Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import getMainMenuData from '../main-menu/data';

import styles from './catalogs-menu.module.scss';

type CatalogsMenuProps = {
    dictionary: Dictionary;
    locale: LocaleCodes;
};

const CatalogsMenu = ({ dictionary, locale }: CatalogsMenuProps) => {
    const data = getMainMenuData(dictionary, locale);
    return (
        <nav
            className={styles.catalogsMenu}
            aria-label={dictionary.mainMenu.catalogs.label}
        >
            <ul className={styles.menuList}>
                {data.catalogs.map((item: any, i: number) => (
                    <li key={item.key}>
                        <Card
                            className={styles.card}
                            asChild
                        >
                            <Link href={`${item.href}`}>
                                <Heading
                                    className={styles.catalogTitle}
                                    size='xxsmall'
                                    level={3}
                                >
                                    <span>{item.title}</span>
                                </Heading>
                                <Paragraph size='small'>{item.description}</Paragraph>
                            </Link>
                        </Card>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default CatalogsMenu;
