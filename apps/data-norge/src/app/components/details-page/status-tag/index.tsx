import { Link, Tag, TagProps, Paragraph } from '@digdir/designsystemet-react';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { AccessRightsCodes } from '@fellesdatakatalog/types';
import { HelpText } from '@fellesdatakatalog/ui';
import { printLocaleValue } from '@fdk-frontend/utils';

type StatusCode = 'Completed' | 'Deprecated' | 'UnderDevelopment' | 'Withdrawn' | 'Discontinued';

const statusLabelMap: Record<StatusCode, string> = {
    Completed: 'Godkjent',
    UnderDevelopment: 'Under utvikling',
    Withdrawn: 'Trukket',
    Deprecated: 'Utgått',
    Discontinued: 'Avsluttet',
};

const statusColorMap: Record<StatusCode, string> = {
    Completed: 'success',
    UnderDevelopment: 'second',
    Withdrawn: 'info',
    Deprecated: 'warning',
    Discontinued: 'warning',
};

type StatusTagProps = {
    dictionary: Dictionary;
    nonInteractive?: boolean;
    locale: LocaleCodes;
    status?: AccessRightsCodes;
};

const StatusTag = ({ status, dictionary, nonInteractive, locale }: StatusTagProps) => {
    let color = 'neutral';

    const label = accessCode ? dictionary.accessRights.codes[accessCode]?.label : dictionary.accessRights.unknownLabel;
    const helpText = accessCode ? dictionary.accessRights.codes[accessCode]?.helpText : '';

    if (accessCode === AccessRightsCodes.NON_PUBLIC) color = 'danger';
    if (accessCode === AccessRightsCodes.RESTRICTED) color = 'warning';
    if (accessCode === AccessRightsCodes.PUBLIC) color = 'success';

    return (
        <Tag data-color={color as TagProps['color']}>
            {printLocaleValue(
                locale,
                (service as any)?.catalog?.publisher.prefLabel, // service is not of type PublicService?
            )}
        </Tag>
    );
};

export default StatusTag;
