import React from 'react';
import { Button, Link } from '@digdir/designsystemet-react';
import BadgeOverlay from '../badge-overlay';
import { accessRequestWhiteList } from '@fdk-frontend/utils/access-request';
import {
    trackSiteImproveEvent,
    EventCategory,
    EventAction,
    EventLabel,
} from '@fdk-frontend/utils/siteimprove-analytics';
import { type CatalogTypes } from '@fdk-frontend/types';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';

export type AccessRequestButtonProps = {
    kind: CatalogTypes;
    id: string;
    dictionary: Dictionary;
    locale: LocaleCodes;
    isAvailable?: boolean;
};

const AccessRequestButton = ({
    children,
    kind,
    id,
    dictionary,
    locale,
    isAvailable,
    ...props
}: AccessRequestButtonProps & React.HTMLAttributes<HTMLDivElement>) => {
    const demoItem = accessRequestWhiteList.find((i) => i.id === id);
    const url =
        demoItem?.requestAddress === 'https://soknad.kudaf.no'
            ? `/${locale}/access-request/${kind}/${id}`
            : demoItem?.requestAddress;

    return (
        <BadgeOverlay badgeProps={{ children: 'beta', 'data-color': 'green-subtle' }}>
            <Button
                variant='secondary'
                data-size='sm'
                asChild
                onClick={(e) => {
                    e.preventDefault();

                    trackSiteImproveEvent({
                        category: EventCategory.DETAILS_PAGE,
                        action: EventAction.CLICK,
                        label: EventLabel.REQUEST_ACCESS_BUTTON,
                    });

                    setTimeout(() => {
                        window.location.href = url!;
                    }, 100);
                }}
            >
                <Link href={url}>
                    {isAvailable ? dictionary.header.requestAccessButton : dictionary.header.showInterestButton}
                </Link>
            </Button>
        </BadgeOverlay>
    );
};

export default AccessRequestButton;
