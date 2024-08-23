'use client';

import { motion, MotionConfig } from 'framer-motion';
import { Link, Heading, Card, Paragraph } from '@digdir/designsystemet-react';

import { Dictionary } from '@fdk-frontend/dictionaries';
import { CatalogTypes } from '@fdk-frontend/types';
import { useNonce } from '../csp';
import CatalogSymbol from '../catalog-symbol/';
import getMainMenuData from '../main-menu/data';

import styles from './catalogs-menu.module.scss';

type CatalogsMenuProps = {
    dictionary: Dictionary;
    baseUri: string;
};

const CatalogsMenu = ({ dictionary, baseUri }: CatalogsMenuProps) => {
    const nonce = useNonce();
    const data = getMainMenuData(dictionary, baseUri);

    const animations = {
        catalogList: {
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.05,
                },
            },
        },
        catalogItem: {
            hidden: { opacity: 0, scale: 0.9 },
            show: { opacity: 1, scale: 1 },
        },
    };

    return (
        <div className={styles.catalogsMenu}>
            <MotionConfig nonce={nonce}>
                <motion.ul
                    variants={animations.catalogList}
                    initial='hidden'
                    animate='show'
                >
                    {data.catalogs.map((item: any, i: number) => (
                        <motion.li
                            variants={animations.catalogItem}
                            key={item.key}
                        >
                            <Card
                                className={styles.card}
                                asChild
                                isLink
                            >
                                <Link href={item.href}>
                                    <Card.Header>
                                        <Heading
                                            className={styles.catalogTitle}
                                            size='xxsmall'
                                            level={3}
                                        >
                                            <CatalogSymbol
                                                className={styles.catalogIcon}
                                                catalog={item.key as CatalogTypes}
                                            />
                                            <span>{item.title}</span>
                                        </Heading>
                                    </Card.Header>
                                    <Card.Content>
                                        <Paragraph size='small'>{item.description}</Paragraph>
                                    </Card.Content>
                                </Link>
                            </Card>
                        </motion.li>
                    ))}
                </motion.ul>
            </MotionConfig>
        </div>        
    );
};

export default CatalogsMenu;
