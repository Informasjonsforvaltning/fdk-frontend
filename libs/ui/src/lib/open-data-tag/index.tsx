import { Link, Tag, Paragraph } from '@digdir/designsystemet-react';
import { HelpText } from '@fellesdatakatalog/ui';
import { type Localization } from '@fdk-frontend/localization';

const OpenDataTag = ({ dictionary }: { dictionary: Localization }) => {
    return (
        <Tag
            data-color='success'
            style={{ display: 'inline-flex' }}
        >
            {dictionary.openDataTag.label}
            &nbsp;
            <HelpText aria-label={dictionary.openDataTag.helpTextTitle}>
                <Paragraph data-size='sm'>{dictionary.openDataTag.helpText}</Paragraph>
                <Paragraph data-size='sm'>
                    <Link href='/docs/finding-data/access-data'>{dictionary.openDataTag.linkText}</Link>
                </Paragraph>
            </HelpText>
        </Tag>
    );
};

export default OpenDataTag;
