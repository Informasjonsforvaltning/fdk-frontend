import { useState } from 'react';
import { Button } from '@digdir/designsystemet-react';
import { StarIcon, StarFillIcon } from '@navikt/aksel-icons';

import styles from './star-button.module.scss';

const StarButton = ({ defaultNumber = 0, defaultStarred = false }) => {

	const [ starred, setStarred ] = useState(defaultStarred);

	return (
		<Button
    		className={styles.button}
            variant='secondary'
            size='sm'
            onClick={() => setStarred(!starred)}
            aria-pressed={starred}
            color={starred ? 'success' : undefined}
        >
            {
            	starred ?
            	<><StarFillIcon /> {defaultNumber + 1}</> :
            	<><StarIcon /> {defaultNumber}</>
           	}
        </Button>
	);
}

export default StarButton;