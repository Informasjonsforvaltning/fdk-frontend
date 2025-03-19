import { Link, Tag, TagProps, HelpText, Paragraph } from '@digdir/designsystemet-react';
import { type Dictionary } from '@fdk-frontend/dictionaries';
import { AccessRightsCodes } from '@fdk-frontend/fdk-types';

type AccessLevelTagProps = {
    accessCode?: AccessRightsCodes;
    dictionary: Dictionary;
    nonInteractive?: boolean;
};

const AccessLevelTag = ({ accessCode, dictionary, nonInteractive, ...props }: AccessLevelTagProps) => {
    let color = 'neutral';

    const label = accessCode ? dictionary.accessRights.codes[accessCode]?.label : dictionary.accessRights.unknownLabel;
    const helpText = accessCode ? dictionary.accessRights.codes[accessCode]?.helpText : '';

    if (accessCode === AccessRightsCodes.NON_PUBLIC) color = 'danger';
    if (accessCode === AccessRightsCodes.RESTRICTED) color = 'warning';
    if (accessCode === AccessRightsCodes.PUBLIC) color = 'success';

    return (
        <Tag
            color={color as TagProps['color']}
            size='sm'
        >
            {nonInteractive ? (
                label
            ) : (
                <>
                    <Link href={`/datasets?accessrights=${accessCode}`}>{label}</Link>&nbsp;
                    <HelpText
                        title={dictionary.accessRights.helpTextTitle}
                        size='sm'
                        style={{ transform: 'scale(0.75)' }}
                    >
                        <Paragraph size='sm'>{helpText}</Paragraph>
                        <Paragraph size='sm'>
                            <Link href='/docs/finding-data/access-data'>
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
