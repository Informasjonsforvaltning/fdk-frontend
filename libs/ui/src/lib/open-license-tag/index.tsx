import { Link, Tag, HelpText, Paragraph } from '@digdir/designsystemet-react';
import { type Dictionary } from '@fdk-frontend/dictionaries';

const OpenLicenseTag = ({ dictionary }: { dictionary: Dictionary }) => {
    return (
        <Tag
            color='success'
            size='sm'
            style={{ display: 'inline-flex', marginLeft: '0.5rem' }}
        >
            {dictionary.openLicenseTag.label}
            &nbsp;
            <HelpText
                title={dictionary.openLicenseTag.helpTextTitle}
                size='sm'
                style={{ transform: 'scale(0.75)' }}
            >
                <Paragraph size='sm'>{dictionary.openLicenseTag.helpText}</Paragraph>
                <Paragraph size='sm'>
                    <Link href='/docs/finding-data/access-data'>{dictionary.openLicenseTag.linkText}</Link>
                </Paragraph>
            </HelpText>
        </Tag>
    );
};

export default OpenLicenseTag;
