import {
    Link,
    Tag,
    TagProps,
    HelpText,
    Paragraph,
} from '@digdir/designsystemet-react';

import { DatasetAccessRightsCodes } from '@fdk-frontend/types';

type AccessLevelTagProps = {
	accessCode: DatasetAccessRightsCodes;
	nonInteractive?: boolean;
}

const AccessLevelTag = ({ accessCode, nonInteractive, ...props }: AccessLevelTagProps) => {

	let color = 'neutral', label = 'Ukjent tilgangsnivå', helpText = '';

	if (accessCode === 'NON_PUBLIC') {
		color = 'danger';
		label = 'Ikke-allmenn tilgang';
		helpText = 'Ikke offentlig tilgjengelig av personvern-, sikkerhets- eller andre årsaker. Denne kategorien kan inkludere ressurser som inneholder sensitiv eller personlig informasjon.';
	}

	if (accessCode === 'RESTRICTED') {
		color = 'warning';
		label = 'Begrenset tilgang';
	  	helpText = 'Kun tilgjengelig under visse betingelser. Denne kategorien kan inkludere ressurser som krever betaling, ressurser delt under taushetsavtaler, eller ressurser der utgiver eller eier ennå ikke har bestemt om de kan offentliggjøres.';
	}

	if (accessCode === 'PUBLIC') {
		color = 'success';
		label = 'Allmenn tilgang';
	  	helpText = 'Offentlig tilgjengelig for alle. Tilgang kan likevel kreve registrering og forespørsel om API-nøkler, så lenge hvem som helst kan be om slik registrering og/eller API-nøkler.';
	}

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
			            title='Begrepsforklaring'
			            size='sm'
			            style={{ transform: 'scale(0.75)' }}
			        >
			            <Paragraph size='sm'>{helpText}</Paragraph>
			            <Paragraph size='sm'>
			                <Link href='https://data.norge.no/specification/dcat-ap-no#Datasett-tilgangsrettigheter'>
			                    Les mer om tilgangsnivåer her
			                </Link>
			            </Paragraph>
			        </HelpText>
	    		</>
	    	}
	    </Tag>
	);
}

export default AccessLevelTag;