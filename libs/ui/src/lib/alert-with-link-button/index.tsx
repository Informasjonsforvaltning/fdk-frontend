import { Alert, Button, Link, Paragraph } from '@digdir/designsystemet-react';

import styles from './alert-with-link-button.module.scss';

export type AlertWithLinkButtonProps = {
    text: string;
    button: string;
    link: string;
};

const AlertWithLinkButton = ({ text, button, link }: AlertWithLinkButtonProps) => {
    return (
        <Alert
            severity='info'
            size='sm'
            className={styles.alertWithLinkButton}
        >
            <div className={styles.content}>
                <Paragraph size='md'>{text}</Paragraph>
                <Button
                    asChild
                    data-size='sm'
                    variant='primary'
                >
                    <Link className={styles.button} href={link}>{button}</Link>
                </Button>
            </div>
        </Alert>
    );
};

export default AlertWithLinkButton;
