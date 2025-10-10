import { Link, Tag, TagProps, Paragraph } from '@digdir/designsystemet-react';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { AccessRightsCodes } from '@fellesdatakatalog/types';

type AccessLevelTagProps = {
    accessCode?: AccessRightsCodes;
    dictionary: Dictionary;
    nonInteractive?: boolean;
    locale: LocaleCodes;
};

const AccessLevelTag = ({ accessCode, dictionary, nonInteractive, locale, ...props }: AccessLevelTagProps) => {
    let color = 'neutral';

    const label = accessCode ? dictionary.accessRights.codes[accessCode]?.label : dictionary.accessRights.unknownLabel;
    const helpText = accessCode ? dictionary.accessRights.codes[accessCode]?.helpText : '';

    if (accessCode === AccessRightsCodes.NON_PUBLIC) color = 'danger';
    if (accessCode === AccessRightsCodes.RESTRICTED) color = 'warning';
    if (accessCode === AccessRightsCodes.PUBLIC) color = 'success';

    return (
        <Tag
            data-color={color as TagProps['color']}
            data-size='sm'
        >
            {nonInteractive ? (
                label
            ) : (
                <>
                    <Link href={`/datasets?accessrights=${accessCode}`}>{label}</Link>&nbsp;
                    {/* TODO: Replace with appropriate component after design system migration */}
                    {/* <HelpText
                        title={dictionary.accessRights.helpTextTitle}
                        size='sm'
                        style={{ transform: 'scale(0.75)' }}
                    >
                        <Paragraph size='sm'>{helpText}</Paragraph>
                        <Paragraph size='sm'>
                            <Link href={`/${locale}/docs/finding-data/access-data`}>
                                {dictionary.accessRights.readMoreLinkText}
                            </Link>
                        </Paragraph>
                    </HelpText> */}
                </>
            )}
        </Tag>
    );
};

export default AccessLevelTag;
