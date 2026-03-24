'use client';

import React, { useEffect } from 'react';
import { type DataService } from '@fellesdatakatalog/types';
import { type Localization, type LocaleCodes } from '@fdk-frontend/localization';
import ExternalLink from '../external-link';
import ApiTags from '../api-tags';
import PlaceholderBox from '../placeholder-box';
import {
    trackSiteImproveEvent,
    EventCategory,
    EventAction,
    EventLabel,
} from '@fdk-frontend/utils/siteimprove-analytics';
import styles from './styles.module.scss';

export type UseApiPopoverProps = {
    dataService: DataService;
    dictionary: Localization;
    locale: LocaleCodes;
};

const UseApiPopoverContent = ({
    children,
    dataService,
    dictionary,
    locale,
    ...props
}: UseApiPopoverProps & React.HTMLAttributes<HTMLDivElement>) => {
    useEffect(() => {
        trackSiteImproveEvent({
            category: EventCategory.DETAILS_PAGE,
            action: EventAction.CLICK,
            label: EventLabel.USE_API_BUTTON,
        });
    }, []);

    const hasEndpoints = Boolean(dataService.endpointURL?.length);
    const hasFormats = Boolean(dataService.fdkFormat?.length);

    return (
        <div
            className={styles.wrapper}
            {...props}
        >
            {hasEndpoints ? (
                <ul className={styles.endpointList}>
                    {dataService.endpointURL!.map((url, index) => (
                        <li
                            key={`endpoint-${index}`}
                            className={styles.endpointItem}
                        >
                            <span className={styles.endpointLabel}>{dictionary.useApiPopover.endpointLabel}:</span>
                            <ExternalLink
                                href={url}
                                locale={locale}
                                gateway
                            >
                                {url}
                            </ExternalLink>
                            {hasFormats && <ApiTags api={dataService} />}
                        </li>
                    ))}
                </ul>
            ) : (
                <PlaceholderBox>{dictionary.useApiPopover.noEndpoints}</PlaceholderBox>
            )}
        </div>
    );
};

export default UseApiPopoverContent;
