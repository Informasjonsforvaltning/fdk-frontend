'use client';

import React, { useRef } from 'react';
import cn from 'classnames';
import { Heading, Button, type ButtonProps, Dialog } from '@digdir/designsystemet-react';
import { DownloadIcon } from '@navikt/aksel-icons';
import { type Localization, type LocaleCodes } from '@fdk-frontend/localization';
import Badge from '../badge';
import ExternalLink from '../external-link';
import styles from './styles.module.scss';

type DownloadButtonProps = {
    modalTitle: string;
    uris?: string[];
    dictionary: Localization;
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
                    <span>{children}</span>
                </ExternalLink>
            </Button>
        );
    }

    return (
        <Dialog.TriggerContext>
            <Dialog.Trigger asChild>
                <Button
                    data-size='sm'
                    variant='secondary'
                    {...props}
                >
                    <DownloadIcon
                        aria-hidden
                        fontSize='1.2em'
                    />
                    <span>{children}</span>
                    <Badge>{uris.length}</Badge>
                </Button>
            </Dialog.Trigger>
            <Dialog
                ref={modalRef}
                className={styles.dialog}
                closedby='any'
            >
                <Dialog.Block>
                    <Heading data-size='xs'>{modalTitle}</Heading>
                </Dialog.Block>
                <Dialog.Block className={styles.content}>
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
                </Dialog.Block>
                <Dialog.Block>
                    <Button
                        data-size='sm'
                        variant='secondary'
                        data-command='close'
                    >
                        {dictionary.distributions.downloadModal.closeBtn}
                    </Button>
                </Dialog.Block>
            </Dialog>
        </Dialog.TriggerContext>
    );
};

export default DownloadButton;
