import { Button, Alert, Link } from '@digdir/designsystemet-react';
import { ChevronRightIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Dictionary } from '@fdk-frontend/dictionaries';

import styles from './advanced-search-prompt.module.scss';

type AdvancedSearchPromptProps = {
	dictionary: Dictionary;
}

const AdvancedSearchPrompt = ({ dictionary }: AdvancedSearchPromptProps) => {
	return (
		<Alert className={styles.searchAlert}>
	  		<div className={styles.searchAlertContent}>
		  		{dictionary.aiBanner.advancedSearchPrompt.text}
		  		<Button className={styles.searchAlertButton} asChild size="small" variant="primary">
					<Link href="https://data.norge.no/search-all">
						<MagnifyingGlassIcon aria-hidden fontSize='1.5em' />
						{dictionary.aiBanner.advancedSearchPrompt.link}
					</Link>
		      </Button>
		  	</div>
	  	</Alert>
	);
}

export { AdvancedSearchPrompt };