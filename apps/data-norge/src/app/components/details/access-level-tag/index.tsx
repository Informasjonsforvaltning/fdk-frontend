import {
    Link,
    Tag,
    TagProps,
    HelpText,
    Paragraph,
} from '@digdir/designsystemet-react';
import { type Dictionary } from '@fdk-frontend/dictionaries';
import { DatasetAccessRightsCodes } from '@fdk-frontend/types';

type AccessLevelTagProps = {
	accessCode: DatasetAccessRightsCodes;
	dictionary: Dictionary;
	nonInteractive?: boolean;
}

const AccessLevelTag = ({ accessCode, dictionary, nonInteractive, ...props }: AccessLevelTagProps) => {

	let color = 'neutral';

	const label = dictionary.accessRights.codes[accessCode].label || dictionary.accessRights.unknownLabel;
	const helpText = dictionary.accessRights.codes[accessCode].helpText || '';

	if (accessCode === 'NON_PUBLIC') color = 'danger';
	if (accessCode === 'RESTRICTED') color = 'warning';
	if (accessCode === 'PUBLIC') color = 'success';

	return (
		<Tag
	        color={color as TagProps["color"]}
	        size='sm'
	    >
	    	{
	    		nonInteractive ?
	    		label :
	    		<>
	    			<Link href={`/datasets?accessrights=${accessCode}`}>{label}</Link>&nbsp;
			        <HelpText
			            title={dictionary.accessRights.helpTextTitle}
			            size='sm'
			            style={{ transform: 'scale(0.75)' }}
			        >
			            <Paragraph size='sm'>{helpText}</Paragraph>
			            <Paragraph size='sm'>
			                <Link href='https://data.norge.no/specification/dcat-ap-no#Datasett-tilgangsrettigheter'>
			                    {dictionary.accessRights.readMoreLinkText}
			                </Link>
			            </Paragraph>
			        </HelpText>
	    		</>
	    	}
	    </Tag>
	);
}

export default AccessLevelTag;