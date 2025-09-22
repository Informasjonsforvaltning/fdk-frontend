import { Alert, type AlertProps, Button, Link, Paragraph } from '@digdir/designsystemet-react';

import styles from './alert-with-link-button.module.scss';

export type AlertWithLinkButtonProps = {
    text: string;
    button: string;
    link: string;
} & AlertProps;

const AlertWithLinkButton = ({ text, button, link, ...props }: AlertWithLinkButtonProps) => {
    return (
        <Alert
            className={styles.alertWithLinkButton}
            data-size='sm'
            {...props}
        >
            <div className={styles.content}>
                <Paragraph>{text}</Paragraph>
                <Button
                    asChild
                    data-size='sm'
                    variant='primary'
                >
                    <Link
                        className={styles.button}
                        href={link}
                    >
                        {button}
                    </Link>
                </Button>
            </div>
        </Alert>
    );
};

export default AlertWithLinkButton;
