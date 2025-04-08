import { Link, Tag, HelpText, Paragraph } from '@digdir/designsystemet-react';
import { type Dictionary } from '@fdk-frontend/dictionaries';

const UnavailableTag = ({ dictionary }: { dictionary: Dictionary }) => {
    return (
        <Tag
            color='warning'
            size='sm'
            style={{ display: 'inline-flex' }}
        >
            {dictionary.unavailableTag.label}
            &nbsp;
            <HelpText
                title={dictionary.unavailableTag.helpTextTitle}
                size='sm'
                style={{ transform: 'scale(0.75)' }}
            >
                <Paragraph size='sm'>{dictionary.unavailableTag.helpText}</Paragraph>
                <Paragraph size='sm'>
                    <Link href='/docs/finding-data/access-data'>{dictionary.unavailableTag.linkText}</Link>
                </Paragraph>
            </HelpText>
        </Tag>
    );
};

export default UnavailableTag;
