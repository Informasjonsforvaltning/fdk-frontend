import { Link, Tag, Paragraph } from '@digdir/designsystemet-react';
import { HelpText } from '@fellesdatakatalog/ui';
import { type LocaleCodes, getLocalization } from '@fdk-frontend/localization';

const UnavailableTag = ({ locale }: { locale: LocaleCodes }) => {
    const dictionary = getLocalization(locale).common;
    return (
        <Tag
            data-color='warning'
            data-size='sm'
            style={{ display: 'inline-flex' }}
        >
            {dictionary.unavailableTag.label}
            &nbsp;
            <HelpText aria-label={dictionary.unavailableTag.helpTextTitle}>
                <Paragraph>{dictionary.unavailableTag.helpText}</Paragraph>
                <Paragraph>
                    <Link href='/docs/finding-data/access-data'>{dictionary.unavailableTag.linkText}</Link>
                </Paragraph>
            </HelpText>
        </Tag>
    );
};

export default UnavailableTag;
