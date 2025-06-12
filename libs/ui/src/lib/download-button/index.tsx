import React, { useRef } from 'react';
import cn from 'classnames';
import { Button, type ButtonProps, Modal } from '@digdir/designsystemet-react';
import { DownloadIcon } from '@navikt/aksel-icons';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import Badge from '../badge';
import ExternalLink from '../external-link';
import styles from './styles.module.scss';

type DownloadButtonProps = {
    modalTitle: string;
    uris: string[];
    dictionary: Dictionary;
    locale: LocaleCodes;
};

const DownloadButton = ({
    children,
    modalTitle,
    uris,
    dictionary,
    locale,
    ...props
}: DownloadButtonProps & ButtonProps) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    if (uris.length === 1) {
        return (
            <Button
                asChild
                size='sm'
                variant='secondary'
                onClick={(e) => {
                    e.stopPropagation();
                }}
                {...props}
            >
                <ExternalLink
                    href={uris[0]}
                    gateway
                    locale={locale}
                >
                    {children}
                </ExternalLink>
            </Button>
        );
    }

    return (
        <Modal.Root>
            <Modal.Trigger asChild>
                <Button
                    size='sm'
                    variant='secondary'
                    {...props}
                >
                    {children}
                    <Badge>{uris.length}</Badge>
                </Button>
            </Modal.Trigger>
            <Modal.Dialog
                ref={modalRef}
                className={styles.dialog}
                onInteractOutside={() => modalRef.current?.close()}
            >
                <Modal.Header closeButton={true}>{dictionary.distributions.downloadModal.header}</Modal.Header>
                <Modal.Content className={styles.content}>
                    <ul className='fdk-link-list'>
                        {uris.map((uri: string, index: number) => (
                            <li key={`${uri}-${index}`}>
                                <ExternalLink
                                    href={uri}
                                    className={cn('fdk-box-link', styles.downloadLink)}
                                    gateway
                                    locale={locale}
                                >
                                    <DownloadIcon
                                        aria-hidden
                                        fontSize='1.3em'
                                        style={{ margin: '-0.5rem 0' }}
                                    />
                                    {uri}
                                </ExternalLink>
                            </li>
                        ))}
                    </ul>
                </Modal.Content>
                <Modal.Footer>
                    <Button
                        size='sm'
                        variant='secondary'
                        onClick={() => modalRef.current?.close()}
                    >
                        {dictionary.distributions.downloadModal.closeBtn}
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal.Root>
    );
};

export default DownloadButton;
