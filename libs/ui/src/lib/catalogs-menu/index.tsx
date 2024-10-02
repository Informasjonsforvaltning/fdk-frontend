'use client';

import { Link, Heading, Card, Paragraph } from '@digdir/designsystemet-react';
import { Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import getMainMenuData from '../main-menu/data';

import styles from './catalogs-menu.module.scss';

type CatalogsMenuProps = {
    dictionary: Dictionary;
    baseUri: string;
    locale: LocaleCodes;
};

const CatalogsMenu = ({ dictionary, baseUri, locale }: CatalogsMenuProps) => {
    const data = getMainMenuData(dictionary, `${baseUri}/${locale}`);

    return (
        <div className={styles.catalogsMenu}>
            <ul>
                {data.catalogs.map((item: any, i: number) => (
                    <li key={item.key}>
                        <Card
                            className={styles.card}
                            asChild
                            isLink
                        >
                            <Link href={`${item.href}`}>
                                <Card.Header>
                                    <Heading
                                        className={styles.catalogTitle}
                                        size='xxsmall'
                                        level={3}
                                    >
                                        <span>{item.title}</span>
                                    </Heading>
                                </Card.Header>
                                <Card.Content>
                                    <Paragraph size='small'>{item.description}</Paragraph>
                                </Card.Content>
                            </Link>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CatalogsMenu;
