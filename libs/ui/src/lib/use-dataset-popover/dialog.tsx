'use client';

import React, { useState, useEffect } from 'react';
import { printLocaleValue } from '@fdk-frontend/utils';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import Badge from '../badge';
import PlaceholderBox from '../placeholder-box';
import DownloadButton from '../download-button';
import ActionButton from '../action-button';
import { Tabs, TabsList, TabsTab, TabsPanel } from '@digdir/designsystemet-react';
import ApiTags from '../api-tags';
import DistributionTags from '../distribution-tags';
import ScrollShadows from '../scroll-shadows';
import {
    trackSiteImproveEvent,
    EventCategory,
    EventAction,
    EventLabel,
} from '@fdk-frontend/utils/siteimprove-analytics';
import { type DatasetWithIdentifier, type DataService } from '@fellesdatakatalog/types';
import { type Localization, type LocaleCodes } from '@fdk-frontend/localization';
import styles from './styles.module.scss';

export type UseDatasetPopoverDialogProps = {
    dataset: DatasetWithIdentifier;
    apis?: DataService[];
    dictionary: Localization;
    locale: LocaleCodes;
};

const UseDatasetPopoverDialog = ({
    children,
    dataset,
    apis = [],
    dictionary,
    locale,
    ...props
}: UseDatasetPopoverDialogProps & React.HTMLAttributes<HTMLDivElement>) => {
    const distributions = [...(dataset.distribution ?? []), ...(dataset.sample ?? [])];
    const defaultActiveTab = !distributions.length && apis.length ? 'apis' : 'dist';
    const [activeTab, setActiveTab] = useState(defaultActiveTab);

    useEffect(() => {
        trackSiteImproveEvent({
            category: EventCategory.DETAILS_PAGE,
            action: EventAction.CLICK,
            label: EventLabel.USE_DATASET_BUTTON,
        });
    }, []);

    return (
        <div
            className={styles.wrapper}
            {...props}
        >
            <Tabs
                defaultValue='dist'
                data-size='sm'
                value={activeTab}
                onChange={(value) => {
                    setActiveTab(value);
                }}
            >
                <TabsList>
                    <TabsTab value='dist'>
                        {dictionary.useDatasetPopover.distributions}&nbsp;
                        <Badge>{distributions.length}</Badge>
                    </TabsTab>
                    <TabsTab value='apis'>
                        {dictionary.useDatasetPopover.apis}&nbsp;
                        <Badge>{apis.length}</Badge>
                    </TabsTab>
                </TabsList>
                <TabsPanel value='dist'>
                    {distributions.length ? (
                        <ScrollShadows className={styles.popoverScroller}>
                            <ul className='fdk-box-list'>
                                {distributions.map((d, index) => (
                                    <li key={`distribution-${index}`}>
                                        <div className={styles.popoverListItem}>
                                            <div className={styles.itemDetails}>
                                                <span className={styles.itemTitle}>
                                                    {printLocaleValue(locale, d.title) ||
                                                        dictionary.distributions.header.nameless}
                                                </span>
                                                <DistributionTags
                                                    distribution={d}
                                                    dictionary={dictionary}
                                                    maxTags={4}
                                                />
                                            </div>
                                            <DownloadButton
                                                uris={d.accessURL}
                                                className={styles.actionButton}
                                                modalTitle={
                                                    printLocaleValue(locale, d.title) ||
                                                    dictionary.distributions.header.nameless
                                                }
                                                dictionary={dictionary}
                                                locale={locale}
                                            >
                                                {dictionary.distributions.header.downloadBtnLabel}
                                            </DownloadButton>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </ScrollShadows>
                    ) : (
                        <PlaceholderBox>{dictionary.distributions.placeholder}</PlaceholderBox>
                    )}
                </TabsPanel>
                <TabsPanel value='apis'>
                    {apis.length ? (
                        <ul className='fdk-box-list'>
                            {apis.map((api, index) => (
                                <li key={`api-${index}`}>
                                    <div className={styles.popoverListItem}>
                                        <div className={styles.itemDetails}>
                                            <span className={styles.itemTitle}>
                                                {printLocaleValue(locale, api.title) || dictionary.apis.header.nameless}
                                            </span>
                                            <ApiTags api={api} />
                                        </div>
                                        <ActionButton
                                            uri={`/data-services/${api.id}`}
                                            className={styles.actionButton}
                                        >
                                            {dictionary.apis.header.gotoBtn}
                                            <ArrowRightIcon
                                                aria-hidden
                                                fontSize='1.2em'
                                            />
                                        </ActionButton>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <PlaceholderBox>{dictionary.apis.placeholder}</PlaceholderBox>
                    )}
                </TabsPanel>
            </Tabs>
        </div>
    );
};

export default UseDatasetPopoverDialog;
