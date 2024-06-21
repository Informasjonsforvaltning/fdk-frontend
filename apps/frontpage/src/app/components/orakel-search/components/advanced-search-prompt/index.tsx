import { Button, Alert } from '@digdir/designsystemet-react';
import { ChevronRightIcon } from '@navikt/aksel-icons';

import styles from './advanced-search-prompt.module.scss';

const AdvancedSearchPrompt = () => {
	return (
		<Alert className={styles.searchAlert}>
	  		<div className={styles.searchAlertContent}>
		  		Finner du ikke det du leter etter?
		  		<Button size="small" className={styles.searchAlertButton}>
		  			Gå til avansert søk <ChevronRightIcon aria-hidden fontSize="1.5em" />
		  		</Button>
		  	</div>
	  	</Alert>
	);
}

export { AdvancedSearchPrompt };