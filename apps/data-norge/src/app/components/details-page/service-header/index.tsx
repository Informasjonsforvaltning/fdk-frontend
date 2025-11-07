'use client';

import React from 'react';
import { type DatasetWithIdentifier, type DataService, PublicService } from '@fellesdatakatalog/types';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { printLocaleValue } from '@fdk-frontend/utils';
import { OrgButton, OpenDataTag, AccessRequestButton, StatusTag, UseDatasetPopover, TagList } from '@fdk-frontend/ui';
import { Heading, Link, Tag } from '@digdir/designsystemet-react';
import styles from './dataset-header.module.scss';

type ServiceHeaderProps = {
    service: PublicService;
    dictionaries: {
        common: Dictionary;
        detailsPage: Dictionary;
    };
    locale: LocaleCodes;
    orgLogo?: string | null;
};

const ServiceHeader = ({
    service,
    dictionaries,
    orgLogo,
    locale,
}: ServiceHeaderProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={styles.header}>
            <OrgButton
                href={`/organizations/${(service as any)?.catalog?.publisher.id}`} // service is not of type PublicService?
                orgLogoSrc={orgLogo}
                className={styles.orgBtn}
            >
                {printLocaleValue(
                    locale,
                    (service as any)?.catalog?.publisher.prefLabel, // service is not of type PublicService?
                ) ?? dictionaries.detailsPage.header.namelessOrganization}
            </OrgButton>
            <Heading
                level={1}
                data-size='lg'
                className={styles.title}
            >
                {printLocaleValue(locale, service.title)}
            </Heading>
            <div className={styles.headerToolbar}></div>
            <TagList className={styles.headerTags}>
                <Tag
                    data-color='info'
                    data-size='md'
                >
                    <Link href='/datasets'>{dictionaries.detailsPage.header.serviceTagLink}</Link>
                </Tag>
                <StatusTag
                    locale={locale}
                    dictionary={dictionaries.detailsPage}
                    data-size='md'
                    status={service.admsStatus}
                />
                {/*<AccessLevelTag
                    accessCode={dataset.accessRights?.code}
                    locale={locale}
                    dictionary={dictionaries.detailsPage}
                    data-size='md'
                />
                {dataset.isOpenData && <OpenDataTag dictionary={dictionaries.common} />}*/}
            </TagList>
        </div>
    );
};

export default ServiceHeader;
