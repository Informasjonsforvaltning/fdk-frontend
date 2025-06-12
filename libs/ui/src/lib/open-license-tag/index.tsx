import { Tag, type TagProps } from '@digdir/designsystemet-react';
import { type Dictionary } from '@fdk-frontend/dictionaries';

const OpenLicenseTag = ({ dictionary, ...rest }: { dictionary: Dictionary } & TagProps) => {
    return (
        <Tag
            color='success'
            size='sm'
            {...rest}
        >
            {dictionary.openLicenseTag.label}
        </Tag>
    );
};

export default OpenLicenseTag;
