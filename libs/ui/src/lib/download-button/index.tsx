'use client';

import React, { useRef } from 'react';
import cn from 'classnames';
import { Button, type ButtonProps, Dialog } from '@digdir/designsystemet-react';
import { DownloadIcon } from '@navikt/aksel-icons';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import Badge from '../badge';
import ExternalLink from '../external-link';
import styles from './styles.module.scss';

type DownloadButtonProps = {
    modalTitle: string;
    uris?: string[];
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

    if (!uris) return null;

    if (uris.length === 1) {
        return (
            <Button
                asChild
                data-size='sm'
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
                    <DownloadIcon
                        aria-hidden
                        fontSize='1.2em'
                    />
                    {children}
                </ExternalLink>
            </Button>
        );
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button
                    size='sm'
                    variant='secondary'
                    {...props}
                >
                    <DownloadIcon
                        aria-hidden
                        fontSize='1.2em'
                    />
                    {children}
                    <Badge>{uris.length}</Badge>
                </Button>
            </Dialog.Trigger>
            <Dialog.Dialog
                ref={modalRef}
                className={styles.dialog}
                onInteractOutside={() => modalRef.current?.close()}
            >
                <Dialog.Header closeButton={true}>{modalTitle}</Dialog.Header>
                <Dialog.Content className={styles.content}>
                    {dictionary.distributions.downloadModal.header}
                    <ul className='fdk-box-list'>
                        {uris?.map((uri: string, index: number) => (
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
                </Dialog.Content>
                <Dialog.Footer>
                    <Button
                        size='sm'
                        variant='secondary'
                        onClick={() => modalRef.current?.close()}
                    >
                        {dictionary.distributions.downloadModal.closeBtn}
                    </Button>
                </Dialog.Footer>
            </Dialog.Dialog>
        </Dialog.Root>
    );
};

export default DownloadButton;
