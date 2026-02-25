'use client';

import { Heading, Card, Paragraph } from '@digdir/designsystemet-react';
import { type Localization, type LocaleCodes } from '@fdk-frontend/localization';
import getMainMenuData from '../main-menu/data';

import styles from './catalogs-menu.module.scss';

type CatalogsMenuProps = {
    dictionary: Localization;
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
                        <Card asChild>
                            <a href={`${item.href}`}>
                                <Card.Block>
                                    <Heading
                                        className={styles.catalogTitle}
                                        data-size='2xs'
                                        level={3}
                                    >
                                        <span>{item.title}</span>
                                    </Heading>
                                    <Paragraph data-size='sm'>{item.description}</Paragraph>
                                </Card.Block>
                            </a>
                        </Card>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default CatalogsMenu;
