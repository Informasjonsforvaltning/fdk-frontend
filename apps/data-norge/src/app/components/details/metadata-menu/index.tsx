import { PropsWithChildren } from 'react';

import Breadcrumbs from '@fdk-frontend/ui/breadcrumbs';
import { DropdownMenu, Divider } from '@digdir/designsystemet-react';
import { ChevronDownIcon } from '@navikt/aksel-icons';

import styles from './metadata-menu.module.scss';

const MetadataMenu = ({ children }: PropsWithChildren) => {

	const getMetadata = async (contentType) => {
		await fetch(`https://data.norge.no/datasets/e4c67aa2-af5a-36c2-b5c2-96b571ddd850`, {
			headers: { 'Accept': contentType }
		})
		.then(response => response.text())
		.then(data => {
			// Create a new Blob with the RDF data and a URL for it
			const blob = new Blob([data], { type: contentType });
			const url = URL.createObjectURL(blob);

			// Open the RDF content in a new browser tab
			window.open(url, '_blank');

			// Clean up the URL after it's no longer needed
			setTimeout(() => URL.revokeObjectURL(url), 100);
		});
	}

	return (
		<div className={styles.wrapper}>
			<DropdownMenu
			placement="bottom-end"
			size="md"
			>
				<DropdownMenu.Trigger variant='secondary' size='sm'>
					Se metadata&nbsp;<ChevronDownIcon />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Item size='sm' onClick={() => getMetadata('text/turtle')}>
							Turtle
						</DropdownMenu.Item>
						<DropdownMenu.Item size='sm' onClick={() => getMetadata('application/rdf+xml')}>
							RDF
						</DropdownMenu.Item>
						<DropdownMenu.Item size='sm' onClick={() => getMetadata('application/json')}>
							JSON
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu>
		</div>
	);
}

export default MetadataMenu;