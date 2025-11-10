'use client';

import React from 'react';
import { PublicService, Organization, TextLanguage, PublicServiceLanguage } from '@fellesdatakatalog/types';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { printLocaleValue } from '@fdk-frontend/utils';
import { OrgButton, TagList } from '@fdk-frontend/ui';
import { Heading, Link, Tag } from '@digdir/designsystemet-react';
import styles from './service-header.module.scss';
import StatusTag from '../status-tag';

type ServiceHeaderProps = {
    admsStatus?: PublicServiceLanguage;
    dictionaries: {
        common: Dictionary;
        detailsPage: Dictionary;
    };
    locale: LocaleCodes;
    orgLogo?: string | null;
    publisher?: Organization;
    title: Partial<TextLanguage> | string;
};

const ServiceHeader = (props: ServiceHeaderProps) => {
    const { admsStatus, dictionaries, locale, orgLogo, publisher, title } = props;
    return (
        <div className={styles.header}>
            {publisher && (
                <OrgButton
                    href={`/organizations/${publisher.id}`}
                    orgLogoSrc={orgLogo}
                    className={styles.orgBtn}
                >
                    {printLocaleValue(locale, publisher.prefLabel) ??
                        dictionaries.detailsPage.header.namelessOrganization}
                </OrgButton>
            )}
            <Heading
                level={1}
                data-size='lg'
                className={styles.title}
            >
                {printLocaleValue(locale, title)}
            </Heading>
            <div className={styles.headerToolbar} />
            <TagList className={styles.headerTags}>
                <Tag
                    data-color='info'
                    data-size='md'
                >
                    <Link href='/todo'>{dictionaries.detailsPage.header.serviceTagLink}</Link>
                </Tag>
                {admsStatus && (
                    <StatusTag
                        locale={locale}
                        status={admsStatus}
                    />
                )}
            </TagList>
        </div>
    );
};

export default ServiceHeader;
