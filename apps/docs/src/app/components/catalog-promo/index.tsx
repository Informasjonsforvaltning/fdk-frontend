import { Alert, Button, Link } from '@digdir/designsystemet-react';

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
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {text}
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
