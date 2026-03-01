import { Link, Tag, TagProps, Paragraph } from '@digdir/designsystemet-react';
import { type LocaleCodes, getLocalization } from '@fdk-frontend/localization';
import { AccessRightsCodes } from '@fellesdatakatalog/types';
import { HelpText } from '@fellesdatakatalog/ui';

type AccessLevelTagProps = {
    accessCode?: AccessRightsCodes;
    nonInteractive?: boolean;
    locale: LocaleCodes;
};

const AccessLevelTag = ({ accessCode, nonInteractive, locale, ...props }: AccessLevelTagProps) => {
    const dictionary = getLocalization(locale).detailsPage;
    let color = 'neutral';

    const label = accessCode ? dictionary.accessRights.codes[accessCode]?.label : dictionary.accessRights.unknownLabel;
    const helpText = accessCode ? dictionary.accessRights.codes[accessCode]?.helpText : '';

    if (accessCode === AccessRightsCodes.NON_PUBLIC) color = 'danger';
    if (accessCode === AccessRightsCodes.RESTRICTED) color = 'warning';
    if (accessCode === AccessRightsCodes.PUBLIC) color = 'success';

    return (
        <Tag data-color={color as TagProps['color']}>
            {nonInteractive ? (
                label
            ) : (
                <>
                    <Link href={`/datasets?accessrights=${accessCode}`}>{label}</Link>&nbsp;
                    <HelpText aria-label={dictionary.accessRights.helpTextTitle}>
                        <Paragraph data-size='sm'>{helpText}</Paragraph>
                        <Paragraph data-size='sm'>
                            <Link href={`/${locale}/docs/finding-data/access-data`}>
                                {dictionary.accessRights.readMoreLinkText}
                            </Link>
                        </Paragraph>
                    </HelpText>
                </>
            )}
        </Tag>
    );
};

export default AccessLevelTag;
