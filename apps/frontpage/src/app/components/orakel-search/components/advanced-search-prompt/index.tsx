import { Button, Alert, Link } from '@digdir/designsystemet-react';
import { ChevronRightIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';

import styles from './advanced-search-prompt.module.scss';

const AdvancedSearchPrompt = () => {
	return (
		<Alert className={styles.searchAlert}>
	  		<div className={styles.searchAlertContent}>
		  		Finner du ikke det du leter etter?
		  		<Button className={styles.searchAlertButton} asChild size="small" variant="primary">
					<Link href="https://data.norge.no/search-all">
						<MagnifyingGlassIcon aria-hidden fontSize='1.5em' />
						Finn data
					</Link>
		        </Button>
		  	</div>
	  	</Alert>
	);
}

export { AdvancedSearchPrompt };