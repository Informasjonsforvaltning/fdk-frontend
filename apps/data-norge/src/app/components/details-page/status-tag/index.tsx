import { Tag } from '@digdir/designsystemet-react';
import { type LocaleCodes } from '@fdk-frontend/dictionaries';
import { PublicServiceLanguage } from '@fellesdatakatalog/types';
import { printLocaleValue } from '@fdk-frontend/utils';

export type StatusCode = 'Completed' | 'Deprecated' | 'UnderDevelopment' | 'Withdrawn' | 'Discontinued';

const statusColorMap: Record<StatusCode, string> = {
    Completed: 'success',
    UnderDevelopment: 'neutral',
    Withdrawn: 'warning',
    Deprecated: 'warning',
    Discontinued: 'warning',
};

type StatusTagProps = {
    locale: LocaleCodes;
    status: PublicServiceLanguage;
};

const StatusTag = (props: StatusTagProps) => {
    const { locale, status } = props;
    const color = statusColorMap?.[status.code as StatusCode] || 'neutral';
    return <Tag data-color={color}>{printLocaleValue(locale, status.prefLabel)}</Tag>;
};

export default StatusTag;
