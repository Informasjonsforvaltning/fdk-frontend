import { Link, Tag, Paragraph } from '@digdir/designsystemet-react';
import { HelpText } from '@fellesdatakatalog/ui';
import { type Dictionary } from '@fdk-frontend/dictionaries';

const OpenDataTag = ({ dictionary }: { dictionary: Dictionary }) => {
    return (
        <Tag
            data-color='success'
            data-size='sm'
            style={{ display: 'inline-flex' }}
        >
            {dictionary.openDataTag.label}
            &nbsp;
            <HelpText aria-label={dictionary.openDataTag.helpTextTitle}>
                <Paragraph data-size='md'>{dictionary.openDataTag.helpText}</Paragraph>
                <Paragraph data-size='md'>
                    <Link href='/docs/finding-data/access-data'>{dictionary.openDataTag.linkText}</Link>
                </Paragraph>
            </HelpText>
        </Tag>
    );
};

export default OpenDataTag;
