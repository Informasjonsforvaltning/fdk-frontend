import { Button, Heading, Paragraph, Link } from '@digdir/designsystemet-react';
import { ChevronRightIcon } from '@navikt/aksel-icons';

import styles from './share-data-banner.module.css';

const ShareDataBanner = () => {
	return (
		<div className={styles.shareDataBanner}>
			<Heading
	      level={2}
	      size="medium"
	      className={styles.shareDataHeadline}
	    >
	      Har du data å dele?
	    </Heading>
	    <Paragraph>
	    	Gjør som over 250 andre virksomheter og del dine data med resten av landet
	    </Paragraph>
	    <div className={styles.buttons}>
	    	<Button asChild>
		    	<Link href="https://data.norge.no/guidance" inverted>
						Kom i gang
					</Link>
				</Button>
				<Button asChild variant="secondary">
		    	<Link href="https://informasjonsforvaltning.github.io/">
						Se dokumentasjon
					</Link>
				</Button>
			</div>
		</div>
	);
}

export { ShareDataBanner };