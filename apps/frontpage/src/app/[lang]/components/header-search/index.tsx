import { Textfield, NativeSelect, Button } from '@digdir/designsystemet-react';
import { MagnifyingGlassIcon, CogIcon } from '@navikt/aksel-icons';

import styles from './header-search.module.scss';

const HeaderSearch = () => {
	return (
		<div className={styles.headerSearch}>
			<Textfield />
            {/*<NativeSelect>
            	<option>All data</option>
            	<option>Datasett</option>
            	<option>APIer</option>
            	<option>Begrep</option>
            	<option>Informasjonsmodeller</option>
            	<option>Tjenester og hendelser</option>
            </NativeSelect>*/}
            <Button variant="secondary">
            	<CogIcon aria-hidden fontSize='1.5em' />
            	Filter
			</Button>
            <Button>
            	<MagnifyingGlassIcon aria-hidden fontSize='1.5em' />
            	Søk
			</Button>
		</div>
	);
}

export { HeaderSearch };