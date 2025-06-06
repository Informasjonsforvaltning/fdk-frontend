import { Alert, Button, Link, Paragraph } from '@digdir/designsystemet-react';

import styles from './catalog-promo.module.scss';

export type CatalogPromoProps = {
    text: string;
    button: string;
    link: string;
};

const CatalogPromo = ({ text, button, link }: CatalogPromoProps) => {
    return (
        <Alert
            severity='info'
            size='sm'
            className={styles.catalogPromo}
        >
            <div className={styles.content}>
                <Paragraph size='md'>{text}</Paragraph>
                <Button
                    asChild
                    size='small'
                    variant='primary'
                >
                    <Link href={link}>{button}</Link>
                </Button>
            </div>
        </Alert>
    );
};

export default CatalogPromo;
