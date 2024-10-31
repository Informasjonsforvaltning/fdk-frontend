import { useState } from 'react';
import {
	Button,
	type ButtonProps,
	Tooltip
} from '@digdir/designsystemet-react';
import { FilesIcon, CheckmarkCircleFillIcon } from '@navikt/aksel-icons';

import HStack from '../hstack';

type CopyButtonProps = {
	copyOnClick: string;
	buttonProps: ButtonProps;
}

const CopyButton = ({ copyOnClick, buttonProps, ...props }: CopyButtonProps) => {

	const [ clicked, setClicked ] = useState(false);

	const copyToClipboard = (text) => {
		setClicked(true);
		navigator.clipboard.writeText(text);
	}

	return (
		<Tooltip
			content={
				clicked ?
				<HStack>
					<CheckmarkCircleFillIcon color='#D1F4E1' fontSize='1.2em' />
					Kopiert!
				</HStack> :
				'Kopier'
			}
			placement='top'
		>
			<Button
				size='sm'
				variant='secondary'
				onClick={() => copyToClipboard(copyOnClick)}
				onMouseOver={() => setClicked(false)}
				{...buttonProps}
			>
				<FilesIcon />
			</Button>
		</Tooltip>
	);
}

export default CopyButton;