import React from 'react';
import { Button, Link } from '@digdir/designsystemet-react';
import BadgeOverlay from '../badge-overlay';
import { accessRequestWhiteList } from '@fdk-frontend/utils/access-request';
import { type CatalogTypes } from '@fdk-frontend/types';
import { type Dictionary } from '@fdk-frontend/dictionaries';

export type AccessRequestButtonProps = {
    kind: CatalogTypes;
    id: string;
    dictionary: Dictionary;
    isAvailable?: boolean;
};

const AccessRequestButton = ({
    children,
    kind,
    id,
    dictionary,
    isAvailable,
    ...props
}: AccessRequestButtonProps & React.HTMLAttributes<HTMLDivElement>) => {
    const demoItem = accessRequestWhiteList.find((i) => i.id === id);
    const url =
        demoItem?.requestAddress === 'https://soknad.kudaf.no'
            ? `/en/access-request/${kind}/${id}`
            : demoItem?.requestAddress;

    return (
        <BadgeOverlay badgeProps={{ children: 'beta', 'data-color': 'green-subtle' }}>
            <Button
                variant='secondary'
                size='sm'
                asChild
            >
                <Link href={url}>
                    {isAvailable ? dictionary.header.requestAccessButton : dictionary.header.showInterestButton}
                </Link>
            </Button>
        </BadgeOverlay>
    );
};

export default AccessRequestButton;
