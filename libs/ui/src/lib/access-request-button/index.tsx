import React from 'react';
import { Button, Modal, Link } from '@digdir/designsystemet-react';
import styles from './my-component.module.scss';
import BadgeOverlay from '../badge-overlay';
import AccessRequestModal from '../access-request-modal';
import { accessRequestWhiteList } from '@fdk-frontend/utils/access-request';

export type AccessRequestButtonProps = {
	kind: 'dataset' | 'data-service' | 'concept';
	id: string;
}

const AccessRequestButton = ({ children, kind, id, ...props }: AccessRequestButtonProps & React.HTMLAttributes<HTMLDivElement>) => {

	const demoItem = accessRequestWhiteList.find(i => i.id === id);
	const url = demoItem.requestAddress === 'https://soknad.kudaf.no' ? `/access-request/${kind}/${id}` : demoItem.requestAddress ;

	return (
		<BadgeOverlay badgeProps={{children:'beta', 'data-color': 'green-subtle'}}>
			<Button
				variant='secondary'
	      size='sm'
	      asChild
			>
				<Link href={url}>
					Be om tilgang
				</Link>
			</Button>
		</BadgeOverlay>
	);
	return (
		<AccessRequestModal
			trigger={
				<BadgeOverlay badgeProps={{children:'beta', 'data-color': 'green-subtle'}}>
					<Button
						variant='secondary'
			      size='sm'
					>
						Be om tilgang
					</Button>
				</BadgeOverlay>
			}
		/>
	);
}

export default AccessRequestButton;