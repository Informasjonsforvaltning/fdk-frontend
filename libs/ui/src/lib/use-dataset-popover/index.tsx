import React, { useState, useEffect } from 'react';
import { printLocaleValue } from '@fdk-frontend/utils';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import Badge from '../badge';
import PlaceholderBox from '../placeholder-box';
import DownloadButton from '../download-button';
import ActionButton from '../action-button';
import { Tabs, TabList, Tab, TabContent } from '@digdir/designsystemet-react';
import ApiTags from '../api-tags';
import DistributionTags from '../distribution-tags';
import ScrollShadows from '../scroll-shadows';
import {
    trackSiteImproveEvent,
    EventCategory,
    EventAction,
    EventLabel,
} from '@fdk-frontend/utils/siteimprove-analytics';
import { type DatasetWithIdentifier, type DataService } from '@fdk-frontend/fdk-types';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import styles from './styles.module.scss';

export type UseDatasetPopoverProps = {
    dataset: DatasetWithIdentifier;
    apis?: DataService[];
    dictionary: Dictionary;
    locale: LocaleCodes;
};

const UseDatasetPopover = ({
    children,
    dataset,
    apis = [],
    dictionary,
    locale,
    ...props
}: UseDatasetPopoverProps & React.HTMLAttributes<HTMLDivElement>) => {
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
                size='sm'
                value={activeTab}
                onChange={(value) => {
                    setActiveTab(value);
                }}
            >
                <TabList>
                    <Tab value='dist'>
                        {dictionary.useDatasetPopover.distributions}&nbsp;
                        <Badge>{[...(dataset.distribution ?? []), ...(dataset.sample ?? [])].length}</Badge>
                    </Tab>
                    <Tab value='apis'>
                        {dictionary.useDatasetPopover.apis}&nbsp;
                        <Badge>{apis.length}</Badge>
                    </Tab>
                </TabList>
                <TabContent value='dist'>
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
                </TabContent>
                <TabContent value='apis'>
                    {apis.length ? (
                        <ul className='fdk-box-list'>
                            {apis.map((api, index) => (
                                <li key={`api-${index}`}>
                                    <div className={styles.popoverListItem}>
                                        <div className={styles.itemDetails}>
                                            <span className={styles.itemTitle}>
                                                {printLocaleValue(locale, api.title) || dictionary.apis.header.nameless}
                                            </span>
                                            <ApiTags
                                                api={api}
                                                dictionary={dictionary}
                                            />
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
                </TabContent>
            </Tabs>
        </div>
    );
};

export default UseDatasetPopover;
