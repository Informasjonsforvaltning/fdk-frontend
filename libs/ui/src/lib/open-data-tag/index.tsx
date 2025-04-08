import { Link, Tag, HelpText, Paragraph } from '@digdir/designsystemet-react';
import { type Dictionary } from '@fdk-frontend/dictionaries';

const OpenDataTag = ({ dictionary }: { dictionary: Dictionary }) => {
    return (
        <Tag
            color='success'
            size='sm'
            style={{ display: 'inline-flex' }}
        >
            {dictionary.openDataTag.label}
            &nbsp;
            <HelpText
                title={dictionary.openDataTag.helpTextTitle}
                size='sm'
                style={{ transform: 'scale(0.75)' }}
            >
                <Paragraph size='sm'>{dictionary.openDataTag.helpText}</Paragraph>
                <Paragraph size='sm'>
                    <Link href='/docs/finding-data/access-data'>{dictionary.openDataTag.linkText}</Link>
                </Paragraph>
            </HelpText>
        </Tag>
    );
};

export default OpenDataTag;
