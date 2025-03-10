import React from 'react';
import { Alert, type AlertProps, Heading, Paragraph, Button, Link } from '@digdir/designsystemet-react';
import VStack from '../vstack';
import HStack from '../hstack';
import AccessRequestButton, { type AccessRequestButtonProps } from '../access-request-button';
// import styles from './resource-not-available-notice.module.scss';

const ResourceNotAvailableNotice = ({ children, kind, id, ...props }: AccessRequestButtonProps & AlertProps) => {
	return (
		<Alert
			severity='warning'
			{...props}
		>
			<VStack style={{marginBottom:'0.5rem', gap:'0.5rem'}}>
	        <Heading
	            level={2}
	            size='xxsmall'
	        >
	            Dette datasettet er enda ikke tilgjengelig
	        </Heading>
	        <Paragraph size='sm'>
						Dette datasettet har ingen distribusjoner. Det betyr at kun beskrivelsen av datasettet er tilgjengelig, mens selve innholdet og dataene ennå ikke er publisert. Du kan melde din interesse for datasettet til den ansvarlige virksomheten og søke om tilgang ved å klikke på knappen nedenfor. Jo flere som viser interesse, desto større er sjansen for at dataene blir gjort tilgjengelige.
					</Paragraph>
	        <HStack>
	            <AccessRequestButton
	            	kind={kind}
	            	id={id}
	            />
	            <Button
	                variant='tertiary'
	                size='sm'
	                asChild
	            >
	                <Link href='/docs/finding-data/access-data#nasjonal-soknadslosning'>Mer informasjon</Link>
	            </Button>
	        </HStack>
	    </VStack>
		</Alert>
	);
}

export default ResourceNotAvailableNotice;