import { Button, Heading, Paragraph, Link } from '@digdir/designsystemet-react';
import { ChevronRightIcon } from '@navikt/aksel-icons';

import { HeadingWithDivider } from '../typography';

import styles from './share-data-banner.module.scss';

const ShareDataBanner = () => {
	return (
		<div className={styles.shareDataBanner}>
			<HeadingWithDivider level={2} className={styles.headline}>
	      Har du data å dele?
	    </HeadingWithDivider>
	    <Paragraph>
	    	Gjør som over <Link href="https://staging.fellesdatakatalog.digdir.no/organizations">125 andre virksomheter</Link> og del dine data med resten av landet.
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